"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Toast, { ToastType } from "./toast";

interface PostIdeaFormProps {
  variant?: "full" | "inline";
}

export default function PostIdeaForm({ variant = "full" }: PostIdeaFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      const response = await fetch("/api/post-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, email, name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit");
      setToast({ type: "success", title: "Idea sent! 🌱", message: "Thanks for helping us grow." });
      setTitle("");
      setDescription("");
      setEmail("");
      setName("");
      setTimeout(() => setToast(null), 5000);
    } catch (err) {
      setToast({ type: "error", title: "Oops...", message: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

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
          <Toast type={toast.type} title={toast.title} message={toast.message} onDismiss={() => setToast(null)} duration={5000} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="idea-title" className="sr-only">
            Title of your idea
          </label>
          <input
            id="idea-title"
            type="text"
            required
            disabled={isLoading}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short, catchy title"
            className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="idea-desc" className="sr-only">
            Description
          </label>
          <textarea
            id="idea-desc"
            required
            disabled={isLoading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us more about what you’d like to see"
            rows={4}
            className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="idea-name" className="sr-only">
              Your name (optional)
            </label>
            <input
              id="idea-name"
              type="text"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="idea-email" className="sr-only">
              Your email (optional)
            </label>
            <input
              id="idea-email"
              type="email"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email (optional)"
              className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {isLoading ? "Sending..." : "Submit Idea"}
        </motion.button>
      </form>
    </motion.div>
  );
}