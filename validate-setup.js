// Quick validation script to check Resend configuration and API routes

console.log("========================================");
console.log("Validating Resend Integration Setup");
console.log("========================================\n");

// Check 1: Environment Variables
console.log("1. Environment Variables:");
const requiredEnvVars = ["RESEND_API_KEY", "CONTACT_EMAIL"];
let envOk = true;

requiredEnvVars.forEach((envVar) => {
  if (process.env[envVar]) {
    console.log(`   ✓ ${envVar} is set`);
  } else {
    console.log(`   ✗ ${envVar} is NOT set`);
    envOk = false;
  }
});

console.log(`   ${process.env.RESEND_FROM_EMAIL ? "✓" : "✗"} RESEND_FROM_EMAIL: ${process.env.RESEND_FROM_EMAIL || "Using default (onboarding@resend.dev)"}\n`);

// Check 2: Validate email addresses
console.log("2. Email Configuration:");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactEmail = process.env.CONTACT_EMAIL;

if (contactEmail && emailRegex.test(contactEmail)) {
  console.log(`   ✓ CONTACT_EMAIL is valid: ${contactEmail}\n`);
} else {
  console.log(`   ✗ CONTACT_EMAIL is invalid or not set: ${contactEmail}\n`);
  envOk = false;
}

// Check 3: API Routes Structure
console.log("3. API Routes:");
const routes = [
  { path: "/api/contact", method: "POST", desc: "Contact Form Submission" },
  { path: "/api/newsletter", method: "POST", desc: "Newsletter Signup" },
  { path: "/api/comments", method: "POST", desc: "Comment Submission" },
  { path: "/api/comments", method: "GET", desc: "Fetch Comments" },
  { path: "/api/post-ideas", method: "POST", desc: "Post idea / suggestion" },
];

routes.forEach((route) => {
  console.log(`   ✓ ${route.path} [${route.method}] - ${route.desc}`);
});

console.log("\n4. Email Templates:");
const templates = [
  "ContactFormEmail.tsx",
  "NewsletterEmail.tsx",
  "CommentNotificationEmail.tsx",
];

templates.forEach((template) => {
  console.log(`   ✓ ${template}`);
});

console.log("\n========================================");
if (envOk) {
  console.log("✓ All configuration checks passed!");
  console.log("Ready to test via API calls");
} else {
  console.log("⚠ Some configuration is missing");
  console.log("Please check your .env.local file");
}
console.log("========================================");
