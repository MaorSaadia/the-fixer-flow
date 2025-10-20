"use client";

import { useState, useEffect } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
  };
  excerpt: string;
  category?: string;
  publishedAt: string;
}

interface BlogSearchProps {
  posts: Post[];
  onSearchResults: (results: Post[], query: string) => void;
}

export function BlogSearch({ posts, onSearchResults }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Popular searches (customize based on your content)
  const popularSearches = [
    "kitchen gadgets",
    "smart home",
    "organization",
    "cleaning tips",
    "meal prep",
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      onSearchResults(posts, "");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search
    const timeoutId = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();

      const filtered = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const categoryMatch = post.category?.toLowerCase().includes(query);

        return titleMatch || excerptMatch || categoryMatch;
      });

      onSearchResults(filtered, searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, posts, onSearchResults]);

  const handleClear = () => {
    setSearchQuery("");
    onSearchResults(posts, "");
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search articles, topics, or products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isSearching && (
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Popular Searches */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2"
        >
          <TrendingUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Popular:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => handlePopularSearch(term)}
              className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500 rounded-full transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500"
            >
              {term}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Search Results Info Component
interface SearchResultsInfoProps {
  totalResults: number;
  searchQuery: string;
  isSearching: boolean;
}

export function SearchResultsInfo({
  totalResults,
  searchQuery,
  isSearching,
}: SearchResultsInfoProps) {
  if (isSearching) {
    return (
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Searching...</span>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        All Articles{" "}
        <span className="text-slate-500 dark:text-slate-400 font-normal">
          ({totalResults})
        </span>
      </h2>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Search Results
      </h2>
      <p className="text-slate-600 dark:text-slate-400">
        Found{" "}
        <span className="font-semibold text-amber-600 dark:text-amber-500">
          {totalResults}
        </span>{" "}
        {totalResults === 1 ? "article" : "articles"} for{" "}
        <span className="font-semibold text-slate-900 dark:text-white">
          {searchQuery}
        </span>
      </p>
    </div>
  );
}
