import type { Metadata } from "next";
import "./globals.css";
import GlobalUI from "@/components/GlobalUI";

export const metadata: Metadata = {
  metadataBase: new URL("https://phan.today"),
  title: "Triet Phan — Founder, aifutures.dev · AI Builder",
  description: "Founder of aifutures.dev — an AI product studio shipping ClawSwarm, AgentAwake, and the Agent Memory Playbook. Full-stack developer and educator crafting tools that empower.",
  keywords: ["Triet Phan", "aifutures.dev", "AI", "developer", "portfolio", "ClawSwarm", "AgentAwake", "AI agents", "multi-agent systems"],
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }], apple: "/favicon.png" },
  openGraph: {
    title: "Triet Phan — Founder, aifutures.dev · AI Builder",
    description: "AI product studio shipping ClawSwarm, AgentAwake & the Agent Memory Playbook.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Triet Phan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triet Phan — Founder, aifutures.dev · AI Builder",
    description: "AI product studio shipping ClawSwarm, AgentAwake & the Agent Memory Playbook.",
    images: ["/og-image.png"],
    creator: "@trietp",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Triet Phan",
  url: "https://phan.today",
  image: "https://phan.today/logo.png",
  jobTitle: "Founder & Principal Builder",
  description:
    "Founder of aifutures.dev, an AI product studio shipping ClawSwarm, AgentAwake, and the Agent Memory Playbook.",
  worksFor: { "@type": "Organization", name: "aifutures.dev", url: "https://aifutures.dev" },
  address: { "@type": "PostalPlace", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" },
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
