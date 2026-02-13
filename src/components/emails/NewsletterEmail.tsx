import React from "react";

interface NewsletterEmailProps {
  email: string;
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
    backgroundColor: "linear-gradient(135deg, #98995a 0%, #a6b6ab 100%)",
    color: "#fff",
    padding: "40px 20px",
    textAlign: "center" as const,
    borderRadius: "8px 8px 0 0",
  },
  headerTitle: {
    margin: "0",
    fontSize: "32px",
    fontWeight: "600",
    color: "#fff",
  },
  headerSubtitle: {
    margin: "8px 0 0 0",
    fontSize: "14px",
    color: "#f5f0e8",
    fontStyle: "italic" as const,
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
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#867d78",
    marginBottom: "18px",
  },
  highlight: {
    color: "#c97451",
    fontWeight: "600",
  },
  benefitsList: {
    backgroundColor: "#f9f4f0",
    padding: "20px",
    borderRadius: "6px",
    marginBottom: "20px",
    borderLeft: "4px solid #98995a",
  },
  benefitItem: {
    margin: "10px 0",
    color: "#867d78",
    fontSize: "14px",
  },
  footer: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "2px solid #eee5e0",
    textAlign: "center" as const,
  },
  footerText: {
    margin: "0",
    fontSize: "14px",
    color: "#867d78",
    lineHeight: "1.8",
  },
  secondaryText: {
    fontSize: "12px",
    color: "#b2a9a1",
    marginTop: "15px",
  },
};

export const NewsletterEmail: React.FC<NewsletterEmailProps> = ({ email }) => {
  return (
    <div style={emailStyles.container}>
      <div style={{ ...emailStyles.header, background: "linear-gradient(135deg, #98995a 0%, #a6b6ab 100%)" }}>
        <h1 style={emailStyles.headerTitle}>🌸 Welcome to Life in Bloom!</h1>
        <p style={emailStyles.headerSubtitle}>Growing beauty, one petal at a time</p>
      </div>
      <div style={emailStyles.content}>
        <p style={emailStyles.greeting}>Hello,</p>
        <p style={emailStyles.paragraph}>
          We&apos;re absolutely thrilled to have you join the <strong style={emailStyles.highlight}>Life in Bloom</strong> community!
          Your subscription means the world to us, and we can&apos;t wait to share our favorite moments with you.
        </p>
        <p style={emailStyles.paragraph}>
          Here&apos;s what you can expect in your inbox:
        </p>
        <div style={emailStyles.benefitsList}>
          <p style={emailStyles.benefitItem}>✨ <strong>New Blog Posts</strong> — Discover fresh insights and stories delivered directly to you</p>
          <p style={emailStyles.benefitItem}>🌿 <strong>Exclusive Content</strong> — Access special articles and reflections just for subscribers</p>
          <p style={emailStyles.benefitItem}>💌 <strong>Personal Updates</strong> — Behind-the-scenes moments and announcements from the team</p>
          <p style={emailStyles.benefitItem}>🎁 <strong>Special Offers</strong> — Be the first to know about special events and exclusive offers</p>
        </div>
        <p style={emailStyles.paragraph}>
          We believe in quality over quantity, so you&apos;ll hear from us regularly—but not too frequently. Every email is crafted
          with care and intention, just like everything we do at Life in Bloom.
        </p>
        <div style={{ textAlign: "center" as const }}>
          <p style={emailStyles.paragraph}>
            <strong style={emailStyles.highlight}>Ready to start the journey?</strong>
            <br />
            Check out our latest posts and join the conversation.
          </p>
        </div>
        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            <strong>Life in Bloom</strong>
            <br />
            Growing beauty, one petal at a time
            <br />
            <span style={emailStyles.secondaryText}>
              Subscribed with: {email}
              <br />
              <em>If you didn&apos;t subscribe or wish to unsubscribe, simply reply to this email.</em>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterEmail;
