import { Metadata } from "next";

export const metadata: Metadata = {
  title: "License",
  description: "License information for Life in Bloom",
};

import fs from "fs";
import path from "path";

export default function LicensePage() {
  // read the distributed file so the same text is shown as in /public/LICENSE
  const licensePath = path.resolve(process.cwd(), "LICENSE");
  let licenseText = "";
  try {
    licenseText = fs.readFileSync(licensePath, "utf8");
  } catch (e) {
    // fallback if file missing
    licenseText = "License text not available.";
  }

  return (
    <main className="bg-(--color-background-secondary) overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-display text-4xl mb-8" style={{ color: "var(--color-accent-wilderness)" }}>
          License
        </h1>
        <div className="prose prose-sm max-w-none space-y-6 text-(--color-neutral-dark)">
          <p>
            All original content on Life in Bloom (text, images, design, code) is licensed under the <strong>Creative Commons Attribution‑NonCommercial‑NoDerivatives 4.0 International</strong> (CC BY‑NC‑ND 4.0) license.
            You may share the material in any format, but you must give credit, may not use it commercially, and may not distribute any adaptations. See the full license text below or visit <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" className="underline text-(--color-accent-olive)" target="_blank" rel="noopener noreferrer">creativecommons.org/licenses/by-nc-nd/4.0/</a> for details.
          </p>
          <p>
            Third-party assets (e.g., fonts, icons, stock photography) are subject to their own licenses. Please refer to
            the individual asset provider for usage terms.
          </p>
          <pre className="mt-8 whitespace-pre-wrap">{licenseText}</pre>
        </div>
      </div>
    </main>
  );
}
