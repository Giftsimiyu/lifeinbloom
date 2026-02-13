'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type TableOfContentsDropdownProps = {
  content: any;
};

export default function TableOfContentsDropdown({
  content,
}: TableOfContentsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from portable text content
  const headings = content
    ?.filter((block: any) => {
      return block._type === 'block' && (block.style === 'h2' || block.style === 'h3');
    })
    .map((block: any) => {
      const text = block.children?.map((child: any) => child.text).join('') || '';
      const key = block._key || Math.random().toString(36).substr(2, 9);
      const id = `heading-${key}`;
      return {
        id,
        text,
        level: block.style === 'h3' ? 3 : 2,
      };
    })
    .filter((heading: any) => heading.text && heading.text.trim().length > 0);

  const [activeId, setActiveId] = useState<string | null>(null);

  // Observe headings in the document to highlight the active section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observerOptions = { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 };
    const callback = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        // pick the one closest to top
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = (visible[0].target as HTMLElement).dataset['headingId'];
        if (id) setActiveId(id);
      }
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    const els = Array.from(document.querySelectorAll('[data-heading-id]')) as HTMLElement[];
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleHeadingClick = (id: string) => {
    const element = document.querySelector(`[data-heading-id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="w-48 md:w-56 flex items-center justify-between gap-3 px-3 py-2 text-sm rounded-md bg-(--color-background-secondary) border border-(--color-neutral-cream) text-(--color-neutral-grey) hover:bg-(--color-background-primary) transition-colors"
        >
          <span className="font-medium">Table of Contents</span>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded border border-(--color-neutral-cream) bg-(--color-background-primary)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-accent-olive)">
              <path d="M6 9h12M6 15h8" />
            </svg>
          </span>
        </button>

        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.18 }}
          className="absolute left-0 mt-2 w-48 md:w-56 max-w-full bg-(--color-background-primary) border border-(--color-neutral-cream) rounded-lg shadow-lg overflow-hidden z-20"
        >
          <div className="p-2">
            <nav className="flex flex-col">
              {headings.map((heading: any) => (
                <button
                  key={heading.id}
                  onClick={() => handleHeadingClick(heading.id)}
                  data-active={activeId === heading.id}
                  className={`text-left px-2 py-1.5 rounded text-xs transition-colors hover:bg-(--color-background-secondary) focus:outline-none ${
                    heading.level === 3 ? 'ml-4 text-(--color-neutral-grey)' : 'font-medium text-(--color-accent-wilderness)'
                  } ${activeId === heading.id ? 'bg-(--color-background-secondary) ring-1 ring-(--color-accent-olive)/20' : ''}`}
                >
                  <span className="truncate">{heading.text}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
