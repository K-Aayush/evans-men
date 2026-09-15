'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import MobileMenu from '@/components/MobileMenu';
import SearchOverlay from '@/components/SearchOverlay';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, categories } from '@/lib/products';
import { fadeUp } from '@/lib/animations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Category } from '@/types';

const filterCategories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  ...categories.map((c) => ({ id: c.id, label: c.label })),
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const products = useMemo(() => {
    let filtered = getProducts();
    if (activeCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].sort((a, b) =>
          (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        );
        break;
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      default:
        filtered = [...filtered].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
    return filtered;
  }, [activeCategory, sortBy]);

  return (
    <>
      <Navbar />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />

      <main className="pt-20 md:pt-24">
        {/* Header */}
        <section className="bg-nova-cream px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-4">
                — Shop
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] text-nova-black leading-[0.95]">
                Shop All
              </h1>
              <p className="text-sm text-nova-black/50 mt-4 max-w-md">
                Everything from NOVA.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="sticky top-16 md:top-20 z-30 bg-nova-cream/90 backdrop-blur-md border-y border-nova-black/10 px-6 md:px-12 py-4">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
            {/* Desktop filters */}
            <div className="hidden md:flex items-center gap-1 flex-wrap">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-nova-black text-nova-cream'
                      : 'text-nova-black/50 hover:text-nova-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-medium text-nova-black"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] tracking-wider uppercase text-nova-black/40">
                Sort
              </span>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  if (value) setSortBy(value);
                }}
              >
                <SelectTrigger className="w-40 h-9 text-xs border-nova-black/20 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="bg-nova-cream px-6 md:px-12 py-10 md:py-14">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-xs text-nova-black/40 mb-6">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile filter sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-80 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-nova-cream p-6 max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase">Filter</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setMobileFiltersOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm tracking-wide border transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-nova-black text-nova-cream border-nova-black'
                      : 'border-nova-black/15 text-nova-black/70'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}