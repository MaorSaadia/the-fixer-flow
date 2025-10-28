import Link from "next/link";
import { baseClient } from "@/lib/sanity";
import { PostCard, Post } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Wrench, Sparkles, TrendingUp } from "lucide-react";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thefixerflow.com";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover expert improvement tips, product reviews, and practical solutions. From kitchen gadgets to smart home tech, get the best advice for a smoother, more efficient home.",

  openGraph: {
    title: "The Fixer Flow - Expert Improvement Solutions & Reviews",
    description:
      "Discover expert improvement tips, product reviews, and practical solutions for a smoother, more efficient home.",
    url: baseUrl,
    siteName: "The Fixer Flow",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "The Fixer Flow Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Fixer Flow - Expert Improvement Solutions",
    description:
      "Discover expert tips, honest reviews, and practical solutions for your home.",
    images: [`${baseUrl}/opengraph-image.png`],
  },

  alternates: {
    canonical: baseUrl,
  },
};

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

  const posts = await baseClient.fetch<Post[]>(query);
  return posts;
}
export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section - Deep Navy Background with Orange Accents */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Your Trusted Home Improvement Guide</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              The Fixer{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Flow
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Expert solutions and product recommendations for a smoother, more
              efficient home.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-6 text-lg shadow-xl shadow-amber-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105"
              >
                <Link href="/blog">
                  Explore Solutions
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/about">Learn More</Link>
              </Button>
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
              className="fill-slate-50 dark:fill-slate-950"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-3 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Expert Reviews
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              In-depth product analysis and honest recommendations
            </p>
          </div>

          <div className="text-center space-y-3 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Smart Solutions
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Practical fixes that save time and money
            </p>
          </div>

          <div className="text-center space-y-3 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Trending Tips
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Stay updated with the latest home improvement trends
            </p>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 container mx-auto px-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Solutions
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover our newest guides to help you create the perfect home
            environment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-slate-300 text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 font-semibold px-8 transition-all duration-300"
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
