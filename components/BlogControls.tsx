"use client";

import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  totalResults: number;
}

export function BlogControls({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
  totalResults,
}: BlogControlsProps) {
  return (
    <section className="container mx-auto px-4 -mt-8 relative z-20">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6">
        {/* Search Input */}
        <div className="relative w-full mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-transparent"
          />
        </div>

        {/* Filters and View Modes */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Sort by:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm font-medium text-slate-700 dark:text-slate-400 bg-transparent"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {totalResults} {totalResults === 1 ? "article" : "articles"} found
          </div>

          <div className="hidden md:flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="border-slate-300 dark:border-slate-700 transition-all duration-300"
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="border-slate-300 dark:border-slate-700 transition-all duration-300"
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
