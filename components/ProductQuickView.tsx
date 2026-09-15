'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import type { Product } from '@/types';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-80 bg-black/60 backdrop-blur-sm"
          />
          {/* Keying by product.id remounts this subtree whenever the product
              changes, which resets selectedSize/selectedImage for free —
              no effect needed to "sync" local state with the product prop. */}
          <QuickViewCard key={product.id} product={product} onClose={onClose} />
        </>
      )}
    </AnimatePresence>
  );
}

interface QuickViewCardProps {
  product: Product;
  onClose: () => void;
}

function QuickViewCard({ product, onClose }: QuickViewCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);

  const wished = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-90 w-[92vw] md:w-200 max-h-[88vh] bg-nova-cream overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-nova-black/5 hover:bg-nova-black/10 transition-colors"
        aria-label="Close quick view"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-3/4 md:aspect-auto bg-nova-warm/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedImage === i ? 'bg-nova-black' : 'bg-nova-black/30'
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 md:p-8 flex flex-col">
          <p className="text-[10px] tracking-wider uppercase text-nova-black/40 mb-2">
            {product.categoryLabel}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-nova-black mb-2">
            {product.name}
          </h2>
          <p className="text-lg font-medium text-nova-black/70 mb-1">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm text-nova-black/50 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mt-6">
            <p className="text-[11px] tracking-[0.15em] uppercase text-nova-black/50 mb-3">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-11 h-10 px-3 text-sm border transition-colors ${
                    selectedSize === size
                      ? 'bg-nova-black text-nova-cream border-nova-black'
                      : 'border-nova-black/20 text-nova-black hover:border-nova-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-8 space-y-3">
            <button
              disabled={!selectedSize}
              onClick={() => {
                if (selectedSize) {
                  addToCart(product, selectedSize);
                  onClose();
                }
              }}
              className="w-full h-12 bg-nova-black text-nova-cream text-xs tracking-[0.15em] uppercase font-medium hover:bg-nova-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex-1 h-12 border border-nova-black/20 text-xs tracking-[0.15em] uppercase font-medium hover:border-nova-black transition-colors flex items-center justify-center gap-2"
              >
                <Heart className={`w-4 h-4 ${wished ? 'fill-nova-black' : ''}`} />
                {wished ? 'Saved' : 'Wishlist'}
              </button>
              <a
                href={`/product/${product.slug}`}
                className="flex-1 h-12 border border-nova-black/20 text-xs tracking-[0.15em] uppercase font-medium hover:border-nova-black transition-colors flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}