import type { Metadata, Viewport } from "next";
import { Lora, Montserrat } from "next/font/google";
import { SwRegister } from "@/components/corner/sw-register";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spa.mendozer.com"),
  title: "Corner Spa | Massage and beauty in Windhoek",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "https://spa.mendozer.com" },
  description:
    "Massage, hot stone, foot spa, nails, waxing and lashes in Windhoek. The relaxation you deserve. The first project of Oryx Institute.",
  openGraph: {
    title: "Corner Spa | Massage and beauty in Windhoek",
    description:
      "Massage, hot stone, foot spa, nails, waxing and lashes in Windhoek. The relaxation you deserve.",
    url: "https://spa.mendozer.com",
    siteName: "Corner Spa",
    locale: "en_NA",
    type: "website",
    images: [
      {
        url: "/media/hero-wide.jpg",
        width: 1510,
        height: 1041,
        alt: "Smooth wet stones and soft light at Corner Spa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corner Spa | Massage and beauty in Windhoek",
    description: "The relaxation you deserve. Massage, hot stone, foot spa, nails, waxing and lashes in Windhoek.",
    images: ["/media/hero-wide.jpg"],
  },
  icons: {
    icon: [
      { url: "/media/logos/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/media/logos/favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/media/logos/apple-touch-icon-180.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F3EE" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1c1b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${montserrat.variable}`}>
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <span className="brand-bar" aria-hidden="true" />
        <noscript>
          <style>
            {`[data-sc-in], [data-sc-stagger] > * { opacity: 1 !important; transform: none !important; }
              [data-sc-reveal] { clip-path: none !important; }`}
          </style>
        </noscript>
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
