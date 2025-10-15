/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { client } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { ProductCard } from "@/components/ProductCard";
import { Metadata } from "next";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// ✅ DEFINE a specific type for our page props
type Props = {
  params: {
    slug: string;
  };
};

interface Product {
  _id: string;
  productName: string;
  productImage: any;
  affiliateLink: string;
  description: string;
}

interface Post {
  title: string;
  mainImage: { asset: { _id: string; url: string } };
  body: any[];
  products: Product[];
  excerpt: string;
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    mainImage,
    body,
    "products": products[]->{
      _id,
      productName,
      productImage,
      affiliateLink,
      description
    },
    "excerpt": array::join(string::split(pt::text(body), "")[0..155], "") + "..."
  }`;

  const post = await client.fetch<Post>(query);
  return post;
}

// ✅ APPLY the Props type here
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: "Post not found",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

// ✅ APPLY the Props type here
export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <article>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          {post.title}
        </h1>
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
        <div className="prose lg:prose-xl dark:prose-invert max-w-full">
          <PortableText value={post.body} />
        </div>
      </article>

      {post.products && post.products.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 border-t pt-8">
            Products Mentioned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {post.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
