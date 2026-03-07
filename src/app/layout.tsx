import type { Metadata } from "next";
import "./globals.css";
import GlobalUI from "@/components/GlobalUI";

export const metadata: Metadata = {
  metadataBase: new URL("https://phan.today"),
  title: "Triet Phan — AI Builder & Developer",
  description: "AI enthusiast, full-stack developer, and educator. Crafting tools that empower, systems that scale, and inspiring the next generation to dream bigger.",
  keywords: ["Triet Phan", "AI", "developer", "portfolio", "ClawSwarm", "AgentAwake"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Triet Phan — AI Builder & Developer",
    description: "AI enthusiast, full-stack developer, and educator. Crafting tools that empower, systems that scale, and inspiring the next generation to dream bigger.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Triet Phan — AI Builder & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triet Phan — AI Builder & Developer",
    description: "AI enthusiast, full-stack developer, and educator.",
    images: ["/og-image.png"],
    creator: "@trietp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}
