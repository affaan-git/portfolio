import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Header from "@/components/Header";
import MotionProvider from "@/components/MotionProvider";
import ThemeColorUpdater from "./ThemeColorUpdater"
import site from "@/site.json";

const siteUrl = site.url;

// Mobile address bar
const themeColors = { light: "#f3f4f6", dark: "#121212" };
const siteName = "Affaan Memon | Software Engineer";
const siteDescription = "Portfolio of Affaan Memon - Software Engineer in Austin, TX specializing in Python, Java, AI/ML, cloud, and containerized deployment."

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Affaan Memon",
  url: siteUrl,
  sameAs: ["https://github.com/affaan-git", "https://www.linkedin.com/in/affaanm"],
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "The University of Texas at Austin" },
    { "@type": "CollegeOrUniversity", name: "Western Governors University" },
  ],
  knowsAbout: ["Python", "Java", "SQL", "Machine Learning", "REST APIs", "Docker", "Android"],
};

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
    "AI/ML",
    "Cloud",
    "Docker",
    "AWS",
    "Spring",
    "Android",
    "Austin TX",
    "SQL",
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
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
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
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-light text-ink dark:bg-background-dark dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeColorUpdater light={themeColors.light} dark={themeColors.dark} />
          <MotionProvider>
            <Header />
            <main>{children}</main>
          </MotionProvider>
        </ThemeProvider>
        {/* Handle scripting disabled blank page. */}
        <noscript>
          <style>{`
            [style*="opacity:0"] { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}