"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types";
import { viewportOnce } from "@/lib/animations";

interface ProductRailProps {
  title?: string;
  products?: Product[];
}

export default function ProductRail({
  title = "The New Drop",
  products,
}: ProductRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const items = products || getProducts().slice(0, 7);

  const scroll = (dir: "left" | "right") => {
    if (!railRef.current) return;
    const amount = railRef.current.clientWidth * 0.7;
    railRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-nova-cream py-20 md:py-28 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-nova-black"
          >
            {title}
          </motion.h2>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 border border-nova-black/20 flex items-center justify-center hover:bg-nova-black hover:text-nova-cream transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 border border-nova-black/20 flex items-center justify-center hover:bg-nova-black hover:text-nova-cream transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x-mandatory px-6 md:px-12 pb-4"
      >
        {items.map((product, i) => (
          <div
            key={product.id}
            className="snap-start shrink-0 w-[80vw] sm:w-[45vw] md:w-[calc(33.333vw-2rem)] lg:w-[calc(25vw-2.25rem)] xl:w-[calc(20vw-2.4rem)]"
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
