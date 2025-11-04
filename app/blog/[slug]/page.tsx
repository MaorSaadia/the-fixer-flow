/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

import imageUrlBuilder from "@sanity/image-url";
import { baseClient } from "@/sanity/lib/baseClient";
import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "@portabletext/react";
import {
  TableOfContents,
  MobileTableOfContents,
} from "@/components/TableOfContents";
import { PortableTextComponents } from "@/components/PortableTextComponents";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/metadata";
import BlogShareButton, {
  FloatingSocialShare,
} from "@/components/BlogShareButton";

const builder = imageUrlBuilder(baseClient);
function urlFor(source: any) {
  return builder.image(source);
}

// Add revalidation
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
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
  publishedAt: string;
  author: { name: string; image: any };
  category: string;
  readTime: number;
}

// Generate static paths for all blog posts at build time
export async function generateStaticParams() {
  const posts = await baseClient.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post" && defined(slug.current)]{ slug }`
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

async function getPost(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    publishedAt,
    "author": author->{name, image},
    "category": categories[0]->title,
    "readTime": round(length(pt::text(body)) / 730),
    "products": products[]->{
      _id,
      productName,
      productImage,
      affiliateLink,
      description
    },
    "excerpt": array::join(string::split(pt::text(body), "")[0..155], "") + "..."
  }`;

  try {
    const { data } = await sanityFetch({ query, params: { slug } });
    return data as Post | null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post not found - The Fixer Flow",
      description: "This blog post could not be found.",
    };
  }

  const imageUrl = post.mainImage ? builder.image(post.mainImage).url() : "";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://thefixerflow.com";
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${post.title} | The Fixer Flow`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "The Fixer Flow Team"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Post not found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug,
    image: post.mainImage ? builder.image(post.mainImage).url() : "",
    publishedAt: post.publishedAt,
    author: post.author?.name,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://thefixerflow.com";
  const currentUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Table of Contents - Desktop (Fixed Position) */}
      <TableOfContents />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          asChild
          variant="ghost"
          className="mb-4 text-slate-600 dark:text-slate-300 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
        >
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </Button>
      </div>

      <article className="container mx-auto px-4 max-w-5xl pb-20">
        {/* Category Badge */}
        {post.category && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-200">
              {post.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-600 dark:text-slate-200">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500">
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <span className="font-semibold text-slate-900">
                {post.author.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>

          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          )}

          <div className="ml-auto">
            <BlogShareButton
              url={currentUrl}
              title={post.title}
              excerpt={post.excerpt}
              image={imageUrl}
              category={post.category}
            />
          </div>

          <FloatingSocialShare
            url={currentUrl}
            title={post.title}
            excerpt={post.excerpt}
            image={imageUrl}
            category={post.category}
          />
        </div>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="relative w-full h-[400px] md:h-[600px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
          </div>
        )}

        {/* Mobile Table of Contents */}
        <MobileTableOfContents />

        {/* Article Content */}
        <div
          className="prose prose-xl prose-slate max-w-none
          prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
          prose-h1:text-5xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:leading-tight
          prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-l-4 prose-h2:border-amber-500 prose-h2:pl-6 prose-h2:leading-tight
          prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:leading-snug
          prose-h4:text-2xl prose-h4:mt-8 prose-h4:mb-4
          prose-p:text-slate-700 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-8 prose-p:tracking-normal
          prose-a:text-amber-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-amber-700 hover:prose-a:underline prose-a:transition-colors
          prose-strong:text-slate-900 prose-strong:font-bold prose-strong:text-[1.05em]
          prose-em:text-slate-800 prose-em:italic
          prose-ul:my-8 prose-ul:space-y-3
          prose-ol:my-8 prose-ol:space-y-3
          prose-li:text-slate-700 prose-li:text-lg prose-li:leading-[1.8] prose-li:pl-2
          prose-li::marker:text-amber-600 prose-li::marker:font-bold
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-10
          prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:my-10 prose-blockquote:text-lg prose-blockquote:leading-relaxed
          prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-amber-600 prose-code:font-mono prose-code:text-base prose-code:font-medium
          prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:my-8
          first-letter:text-6xl first-letter:font-bold first-letter:text-amber-600 first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9]
          -mb-18
        "
        >
          <PortableText value={post.body} components={PortableTextComponents} />
        </div>
      </article>

      {/* Products Section */}
      {post.products?.length > 0 && (
        <section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 mt-10 border-t border-slate-200 dark:border-slate-700 -mb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Recommended{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  Products
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Carefully selected products mentioned in this guide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mb-2">
              {post.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
