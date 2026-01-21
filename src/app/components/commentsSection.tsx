"use client";

import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  timestamp: string;
  approved: boolean;
}

interface CommentsSectionProps {
  postSlug: string;
}

export default function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          postSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit comment");
      }

      setMessage({
        type: "success",
        text: "Thank you! Your comment has been submitted for review.",
      });

      setFormData({
        author: "",
        email: "",
        content: "",
      });

      // Reset message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to submit comment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-(--color-background-primary) py-12 my-12 rounded-2xl p-8 md:p-12 border border-(--color-neutral-light)">
      <div className="max-w-3xl mx-auto">
        <h3 className="font-display text-2xl text-(--color-accent-wilderness) mb-8">
          Comments
        </h3>

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="mb-12 space-y-6">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="border-l-4 border-(--color-accent-olive) pl-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-display text-lg text-(--color-accent-wilderness)">
                    {comment.author}
                  </h4>
                  <time className="text-xs text-(--color-neutral-grey)">
                    {new Date(comment.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p className="font-body text-(--color-neutral-grey) leading-relaxed">
                  {comment.content}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="font-body text-(--color-neutral-grey) text-center py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}

        {/* Comment Form */}
        <div className="border-t border-(--color-neutral-light) pt-8">
          <h4 className="font-display text-lg text-(--color-accent-wilderness) mb-6">
            Leave a Comment
          </h4>

          {message && (
            <div
              className={`p-4 mb-6 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`font-body text-sm ${
                  message.type === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="author"
                className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="author"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
              >
                Email (not published)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>

            {/* Comment Field */}
            <div>
              <label
                htmlFor="content"
                className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
              >
                Comment
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={5}
                value={formData.content}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                placeholder="Share your thoughts..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Post Comment"}
              </button>
            </div>

            {/* Note */}
            <p className="font-body text-xs text-(--color-neutral-grey) italic">
              Comments are moderated and will appear after approval.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
