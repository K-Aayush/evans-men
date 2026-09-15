'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import ProductQuickView from '@/components/ProductQuickView';
import { getProductBySlug, formatPrice } from '@/lib/products';
import type { Product } from '@/types';
import { viewportOnce } from '@/lib/animations';

const LOOK_IMAGE =
  'https://images.pexels.com/photos/8505250/pexels-photo-8505250.jpeg?auto=compress&cs=tinysrgb&w=1200';

interface Hotspot {
  id: string;
  slug: string;
  x: number;
  y: number;
}

const hotspots: Hotspot[] = [
  { id: 'h1', slug: 'structured-overshirt', x: 50, y: 30 },
  { id: 'h2', slug: 'relaxed-denim', x: 50, y: 58 },
  { id: 'h3', slug: 'evans-01-sneaker', x: 42, y: 85 },
];

export default function ShopTheLook() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <section className="bg-nova-black py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
            — Interactive
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-white">
            Shop the Look
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Look image with hotspots */}
          <div className="md:col-span-8 relative">
            <div className="relative aspect-4/5 md:aspect-16/11 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOOK_IMAGE}
                alt="Shop the Look"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-nova-black/10" />

              {/* Hotspots */}
              {hotspots.map((spot) => {
                const product = getProductBySlug(spot.slug);
                if (!product) return null;

                return (
                  <div
                    key={spot.id}
                    className="absolute group"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onMouseEnter={() => setHovered(spot.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setQuickView(product)}
                  >
                    {/* Pulse dot */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -inset-3 rounded-full bg-white/20"
                    />
                    <div className="relative w-5 h-5 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
                      <Plus className="w-3 h-3 text-nova-black" />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hovered === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 top-8 z-20 bg-nova-cream px-4 py-3 min-w-[11rem] shadow-xl"
                        >
                          <p className="text-[10px] tracking-wider uppercase text-nova-black/40 mb-1">
                            {product.categoryLabel}
                          </p>
                          <p className="text-sm font-medium text-nova-black">
                            {product.name}
                          </p>
                          <p className="text-sm text-nova-black/60 mt-1">
                            {formatPrice(product.price)}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product list */}
          <div className="md:col-span-4 space-y-1">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-6">
              This Look Features
            </p>
            {hotspots.map((spot) => {
              const product = getProductBySlug(spot.slug);
              if (!product) return null;

              return (
                <motion.button
                  key={spot.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5 }}
                  onClick={() => setQuickView(product)}
                  className="group flex items-center gap-4 py-4 border-b border-white/10 w-full text-left hover:pl-2 transition-all"
                >
                  <div className="w-14 h-16 overflow-hidden bg-white/5 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] tracking-wider uppercase text-white/40">
                      {product.categoryLabel}
                    </p>
                    <p className="text-sm text-white">{product.name}</p>
                    <p className="text-xs text-white/50">{formatPrice(product.price)}</p>
                  </div>
                  <Plus className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  );
}
