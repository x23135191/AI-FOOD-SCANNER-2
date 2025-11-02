import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// ✅ Store your OpenAI API key securely here
const OPENAI_API_KEY = "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";

app.post("/api/analyze", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Proxy running on http://localhost:${PORT}`));
