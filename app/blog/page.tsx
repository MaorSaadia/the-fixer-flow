// app/blog/page.tsx (UPDATED)

import { client } from "@/lib/sanity";
import { PostCard, Post } from "@/components/PostCard"; // Use our reusable component

// This function fetches our data from Sanity
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
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

// The main page component
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
