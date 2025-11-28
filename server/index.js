import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// INIT resend client
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, business, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    await resend.emails.send({
      from: "Cloudisoft <connect@cloudisoft.com>",
      to: "connect@cloudisoft.com",
      reply_to: email,
      subject: "New Contact Inquiry - Cloudisoft",
      text: `
New Contact Form Submission

Name: ${name}
Business: ${business || "-"}
Email: ${email}
Phone: ${phone || "-"}

Message:
${message}
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Cloudisoft Contact API running on ${PORT}`);
});
