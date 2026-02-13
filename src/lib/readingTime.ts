/**
 * Calculate reading time based on word count
 * Average reading speed: 200-250 words per minute
 * Using 225 as standard
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;

  const trimmed = (text || "").trim();
  if (!trimmed) return 1;

  // Use Intl.Segmenter when available for more accurate, Unicode-aware word segmentation.
  let wordCount = 0;
  try {
    if (typeof Intl === "object" && "Segmenter" in Intl) {
      // @ts-ignore - Segmenter types may not exist in older TS libs
      const segmenter = new Intl.Segmenter(undefined as any, { granularity: "word" });
      // segmenter.segment returns an iterable of { segment, breakType }
      // Count segments that contain at least one letter or number
      for (const seg of (segmenter as any).segment(trimmed)) {
        if (typeof seg.segment === "string" && /[\p{L}\p{N}]/u.test(seg.segment)) {
          wordCount++;
        }
      }
    } else {
      // Fallback: use a Unicode-aware regex to match words (letters or numbers)
      const matches = trimmed.match(/[\p{L}\p{N}]+/gu);
      wordCount = matches ? matches.length : 0;
    }
  } catch (e) {
    // If anything goes wrong, fall back to simple whitespace split
    wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  }

  // Round to nearest minute (conservative but not always up); ensure at least 1
  const readingTime = Math.max(1, Math.round(wordCount / wordsPerMinute));
  return readingTime;
}

/**
 * Format reading time for display
 * Returns "1 min read" or "5 mins read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min${minutes === 1 ? "" : "s"} read`;
}

/**
 * Calculate reading time from PortableText content
 * Extracts text from all blocks
 */
export function calculateReadingTimeFromPortableText(
  content: Array<any>
): number {
  // Recursively walk Portable Text and extract visible text from common fields.
  function extractText(node: any): string {
    if (!node && node !== "") return "";

    if (typeof node === "string") return node + " ";

    if (Array.isArray(node)) {
      return node.map(extractText).join(" ");
    }

    if (typeof node === "object") {
      let out = "";

      // Common fields that may contain visible text
      const textFields = ["text", "children", "caption", "alt", "title", "body"];

      // If it's a normal block with children (Portable Text block type)
      if (node._type === "block" && Array.isArray(node.children)) {
        node.children.forEach((child: any) => {
          if (child && typeof child.text === "string") out += child.text + " ";
        });
      }

      // For image or other object types, include caption/alt/title
      for (const key of textFields) {
        if (key in node) {
          out += extractText((node as any)[key]);
        }
      }

      // Also traverse any nested object fields
      for (const k of Object.keys(node)) {
        if (!textFields.includes(k) && k !== "_type" && k !== "_key") {
          out += extractText((node as any)[k]);
        }
      }

      return out;
    }

    return "";
  }

  if (!Array.isArray(content)) return 1;

  const fullText = extractText(content);
  return calculateReadingTime(fullText);
}
