'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BG_IMAGE =
  'https://images.pexels.com/photos/28251205/pexels-photo-28251205.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function FullscreenCampaign() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-nova-black"
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt="The City is Your Runway"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-nova-black/50" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-8"
        >
          New Season / 2026
        </motion.p>

        <div className="space-y-1">
          {['THE CITY', 'IS YOUR', 'RUNWAY.'].map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className="text-[14vw] md:text-[10vw] lg:text-[9rem] font-bold tracking-[-0.04em] leading-[0.9] text-white"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-white"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium border-b border-white/30 group-hover:border-white pb-1 transition-colors">
              Discover the Collection
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
