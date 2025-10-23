"use client";

import Link from "next/link";
import Image from "next/image"; // Import Image component
import { motion } from "framer-motion";
import { ArrowRight, FileText, Layers } from "lucide-react"; // Import Layers for placeholder
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
  image?: {
    asset: {
      url: string;
    };
  };
}

interface Props {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: Props) {
  // Use a consistent gradient or remove if image provides enough visual interest
  const gradient = "from-amber-500 to-orange-600"; // Example gradient

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="h-full" // Ensure motion div takes full height for consistent card height
    >
      <Link
        href={`/categories/${category?.slug?.current}`}
        className="block group h-full"
      >
        <Card className="h-full flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 bg-white dark:bg-slate-800 relative">
          <div className="relative w-full h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden -mt-6">
            {category.image?.asset?.url ? (
              <Image
                src={category.image.asset.url}
                alt={`${category.title} category`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              // Fallback if no image is uploaded
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <Layers className="w-12 h-12" />
              </div>
            )}
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Content */}
          <CardHeader className="flex-grow p-6 -mt-8 -mb-4">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300 line-clamp-2">
              {category.title}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed pt-2 line-clamp-3">
              {category.description}
            </CardDescription>
          </CardHeader>

          {/* Footer */}
          <CardContent className="pt-0 pb-6 mt-auto -mb-10">
            {/* Ensure footer stays at bottom */}
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
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-300" />
                </motion.div>
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
