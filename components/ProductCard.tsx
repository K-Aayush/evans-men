"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import type { Product } from "@/types";
import { viewportOnce } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const wished = isInWishlist(product.id);


  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-nova-warm/20">
          {/* Primary image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: hovered && product.images[1] ? 0 : 1,
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          {/* Secondary image */}
          {product.images[1] && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.images[1]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Toggle wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                wished ? "fill-nova-black text-nova-black" : "text-nova-black"
              }`}
            />
          </button>

          {/* New badge */}
          {product.isNew && (
            <span className="absolute top-3 left-3 text-[9px] tracking-[0.15em] uppercase font-medium text-white bg-nova-black/60 px-2 py-1">
              New
            </span>
          )}

          {/* Quick Add to Cart button */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full h-10 bg-nova-black text-nova-cream text-[10px] tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 hover:bg-nova-charcoal transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-wider uppercase text-nova-black/40 mb-0.5">
              {product.categoryLabel}
            </p>
            <h3 className="text-sm font-medium text-nova-black truncate">
              {product.name}
            </h3>
            <p className="text-sm text-nova-black/60 mt-0.5">
              {formatPrice(product.price)}
            </p>
          </div>
          <motion.div
            animate={{
              x: hovered ? 4 : 0,
              opacity: hovered ? 1 : 0.3,
            }}
            className="pt-4"
          >
            <ArrowRight className="w-4 h-4 text-nova-black" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
