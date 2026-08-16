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

const title = "Aidan Holton — Software Engineer";
const description =
  "Full-stack developer with hands-on experience in computer vision and applied ML. Browse an interactive terminal or a standard portfolio.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aidanholton.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://aidanholton.dev",
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
