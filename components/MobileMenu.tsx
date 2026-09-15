'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { X } from 'lucide-react';

const menuLinks = [
  { label: 'Shop', href: '/shop', number: '01' },
  { label: 'Collections', href: '/#campaign', number: '02' },
  { label: 'Lookbook', href: '/#lookbook', number: '03' },
  { label: 'About', href: '/#about', number: '04' },
];

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useStore();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-60 bg-nova-black"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="text-xl font-bold tracking-[0.2em] text-white">NOVA</span>
            <button onClick={closeMobileMenu} className="text-white" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 mt-12">
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-baseline gap-4 py-5 border-b border-white/10"
                >
                  <span className="text-xs text-white/40 tracking-wider">{link.number}</span>
                  <span className="text-3xl font-bold text-white tracking-tight">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-6 right-6"
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
              Move Different — Spring Summer 2026
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
