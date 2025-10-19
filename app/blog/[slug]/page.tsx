/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

import imageUrlBuilder from "@sanity/image-url";
import { baseClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import {
  TableOfContents,
  MobileTableOfContents,
} from "@/components/TableOfContents";
import {
  SocialShareButtons,
  FloatingSocialShare,
} from "@/components/SocialShareButtons";
import { PortableTextComponents } from "@/components/PortableTextComponents";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const builder = imageUrlBuilder(baseClient);
function urlFor(source: any) {
  return builder.image(source);
}

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

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    mainImage,
    body,
    publishedAt,
    "author": author->{name, image},
    "category": categories[0]->title,
    "readTime": round(length(pt::text(body)) / 250),
    "products": products[]->{
      _id,
      productName,
      productImage,
      affiliateLink,
      description
    },
    "excerpt": array::join(string::split(pt::text(body), "")[0..155], "") + "..."
  }`;

  const post = await baseClient.fetch<Post>(query);
  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Post not found
          </h1>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get current URL for sharing
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Table of Contents - Desktop (Fixed Position) */}
      <TableOfContents />

      {/* Floating Social Share - Desktop (Left Side) */}
      <FloatingSocialShare
        url={currentUrl}
        title={post.title}
        description={post.excerpt}
      />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          asChild
          variant="ghost"
          className="mb-4 text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
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
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-600">
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
          {/* 
          <Button
            variant="outline"
            size="sm"
            className="ml-auto border-slate-300 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button> */}
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
            {/* Gradient Overlay */}
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
        "
        >
          <PortableText value={post.body} components={PortableTextComponents} />
        </div>

        {/* Social Share Section */}
        <div className="mt-16 pt-12 border-t-2 border-slate-200">
          <SocialShareButtons
            url={currentUrl}
            title={post.title}
            description={post.excerpt}
          />
        </div>
      </article>

      {/* Products Section */}
      {post.products?.length > 0 && (
        <section className="bg-gradient-to-br from-slate-50 to-white py-16 mt-12 border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Recommended{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  Products
                </span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Carefully selected products mentioned in this guide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {post.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-sm text-slate-600">
                <strong className="text-slate-900">
                  Affiliate Disclosure:
                </strong>{" "}
                We may earn a commission from purchases made through these links
                at no extra cost to you.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Loved this guide?</h3>
            <p className="text-slate-300 text-lg mb-8">
              Subscribe to get more expert tips delivered to your inbox weekly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-slate-100 ring-2 ring-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 mt-1">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
