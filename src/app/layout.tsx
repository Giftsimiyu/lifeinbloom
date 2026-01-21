import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const monicaGarden = localFont({
  src: "./fonts/monicaGarden.otf",
  variable: "--font-monica-garden",
  display: "swap",
});

const mayfestRegular = localFont({
  src: "./fonts/mayfestRegular.ttf",
  variable: "--font-mayfest-regular",
  display: "swap",
});

const theMunday = localFont({
  src: "./fonts/theMunday.ttf",
  variable: "--font-the-munday",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Life in Bloom",
    template: "%s | Life in Bloom",
  },
  description:
    "Life in Bloom is a lifestyle blog exploring soft living, fashion, beauty, home design, and personal growth.",
  openGraph: {
    title: "Life in Bloom",
    description:
      "A cozy, bohemian lifestyle blog about soft living, fashion, beauty, home, and personal stories.",
    url: "https://lifeinbloom.com",
    siteName: "Life in Bloom",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Life in Bloom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life in Bloom",
    description:
      "A cozy, bohemian lifestyle blog about soft living, fashion, beauty, home, and personal stories.",
    images: ["/og-image.jpg"],
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
        className={`${inter.variable} ${monicaGarden.variable} ${mayfestRegular.variable} ${theMunday.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
