"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import SearchOverlay from "@/components/SearchOverlay";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import ProductRail from "@/components/ProductRail";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useStore } from "@/lib/store";
import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
} from "@/lib/products";
import { ShoppingBag, Heart, Star, ChevronLeft } from "lucide-react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [sizeError, setSizeError] = useState(false);

  const wished = isInWishlist(product.id);
  const related = getRelatedProducts(slug, 7);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <>
      <Navbar />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />

      <main className="pt-20 md:pt-24 bg-nova-cream">
        {/* Breadcrumb */}
        <div className="px-6 md:px-12 py-4 max-w-[1600px] mx-auto">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-nova-black/40 hover:text-nova-black transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
            Back to Shop
          </Link>
        </div>

        {/* Product detail */}
        <section className="px-6 md:px-12 py-6 md:py-10">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Image gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-colors shrink-0 ${
                      selectedImage === i
                        ? "border-nova-black"
                        : "border-transparent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-3/4 overflow-hidden bg-nova-warm/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Product info */}
            <div className="md:sticky md:top-28 md:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-3">
                  {product.categoryLabel}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-nova-black leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-nova-black/50 mt-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-nova-black text-nova-black"
                    />
                  ))}
                  <span className="text-xs text-nova-black/40 ml-2">
                    (24 reviews)
                  </span>
                </div>

                {/* Price */}
                <p className="text-2xl md:text-3xl font-bold text-nova-black mt-6">
                  {formatPrice(product.price)}
                </p>

                {/* Colors */}
                <div className="mt-8">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-nova-black/50 mb-3">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 h-10 text-sm border transition-colors ${
                          selectedColor === color
                            ? "bg-nova-black text-nova-cream border-nova-black"
                            : "border-nova-black/20 text-nova-black hover:border-nova-black"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-nova-black/50">
                      Size
                    </p>
                    <button className="text-[11px] tracking-wider uppercase text-nova-black/40 hover:text-nova-black transition-colors underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`min-w-12 h-12 px-3 text-sm border transition-colors ${
                          selectedSize === size
                            ? "bg-nova-black text-nova-cream border-nova-black"
                            : "border-nova-black/20 text-nova-black hover:border-nova-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-xs text-red-600 mt-2">
                      Please select a size.
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full h-[3.25rem] py-4 bg-nova-black text-nova-cream text-xs tracking-[0.15em] uppercase font-medium hover:bg-nova-charcoal transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="h-12 border border-nova-black/20 text-xs tracking-[0.15em] uppercase font-medium hover:border-nova-black transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart
                        className={`w-4 h-4 ${wished ? "fill-nova-black" : ""}`}
                      />
                      {wished ? "Saved" : "Wishlist"}
                    </button>
                    <button className="h-12 border border-nova-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-nova-black hover:text-nova-cream transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Details accordion */}
                <div className="mt-10">
                  <Accordion multiple={false} defaultValue={["details"]}>
                    <AccordionItem value="details">
                      <AccordionTrigger className="text-xs tracking-[0.15em] uppercase font-medium hover:no-underline">
                        Details
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-nova-black/60 leading-relaxed">
                        {product.details}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="material">
                      <AccordionTrigger className="text-xs tracking-[0.15em] uppercase font-medium hover:no-underline">
                        Material
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-nova-black/60 leading-relaxed">
                        {product.material}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="fit">
                      <AccordionTrigger className="text-xs tracking-[0.15em] uppercase font-medium hover:no-underline">
                        Fit
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-nova-black/60 leading-relaxed">
                        {product.fit}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="shipping">
                      <AccordionTrigger className="text-xs tracking-[0.15em] uppercase font-medium hover:no-underline">
                        Shipping & Returns
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-nova-black/60 leading-relaxed">
                        Free shipping on orders over Rs. 5,000. Returns accepted
                        within 30 days. Items must be unworn with original tags.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* You may also like */}
        <div className="mt-16 md:mt-24">
          <ProductRail title="You May Also Like" products={related} />
        </div>

        {/* Mobile sticky add to bag */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-nova-cream border-t border-nova-black/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-wider uppercase text-nova-black/40">
                {product.name}
              </p>
              <p className="text-sm font-bold">{formatPrice(product.price)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-nova-black text-nova-cream text-xs tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
