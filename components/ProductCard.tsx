"use client";

import Image from "next/image";
import { ExternalLink, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

import imageUrlBuilder from "@sanity/image-url";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { baseClient } from "@/lib/sanity";

const builder = imageUrlBuilder(baseClient);

interface Product {
  _id: string;
  productName: string;
  productImage: string;
  affiliateLink: string;
  description: string;
  price?: string;
  rating?: number;
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
      <Card className="h-full flex flex-col overflow-hidden border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 bg-white dark:bg-slate-900 group">
        {/* Product Image */}
        <div className="relative w-full h-64 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.productName}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Quick View Badge */}
          <motion.div
            className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Featured
          </motion.div>

          {/* Rating Stars (if available) */}
          {product.rating && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-bold text-slate-900">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {product.productName}
          </h3>

          {product.price && (
            <div className="mt-2">
              <span className="text-2xl font-bold text-amber-600">
                {product.price}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-grow flex flex-col">
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {product.description}
          </p>

          {/* CTA Buttons */}
          <div className="space-y-2">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 group/btn"
            >
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                View on AliExpress
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
            {/* 
            <p className="text-xs text-center text-slate-500">
              Affiliate link - We may earn a commission
            </p> */}
          </div>
        </CardContent>

        {/* Bottom Border Animation */}
        <motion.div
          className="h-1 bg-gradient-to-r from-amber-500 to-orange-600"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}
