// /api/comment.js
// Vercel serverless function that stores comments in a GitHub repo file (comments.json)

const GITHUB_USERNAME = "ozdemir07";
const REPO_NAME = "eden-antalya";
const FILE_PATH = "comments.json";
const BRANCH = "main";

const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

/* ---------- Utility: JSON helper ---------- */
const sendJson = (res, code, body) => {
  res.status(code).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

/* ---------- Utility: Base64 helpers ---------- */
const decodeBase64JSON = (b64) => {
  try {
    const jsonStr = Buffer.from(b64, "base64").toString("utf-8");
    return JSON.parse(jsonStr || "[]");
  } catch {
    return [];
  }
};

const encodeBase64JSON = (obj) =>
  Buffer.from(JSON.stringify(obj, null, 2), "utf-8").toString("base64");

/* ---------- Utility: safe fetch with timeout ---------- */
async function safeFetch(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch {
    clearTimeout(id);
    throw new Error("Network or timeout error");
  }
}

/* ---------- Retry wrapper for 409 edit conflicts ---------- */
async function putWithRetry(url, options, tries = 2) {
  let lastErr = "";
  for (let i = 0; i < tries; i++) {
    const resp = await safeFetch(url, options, 8000);
    if (resp.ok) return resp;
    const status = resp.status;
    lastErr = await resp.text();
    if (status === 409) {
      await new Promise((r) => setTimeout(r, 300 + i * 200));
      continue;
    }
    return new Response(lastErr, { status });
  }
  return new Response(lastErr || "Conflict", { status: 409 });
}

/* ---------- Optional: lightweight in-memory rate limit ---------- */
let lastPost = 0;
function isRateLimited() {
  const now = Date.now();
  if (now - lastPost < 2000) return true;
  lastPost = now;
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
    return sendJson(res, 500, { success: false, message: "Missing GITHUB_TOKEN" });
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
      if (resp.status === 404) {
        return sendJson(res, 200, { success: true, comments: [] });
      }
      if (!resp.ok) {
        const err = await resp.text();
        console.error("GitHub GET failed:", err);
        return sendJson(res, resp.status, { success: false, message: err });
      }

      const fileData = await resp.json();
      const comments = decodeBase64JSON(fileData.content);
      return sendJson(res, 200, { success: true, comments });
    } catch (err) {
      console.error("API GET ERROR:", err);
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  /* ---------- POST (Add comment) ---------- */
  if (req.method === "POST") {
    if (isRateLimited()) {
      return sendJson(res, 429, {
        success: false,
        message: "Please wait a moment before posting again.",
      });
    }

    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const { name, text, style } = body;

      if (!name || !text || !style) {
        return sendJson(res, 400, { success: false, message: "Missing fields" });
      }

      // Step 1: fetch existing file
      let comments = [];
      let sha;
      const getResp = await safeFetch(`${API_URL}?ref=${BRANCH}`, { headers: ghHeaders });
      if (getResp.status === 404) {
        comments = [];
      } else if (getResp.ok) {
        const fileData = await getResp.json();
        comments = decodeBase64JSON(fileData.content);
        sha = fileData.sha;
      } else {
        const err = await getResp.text();
        console.error("GitHub GET (before PUT) failed:", err);
        return sendJson(res, getResp.status, { success: false, message: err });
      }

      // Step 2: append comment
      const newComment = { name, text, style, timestamp: new Date().toISOString() };
      comments.push(newComment);

      // Step 3: update GitHub file
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
        const err = await putResp.text();
        console.error("GitHub PUT failed:", err);
        return sendJson(res, putResp.status, { success: false, message: err });
      }

      return sendJson(res, 200, { success: true, comment: newComment });
    } catch (err) {
      console.error("API POST ERROR:", err);
      return sendJson(res, 500, { success: false, message: err.message });
    }
  }

  /* ---------- Fallback ---------- */
  return sendJson(res, 405, { success: false, message: "Method not allowed" });
}
