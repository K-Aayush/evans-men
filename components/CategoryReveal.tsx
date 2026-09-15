'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/products';

export default function CategoryReveal() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-nova-black py-20 md:py-32 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
            — Categories
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-white">
            Shop by Category
          </h2>
        </motion.div>

        <div className="relative">
          {/* Background image reveal */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.25, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute right-0 top-0 w-[40%] h-full pointer-events-none overflow-hidden hidden md:block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={categories[hovered].image}
                  alt={categories[hovered].label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-10">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group block border-b border-white/10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex items-center justify-between py-6 md:py-10 transition-all duration-300"
                  style={{
                    paddingLeft: hovered !== null && hovered !== i ? '2rem' : '0',
                    opacity: hovered !== null && hovered !== i ? 0.3 : 1,
                  }}
                >
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <motion.span
                      animate={{
                        x: hovered === i ? 10 : 0,
                        opacity: hovered === i ? 1 : 0.4,
                      }}
                      className="text-sm md:text-base text-white/40 tracking-wider font-mono"
                    >
                      {cat.number}
                    </motion.span>
                    <motion.span
                      animate={{
                        fontSize: hovered === i ? 'clamp(2.5rem, 6vw, 5rem)' : 'clamp(2rem, 5vw, 4rem)',
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-bold tracking-[-0.03em] text-white uppercase leading-none"
                    >
                      {cat.label}
                    </motion.span>
                  </div>
                  <motion.div
                    animate={{
                      opacity: hovered === i ? 1 : 0,
                      x: hovered === i ? 0 : -20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[11px] tracking-[0.2em] uppercase text-white/60">
                      Shop
                    </span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
