import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TapFive — NFC Google Review Card | Get 3x More 5-Star Reviews",
  description: "Boost your Google Maps ranking with instant NFC tap-to-review cards. Zero app downloads, works with all smartphones, no monthly subscriptions.",
  keywords: ["nfc google review card", "google reviews card", "cartao avaliacoes google nfc", "buy google review card", "tap for review"],
  openGraph: {
    title: "TapFive — NFC Google Review Card",
    description: "Get 3x more 5-star Google reviews in 3 seconds. Instant smartphone tap.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapFive — NFC Google Review Card",
    description: "Get 3x more 5-star Google reviews with a single tap. Zero subscriptions.",
  },
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
      </head>
      <body className="antialiased selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
