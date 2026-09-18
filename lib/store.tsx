"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import type { Product, CartItem, WishlistItem } from "@/types";

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

/**
 * A tiny external store backed by localStorage, designed to be read with
 * useSyncExternalStore. This is the React-recommended way to synchronize
 * component state with something outside React (here, localStorage) --
 * it avoids the "setState inside an effect" cascading-render pattern
 * entirely, and is inherently SSR-safe: getServerSnapshot always returns
 * the fallback, matching what the server rendered.
 */
function createLocalStorageStore<T>(key: string, fallback: T) {
  const listeners = new Set<() => void>();

  // Cache so getSnapshot returns a *stable reference* when the underlying
  // localStorage value hasn't changed. useSyncExternalStore requires this
  // to avoid re-render loops.
  let cachedRaw: string | null = null;
  let cachedValue: T = fallback;
  let initialized = false;

  function readRaw(): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function getSnapshot(): T {
    const raw = readRaw();
    if (!initialized || raw !== cachedRaw) {
      initialized = true;
      cachedRaw = raw;
      try {
        cachedValue = raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        cachedValue = fallback;
      }
    }
    return cachedValue;
  }

  function getServerSnapshot(): T {
    return fallback;
  }

  function subscribe(callback: () => void) {
    listeners.add(callback);
    // Cross-tab updates
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) callback();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      listeners.delete(callback);
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }

  function set(value: T) {
    cachedValue = value;
    cachedRaw = JSON.stringify(value);
    initialized = true;
    try {
      localStorage.setItem(key, cachedRaw);
    } catch {
      // ignore
    }
    // Notify same-tab subscribers (the 'storage' event only fires in
    // *other* tabs, never the tab that made the change).
    listeners.forEach((listener) => listener());
  }

  return { getSnapshot, getServerSnapshot, subscribe, set };
}

const cartStore = createLocalStorageStore<CartItem[]>("evans-cart", []);
const wishlistStore = createLocalStorageStore<WishlistItem[]>(
  "evans-wishlist",
  [],
);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Read cart/wishlist from the localStorage-backed external store.
  // useSyncExternalStore returns `fallback` (via getServerSnapshot) during
  // SSR and the initial client render, then transparently switches to the
  // real persisted value right after -- no effect, no setState-in-effect,
  // no cascading render.
  const cart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const wishlist = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addToCart = useCallback(
    (product: Product, size: string, quantity = 1) => {
      const prev = cartStore.getSnapshot();
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      const next = existing
        ? prev.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...prev, { product, size, quantity }];
      cartStore.set(next);
      setIsCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((productId: string, size: string) => {
    const prev = cartStore.getSnapshot();
    cartStore.set(
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, size);
        return;
      }
      const prev = cartStore.getSnapshot();
      cartStore.set(
        prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => cartStore.set([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    const prev = wishlistStore.getSnapshot();
    const next = prev.some((item) => item.productId === productId)
      ? prev.filter((item) => item.productId !== productId)
      : [...prev, { productId, addedAt: Date.now() }];
    wishlistStore.set(next);
  }, []);

  const isInWishlist = useCallback(
    (productId: string) =>
      wishlist.some((item) => item.productId === productId),
    [wishlist],
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
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

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
