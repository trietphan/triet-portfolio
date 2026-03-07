import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import BlogReadingBar from "@/components/BlogReadingBar";

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
      {/* Reading progress bar (client) */}
      <BlogReadingBar color={post.color} />

      {/* Top nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{ background: "rgba(10,10,26,0.92)", borderColor: "rgba(255,107,43,0.08)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/#blog"
            data-hover="true"
            className="text-sm flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </Link>
          <Link href="/" data-hover="true" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="TP" width={32} height={32} style={{ borderRadius: "50%" }} />
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-28 pb-24">
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
          className="font-black mb-10 leading-tight"
          style={{ fontSize: "clamp(26px, 5vw, 44px)", color: "rgba(255,255,255,0.92)" }}
        >
          {post.title}
        </h1>

        {/* Accent line */}
        <div
          className="w-14 h-0.5 mb-10 rounded-full"
          style={{ background: `linear-gradient(90deg, ${post.color}, transparent)` }}
        />

        {/* Body */}
        <div className="space-y-6">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                color: i === 0 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.50)",
                lineHeight: "1.9",
                fontSize: "17px",
                fontWeight: 300,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-white/5" />

        {/* Author card */}
        <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-xl"
            style={{ background: "linear-gradient(135deg, rgba(255,107,43,0.2), rgba(179,71,255,0.15))" }}
          >
            👨‍💻
          </div>
          <div>
            <p className="font-bold text-white/80 text-sm">Triet Phan</p>
            <p className="text-xs text-white/35 mt-0.5">AI enthusiast · Full-stack developer · Educator</p>
          </div>
          <Link
            href="/#contact"
            data-hover="true"
            className="ml-auto px-4 py-2 rounded-full text-xs font-medium border border-[#ff6b2b]/25 text-[#ffaa33] hover:bg-[#ff6b2b]/8 transition-colors duration-200 whitespace-nowrap"
          >
            Get in touch
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between">
          <Link
            href="/#blog"
            data-hover="true"
            className="text-sm font-medium flex items-center gap-2 transition-colors duration-200 hover:opacity-80"
            style={{ color: "#ffaa33" }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All posts
          </Link>
          <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "11px", fontFamily: "monospace" }}>
            © {new Date().getFullYear()} Triet Phan
          </span>
        </div>
      </article>
    </div>
  );
}
