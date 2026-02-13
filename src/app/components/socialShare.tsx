"use client";

import { useState } from "react";
import { FaTwitter, FaFacebook, FaPinterest, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdCheck, MdContentCopy } from "react-icons/md";

interface SocialShareProps {
  title: string;
  slug: string;
  excerpt?: string;
}

export default function SocialShare({
  title,
  slug,
  excerpt,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt || "");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-(--color-accent-wilderness)">
        Share:
      </span>

      <div className="flex flex-wrap gap-2">
        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <FaTwitter className="w-5 h-5" />
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <FaFacebook className="w-5 h-5" />
        </a>

        {/* Pinterest */}
        <a
          href={shareLinks.pinterest}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors"
          aria-label="Share on Pinterest"
          title="Share on Pinterest"
        >
          <FaPinterest className="w-5 h-5" />
        </a>

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>

        {/* Instagram */}
        <a
          href={shareLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors"
          aria-label="Share on Instagram"
          title="Share on Instagram"
        >
          <FaInstagram className="w-5 h-5" />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--color-accent-olive)/10 text-(--color-accent-olive) hover:bg-(--color-accent-olive)/20 transition-colors flex-shrink-0"
          aria-label="Copy link to clipboard"
          title="Copy link"
        >
          {copied ? (
            <MdCheck className="w-5 h-5" />
          ) : (
            <MdContentCopy className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
