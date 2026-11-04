import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Corner Spa - Day Spa in Windhoek | Massage, Facials & Couples Rituals",
  description:
    "Windhoek's most transparent spa: published prices in NAD, senior-standard care, supervised training lab of the Oryx Institute. Book online in one tap or chat on WhatsApp.",
  keywords: ["spa Windhoek", "massage Windhoek", "day spa Namibia", "facial Windhoek", "couples massage Windhoek", "Corner Spa"],
  openGraph: {
    title: "Corner Spa - An hour to yourself, in the heart of Windhoek",
    description: "Massage, facials, body rituals and couples escapes in Klein Windhoek. Transparent prices, named therapists, one-tap booking.",
    type: "website",
    locale: "en_NA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
