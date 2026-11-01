import Legal from "./Legal";
import { CONTACT } from "../lib/site";

export default function Privacy() {
  return (
    <Legal
      title="Privacy Policy"
      intro="This policy explains what personal information Cloudisoft LLC (“Cloudisoft”, “we”, “us”) collects through cloudisoft.com and when you work with us, how we use it, and the choices you have."
    >
      <h2>1. Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Contact details you submit through our forms — name, business name, email address, phone number and your message.</li>
        <li>Messages and call details when you contact us by WhatsApp, phone, text message or email.</li>
        <li>Information you share with us during a project, such as account access, business data or content for your website.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Basic technical data our hosting provider logs to deliver and protect the site, such as IP address, browser type and pages requested.</li>
        <li>
          We do not use advertising cookies or tracking pixels on this website. Embedded Google Maps and fonts are loaded from Google, which may receive
          your IP address and set its own cookies under Google’s privacy policy.
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To reply to enquiries, prepare quotes and deliver the services you ask for.</li>
        <li>To operate, secure and improve our website and services.</li>
        <li>To send service-related messages. We only send marketing messages if you have agreed to receive them, and you can opt out at any time.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>3. Sharing</h2>
      <p>We share personal information only with service providers that help us run our business, under confidentiality obligations, including:</p>
      <ul>
        <li>Form processing (Formspree) for messages sent through our contact form.</li>
        <li>Website hosting and content delivery providers.</li>
        <li>Communication tools such as WhatsApp, email and telephony providers.</li>
        <li>Cloud providers used to deliver client projects, as agreed with each client.</li>
      </ul>
      <p>We may also disclose information if required by law, or to protect our rights, users or the public.</p>

      <h2>4. Client data in our projects</h2>
      <p>
        When we build or run systems for a client — for example a CRM, an automation or an AI voice agent — we process that client’s data on their
        instructions and only for the agreed project. Call recordings and transcripts produced by AI voice agents are stored in private storage and kept for
        the retention period agreed with the client.
      </p>

      <h2>5. Security</h2>
      <p>
        We use encrypted connections (HTTPS), least-privilege access, strong authentication and backups to protect information. No method of
        transmission or storage is completely secure, but we work to protect your information and will notify affected people where required by law.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep enquiry information for as long as needed to respond and follow up, and project information for the duration of the engagement and as
        required for legal and accounting purposes. You can ask us to delete your information at any time.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live — including under the California Consumer Privacy Act, the EU/UK GDPR and India’s Digital Personal Data Protection
        Act, 2023 — you may have the right to access, correct, delete or obtain a copy of your personal information, to withdraw consent, and to object to
        or restrict certain processing. To make a request, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We will not discriminate against
        you for exercising your rights.
      </p>

      <h2>8. International transfers</h2>
      <p>
        We operate in the United States and India, so your information may be processed in either country. Where required, we use appropriate safeguards
        for these transfers.
      </p>

      <h2>9. Children</h2>
      <p>Our website and services are intended for businesses and are not directed to children under 16. We do not knowingly collect their information.</p>

      <h2>10. Changes</h2>
      <p>We may update this policy from time to time. The effective date above shows when it was last changed.</p>

      <h2>11. Contact</h2>
      <p>
        Questions or requests about privacy: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, {CONTACT.phone.display}, or by post to Cloudisoft LLC,
        473 Mundet Place, Hillside, NJ 07205, USA.
      </p>
    </Legal>
  );
}
