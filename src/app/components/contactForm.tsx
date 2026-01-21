"use client";

import { useState } from "react";

interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [state, setState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (state.error) {
      setState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isLoading: true, error: null, success: false });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errors && Array.isArray(data.errors)
            ? data.errors.join(", ")
            : data.message || "Failed to send message";
        setState({
          isLoading: false,
          error: errorMessage,
          success: false,
        });
        return;
      }

      setState({
        isLoading: false,
        error: null,
        success: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          success: false,
        }));
      }, 5000);
    } catch (error) {
      setState({
        isLoading: false,
        error: "An error occurred. Please try again later.",
        success: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-body">
            Thank you! Your message has been sent successfully. We'll be in
            touch soon!
          </p>
        </div>
      )}

      {/* Error Message */}
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-body">{state.error}</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={state.isLoading}
          className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Jane Doe"
        />
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={state.isLoading}
          className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="jane@example.com"
        />
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          disabled={state.isLoading}
          className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="What is this about?"
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block font-body text-sm font-medium text-(--color-accent-wilderness) mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          disabled={state.isLoading}
          className="w-full px-4 py-3 border border-(--color-neutral-light) rounded-lg font-body text-base focus:outline-none focus:border-(--color-accent-olive) focus:ring-2 focus:ring-(--color-accent-olive)/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="Tell us what's on your mind..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={state.isLoading}
          className="btn btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.isLoading ? "Sending..." : "Send Message"}
        </button>
      </div>

      {/* Note */}
      <p className="font-body text-xs text-(--color-neutral-grey) italic pt-2">
        We'll do our best to respond within 2-3 business days.
      </p>
    </form>
  );
}
