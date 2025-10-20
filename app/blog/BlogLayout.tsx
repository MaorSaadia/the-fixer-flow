"use client";

import { useState, useMemo } from "react";
import { PostCard, Post } from "@/components/PostCard";
import { BlogControls } from "@/components/BlogControls";
import { Button } from "@/components/ui/button";

interface BlogLayoutProps {
  initialPosts: Post[];
}

export function BlogLayout({ initialPosts }: BlogLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // 'latest', 'oldest'
  const [viewMode, setViewMode] = useState("grid"); // 'grid', 'list'

  const filteredAndSortedPosts = useMemo(() => {
    // Filter logic based on search query
    const filtered = initialPosts.filter((post) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const categoryMatch = post.category?.toLowerCase().includes(query);
      return titleMatch || excerptMatch || categoryMatch;
    });

    // Sort logic
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
  }, [initialPosts, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Your beautiful Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm mb-6">
              <span>{initialPosts.length} Expert Guides</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Home Improvement{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Discover practical tips, expert reviews, and product
              recommendations to transform your home.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="fill-slate-50 dark:fill-slate-900"
            />
          </svg>
        </div>
      </section>

      {/* Interactive Controls Section */}
      <BlogControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={filteredAndSortedPosts.length}
      />

      {/* Posts Grid / List */}
      <section className="container mx-auto px-4 py-16">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No posts found for &quot;{searchQuery}&quot;
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try a different search term or clear the search.
            </p>
          </div>
        ) : (
          <div
            className={`transition-all duration-500 ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-8"
            }`}
          >
            {filteredAndSortedPosts.map((post, index) => (
              <PostCard
                key={post._id}
                post={post}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-4">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Get the latest home improvement tips delivered straight to your
              inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
