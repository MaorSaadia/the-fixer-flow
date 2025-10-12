/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { client } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface Post {
  title: string;
  mainImage: {
    asset: object;
  };
  body: any[]; // The body is an array of blocks
}

// This function fetches our specific post
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    mainImage,
    body
  }`;

  const post = await client.fetch<Post>(query);
  return post;
}

// The main page component
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <article className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>

      {post.mainImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      <div className="prose lg:prose-xl dark:prose-invert">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
