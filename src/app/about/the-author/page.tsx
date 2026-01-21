import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Author",
  description:
    "Get to know the creator behind Life in Bloom. A journey of soft living, intentional choices, and finding beauty in everyday moments.",
};

export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-(--color-background-secondary)">
      {/* Hero Section */}
      <section className="bg-(--color-background-primary) py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl text-(--color-accent-wilderness) mb-6 leading-tight">
            The Author
          </h1>
          <p className="font-body text-xl text-(--color-neutral-grey) leading-relaxed">
            The heart and soul behind Life in Bloom
          </p>
        </div>
      </section>

      {/* Author Story */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="bg-gradient-to-br from-(--color-accent-olive)/20 to-(--color-accent-terracotta)/20 rounded-2xl p-8 md:p-12 flex items-center justify-center sticky top-20">
              <div className="text-center">
                <div className="text-9xl mb-6">👩‍🌾</div>
                <h2 className="font-display text-2xl text-(--color-accent-wilderness)">
                  The Creator
                </h2>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-4">
                  A Journey Toward Intentional Living
                </h2>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                  Life in Bloom began as a personal journal—a space to process
                  thoughts, celebrate small victories, and navigate the
                  beautiful mess of becoming who I'm meant to be. What started
                  as late-night reflections and mood board collections has grown
                  into this sanctuary you're exploring now.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-(--color-accent-olive) mb-3">
                  The Philosophy
                </h3>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                  I believe that magic lives in the ordinary. It's in the way
                  morning light filters through a well-placed linen curtain, in
                  the ritual of brewing tea, in choosing to wear the clothes
                  that make you feel like yourself rather than trying to fit
                  someone else's mold. Life in Bloom exists because I wanted to
                  build a space where these quiet moments of beauty are
                  celebrated and honored.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-(--color-accent-olive) mb-3">
                  What I Love
                </h3>
                <ul className="space-y-2">
                  {[
                    "Rearranging furniture and redesigning spaces",
                    "Tending to plants (and occasionally learning from their demise)",
                    "Getting completely lost in a good book with tea in hand",
                    "Curating wardrobes that feel authentically me",
                    "Long conversations about purpose and growth",
                    "Creating cozy corners that feel like a warm hug",
                    "Supporting other creatives and dreamers",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 font-body text-base text-(--color-neutral-dark)"
                    >
                      <span className="text-(--color-accent-olive) font-semibold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl text-(--color-accent-olive) mb-3">
                  My Story
                </h3>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed mb-4">
                  I grew up learning that productivity was tied to self-worth,
                  that more was always better, and that slowing down was a
                  luxury I couldn't afford. For years, I lived by that
                  blueprint—until burnout came knocking. It wasn't dramatic; it
                  was quiet and exhausting. I was running on empty, searching
                  for meaning in the wrong places.
                </p>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed mb-4">
                  The turning point came when I realized I didn't have to live
                  that way. I started small: making my bed with intention,
                  replacing fast fashion with pieces I actually loved, saying no
                  without explaining myself. These tiny acts became a revolution
                  in my own life. I discovered that soft living isn't about
                  being weak—it's about being intentional. It's fierce,
                  actually.
                </p>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                  That's what Life in Bloom is about. It's an invitation to
                  everyone who's tired of the hustle culture narrative. To
                  anyone who wants to design a life that feels good, not just
                  looks good. To those brave enough to choose themselves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-(--color-background-primary) py-24">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12 text-center">
            What Guides Me
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Growth",
                description:
                  "Constant evolution and becoming more of who I'm meant to be",
              },
              {
                icon: "💚",
                title: "Authenticity",
                description: "Showing up as my true self, messy and beautiful",
              },
              {
                icon: "🏡",
                title: "Home",
                description: "Creating spaces that nourish the soul",
              },
              {
                icon: "📚",
                title: "Learning",
                description: "Curious about everything and always learning",
              },
              {
                icon: "✨",
                title: "Beauty",
                description: "Finding wonder in the small, everyday moments",
              },
              {
                icon: "🤝",
                title: "Community",
                description: "Believing we're stronger together",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-(--color-background-secondary) hover:bg-(--color-accent-olive)/5 transition-colors"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-(--color-neutral-grey)">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-12 text-center">
            A Peek Behind the Scenes
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-(--color-accent-olive) pl-8 py-4">
              <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-2">
                My Creative Process
              </h3>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                I write best in the morning with good coffee, surrounded by
                plants and natural light. Each piece starts as a feeling or
                observation, and I let it grow from there. There's no
                formula—just authenticity and a desire to connect.
              </p>
            </div>

            <div className="border-l-4 border-(--color-accent-olive) pl-8 py-4">
              <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-2">
                My Workspace
              </h3>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                A cozy corner with a desk by the window, a collection of
                journals, pressed flowers, soft lighting, and way too many
                plants. I believe where you create matters—it should feel like a
                sanctuary.
              </p>
            </div>

            <div className="border-l-4 border-(--color-accent-olive) pl-8 py-4">
              <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-2">
                Current Favorites
              </h3>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                Journaling, botanical illustration, vintage aesthetics, linen
                everything, ceramics, long walks in nature, handwritten letters,
                and conversations about life, philosophy, and dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="bg-gradient-to-r from-(--color-accent-olive)/10 via-transparent to-(--color-accent-terracotta)/10 py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="font-display text-3xl text-(--color-accent-wilderness) mb-6">
            Why This Matters
          </h2>
          <p className="font-body text-lg text-(--color-neutral-dark) leading-relaxed mb-8">
            I write and create because I believe you deserve a life that feels
            good. Not one that looks good on Instagram, but one that actually
            nourishes your soul. You deserve to move slowly, choose
            intentionally, and bloom at your own pace.
          </p>
          <p className="font-body text-lg text-(--color-neutral-dark) leading-relaxed mb-8">
            Thank you for being here. Your presence matters more than you know.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/about" className="btn btn-secondary">
              About Life in Bloom
            </Link>
            <Link href="/contact" className="btn btn-tertiary">
              Connect with Me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
