// app/sitemap.ts

import { MetadataRoute } from "next";
import { baseClient } from "@/lib/sanity";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thefixerflow.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all posts
  const posts = await baseClient.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      _updatedAt,
      publishedAt
    }
  `);

  // Fetch all categories
  const categories = await baseClient.fetch(`
    *[_type == "category"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclosure`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  // Blog post pages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postPages = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Category pages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryPages = categories.map((category: any) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}
