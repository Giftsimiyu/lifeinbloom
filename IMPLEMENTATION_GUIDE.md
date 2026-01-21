# Contact Form & Search Implementation - Setup Guide

## ✅ Completed Implementation

### 1. Search Functionality Backend

**File:** `src/app/search/page.tsx`

- ✅ Implemented GROQ query in `src/sanity/lib/sanity.ts`
- ✅ Search function: `searchPosts(query: string)`
- ✅ Uses GROQ `match` operator for text search across title, excerpt, and content
- ✅ Results sorted by `publishedAt` (newest first)
- ✅ Displays search results in responsive grid with post cards
- ✅ Shows result count and "no results" messaging with helpful CTAs
- ✅ Query is URL parameter based (`?q=searchterm`)

### 2. Contact Form Submission

**Files:**

- `src/app/api/contact/route.ts` - API endpoint
- `src/app/components/contactForm.tsx` - Form component
- `src/app/contact/page.tsx` - Updated page to use form component

**Features:**

- ✅ Full form validation (name, email format, subject, message)
- ✅ POST API route at `/api/contact`
- ✅ Email notification system to site owner
- ✅ Automatic confirmation email to user
- ✅ Success/error messaging with inline validation
- ✅ Loading state during submission
- ✅ Form reset after successful submission
- ✅ Error dismissal on user input

---

## 📋 Environment Configuration Required

### Required Environment Variables (add to `.env.local`)

For the contact form email functionality to work, configure your email service:

```
# SMTP Configuration
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-app-password
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@lifeinbloom.com

# Contact Email (where admin receives submissions)
CONTACT_EMAIL=hello@lifeinbloom.com
```

### Email Service Options

#### 1. **Gmail (Recommended for testing)**

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_SECURE=false
SMTP_FROM_EMAIL=your-email@gmail.com
```

**Setup:**

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the generated 16-character password as `SMTP_PASSWORD`

#### 2. **SendGrid**

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.your-sendgrid-api-key
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@lifeinbloom.com
```

#### 3. **Mailgun**

```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@yourdomain.mailgun.org
SMTP_PASSWORD=your-mailgun-password
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@lifeinbloom.com
```

#### 4. **Amazon SES**

```
SMTP_HOST=email-smtp.your-region.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-username
SMTP_PASSWORD=your-ses-password
SMTP_SECURE=false
SMTP_FROM_EMAIL=noreply@lifeinbloom.com
```

---

## 🔧 Installation Requirements

### Install nodemailer dependency:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## 🧪 Testing the Implementation

### Search Functionality

1. Navigate to `/search?q=test` in your browser
2. View search results in grid format
3. Test with various query terms
4. Verify "no results" state when no matches found

### Contact Form

1. Navigate to `/contact`
2. Try submitting with missing fields (validation errors)
3. Submit valid form with valid SMTP credentials configured
4. Check email inbox for:
   - Admin notification with full submission details
   - Confirmation email to user
5. Verify success message displays on form

---

## 📝 Notes

- **Search Query**: Uses GROQ's `match` operator which performs full-text search (case-insensitive)
- **Email Security**: Store SMTP credentials securely in `.env.local` (never commit to git)
- **Email Sending**: Uses `nodemailer` with SMTP - ensure firewall allows SMTP port (587 or 465)
- **Form Reset**: Automatically clears after successful submission
- **User Feedback**: Success message auto-hides after 5 seconds
- **Error Handling**: Graceful error messages for network failures

---

## 🚀 Deployment Checklist

- [ ] Install `nodemailer` and types
- [ ] Configure SMTP environment variables
- [ ] Test contact form with test email
- [ ] Test search functionality with various queries
- [ ] Verify email delivery to admin and user
- [ ] Test form validation with invalid inputs
- [ ] Deploy to production with environment variables
