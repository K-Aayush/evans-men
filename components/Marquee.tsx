'use client';

import { motion } from 'framer-motion';

const items = [
  'Evans MEN',
  'NEW SEASON',
  'CONTEMPORARY MENSWEAR',
  'DESIGNED IN NEPAL',
  'NOVA MEN',
  'NEW SEASON',
  'CONTEMPORARY MENSWEAR',
  'DESIGNED IN NEPAL',
];

export default function Marquee() {
  return (
    <div className="bg-nova-black py-5 md:py-7 overflow-hidden border-y border-white/5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 mx-8 md:mx-12"
          >
            {item}
            <span className="text-white/20 mx-8 md:mx-12">—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
