'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { getNewArrivals } from '@/lib/products';
import { fadeUp, viewportOnce } from '@/lib/animations';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NewArrivals() {
  const products = getNewArrivals();

  return (
    <section className="bg-nova-cream py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-4">
              — New Arrivals
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-nova-black">
              New Arrivals
            </h2>
            <p className="text-sm text-nova-black/50 mt-3 max-w-md">
              New silhouettes. Familiar essentials.
            </p>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-nova-black self-start md:self-auto"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium border-b border-nova-black/30 group-hover:border-nova-black pb-1 transition-colors">
              View All
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
