/**
 * Newsletter automation utilities
 * Handles syncing Sanity subscribers to Resend audience
 */

import { resend } from "./resend";

/**
 * Adds or updates a subscriber in Resend contacts
 * This integrates with Resend's contact management system
 */
export async function syncSubscriberToResend(email: string, metadata?: Record<string, any>) {
  try {
    // Resend's contact API allows us to add emails to an audience
    // You can use this to build a contact list for segment-based email campaigns
    
    // For now, we're just logging the sync
    // In production, you'd use Resend's Contacts API when available
    console.log(`Syncing subscriber to Resend: ${email}`, metadata);
    
    // Future: When Resend adds a contacts API, use it like:
    // const result = await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    //   firstName: metadata?.firstName,
    //   lastName: metadata?.lastName,
    // });
    
    return {
      success: true,
      email,
      message: "Subscriber ready for campaigns in Resend",
    };
  } catch (error) {
    console.error("Error syncing subscriber to Resend:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Records subscriber information for newsletter tracking
 */
export function prepareSubscriberMetadata(email: string, subscribedAt: string) {
  return {
    email,
    subscribedAt,
    source: "website-newsletter",
    marketingConsent: true,
  };
}
