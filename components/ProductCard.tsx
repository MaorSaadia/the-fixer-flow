"use client";

import Image from "next/image";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import { baseClient } from "@/lib/sanity";

const builder = imageUrlBuilder(baseClient);

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  affiliateLink: string;
  description?: string;
}

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const imageUrl = product.productImage
    ? builder.image(product.productImage).url()
    : "/placeholder-product.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <a
        href={product.affiliateLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="block group"
      >
        <div className="relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 bg-white dark:bg-slate-900">
          {/* Product Image - Full Card Clickable */}
          <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay on Hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shop Now Badge - Appears on Hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                <ShoppingCart className="w-5 h-5" />
                <span>Shop Now</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.div>

            {/* Featured Badge - Top Right */}
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Featured
            </div>
          </div>

          {/* Product Name - Below Image */}
          <div className="p-4 bg-white dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300 line-clamp-2 leading-tight">
              {product.productName}
            </h3>
          </div>

          {/* Bottom Border Animation */}
          <motion.div
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-600"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ originX: 0 }}
          />
        </div>
      </a>
    </motion.div>
  );
}
