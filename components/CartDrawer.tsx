'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
  } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-70 w-full sm:w-110 bg-nova-cream flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-nova-black/10">
              <h2 className="text-sm font-bold tracking-[0.15em] uppercase">
                Your Bag ({cartCount})
              </h2>
              <button onClick={closeCart} aria-label="Close cart">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="w-12 h-12 text-nova-black/20 mb-4" />
                <p className="text-sm text-nova-black/50">Your bag is empty.</p>
                <button
                  onClick={closeCart}
                  className="mt-6 text-xs tracking-[0.15em] uppercase border-b border-nova-black pb-1 hover:opacity-60 transition-opacity"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4"
                  >
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="w-20 h-28 overflow-hidden bg-nova-warm/30 shrink-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-wider uppercase text-nova-black/40">
                          {item.product.categoryLabel}
                        </p>
                        <p className="text-sm font-medium leading-tight">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-nova-black/50 mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-nova-black/15">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-nova-black/5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-nova-black/5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-nova-black/30 hover:text-nova-black self-start"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-nova-black/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nova-black/60">Subtotal</span>
                  <span className="font-bold text-base">{formatPrice(cartSubtotal)}</span>
                </div>
                <p className="text-[11px] text-nova-black/50">
                  {cartSubtotal >= 5000
                    ? 'You qualify for free shipping.'
                    : `Free shipping over Rs. 5,000. Add Rs. ${(5000 - cartSubtotal).toLocaleString('en-IN')} more.`}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={closeCart}
                    className="h-12 border border-nova-black text-xs tracking-[0.15em] uppercase font-medium hover:bg-nova-black hover:text-nova-cream transition-colors"
                  >
                    View Bag
                  </button>
                  <button className="h-12 bg-nova-black text-nova-cream text-xs tracking-[0.15em] uppercase font-medium hover:bg-nova-charcoal transition-colors">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
