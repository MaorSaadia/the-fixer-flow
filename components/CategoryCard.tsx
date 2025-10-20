"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Category {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  postCount: number;
}

interface Props {
  category: Category;
  index?: number;
}

// Icon map for different categories (customize based on your categories)
const categoryIcons: Record<string, React.ReactNode> = {
  home: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  kitchen: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  ),
  tech: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  garden: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  ),
  default: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  ),
};

// Get icon based on category title (case insensitive)
function getCategoryIcon(title: string): React.ReactNode {
  const normalizedTitle = title.toLowerCase();
  return categoryIcons[normalizedTitle] || categoryIcons.default;
}

// Generate gradient based on index for variety
function getGradient(index: number): string {
  const gradients = [
    "from-amber-500 to-orange-600",
    "from-orange-500 to-red-600",
    "from-amber-600 to-yellow-500",
    "from-orange-400 to-amber-600",
    "from-yellow-500 to-orange-500",
  ];
  return gradients[index % gradients.length];
}

export function CategoryCard({ category, index = 0 }: Props) {
  const icon = getCategoryIcon(category.title);
  const gradient = getGradient(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
    >
      <Link
        href={`/categories/${category?.slug?.current}`}
        className="block group"
      >
        <Card className="h-full flex flex-col overflow-hidden border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 bg-white dark:bg-slate-800">
          {/* Icon Header */}
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-6 border-b border-slate-200 dark:border-slate-600">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>

            <div
              className={`relative w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300`}
            >
              {icon}
            </div>
          </div>

          {/* Content */}
          <CardHeader className="flex-grow pb-4">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300">
              {category.title}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
              {category.description}
            </CardDescription>
          </CardHeader>

          {/* Footer */}
          <CardContent className="pt-0 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {category.postCount}{" "}
                  {category.postCount === 1 ? "Article" : "Articles"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-semibold group-hover:gap-3 transition-all duration-300">
                <span className="text-sm">Explore</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </CardContent>

          {/* Bottom Border Animation */}
          <motion.div
            className={`h-1 bg-gradient-to-r ${gradient}`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
          />
        </Card>
      </Link>
    </motion.div>
  );
}
