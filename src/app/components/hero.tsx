import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-(--color-background-primary)">
      <div className="max-w-5xl mx-auto px-8 py-28 text-center">
        {/* Eyebrow text */}
        <p className="font-body text-sm tracking-wide uppercase text-(--color-accent-olive) mb-6">
          A lifestyle journal
        </p>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-6xl leading-tight text-(--color-accent-wilderness) mb-8">
          Life in bloom,
          <br />
          one season at a time
        </h1>

        {/* Subtext */}
        <p className="font-body text-lg max-w-2xl mx-auto text-(--color-neutral-grey) mb-12">
          Reflections on style, home, wellness, and becoming — written softly,
          lived fully, shared honestly.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-6">
          <Link href="/soft-living" className="btn btn-primary">
            Start Reading
          </Link>

          <Link href="/in-bloom" className="btn btn-secondary">
            Personal Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
