import Link from "next/link";
import Image from "next/image";
import { client } from "../lib/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the structure of a Post
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  excerpt: string; // We'll add this to Sanity later
}

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
    publishedAt,
    "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
  }`;

  const posts = await client.fetch<Post[]>(query);
  return posts;
}

// The main page component
export default async function BlogPage() {
  const posts = await getPosts();
  console.log("Posts received from Sanity:", posts); // <-- ADD THIS LINE

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug.current}`} key={post._id}>
            <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-48">
                {post.mainImage?.asset?.url && (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
