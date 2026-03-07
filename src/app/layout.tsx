import type { Metadata } from "next";
import "./globals.css";
import GlobalUI from "@/components/GlobalUI";

export const metadata: Metadata = {
  title: "Triet Phan — AI Builder & Developer",
  description: "AI enthusiast, full-stack developer, and educator. Building the future with code and curiosity.",
  keywords: ["Triet Phan", "AI", "developer", "portfolio", "ClawSwarm", "AgentAwake"],
  openGraph: {
    title: "Triet Phan — AI Builder & Developer",
    description: "AI enthusiast, full-stack developer, and educator. Building the future with code and curiosity.",
    type: "website",
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
