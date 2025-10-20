// /api/comment.js
// Vercel serverless function that stores comments in a GitHub repo file (comments.json)

const GITHUB_USERNAME = "ozdemir07";
const REPO_NAME = "eden-antalya";
const FILE_PATH = "comments.json";
const BRANCH = "main";

const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

/* ---------- Utility: JSON helper ---------- */
function json(res, code, body) {
  res.status(code).json(body);
}

/* ---------- Utility: Base64 helpers ---------- */
function decodeBase64JSON(b64) {
  try {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf-8") || "[]");
  } catch {
    return [];
  }
}
function encodeBase64JSON(obj) {
  return Buffer.from(JSON.stringify(obj, null, 2), "utf-8").toString("base64");
}

/* ---------- Utility: safe fetch with timeout ---------- */
async function safeFetch(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw new Error("Timeout or network error");
  }
}

/* ---------- Retry wrapper for 409 edit conflicts ---------- */
async function putWithRetry(url, options, tries = 2) {
  let lastErrText = "";
  for (let i = 0; i < tries; i++) {
    const resp = await safeFetch(url, options, 8000);
    if (resp.ok) return resp;
    const status = resp.status;
    lastErrText = await resp.text();
    if (status === 409) {
      await new Promise((r) => setTimeout(r, 300 + i * 200));
      continue;
    }
    return new Response(lastErrText, { status });
  }
  return new Response(lastErrText || "Conflict", { status: 409 });
}

/* ---------- Optional: simple in-memory rate limit ---------- */
let lastPostTime = 0;
function isRateLimited() {
  const now = Date.now();
  if (now - lastPostTime < 2000) return true; // 2s cooldown
  lastPostTime = now;
  return false;
}

/* ---------- Main Handler ---------- */
export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return json(res, 500, { success: false, message: "Missing GITHUB_TOKEN" });
  }

  const ghHeaders = {
    Authorization: `token ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.github+json",
  };

  /* ---------- GET (Read comments) ---------- */
  if (req.method === "GET") {
    try {
      const resp = await safeFetch(`${API_URL}?ref=${BRANCH}`, { headers: ghHeaders });
      if (resp.status === 404) return json(res, 200, { success: true, comments: [] });
      if (!resp.ok) {
        const errText = await resp.text();
        console.error("GitHub GET failed:", errText);
        return json(res, resp.status, { success: false, message: errText });
      }
      const fileData = await resp.json();
      const comments = decodeBase64JSON(fileData.content);
      return json(res, 200, { success: true, comments });
    } catch (err) {
      console.error("API GET ERROR:", err);
      return json(res, 500, { success: false, message: err.message });
    }
  }

  /* ---------- POST (Add comment) ---------- */
  if (req.method === "POST") {
    if (isRateLimited()) {
      return json(res, 429, { success: false, message: "Slow down — please wait a moment." });
    }

    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const { name, text, style } = body;

      if (!name || !text || !style) {
        return json(res, 400, { success: false, message: "Missing fields" });
      }

      // Step 1: Fetch existing file or prepare fresh array
      let fileData = null;
      let comments = [];
      let sha;

      const getResp = await safeFetch(`${API_URL}?ref=${BRANCH}`, { headers: ghHeaders });
      if (getResp.status === 404) {
        comments = [];
      } else if (getResp.ok) {
        fileData = await getResp.json();
        comments = decodeBase64JSON(fileData.content);
        sha = fileData.sha;
      } else {
        const errText = await getResp.text();
        console.error("GitHub GET (before PUT) failed:", errText);
        return json(res, getResp.status, { success: false, message: errText });
      }

      // Step 2: Append new comment
      const newComment = { name, text, style, timestamp: new Date().toISOString() };
      comments.push(newComment);

      // Step 3: PUT updated file
      const updatedContent = encodeBase64JSON(comments);
      const putBody = {
        message: `Add comment by ${name}`,
        content: updatedContent,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      };

      const putResp = await putWithRetry(API_URL, {
        method: "PUT",
        headers: ghHeaders,
        body: JSON.stringify(putBody),
      });

      if (!putResp.ok) {
        const errText = await putResp.text();
        console.error("GitHub PUT failed:", errText);
        return json(res, putResp.status, { success: false, message: errText });
      }

      return json(res, 200, { success: true, comment: newComment });
    } catch (err) {
      console.error("API POST ERROR:", err);
      return json(res, 500, { success: false, message: err.message });
    }
  }

  /* ---------- Fallback ---------- */
  return json(res, 405, { success: false, message: "Method not allowed" });
}
