"use client";

import { useState } from "react";

interface NewsletterFormProps {
  variant?: "inline" | "full";
  placeholder?: string;
}

export default function NewsletterForm({
  variant = "inline",
  placeholder = "Email address",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setMessage({
        type: "success",
        text: data.message || "Thank you for subscribing!",
      });

      setEmail("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "full") {
    return (
      <div className="w-full">
        {message && (
          <div
            className={`p-4 mb-4 rounded-lg ${
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={placeholder}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>

          <p className="font-body text-xs text-(--color-neutral-grey) text-center italic">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    );
  }

  // Inline variant (used in footer)
  return (
    <div className="w-full max-w-sm">
      {message && (
        <div
          className={`mb-3 p-3 rounded text-xs ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex">
        <label htmlFor="footer-email" className="sr-only">
          Email
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder={placeholder}
          className="flex-1 rounded-full px-4 py-2 border border-(--color-neutral-cream) bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="ml-3 btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
