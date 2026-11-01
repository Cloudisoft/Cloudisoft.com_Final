import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 10000;

// Only our own sites may call this API from a browser.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://www.cloudisoft.com,https://cloudisoft.com")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || ALLOWED_ORIGINS.includes(origin)),
    methods: ["POST"],
  })
);
app.use(express.json({ limit: "20kb" }));
app.use((_req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  });
  next();
});

// Minimal in-memory rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // TLS certificates are verified (Node default). Do not disable this.
});

app.get("/", (_req, res) => {
  res.send("Cloudisoft contact API is running");
});

app.post("/api/contact", async (req, res) => {
  try {
    if (rateLimited(req.ip)) {
      return res.status(429).json({ success: false, message: "Too many requests. Please try again later." });
    }

    const body = req.body || {};
    // Honeypot field — bots fill it, people never see it.
    if (body._gotcha) return res.json({ success: true });

    const name = clean(body.name, 100);
    const business = clean(body.business, 120);
    const email = clean(body.email, 160);
    const phone = clean(body.phone, 32);
    const message = String(body.message ?? "").trim().slice(0, 4000);

    if (!name || !email || !message || !EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, message: "Missing or invalid fields." });
    }

    await transporter.sendMail({
      from: `"Cloudisoft Website" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: "connect@cloudisoft.com",
      replyTo: email,
      subject: "New inquiry from the Cloudisoft contact form",
      text: [
        "New inquiry from cloudisoft.com",
        "",
        `Name:     ${name}`,
        `Business: ${business || "-"}`,
        `Email:    ${email}`,
        `Phone:    ${phone || "-"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err && err.message);
    return res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Cloudisoft contact API listening on port ${PORT}`);
});
