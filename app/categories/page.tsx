import Link from "next/link";
import { baseClient } from "@/lib/sanity";
import { CategoryCard } from "@/components/CategoryCard";
import { Metadata } from "next";
import { Grid, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "All Categories - The Fixer Flow",
  description:
    "Browse all content categories on The Fixer Flow - Expert home improvement solutions organized by topic.",
};

interface Category {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  postCount: number;
}

async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    description,
    slug,
    "postCount": count(*[_type == "post" && references(^._id)])
  }`;
  const categories = await baseClient.fetch<Category[]>(query);
  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm mb-6">
              <Layers className="w-4 h-4" />
              <span>{categories.length} Categories</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Explore by{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Category
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-300 leading-relaxed">
              Find exactly what you need - from kitchen gadgets to smart home
              solutions, we&apos;ve got you covered.
            </p>
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

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-500">
                <Grid className="w-5 h-5" />
                <span className="text-3xl font-bold">{categories.length}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Categories
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-500">
                <Sparkles className="w-5 h-5" />
                <span className="text-3xl font-bold">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0)}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Total Articles
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-500">
                <Layers className="w-5 h-5" />
                <span className="text-3xl font-bold">100+</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Products Reviewed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Find Your Perfect Solution
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Browse our curated categories to discover the best tips, guides, and
            product recommendations.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No categories yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Check back soon for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <CategoryCard
                key={category._id}
                category={category}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              We&apos;re constantly adding new categories and content. Check
              back regularly or browse all our articles.
            </p>

            <Link
              href="/blog"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-lg shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
