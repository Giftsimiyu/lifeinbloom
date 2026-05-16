import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer statement for Life in Bloom",
};

export default function DisclaimerPage() {
  return (
    <main className="bg-(--color-background-secondary) overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-display text-4xl mb-8" style={{ color: "var(--color-accent-wilderness)" }}>
          Disclaimer
        </h1>
        <div className="prose prose-sm max-w-none space-y-6 text-(--color-neutral-dark)">
          <p>
            The information provided on Life in Bloom is for general informational purposes only. All content, including
            text, images, and multimedia, is delivered "as is" without warranties of any kind. Life in Bloom does not
            warrant the accuracy, completeness, or usefulness of any information on the site.
          </p>
          <p>
            Any reliance you place on such information is strictly at your own risk. Life in Bloom will not be liable for
            any losses or damages in connection with the use of our website.
          </p>
          <p>
            From time to time, affiliated links or sponsored content may appear. These do not influence our
            editorial content, and we only recommend products or services that we genuinely believe will provide value to
            our readers. Always conduct your own research before making purchasing decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
