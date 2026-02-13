import React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  isAdmin?: boolean;
}

const emailStyles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f4f0",
    padding: "40px 20px",
  },
  header: {
    backgroundColor: "#98995a",
    color: "#fff",
    padding: "30px 20px",
    textAlign: "center" as const,
    borderRadius: "8px 8px 0 0",
  },
  headerTitle: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "0 0 8px 8px",
    color: "#867d78",
  },
  greeting: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#c97451",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #eee5e0",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#98995a",
    marginBottom: "12px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  sectionContent: {
    color: "#867d78",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  message: {
    whiteSpace: "pre-wrap" as const,
    backgroundColor: "#f9f4f0",
    padding: "15px",
    borderLeft: "4px solid #c97451",
    color: "#867d78",
    fontSize: "14px",
    borderRadius: "4px",
  },
  footer: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "2px solid #eee5e0",
    color: "#a6b6ab",
    fontSize: "14px",
    textAlign: "center" as const,
  },
  footerText: {
    margin: "0",
    lineHeight: "1.8",
  },
  highlight: {
    color: "#c97451",
    fontWeight: "600",
  },
};

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  subject,
  message,
  isAdmin = false,
}) => {
  if (isAdmin) {
    return (
      <div style={emailStyles.container}>
        <div style={emailStyles.header}>
          <h1 style={emailStyles.headerTitle}>✉️ New Contact Form Submission</h1>
        </div>
        <div style={emailStyles.content}>
          <div style={emailStyles.section}>
            <p style={emailStyles.sectionTitle}>Sender Information</p>
            <p style={emailStyles.sectionContent}>
              <strong style={emailStyles.highlight}>Name:</strong> {name}
              <br />
              <strong style={emailStyles.highlight}>Email:</strong> {email}
            </p>
          </div>
          <div style={emailStyles.section}>
            <p style={emailStyles.sectionTitle}>Subject</p>
            <p style={emailStyles.sectionContent}>{subject}</p>
          </div>
          <div style={emailStyles.section}>
            <p style={emailStyles.sectionTitle}>Message</p>
            <p style={emailStyles.message}>{message}</p>
          </div>
          <div style={emailStyles.footer}>
            <p style={emailStyles.footerText}>
              <em>Reply to this email to contact {name} directly.</em>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.headerTitle}>🌿 We Received Your Message</h1>
      </div>
      <div style={emailStyles.content}>
        <p style={emailStyles.greeting}>Hello {name},</p>
        <p style={emailStyles.sectionContent}>
          Thank you for reaching out to <strong style={emailStyles.highlight}>Life in Bloom</strong>! We truly appreciate
          you taking the time to connect with us. Your message is important to us, and we&apos;ve received it
          successfully.
        </p>
        <p style={emailStyles.sectionContent}>
          Our team will review your inquiry and get back to you within <strong>2-3 business days</strong>. We look forward to continuing
          our conversation with you.
        </p>
        <div style={emailStyles.section}>
          <p style={emailStyles.sectionTitle}>Your Message</p>
          <p style={{ ...emailStyles.sectionContent, marginBottom: "8px" }}>
            <strong style={emailStyles.highlight}>Subject:</strong> {subject}
          </p>
          <p style={emailStyles.message}>{message}</p>
        </div>
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            <strong>Life in Bloom</strong>
            <br />
            Growing beauty, one petal at a time
            <br />
            <em style={{ fontSize: "12px", color: "#b2a9a1" }}>
              © 2026 Life in Bloom. All rights reserved.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactFormEmail;
