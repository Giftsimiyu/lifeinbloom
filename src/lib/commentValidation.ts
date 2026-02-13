/**
 * Comment Validation and Auto-Approval Logic
 * Defines blog guidelines and returns approval status
 */

interface ApprovalResult {
  shouldApprove: boolean;
  reasons: string[];
}

// Spam patterns and blocked keywords
const SPAM_PATTERNS = [
  /viagra|cialis|pharma|casino|lottery/gi,
  /click here|buy now|free money/gi,
  /http|https|\.com\b/g, // URLs (except in reasonable context)
  /<script|javascript:|onerror|onclick/gi, // HTML/JS injection
];

const BLOCKED_KEYWORDS = [
  "hate",
  "kill",
  "abuse",
  "discrimination",
];

const PROFANITY_LIST: string[] = [
  // Add mild profanity/offensive terms here
  // This is just a basic example
];

/**
 * Scores a comment on likelihood of being spam/low-quality
 * Returns true if comment should be auto-approved
 */
export function shouldAutoApproveComment(
  content: string,
  author: string
): ApprovalResult {
  const reasons: string[] = [];
  let spamScore = 0;

  // Check content length (too short or too long might be spam)
  if (content.trim().length < 10) {
    reasons.push("Comment too short");
    spamScore += 2;
  }

  if (content.trim().length > 500) {
    reasons.push("Comment too long");
    spamScore += 1;
  }

  // Check for repeated characters (spam indicator)
  if (/(.)\1{9,}/.test(content)) {
    reasons.push("Excessive character repetition");
    spamScore += 3;
  }

  // Check for spam patterns
  for (const pattern of SPAM_PATTERNS) {
    const matches = content.match(pattern);
    if (matches && matches.length > 0) {
      reasons.push(`Potential spam detected: ${pattern.source}`);
      spamScore += matches.length * 2;
    }
  }

  // Check for blocked keywords (discriminatory, hateful content)
  for (const keyword of BLOCKED_KEYWORDS) {
    if (content.toLowerCase().includes(keyword)) {
      reasons.push(`Blocked keyword detected: "${keyword}"`);
      spamScore += 5;
    }
  }

  // Check for profanity
  for (const word of PROFANITY_LIST) {
    if (content.toLowerCase().includes(word)) {
      reasons.push("Profanity detected");
      spamScore += 2;
    }
  }

  // Check for mostly uppercase (spam indicator)
  const uppercaseRatio = (content.match(/[A-Z]/g) || []).length / content.length;
  if (uppercaseRatio > 0.5) {
    reasons.push("Excessive uppercase letters");
    spamScore += 1;
  }

  // Check for excessive exclamation marks or question marks
  const exclamationCount = (content.match(/!/g) || []).length;
  const questionCount = (content.match(/\?/g) || []).length;
  if (exclamationCount > 3 || questionCount > 3) {
    reasons.push("Excessive punctuation");
    spamScore += 1;
  }

  // Author name validation
  if (author.length < 2 || author.length > 100) {
    reasons.push("Author name invalid length");
    spamScore += 2;
  }

  // Only numbers in author (suspicious)
  if (/^\d+$/.test(author)) {
    reasons.push("Author name is only numbers");
    spamScore += 3;
  }

  // Decision: Auto-approve if spam score is low
  // Threshold: 0-2 points = likely legitimate
  const shouldApprove = spamScore <= 2;

  return {
    shouldApprove,
    reasons: shouldApprove ? [] : reasons,
  };
}

/**
 * Get a user-friendly message about why comment needs review
 */
export function getApprovalMessage(result: ApprovalResult): string {
  if (result.shouldApprove) {
    return "Your comment has been approved and posted!";
  }

  if (result.reasons.length === 0) {
    return "Your comment is under review and will be published shortly.";
  }

  return `Your comment is under review. Our team will review it within 24 hours. (Flagged for: ${result.reasons.slice(0, 2).join(", ")})`;
}
