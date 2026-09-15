'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getProducts, formatPrice } from '@/lib/products';

const popularSearches = ['Sneakers', 'Shirts', 'Jackets', 'Trousers', 'New Arrivals'];

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focusing the input is a legitimate effect: it syncs React state
  // (isSearchOpen becoming true) with an external system (the DOM/focus).
  useEffect(() => {
    if (isSearchOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timeout);
    }
  }, [isSearchOpen]);

  // Clearing the query is NOT synced here. Instead it runs once the close
  // animation actually finishes, via AnimatePresence's onExitComplete below.
  // That's a response to an external event (animation end), not a same-render
  // "adjust state because a prop changed" effect.
  const handleExitComplete = () => setQuery('');

  const results = query
    ? getProducts().filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-60 bg-nova-black overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 md:px-12 py-6">
            <span className="text-xl font-bold tracking-[0.2em] text-white">NOVA</span>
            <button onClick={closeSearch} className="text-white" aria-label="Close search">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 md:px-12 mt-16 md:mt-24 max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4">
                Search
              </p>
              <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8">
                What are you
                <br />
                looking for?
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative border-b border-white/20 pb-4"
            >
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full bg-transparent text-xl md:text-2xl text-white placeholder:text-white/30 pl-10 outline-none"
              />
            </motion.div>

            {!query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4">
                  Popular
                </p>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-5 py-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all text-sm tracking-wide"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 space-y-1"
              >
                <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-20 overflow-hidden bg-white/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-[11px] tracking-wider uppercase text-white/40">
                            {product.categoryLabel}
                          </p>
                          <p className="text-lg text-white">{product.name}</p>
                          <p className="text-sm text-white/50">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
                {results.length === 0 && (
                  <p className="text-white/40 py-8 text-center">
                    No products found. Try a different search.
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}