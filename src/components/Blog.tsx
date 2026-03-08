"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/data/posts";

function BlogCard({ post, index }: { post: (typeof posts)[0]; index: number }) {
  
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}>
      <Link href={`/blog/${post.slug}`} data-hover="true" className="block group">
        <div className="p-6 rounded-2xl border border-white/5 group-hover:border-white/12 transition-colors duration-300 h-full flex flex-col" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between mb-4"><span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border" style={{ borderColor: `${post.color}20`, color: post.color, backgroundColor: `${post.color}08` }}>{post.tag}</span><span className="text-xs text-white/20 font-mono">{post.date}</span></div>
          <h3 className="text-lg font-bold text-white/80 group-hover:text-white transition-colors duration-200 mb-3 leading-snug flex-1">{post.title}</h3>
          <p className="text-sm text-white/35 leading-relaxed mb-4">{post.excerpt}</p>
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between"><span className="text-xs text-white/20">{post.readTime}</span><span className="text-xs text-white/25 group-hover:text-[#ffaa33] transition-colors duration-200 flex items-center gap-1">Read →</span></div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Blog() {
  

  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#00fff5]/3 rounded-full blur-[140px]" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-[#b347ff] font-mono text-sm tracking-widest uppercase mb-2">04</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Thoughts & <span className="bg-gradient-to-r from-[#b347ff] to-[#00fff5] bg-clip-text text-transparent">Writing</span></h2>
          <p className="text-white/30 text-lg mb-16 max-w-xl">Lessons from building, teaching, and thinking out loud.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">{posts.map((post, i) => (<BlogCard key={post.slug} post={post} index={i} />))}</div>
      </div>
    </section>
  );
}
