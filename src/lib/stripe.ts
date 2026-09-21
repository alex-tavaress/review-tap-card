// Configuration for Stripe Payment Links
// Replace these URLs with your real Stripe Payment Links created in your Stripe Dashboard.
export const STRIPE_CONFIG = {
  // Option 1: Blank Card (€19.99)
  // In Stripe: Create Product "NFC Google Review Card (Blank)" -> Create Payment Link -> Enable Shipping Address & Phone
  blankCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_BLANK_URL || "https://buy.stripe.com/test_blank_card_placeholder",

  // Option 2: Pre-Programmed Card (€24.99)
  // In Stripe: Create Product "NFC Google Review Card (Pre-Programmed)" -> Enable Custom Field: "Your Google Business Link or Business Name & City"
  preProgrammedCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_PREPROGRAMMED_URL || "https://buy.stripe.com/test_preprogrammed_placeholder",

  // Option 3: Full Google Business Setup & Optimization (€199.99) - Includes 1 Free Pre-Programmed Card
  gbpSetupCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_GBP_SETUP_URL || "https://buy.stripe.com/test_gbp_setup_placeholder",
};
