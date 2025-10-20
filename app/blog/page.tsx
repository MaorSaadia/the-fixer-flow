import { baseClient } from "@/lib/sanity";
import { Post } from "@/components/PostCard"; // We will use the Post interface from PostCard
import { BlogLayout } from "./BlogLayout"; // Our new interactive client component

// This function fetches ALL posts from Sanity, just once
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{
        url
      }
    },
    "category": categories[0]->title,
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }`;

  const posts = await baseClient.fetch<Post[]>(query);
  return posts;
}

export default async function BlogPage() {
  // Fetch the initial data on the server
  const initialPosts = await getPosts();

  // Pass the data to the Client Component which will handle all interactivity
  return <BlogLayout initialPosts={initialPosts} />;
}
