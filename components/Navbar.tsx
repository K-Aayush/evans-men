"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useStore } from "@/lib/store";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#campaign" },
  { label: "Lookbook", href: "/#lookbook" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const { openSearch, openCart, openMobileMenu, cartCount } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  // On non-home pages, the navbar should always be solid.
  // On the home page, it starts transparent and becomes solid on scroll.
  const isSolid = !isHome || scrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={{
          paddingTop: isSolid ? 10 : 24,
          paddingBottom: isSolid ? 10 : 24,
          backgroundColor: isSolid ? "rgba(10,10,10,0.85)" : "rgba(0,0,0,0)",
          backdropFilter: isSolid ? "blur(12px)" : "blur(0px)",
          borderBottomWidth: isSolid ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          borderColor: isSolid ? "rgba(255,255,255,0.08)" : "transparent",
        }}
        className="px-4 md:px-8"
      >
        <nav className="mx-auto max-w-[1600px] flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="group">
            <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white">
              Evan
            </span>
          </Link>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-[11px] font-medium tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-5 md:gap-6">
            <button
              onClick={openSearch}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button
              className="hidden md:block text-white/80 hover:text-white transition-colors"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={openCart}
              className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="text-[11px] font-medium tracking-wider">
                ({cartCount})
              </span>
            </button>
            <button
              onClick={openMobileMenu}
              className="md:hidden text-white/80 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
}
