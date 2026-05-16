# Resend Integration Setup Guide

## Overview
This project now uses Resend for email delivery. Resend is a modern email service for developers that provides a simple API for sending emails.

## Environment Variables

Add the following variables to your `.env.local` file:

```env
# Resend Configuration
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Contact Form Email
CONTACT_EMAIL=your_email@yourdomain.com
```

## Getting Your Resend API Key

1. Go to [Resend Dashboard](https://resend.com)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the API key and add it to `RESEND_API_KEY` in `.env.local`

## Setting Up From Email

### Option 1: Using Resend Domain (Development)
During development, you can use the default `onboarding@resend.dev` email (already set as fallback).

### Option 2: Using Your Custom Domain (Production)
1. Add your custom domain to Resend
2. Follow Resend's DNS verification steps
3. Set `RESEND_FROM_EMAIL` to an email address using your verified domain
4. Example: `noreply@lifeinbloomblog.com`

## Email Routes Updated

### 1. Contact Form (`/api/contact`)
- **Sends to admin:** New contact form submission notification
- **Sends to user:** Confirmation email
- **Template:** `ContactFormEmail.tsx`
- **Required env variables:** `CONTACT_EMAIL`

### 2. Newsletter (`/api/newsletter`)
- **Sends to subscriber:** Welcome email
- **Template:** `NewsletterEmail.tsx`
- **No additional env variables required**

### 3. Comments (`/api/comments`)
- **Sends to commenter:** Thank you for your comment email
- **Template:** `CommentNotificationEmail.tsx`
- **No additional env variables required**

## File Structure

Email templates are organized in:
```
src/components/emails/
  ├── ContactFormEmail.tsx
  ├── NewsletterEmail.tsx
  └── CommentNotificationEmail.tsx
```

Resend client configuration:
```
src/lib/resend.ts
```

## Testing

You can test the email functionality locally:

1. Set up a Resend account and get your API key
2. Add environment variables to `.env.local`
3. Test the contact form at `/contact`
4. Test the newsletter signup in the component
5. Test comment submission on blog posts

## Removing Nodemailer

If you're completely switching to Resend, you can remove Nodemailer:

```bash
npm uninstall nodemailer @types/nodemailer
```

And remove the SMTP environment variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM_EMAIL`

## Customizing Email Templates

Edit the email component files in `src/components/emails/` to customize:
- Colors and styling
- Email content and messages
- Layout and formatting

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference/emails/send)
- [React Email Documentation](https://react.email/)
