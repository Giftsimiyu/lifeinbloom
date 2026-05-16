import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Life in Bloom",
};

export default function PrivacyPage() {
  return (
    <main className="bg-(--color-background-secondary) overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-display text-4xl mb-8" style={{ color: "var(--color-accent-wilderness)" }}>
          Privacy Policy
        </h1>

        <div className="prose prose-sm max-w-none space-y-6 text-(--color-neutral-dark)">
          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              1. Introduction
            </h2>
            <p>
              Welcome to Life in Bloom ("we," "us," "our," or "Company"). We are committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and otherwise process your information across our
              website and services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              2. Information We Collect
            </h2>
            <p>We collect information in several ways:</p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li><strong>Information You Provide:</strong> Name, email, comments, contact form submissions, and order details.</li>
              <li><strong>Automatically Collected:</strong> Browser type, IP address, pages visited, and analytics data via cookies and tracking pixels.</li>
              <li><strong>From Third Parties:</strong> Analytics providers, payment processors, and email services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              3. How We Use Your Information
            </h2>
            <p>We use collected information to:</p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Process orders and send confirmations</li>
              <li>Respond to your inquiries and comments</li>
              <li>Send newsletters (with your consent)</li>
              <li>Improve our site and services</li>
              <li>Comply with legal obligations</li>
              <li>Send analytics to understand user behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              4. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. You can disable cookies in your
              browser settings, though this may limit site functionality. We respect your privacy preferences and only use
              analytics trackers (Plausible, Google Analytics) when you consent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              5. Third-Party Services
            </h2>
            <p>
              We use third-party services including Sanity (CMS), Resend (email), payment processors, and analytics
              providers. These services have their own privacy policies. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              6. Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method of transmission
              over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              7. Your Rights
            </h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or port your personal data.
              To exercise these rights, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The "Last Updated" date reflects the most recent revision.
              Your continued use of our site constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              9. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:privacy@lifeinbloomblog.com" className="text-(--color-accent-olive) underline">
                privacy@lifeinbloomblog.com
              </a>
            </p>
            <p className="text-sm text-(--color-neutral-grey) mt-4">
              Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
