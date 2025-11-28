import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 10000;

// For now, allow all origins (you can restrict to "https://cloudisoft.com" later)
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Cloudisoft contact API is running");
});

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Incoming /api/contact body:", req.body);

    const { name, business, email, phone, message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    // Nodemailer transporter using PrivateEmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // mail.privateemail.com
      port: Number(process.env.SMTP_PORT) || 587, // 587 for TLS
      secure: process.env.SMTP_SECURE === "true", // false for 587
      auth: {
        user: process.env.SMTP_USER, // connect@cloudisoft.com
        pass: process.env.SMTP_PASS  // mailbox password
      },
      tls: {
        // This helps avoid some certificate issues in cloud environments
        rejectUnauthorized: false
      }
    });

    const toAddress = "connect@cloudisoft.com";

    const mailOptions = {
      from: `"Cloudisoft Website" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: "New Inquiry from Cloudisoft Contact Form",
      text: `
New inquiry from Cloudisoft.com

Name:     ${name}
Business: ${business || "-"}
Email:    ${email}
Phone:    ${phone || "-"}

Message:
${message}
      `.trim()
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Cloudisoft contact API listening on port ${PORT}`);
});
