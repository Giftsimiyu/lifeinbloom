import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Author",
  description:
    "Get to know the creator behind Life in Bloom. A journey of soft living, intentional choices, and finding beauty in everyday moments.",
};

export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-(--color-background-secondary) overflow-x-hidden">
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
            <div className="bg-gradient-to-br from-(--color-accent-olive)/20 to-(--color-accent-terracotta)/20 rounded-2xl p-6 md:p-10 flex items-center justify-center sticky top-20">
              <div className="text-center">
                <img src="/me.jpeg" alt="Author" className="w-40 h-40 md:w-50 md:h-50 object-cover rounded-full shadow-lg mx-auto mb-4" />
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
                  I believe that our lives are a gift, and how we choose to live them matters. Every moment is an opportunity to cultivate beauty, connection, and growth. Life's too short to not savor the beautiful, messy, imperfect journey of being human. My hope is that Life in Bloom inspires you to slow down, choose intentionally, and embrace the beauty in the everyday.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-(--color-accent-olive) mb-3">
                  What I Love
                </h3>
                <ul className="space-y-2">
                  {[
                    "Rearranging furniture and redesigning spaces",
                    "Getting completely lost in a good book with tea in hand",
                    "Listening to a good playlist",
                    "Football games and FC Barcelona ",
                    "Curating wardrobes that feel authentically me",
                    "Long conversations about purpose and growth",
                    "Good food and good company",
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
                  blueprint—until burnout came knocking. I was running on empty, searching for meaning in the wrong places.
                </p>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed mb-4">
                  The turning point came when I realized I didn't have to live
                  that way. I could choose a different path—one that prioritized well-being, joy, and authenticity over constant hustle. It wasn't an overnight transformation, but it was a decision to start living on my own terms.
                </p>
                <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                  That's what Life in Bloom is about. It's a celebration of the journey toward intentional living, a reminder that you deserve a life that feels good, and a community for those who want to bloom at their own pace. I'm so grateful you're here, and I can't wait to see how we grow together.
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
                description: "Creating spaces that make me feel safe, inspired, and at peace",
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
                I write best in the morning with a good cup of tea, music playing in the background. I like to start with a brain dump of all my thoughts and feelings, then I let it sit for a day or two before I go back and shape it into something meaningful. I believe creativity is a process, not a product, and I try to honor that in everything I create.
              </p>
            </div>

            <div className="border-l-4 border-(--color-accent-olive) pl-8 py-4">
              <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-2">
                My Workspace
              </h3>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                A cozy corner with a desk by the window, a collection of
                journals, and a few favorite books. I believe where you create matters.
              </p>
            </div>

            <div className="border-l-4 border-(--color-accent-olive) pl-8 py-4">
              <h3 className="font-display text-xl text-(--color-accent-wilderness) mb-2">
                Current Favorites
              </h3>
              <p className="font-body text-base text-(--color-neutral-dark) leading-relaxed">
                Sports romance books, cartoon art illustration, spanish music, trying new recipes.
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
            I write and create because I believe you deserve a life that feels fulfilling. If this space can inspire even one person to choose themselves, slow down, or find beauty in the everyday, then sharing it is worth it.
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
