"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Toast, { ToastType } from "./toast";

interface NewsletterFormProps {
  variant?: "inline" | "full" | "sidebar";
  placeholder?: string;
}

export default function NewsletterForm({
  variant = "inline",
  placeholder = "Email address",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: ToastType;
    title: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setToast(null);

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

      setToast({
        type: "success",
        title: "Welcome to the garden! 🌿",
        message: "Check your email for a special gift from us.",
      });

      setEmail("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setToast(null);
      }, 5000);
    } catch (error) {
      setToast({
        type: "error",
        title: "That didn't quite bloom...",
        message:
          error instanceof Error
            ? error.message
            : "Unable to connect right now. Please try again in a moment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "full") {
    return (
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {toast && (
          <div className="mb-4">
            <Toast
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onDismiss={() => setToast(null)}
              duration={5000}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <motion.input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={placeholder}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </motion.button>

          <p className="font-body text-xs text-(--color-neutral-grey) text-center italic">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </motion.div>
    );
  }
  // Sidebar variant (compact stacked) -------------------------------------------------
  if (variant === "sidebar") {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        {toast && (
          <div className="mb-3">
            <Toast
              type={toast.type}
              title={toast.title}
              message={toast.message}
              onDismiss={() => setToast(null)}
              duration={5000}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="sidebar-email" className="sr-only">
            Email address
          </label>
          <input
            id="sidebar-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-(--color-neutral-cream) rounded-md bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>

          <p className="font-body text-xs text-(--color-neutral-grey) italic">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </motion.div>
    );
  }

  // Inline variant (used in footer)
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {toast && (
        <div className="mb-3">
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onDismiss={() => setToast(null)}
            duration={5000}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-wrap items-stretch gap-3">
        <label htmlFor="footer-email" className="sr-only">
          Email
        </label>
        <motion.input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder={placeholder}
          className="flex-1 min-w-0 rounded-full px-4 py-2 border border-(--color-neutral-cream) bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          className="ml-0 md:ml-3 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 px-4 py-2"
        >
          {isLoading ? "..." : "Subscribe"}
        </motion.button>
      </form>
    </motion.div>
  );
}
