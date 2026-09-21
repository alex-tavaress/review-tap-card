// Configuration for Stripe Payment Links
// Replace these URLs with your real Stripe Payment Links created in your Stripe Dashboard.
export const STRIPE_CONFIG = {
  // Option 1: Blank Card (€19.99)
  blankCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_BLANK_URL || "https://buy.stripe.com/00w8wP9UQ6UMgns16laMU00",

  // Option 2: Pre-Programmed Card (€24.99)
  preProgrammedCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_PREPROGRAMMED_URL || "https://buy.stripe.com/bJefZh6IE6UM2wC7uJaMU01",

  // Option 3: Full Google Business Setup & Optimization (€199.99) - Includes 1 Free Pre-Programmed Card
  gbpSetupCheckoutUrl: process.env.NEXT_PUBLIC_STRIPE_GBP_SETUP_URL || "https://buy.stripe.com/6oUeVd3wsfri1sy7uJaMU02",
};
