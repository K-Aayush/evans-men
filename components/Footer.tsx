"use client";

import { viewportOnce } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const shopLinks = [
  "Shirts",
  "T-Shirts",
  "Trousers",
  "Denim",
  "Jackets",
  "Blazers",
  "Shoes",
];
const brandLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#campaign" },
  { label: "Lookbook", href: "/#lookbook" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer id="about" className="bg-nova-black text-white overflow-hidden bg-[#2f2f2c]">
      {/* Big text */}
      <div className="px-6 md:px-12 pt-20 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-8">
              — See You
            </p>
            <h2 className="text-[18vw] md:text-[14vw] lg:text-[12rem] font-bold tracking-[-0.04em] leading-[0.85] text-white">
              SEE YOU
              <br />
              OUT THERE.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-white/10 px-6 md:px-12 py-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-xl font-bold tracking-[0.2em] mb-4">EVAN</p>
              <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                Contemporary menswear built for everyday movement. Designed in
                Nepal.
              </p>
            </div>

            {/* Shop */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                Shop
              </p>
              <ul className="space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href="/shop"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                Brand
              </p>
              <ul className="space-y-2.5">
                {brandLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4">
                Follow
              </p>
              <div className="flex gap-4 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-nova-black transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-nova-black transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-nova-black transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40 tracking-wider">
              Evan © 2026 — Men&apos;s / 2026
            </p>
            <p className="text-xs text-white/40 tracking-wider">
              Move Different.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
