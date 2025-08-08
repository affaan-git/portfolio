import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Header from "@/components/Header";

const siteUrl = "https://affaanm.com";
const siteName = "Affaan Memon | Software Engineer";
const siteDescription = "Portfolio of Affaan Memon - Software Engineer specializing in Python, Java, ML, and AI."

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteName,
    template: "%s | Affaan Memon",
  },
  description: siteDescription,

  applicationName: "Affaan Memon Portfolio",
  authors: [{ name: "Affaan Memon" }],
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Python",
    "Java",
    "Machine Learning",
    "ML",
    "AI",
    "Artificial Intelligence",
    "Web Development",
    "TypeScript",
    "React",
    "Next.js",
    "Portfolio",
  ],
  category: "technology",

  // Icons and PWA manifest
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#4a5568"}],
    shortcut: ["/favicon.ico"],
  },
  
  manifest: "/site.webmanifest",

  // Open Graph (used by LinkedIn, etc.)
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Affaan Memon - Software Engineer",
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/images/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Affaan Memon - Software Engineer",
      },
    ],
    locale: "en_US",
  },

  // SEO defaults
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // iOS standalone
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Affaan Memon",
  },

  verification: { me: ["https://github.com/affaan-git"] },

};

// Theme color for light/dark (address bar color on mobile, etc.)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light text-black dark:bg-background-dark dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}