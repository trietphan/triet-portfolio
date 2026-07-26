import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const BASE = "https://phan.today";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    ...posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
