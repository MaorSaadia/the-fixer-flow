"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// This is the structure of the data we expect for a single post
export interface Post {
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
  category?: string;
}

interface Props {
  post: Post;
  index?: number;
  viewMode: string;
}

export function PostCard({ post, index = 0 }: Props) {
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
    >
      <Link href={`/blog/${post.slug.current}`} className="group block">
        <Card className="flex flex-col h-full overflow-hidden border-slate-200 hover:border-amber-500 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 bg-white dark:bg-slate-800 dark:border-slate-700">
          {/* Image Container with Overlay */}
          <div className="relative w-full h-56 overflow-hidden bg-slate-100">
            {post.mainImage?.asset?.url && (
              <>
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>

                {/* Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* "Read More" Badge */}
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Read More
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>

          {/* Card Content */}
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </CardContent>

          {/* Bottom Border Animation */}
          <motion.div
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-600 mt-auto"
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
