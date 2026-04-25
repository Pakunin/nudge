import type { Metadata } from "next";
import { Geist, Geist_Mono, Just_Another_Hand } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const justAnotherHand = Just_Another_Hand({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-just-hand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nudge",
  description: "Decision & Goal Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${justAnotherHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
