import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PWAInstall from "@/components/PWAInstall";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameZone - Play Free HTML5 Games Online",
  description: "Play thousands of free HTML5 games instantly online. No downloads required! Enjoy puzzle, action, arcade, racing, and more games on any device.",
  keywords: ["html5 games", "free games", "online games", "browser games", "instant play", "no download games"],
  authors: [{ name: "GameZone" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GameZone",
  },
  openGraph: {
    title: "GameZone - Play Free HTML5 Games Online",
    description: "Play thousands of free HTML5 games instantly online. No downloads required!",
    type: "website",
    locale: "en_US",
    siteName: "GameZone",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "GameZone Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GameZone - Play Free HTML5 Games Online",
    description: "Play thousands of free HTML5 games instantly online. No downloads required!",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#764ba2" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-950 text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ServiceWorkerRegistration />
          <PWAInstall />
        </AuthProvider>
      </body>
    </html>
  );
}
