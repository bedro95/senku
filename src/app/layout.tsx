import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// التعديل الجوهري هنا لهوية Senku
export const metadata: Metadata = {
  title: "Senku Protocol | The Lab",
  description: "Decrypting Solana's future with AI-powered Whale Tracking. Welcome to the Lab.",
  openGraph: {
    title: "Senku Protocol",
    description: "AI-Powered Whale Tracking on Solana. Decrypting the secrets of the Lab.",
    url: "https://senku.fun",
    siteName: "Senku Protocol",
    images: [
      {
        url: "/og-image.png", // سيتم البحث عن هذه الصورة في مجلد public
        width: 1200,
        height: 630,
        alt: "Senku Protocol - The Lab",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senku Protocol | The Lab",
    description: "The ultimate tool for Solana Whale movements.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
