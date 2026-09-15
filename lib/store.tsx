'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { Product, CartItem, WishlistItem } from '@/types';

interface StoreContextValue {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>('evans-cart', [])
  );
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() =>
    loadFromStorage<WishlistItem[]>('evans-wishlist', [])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persist cart to localStorage whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem('evans-cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Persist wishlist to localStorage whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem('evans-wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const addToCart = useCallback(
    (product: Product, size: string, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) => item.product.id === product.id && item.size === size
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, size, quantity }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, size);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.productId === productId)) {
        return prev.filter((item) => item.productId !== productId);
      }
      return [...prev, { productId, addedAt: Date.now() }];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((item) => item.productId === productId),
    [wishlist]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value: StoreContextValue = {
    cart,
    wishlist,
    isCartOpen,
    isSearchOpen,
    isMobileMenuOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    toggleWishlist,
    isInWishlist,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    openSearch: () => setIsSearchOpen(true),
    closeSearch: () => setIsSearchOpen(false),
    openMobileMenu: () => setIsMobileMenuOpen(true),
    closeMobileMenu: () => setIsMobileMenuOpen(false),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}