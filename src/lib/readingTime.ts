/**
 * Calculate reading time based on word count
 * Average reading speed: 200-250 words per minute
 * Using 225 as standard
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 225;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
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
  let fullText = "";

  if (!Array.isArray(content)) {
    return 1;
  }

  content.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          fullText += child.text + " ";
        }
      });
    }
  });

  return calculateReadingTime(fullText);
}
