import type { Metadata } from "next";
import "./globals.css";
import GlobalUI from "@/components/GlobalUI";

export const metadata: Metadata = {
  metadataBase: new URL("https://phan.today"),
  title: "Triet Phan · Founder of aifutures.dev",
  description:
    "I run aifutures.dev, an independent product lab. We build AI Futures Trader, AIFlow and Agent Control Center. Machine speed, human judgment, provable evidence.",
  keywords: ["Triet Phan", "aifutures.dev", "AI Futures Trader", "AIFlow", "Agent Control Center", "AI agents", "multi-agent systems", "developer", "portfolio"],
  // Icons come from the app/ file conventions (icon.svg, apple-icon.png,
  // favicon.ico). Declaring them here as well would override those.
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Triet Phan · Founder of aifutures.dev",
    description: "An independent product lab building AI Futures Trader, AIFlow and Agent Control Center.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Triet Phan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triet Phan · Founder of aifutures.dev",
    description: "An independent product lab building AI Futures Trader, AIFlow and Agent Control Center.",
    images: ["/og-image.png"],
    creator: "@trietp",
  },
};

export const viewport = {
  themeColor: "#0a0a1a",
  colorScheme: "dark" as const,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Triet Phan",
  url: "https://phan.today",
  image: "https://phan.today/logo.png",
  jobTitle: "Founder & Principal Builder",
  description:
    "Founder of aifutures.dev, an independent product lab building AI Futures Trader, AIFlow and Agent Control Center.",
  worksFor: { "@type": "Organization", name: "aifutures.dev", url: "https://aifutures.dev" },
  address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "California State University, Fullerton" },
    { "@type": "CollegeOrUniversity", name: "Illinois Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "Wilbur Wright College" },
  ],
  knowsAbout: ["AI Agents", "Multi-Agent Systems", "Full-Stack Development", "TypeScript", "Next.js", "LLM Integration"],
  sameAs: [
    "https://github.com/trietphan",
    "https://www.linkedin.com/in/trietphan",
    "https://x.com/trietp",
    "https://aifutures.dev",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        {/*
          Runs before first paint so client-side return visits can skip the
          intro without flashing the loader. A real browser refresh deliberately
          replays the full animation.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var n=performance.getEntriesByType('navigation')[0];if(sessionStorage.getItem('intro-played')&&(!n||n.type!=='reload'||location.pathname!=='/'))document.documentElement.dataset.intro='skip'}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}
