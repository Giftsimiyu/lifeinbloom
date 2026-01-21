"use client";

import { useEffect, useState } from "react";

interface TableOfContentsProps {
  content?: any[];
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!content) return;

    // Extract headings from PortableText content
    const extracted: Heading[] = [];
    content.forEach((block: any, blockIndex: number) => {
      if (
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3")
      ) {
        let headingText = "";
        if (block.children) {
          headingText = block.children
            .map((child: any) => child.text || "")
            .join("");
        }

        if (headingText) {
          const id = `heading-${blockIndex}`;
          const level = block.style === "h2" ? 2 : 3;
          extracted.push({ id, text: headingText, level });
        }
      }
    });

    setHeadings(extracted);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    // Try to find heading element and scroll to it
    const allHeadings = document.querySelectorAll("h2, h3");
    allHeadings.forEach((heading) => {
      if (heading.textContent === id) {
        heading.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <div className="sticky top-8 bg-(--color-background-primary) border border-(--color-neutral-light) rounded-lg p-6 max-h-[calc(100vh-100px)] overflow-y-auto">
      <h3 className="font-display text-lg text-(--color-accent-wilderness) mb-4">
        Table of Contents
      </h3>

      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <button
              onClick={() => handleClick(heading.text)}
              className="text-sm text-(--color-neutral-grey) hover:text-(--color-accent-olive) transition-colors text-left"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
