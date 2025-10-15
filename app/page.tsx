import Link from "next/link";
import { client } from "@/lib/sanity";
import { PostCard, Post } from "@/components/PostCard";
import { Button } from "@/components/ui/button";

// This function fetches our 3 latest posts
async function getLatestPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        url
      }
    },
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }`;

  const posts = await client.fetch<Post[]>(query);
  return posts;
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-24 bg-gray-50 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Fixer Flow
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Solutions for a smoother home.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/blog">Explore All Posts</Link>
          </Button>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
