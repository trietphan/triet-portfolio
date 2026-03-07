import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Triet Phan`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n\n");

  return (
    <div className="min-h-screen" style={{ background: "#0a0a1a", color: "#e0e0f0" }}>
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{ background: "rgba(10,10,26,0.9)", borderColor: "rgba(255,107,43,0.08)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/#blog"
            className="text-sm flex items-center gap-2 transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <Link href="/" className="text-xl font-black">
            <span style={{ color: "#ff6b2b" }}>T</span>
            <span style={{ color: "#ffaa33" }}>P</span>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border"
            style={{
              borderColor: `${post.color}25`,
              color: post.color,
              backgroundColor: `${post.color}10`,
            }}
          >
            {post.tag}
          </span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{post.date}</span>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px" }}>·</span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1
          className="font-black mb-12 leading-tight"
          style={{ fontSize: "clamp(28px, 5vw, 48px)", color: "rgba(255,255,255,0.92)" }}
        >
          {post.title}
        </h1>

        {/* Accent line */}
        <div
          className="w-16 h-0.5 mb-12 rounded-full"
          style={{ background: `linear-gradient(90deg, ${post.color}, transparent)` }}
        />

        {/* Body */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                color: "rgba(255,255,255,0.55)",
                lineHeight: "1.85",
                fontSize: "17px",
                fontWeight: i === 0 ? "400" : "300",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8 flex items-center justify-between border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Link
            href="/#blog"
            className="text-sm font-medium flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: "#ffaa33" }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to all posts
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontFamily: "monospace" }}>
            © {new Date().getFullYear()} Triet Phan
          </span>
        </div>
      </article>
    </div>
  );
}
