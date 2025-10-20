// /api/comment.js
// Vercel serverless function — stores comments (name, text, timestamp) in GitHub (eden-antalya/comments.json)

let lastPost = 0;

export default async function handler(req, res) {
  // ---------- CORS ----------
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = "ozdemir07";
  const REPO_NAME = "eden-antalya";
  const FILE_PATH = "comments.json";
  const BRANCH = "main";
  const API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ success: false, message: "Missing GITHUB_TOKEN" });
  }

  // ---------- GET (Read comments) ----------
  if (req.method === "GET") {
    try {
      const resp = await fetch(`${API_URL}?ref=${BRANCH}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (resp.status === 404) {
        // File not yet created
        return res.status(200).json({ success: true, comments: [] });
      }

      if (!resp.ok) {
        const errText = await resp.text();
        console.error("GitHub GET failed:", errText);
        return res.status(resp.status).json({ success: false, message: errText });
      }

      const fileData = await resp.json();
      const content = Buffer.from(fileData.content, "base64").toString("utf-8");
      const comments = content.trim() ? JSON.parse(content) : [];
      return res.status(200).json({ success: true, comments });
    } catch (err) {
      console.error("API GET ERROR:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ---------- POST (Add comment) ----------
  if (req.method === "POST") {
    // simple 2-second rate limit
    const now = Date.now();
    if (now - lastPost < 2000) {
      return res.status(429).json({
        success: false,
        message: "Please wait a moment before posting again.",
      });
    }
    lastPost = now;

    try {
      const { name, text } =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

      if (!name || !text) {
        return res.status(400).json({ success: false, message: "Missing name or text." });
      }

      // Retrieve existing comments or start new file
      const getResp = await fetch(`${API_URL}?ref=${BRANCH}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      let fileData = null;
      let comments = [];
      let sha;

      if (getResp.status === 404) {
        comments = [];
      } else if (getResp.ok) {
        fileData = await getResp.json();
        const existing = Buffer.from(fileData.content, "base64").toString("utf-8");
        comments = existing.trim() ? JSON.parse(existing) : [];
        sha = fileData.sha;
      } else {
        const errText = await getResp.text();
        console.error("GitHub GET (before PUT) failed:", errText);
        return res.status(getResp.status).json({ success: false, message: errText });
      }

      // Add new comment
      const newComment = { name, text, timestamp: new Date().toISOString() };
      comments.push(newComment);

      // Encode + update file
      const updatedContent = Buffer.from(
        JSON.stringify(comments, null, 2),
        "utf-8"
      ).toString("base64");

      const putResp = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add comment by ${name}`,
          content: updatedContent,
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!putResp.ok) {
        const errText = await putResp.text();
        console.error("GitHub PUT failed:", errText);
        return res.status(putResp.status).json({ success: false, message: errText });
      }

      return res.status(200).json({ success: true, comment: newComment });
    } catch (err) {
      console.error("API POST ERROR:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // ---------- Fallback ----------
  return res
    .status(405)
    .json({ success: false, message: `Method ${req.method} not allowed` });
}
