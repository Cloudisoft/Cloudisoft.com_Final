// server.js
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ init Resend client
if (!process.env.RESEND_API_KEY) {
  console.warn("⚠️ RESEND_API_KEY is not set in environment variables");
}
const resend = new Resend(process.env.RESEND_API_KEY || "");

// ✅ health route
app.get("/", (req, res) => {
  res.send("Cloudisoft Contact API is running.");
});

app.get("/api/RESEND_API_KEY", (req, res) => {
  res.json({
    ok: true,
    message: "Use POST /api/contact to send the form.",
  });
});

// ✅ contact form POST
app.post("/api/RESEND_API_KEY", async (req, res) => {
  try {
    const { name, business, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const { data, error } = await resend.emails.send({
      // use onboarding@resend.dev until your domain is verified
      from: "Cloudisoft <onboarding@resend.dev>",
      to: ["connect@cloudisoft.com"],
      subject: "New Contact Inquiry - Cloudisoft",
      text: [
        "New Contact Form Submission",
        "",
        `Name: ${name}`,
        `Business: ${business || "-"}`,
        `Email: ${email}`,
        `Phone: ${phone || "-"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Email service failed." });
    }

    return res.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Email error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email." });
  }
});

// ✅ explicitly bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cloudisoft Contact API running on ${PORT}`);
});

