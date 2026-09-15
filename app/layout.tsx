import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evan — Move Different",
  description:
    "NOVA Men's / 2026 — Contemporary menswear built for everyday movement.",
  openGraph: {
    title: "Evan — Move Different",
    description:
      "Contemporary menswear built for everyday movement. Spring Summer 2026.",
    images: [
      {
        url: "https://images.pexels.com/photos/26903333/pexels-photo-26903333.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://images.pexels.com/photos/26903333/pexels-photo-26903333.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
