import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tapfive.store"),
  title: {
    default: "TapFive™ — NFC Google Review Card | Get 3x More 5-Star Reviews",
    template: "%s | TapFive™",
  },
  description:
    "Boost your Google Maps ranking with TapFive™ NFC tap-to-review contactless cards. 1 tap opens your Google 5-star review page instantly. Compatible with iPhone & Android. Zero monthly subscriptions.",
  applicationName: "TapFive",
  authors: [{ name: "TapFive Team", url: "https://tapfive.store" }],
  generator: "Next.js",
  keywords: [
    "NFC Google Review card",
    "cartao google avaliacoes nfc",
    "google reviews card",
    "tap to review card",
    "contactless google review card",
    "get more google reviews",
    "google business profile nfc",
    "tapfive",
    "tapfive card",
    "como conseguir avaliacoes google",
    "comprar cartao nfc google"
  ],
  referrer: "origin-when-cross-origin",
  creator: "TapFive",
  publisher: "TapFive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://tapfive.store",
    languages: {
      "en-US": "https://tapfive.store",
      "pt-PT": "https://tapfive.store",
    },
  },
  openGraph: {
    title: "TapFive™ — NFC Google Review Card | Instant 5-Star Reviews",
    description:
      "Turn in-person customers into 5-star Google reviews with 1 quick contactless tap. Works on all iPhone & Android. Zero app downloads. Zero monthly fees.",
    url: "https://tapfive.store",
    siteName: "TapFive",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 600,
        alt: "TapFive NFC Google Review Contactless Card",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapFive™ — NFC Google Review Card",
    description:
      "Get 3x more 5-star Google reviews with 1 tap. Works natively on iPhone & Android. Zero subscriptions.",
    images: ["/logo.png"],
    creator: "@tapfive",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// High-impact JSON-LD Structured Data Schema for Google Search Rich Snippets
const productSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://tapfive.store/#product",
      name: "TapFive™ NFC Google Review Card",
      image: "https://tapfive.store/logo.png",
      description:
        "Premium matte NFC contactless smart card designed to collect instant 5-star Google reviews on iPhone and Android with zero apps and zero subscriptions.",
      brand: {
        "@type": "Brand",
        name: "TapFive",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Blank Card",
          price: "19.99",
          priceCurrency: "EUR",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: "https://tapfive.store/#pricing",
        },
        {
          "@type": "Offer",
          name: "Pre-Programmed Card",
          price: "24.99",
          priceCurrency: "EUR",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: "https://tapfive.store/#pricing",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "254",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://tapfive.store/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does the card require a battery or charging?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The card uses passive NFC technology powered by induction from the customer's phone during the tap. It will last for years with zero charging.",
          },
        },
        {
          "@type": "Question",
          name: "Does the customer need to install an app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Never. iPhone and all modern Android devices read the chip natively. A prompt pops up instantly directing them straight to your review page.",
          },
        },
        {
          "@type": "Question",
          name: "Which phones are compatible with the card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Virtually all modern smartphones: all iPhones (iPhone XR and newer) and over 95% of Android devices produced in the last 8+ years.",
          },
        },
        {
          "@type": "Question",
          name: "Are there any recurring monthly fees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zero. You pay once for the card and own it forever. There are never any subscriptions or recurring charges.",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://tapfive.store/#organization",
      name: "TapFive",
      url: "https://tapfive.store",
      logo: "https://tapfive.store/logo.png",
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Inject JSON-LD Schema for Google Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
