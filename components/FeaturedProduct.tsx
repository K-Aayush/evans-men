"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts, formatPrice } from "@/lib/products";
import { imageReveal, fadeUp, staggerChildren } from "@/lib/animations";

export default function FeaturedProduct() {
  const product = getProducts().find((p) => p.slug === "evans-01-sneaker");
  if (!product) return null;

  return (
    <section className="bg-nova-black py-20 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Large product image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => console.log("entered viewport")}
            viewport={{ once: true, amount: 0.2 }}
            variants={imageReveal}
            className="md:col-span-8"
          >
            <div className="relative aspect-square md:aspect-5/4 overflow-hidden group">
              <motion.img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-nova-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="md:col-span-4 flex flex-col justify-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4"
            >
              01 / Footwear
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[0.95] mb-4"
            >
              The Evan 01
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-white/50 mb-2"
            >
              Minimal leather sneaker.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-2xl font-bold text-white mb-8"
            >
              {formatPrice(product.price)}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href={`/product/${product.slug}`}
                className="group inline-flex items-center gap-3 text-white"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium border-b border-white/30 group-hover:border-white pb-1 transition-colors">
                  Shop Now
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
