// server/twitter-proxy.js (CommonJS - copy this whole file)
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch"); // npm i node-fetch@2
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BEARER = process.env.TWITTER_BEARER_TOKEN;
if (!BEARER) {
  console.error("❌ Missing TWITTER_BEARER_TOKEN in server/.env");
  process.exit(1);
}

const cache = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

app.get("/twitter/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();

  // Return cached if fresh
  const cached = cache[username];
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.json(cached.data);
  }

  try {
    const url = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=public_metrics,profile_image_url`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${BEARER}` },
    });

    const data = await response.json();

    if (response.status === 429) {
      return res.status(429).json({ error: "rate_limited", details: "Twitter API rate limit exceeded" });
    }

    // Cache and return
    cache[username] = { ts: Date.now(), data };
    return res.json(data);
  } catch (err) {
    console.error("Twitter proxy error:", err);
    return res.status(500).json({ error: "server_error", details: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Twitter Proxy running on http://localhost:${PORT}`));
