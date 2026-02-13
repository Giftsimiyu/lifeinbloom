import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Life in Bloom",
};

export default function TermsPage() {
  return (
    <main className="bg-(--color-background-secondary)">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-display text-4xl mb-8" style={{ color: "var(--color-accent-wilderness)" }}>
          Terms of Service
        </h1>

        <div className="prose prose-sm max-w-none space-y-6 text-(--color-neutral-dark)">
          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website ("Site"), you accept and agree to be bound by the terms and provision of
              this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Life in
              Bloom for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Site</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Harassing, threatening, defaming, or engaging in any illegal or unethical conduct</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              3. Disclaimer
            </h2>
            <p>
              The materials on Life in Bloom are provided on an "as is" basis. Life in Bloom makes no warranties, expressed
              or implied, and hereby disclaims and negates all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              4. Limitations
            </h2>
            <p>
              In no event shall Life in Bloom or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
              use the materials on Life in Bloom, even if we or our authorized representative has been notified orally or
              in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              5. Accuracy of Materials
            </h2>
            <p>
              The materials appearing on Life in Bloom could include technical, typographical, or photographic errors.
              Life in Bloom does not warrant that any of the materials on its Site are accurate, complete, or current.
              Life in Bloom may make changes to the materials contained on its Site at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              6. Links
            </h2>
            <p>
              Life in Bloom has not reviewed all of the sites linked to its Site and is not responsible for the contents
              of any such linked site. The inclusion of any link does not imply endorsement by Life in Bloom of the site.
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              7. Modifications
            </h2>
            <p>
              Life in Bloom may revise these terms of service for its Site at any time without notice. By using this Site,
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              8. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
              in which Life in Bloom operates, and you irrevocably submit to the exclusive jurisdiction of the courts
              located in that location.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              9. User-Generated Content
            </h2>
            <p>
              By submitting comments, feedback, or other content to Life in Bloom, you grant us a non-exclusive,
              worldwide, royalty-free license to use, reproduce, modify, publish, and distribute such content in any
              media. You warrant that you own or have the necessary rights to the content you submit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mt-8 mb-4" style={{ color: "var(--color-accent-olive)" }}>
              10. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:{" "}
              <a href="mailto:legal@lifeinbloom.com" className="text-(--color-accent-olive) underline">
                legal@lifeinbloom.com
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
