// app/categories/[slug]/page.tsx

import { baseClient } from "@/lib/sanity";
import { PostCard } from "@/components/PostCard";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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
  excerpt: string;
  publishedAt: string;
}

interface Category {
  title: string;
  description: string;
}

async function getCategoryWithPosts(slug: string) {
  const query = `{
    "category": *[_type == "category" && slug.current == "${slug}"][0] {
      title,
      description
    },
    "posts": *[_type == "post" && references(*[_type == "category" && slug.current == "${slug}"]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset->{
          url
        }
      },
      "excerpt": array::join(string::split(pt::text(body), "")[0..150], "") + "..."
    }
  }`;

  const data = await baseClient.fetch<{ category: Category; posts: Post[] }>(
    query
  );
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryWithPosts(slug);

  if (!data.category) {
    return { title: "Category not found" };
  }

  return {
    title: `${data.category.title} - The Fixer Flow`,
    description:
      data.category.description ||
      `Browse all ${data.category.title} articles and guides.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const data = await getCategoryWithPosts(slug);

  if (!data.category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Category not found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            This category doesn&apos;t exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/categories">Back to Categories</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { category, posts } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          asChild
          variant="ghost"
          className="mb-4 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300"
        >
          <Link href="/categories" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden py-16 md:py-20">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm mb-6">
              <FolderOpen className="w-4 h-4" />
              <span>Category</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              {category.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              {category.description}
            </p>

            {/* Stats */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <span className="text-2xl font-bold text-amber-400">
                {posts.length}
              </span>
              <span className="text-slate-300">
                {posts.length === 1 ? "Article" : "Articles"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="rgb(248, 250, 252)"
              className="dark:fill-slate-900"
            />
          </svg>
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No articles yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              We&apos;re working on new content for this category. Check back
              soon!
            </p>
            <Button asChild variant="outline">
              <Link href="/blog">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Latest in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  {category.title}
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Discover our expert guides and product recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-slate-300 text-lg mb-8">
              Get notified when we publish new {category.title.toLowerCase()}{" "}
              guides.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 h-auto shadow-lg shadow-amber-500/20">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
