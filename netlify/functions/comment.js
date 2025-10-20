// /netlify/functions/comment.js
// Compatible with Netlify’s event/context model

const GITHUB_USERNAME = "ozdemir07";
const REPO_NAME = "eden-antalya";
const FILE_PATH = "comments.json";
const BRANCH = "main";
const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/* ---------- Helpers ---------- */
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

/* ---------- Main Handler ---------- */
exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: "Missing GITHUB_TOKEN" }) };
  }

  // ✅ use Bearer instead of token
  const ghHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/vnd.github+json",
  };

  // ---------- GET ----------
  if (event.httpMethod === "GET") {
    try {
      const resp = await fetch(`${API_URL}?ref=${BRANCH}`, { headers: ghHeaders });
      if (resp.status === 404)
        return { statusCode: 200, headers, body: JSON.stringify({ success: true, comments: [] }) };

      if (!resp.ok) {
        const errText = await resp.text();
        console.error("GitHub GET failed:", errText);
        return { statusCode: resp.status, headers, body: JSON.stringify({ success: false, message: errText }) };
      }

      const fileData = await resp.json();
      const comments = decodeBase64JSON(fileData.content);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, comments }) };
    } catch (err) {
      console.error("GET error:", err);
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: err.message }) };
    }
  }

  // ---------- POST ----------
  if (event.httpMethod === "POST") {
    try {
      const { name, text } = JSON.parse(event.body || "{}");
      if (!name || !text) {
        return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: "Missing fields" }) };
      }

      // 1️⃣ Fetch existing file
      const getResp = await fetch(`${API_URL}?ref=${BRANCH}`, { headers: ghHeaders });
      const fileData = await getResp.json();
      const existing = fileData.content ? decodeBase64JSON(fileData.content) : [];

      // 2️⃣ Append new comment
      const newComment = { name, text, timestamp: new Date().toISOString() };
      existing.push(newComment);

      // 3️⃣ Update file via PUT
      const updatedContent = encodeBase64JSON(existing);
      const putBody = {
        message: `Add comment by ${name}`,
        content: updatedContent,
        branch: BRANCH,
        sha: fileData.sha,
      };

      const putResp = await fetch(API_URL, {
        method: "PUT",
        headers: ghHeaders,
        body: JSON.stringify(putBody),
      });

      const resultText = await putResp.text(); // log result for debugging
      console.log("PUT response:", putResp.status, resultText);

      if (!putResp.ok) {
        return { statusCode: putResp.status, headers, body: JSON.stringify({ success: false, message: resultText }) };
      }

      return { statusCode: 200, headers, body: JSON.stringify({ success: true, comment: newComment }) };
    } catch (err) {
      console.error("POST error:", err);
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, message: err.message }) };
    }
  }

  // ---------- FALLBACK ----------
  return { statusCode: 405, headers, body: JSON.stringify({ success: false, message: "Method not allowed" }) };
};
