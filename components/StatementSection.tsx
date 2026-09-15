'use client';

import { motion } from 'framer-motion';
import { lineReveal } from '@/lib/animations';

export default function StatementSection() {
  return (
    <section className="bg-nova-cream py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={lineReveal}
          className="mb-2"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-12">
            — Manifesto
          </p>
        </motion.div>

        <div className="space-y-2 md:space-y-4">
          {['CLOTHES', 'SHOULDN\u2019T', 'SHOUT.'].map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className="text-[16vw] md:text-[12vw] lg:text-[10rem] font-bold tracking-[-0.04em] leading-[0.9] text-nova-black"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          {['THEY SHOULD', 'MOVE WITH YOU.'].map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.12 }}
              className="text-[12vw] md:text-[8vw] lg:text-[7rem] font-bold tracking-[-0.04em] leading-[0.9] text-nova-black/20"
            >
              {line}
            </motion.h2>
          ))}
        </div>
      </div>
    </section>
  );
}
