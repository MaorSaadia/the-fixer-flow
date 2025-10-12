/* eslint-disable @typescript-eslint/no-explicit-any */
// app/blog/[slug]/page.tsx (UPDATED)
import Image from "next/image";
import { client } from "../../../lib/sanity"; // Using relative path
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { ProductCard } from "@/components/ProductCard"; // <-- IMPORT ProductCard

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface Product {
  _id: string;
  productName: string;
  productImage: any;
  affiliateLink: string;
  description: string;
}

interface Post {
  title: string;
  mainImage: {
    asset: { url: string };
  };
  body: any[];
  products: Product[]; // <-- ADD products to interface
}

// This function fetches our specific post AND its products
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
    }
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
        <div className="prose lg:prose-xl dark:prose-invert">
          <PortableText value={post.body} />
        </div>
      </article>

      {/* NEW SECTION FOR PRODUCTS */}
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
