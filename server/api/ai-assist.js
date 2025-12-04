// server/api/ai-assist.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// init OpenAI client using env var OPENAI_API_KEY
if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY not set");
}
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// small rate limiter (very small, optional)
let lastCall = 0;
const MIN_INTERVAL_MS = 200; // adjust per need

app.post("/api/ai-assist", async (req, res) => {
  try {
    const now = Date.now();
    if (now - lastCall < MIN_INTERVAL_MS) {
      // basic abuse control
      return res.status(429).json({ error: "Too many requests" });
    }
    lastCall = now;

    const { scenario, businessType, template } = req.body || {};

    // build system + user prompt
    const system = `You are CloudiCore assistant. Keep replies short, actionable, and founder-friendly.
When asked to generate or improve a scenario, respond with:
1) a short improved "scenario" sentence,
2) as JSON "assumptions" (revenue uplift %, cost change %, timeframe),
3) 3 suggested quick actions (one-liners).
Do not include any internal instructions.`;

    const userPrompt = `Context:
scenario: ${scenario || "<none>"}
businessType: ${businessType || "<unknown>"}
template: ${template || "<none>"}

Task: Suggest a concise improved scenario, assumptions (uplift % or cost change %), and 3 quick actions to run a fast test. Output as JSON: { "scenario": "...", "assumptions": {...}, "actions": [...] } and one short human summary sentence.`;

    // use Chat Completions (or Responses API) — Chat example below
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // change if you prefer another model
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 400,
      temperature: 0.2,
    });

    // parse assistant text
    const assistantText = completion.choices?.[0]?.message?.content || "";

    // try to parse JSON inside the assistant text if present
    // fallback: return raw assistantText
    let parsed = null;
    try {
      // often the assistant will include JSON block; extract it
      const jsonStart = assistantText.indexOf("{");
      const jsonEnd = assistantText.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        const jsonText = assistantText.slice(jsonStart, jsonEnd + 1);
        parsed = JSON.parse(jsonText);
      }
    } catch (e) {
      // ignore parse error
    }

    res.json({ assistantText, parsed });
  } catch (err) {
    console.error("AI assist error", err);
    res.status(500).json({ error: "AI assist failed" });
  }
});

// start server (only if this file runs standalone)
if (process.env.PORT) {
  const port = Number(process.env.PORT) || 3001;
  app.listen(port, () => console.log(`AI assist listening ${port}`));
}

export default app;
