import React from "react";

interface CommentNotificationEmailProps {
  author: string;
  message?: string;
  autoApproved?: boolean;
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
    backgroundColor: "#d49d88",
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
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#867d78",
    marginBottom: "18px",
  },
  section: {
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "2px solid #eee5e0",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#98995a",
    marginBottom: "12px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  message: {
    whiteSpace: "pre-wrap" as const,
    backgroundColor: "#f9f4f0",
    padding: "15px",
    borderLeft: "4px solid #d49d88",
    color: "#867d78",
    fontSize: "14px",
    borderRadius: "4px",
    lineHeight: "1.7",
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
  highlight: {
    color: "#c97451",
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: "12px",
    color: "#b2a9a1",
    marginTop: "15px",
  },
};

export const CommentNotificationEmail: React.FC<CommentNotificationEmailProps> = ({ author, message, autoApproved = false }) => {
  return (
    <div style={emailStyles.container}>
      <div style={emailStyles.header}>
        <h1 style={emailStyles.headerTitle}>
          {autoApproved ? "✨ Your Comment is Live!" : "💬 Thank You for Your Comment!"}
        </h1>
      </div>
      <div style={emailStyles.content}>
        <p style={emailStyles.greeting}>Hello {author},</p>
        
        {autoApproved ? (
          <>
            <p style={emailStyles.paragraph}>
              🎉 Great news! Your comment has been <strong style={emailStyles.highlight}>approved and published</strong> on Life in Bloom!
              It's now live for everyone to see and engage with.
            </p>
            <p style={emailStyles.paragraph}>
              Thank you for being part of our community and sharing your thoughts. Your perspective adds so much value to the conversation.
            </p>
          </>
        ) : (
          <>
            <p style={emailStyles.paragraph}>
              We&apos;re so grateful for your thoughtful engagement with the <strong style={emailStyles.highlight}>Life in Bloom</strong> community!
              Your comment adds so much value to the conversation, and we truly appreciate you taking the time to share your thoughts.
            </p>
            <p style={emailStyles.paragraph}>
              Your comment has been received and is being reviewed by our team. Once approved, it will appear on the blog for everyone
              to see. We make sure every comment aligns with our community values before publishing.
            </p>
            <p style={emailStyles.paragraph}>
              <strong style={emailStyles.highlight}>What happens next?</strong> Look for your comment to appear on the blog within 24 hours.
              If you have any other thoughts or questions, feel free to reach out to us directly.
            </p>
          </>
        )}

        {message && (
          <div style={emailStyles.section}>
            <p style={emailStyles.sectionTitle}>Your Comment</p>
            <p style={emailStyles.message}>{message}</p>
          </div>
        )}

        {autoApproved && (
          <p style={emailStyles.paragraph}>
            Keep the conversation going! Feel free to check back on the post to see other comments and engage further with our readers.
          </p>
        )}

        <div style={emailStyles.footer}>
          <p style={emailStyles.footerText}>
            <strong>Life in Bloom</strong>
            <br />
            Growing beauty, one petal at a time
            <br />
            <span style={emailStyles.secondaryText}>
              <em>{autoApproved ? "Your voice matters in our community!" : "We're excited to continue the conversation with you."}</em>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentNotificationEmail;
