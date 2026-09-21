# NFC Google Review Card Store

A high-converting, single-product e-commerce landing page built with **Next.js 16 (App Router)**, **Tailwind CSS**, and direct **Stripe Checkout integration**.

Zero Shopify fees. Zero monthly hosting costs.

---

## 🚀 Live Local Preview
The development server is running locally:
```bash
http://localhost:3005
```

---

## 🌐 Unregistered & Available Domains (Verified via DNS)
We verified authoritative DNS SOA records:
* **`tapfive.pt`** — Available! Exact match with the `.pt` ccTLD.
* **`tapstarcard.com`** — Available! Clean, international `.com`.
* **`tapaqui.pt`** — Available! Very catchy in Portugal (*"Tap here"*).
* **`revicard.pt`** — Available! Short & professional.
* **`cartaoavaliacoes.com`** — Available! Strong SEO search volume for Portuguese speakers.

---

## 💳 How to Plug Your Stripe Checkout (Zero Fixed Costs)

### Step 1: Create 2 Products in Stripe
1. Go to your **[Stripe Dashboard](https://dashboard.stripe.com)** -> **Product Catalog** -> **Add Product**.
2. **Product 1 (Blank Card):**
   * Name: `NFC Google Review Card (Blank)`
   * Price: `19.99 EUR` (One-time)
3. **Product 2 (Pre-Programmed):**
   * Name: `NFC Google Review Card (Pre-Programmed)`
   * Price: `24.99 EUR` (One-time)

### Step 2: Generate Stripe Payment Links
1. For each product, click **Create Payment Link**.
2. Under **Advanced Options**:
   * Check **"Collect customer's shipping address"** (choose Portugal, Spain, EU, or Worldwide).
   * Check **"Require phone number"** (for shipping couriers).
   * **For the Pre-Programmed product only:**
     * Enable **Custom Fields** -> Add a text field:
     * Label: `Your Google Business Profile Link or Name & City` (Required).
3. Copy the two generated URLs (e.g. `https://buy.stripe.com/...`).

### Step 3: Add Links to Your Code
Edit [src/lib/stripe.ts](file:///home/alexandre-tavares/Documents/review-tap-card/src/lib/stripe.ts) or create a `.env.local` file:
```env
NEXT_PUBLIC_STRIPE_BLANK_URL="https://buy.stripe.com/YOUR_BLANK_LINK"
NEXT_PUBLIC_STRIPE_PREPROGRAMMED_URL="https://buy.stripe.com/YOUR_PREPROGRAMMED_LINK"
```

---

## 📦 Zero-Effort Fulfillment Workflow
1. When an order arrives, Stripe sends an instant notification and logs the shipping address.
2. If **Blank**: Pack 1 card + small setup instructions flyer -> Ship.
3. If **Pre-Programmed**: Read their Google Business link from the Stripe order details, tap the card with your phone using the free **NFC Tools** app (takes 5 seconds), test it, and pack it.

---

## 🚀 Free Hosting on Vercel or Cloudflare Pages
1. Push this folder `review-tap-card` to GitHub.
2. Import it into **[Vercel](https://vercel.com)** (Free Hobby tier).
3. Connect your custom domain. Your site will have SSL, instant global CDN, and 100/100 SEO performance with **0€/month** hosting fees.
