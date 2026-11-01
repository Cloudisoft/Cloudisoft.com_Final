import Legal from "./Legal";
import { CONTACT } from "../lib/site";

export default function Terms() {
  return (
    <Legal
      title="Terms & Conditions"
      intro="These terms govern your use of cloudisoft.com and the services Cloudisoft LLC (“Cloudisoft”, “we”, “us”) provides. By using the website or engaging our services, you agree to them."
    >
      <h2>1. Services</h2>
      <p>
        Cloudisoft provides website design and development, workflow automation, CRM setup, AI voice agents, cloud infrastructure, security and
        compliance-readiness services, and software products including CloudiVoice and ApplyFlux. The specific scope, deliverables, timeline and fees for
        each project are set out in a written proposal, quote or statement of work (“Proposal”). If a Proposal conflicts with these terms, the Proposal
        applies.
      </p>

      <h2>2. Pricing and quotes</h2>
      <ul>
        <li>
          Prices shown on our website (for example “from $200”) are starting prices for guidance only. They are not offers and are not final quotes.
        </li>
        <li>Your final price is the one stated in your accepted Proposal. Work outside the agreed scope is quoted separately.</li>
        <li>Unless stated otherwise, prices are in US dollars and exclude taxes, third-party fees (such as hosting, domains, software licences, telephony and AI usage) and travel.</li>
      </ul>

      <h2>3. Payment</h2>
      <p>
        Payment terms, including any deposit and milestones, are set out in the Proposal. Invoices are due within the period stated on them. We may pause
        work on overdue accounts after giving notice.
      </p>

      <h2>4. Your responsibilities</h2>
      <ul>
        <li>Provide accurate information, timely feedback and the access needed for us to do the work.</li>
        <li>Make sure you have the rights to any content, data and trademarks you give us.</li>
        <li>Use AI voice agents and automations lawfully, including consent, call-recording, do-not-call and telemarketing rules that apply to you.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        Once paid in full, you own the custom deliverables we create specifically for you, as described in the Proposal. We keep ownership of our
        pre-existing tools, libraries, know-how and products (including CloudiVoice and ApplyFlux) and grant you the licence needed to use them as part of
        the deliverables. Third-party and open-source components remain subject to their own licences. We may show non-confidential work in our portfolio
        unless you ask us not to.
      </p>

      <h2>6. Confidentiality</h2>
      <p>Each party will keep the other’s confidential information private and use it only for the project, except where disclosure is required by law.</p>

      <h2>7. Security and compliance services</h2>
      <p>
        Our security and SOC 2 readiness services help you prepare controls, policies and evidence. Certification or attestation reports are issued only by
        independent auditors, and we do not guarantee any audit outcome.
      </p>

      <h2>8. AI outputs</h2>
      <p>
        AI systems can make mistakes. You are responsible for reviewing how AI agents and automations are used in your business and for configuring human
        review and handoff where decisions matter.
      </p>

      <h2>9. Warranties</h2>
      <p>
        We will perform services with reasonable skill and care. Except as stated in a Proposal, the website and services are provided “as is”, and we
        disclaim all other warranties to the extent permitted by law.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the extent permitted by law, neither party is liable for indirect, incidental, special or consequential damages, or for lost profits, revenue or
        data. Our total liability for any claim relating to a project is limited to the fees you paid us for that project in the 12 months before the claim.
      </p>

      <h2>11. Termination</h2>
      <p>
        Either party may end a project by written notice as described in the Proposal. You will pay for work completed up to the termination date.
      </p>

      <h2>12. Website use</h2>
      <p>
        You may not misuse this website, attempt to gain unauthorised access, interfere with its operation, or copy its content for commercial use without
        permission. Links to third-party sites are provided for convenience; we are not responsible for their content.
      </p>

      <h2>13. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of New Jersey, USA, without regard to conflict-of-law rules, and disputes will be handled by the
        courts located in New Jersey, unless a Proposal states otherwise.
      </p>

      <h2>14. Changes</h2>
      <p>We may update these terms. Changes apply from the effective date shown above and do not affect Proposals already signed.</p>

      <h2>15. Contact</h2>
      <p>
        Cloudisoft LLC · 473 Mundet Place, Hillside, NJ 07205, USA · <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · {CONTACT.phone.display}
      </p>
    </Legal>
  );
}
