import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for Life in Bloom store",
};

export default function RefundPage() {
  return (
    <main className="bg-(--color-background-secondary) overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-display text-4xl mb-8" style={{ color: "var(--color-accent-wilderness)" }}>
          Refund Policy
        </h1>
        <div className="prose prose-sm max-w-none space-y-6 text-(--color-neutral-dark)">
          <p>
            We want you to be delighted with your purchase from Life in Bloom. If for any reason you are not
            completely satisfied with an item, you may request a refund within 30 days of purchase. The item must be
            unused and in the same condition that you received it. Proof of purchase is required for all refunds.  
          </p>
          <p>
            To initiate a refund, please contact us at{' '}
            <a href="mailto:support@lifeinbloomblog.com" className="underline text-(--color-accent-olive)">
              support@lifeinbloomblog.com
            </a>{' '}
            with your order number and a brief explanation. Once we receive and inspect the item, we will notify you
            of the approval or rejection of your refund.
          </p>
          <p>
            Approved refunds will be processed within 5-10 business days and issued to the original method of payment.
            Shipping costs are non‑refundable. We reserve the right to deny a refund if the item does not meet the
            conditions outlined above.
          </p>
        </div>
      </div>
    </main>
  );
}
