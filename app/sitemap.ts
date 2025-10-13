import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

interface Post {
  slug: {
    current: string;
  };
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.yourdomain.com"; // IMPORTANT: Replace with your actual domain later

  // Fetch all post slugs
  const query = `*[_type == "post"]{
    "slug": slug.current,
    _updatedAt
  }`;
  const posts: Post[] = await client.fetch(query);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postUrls,
  ];
}
