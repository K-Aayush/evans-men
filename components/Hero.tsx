"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

const HERO_IMG =
  "https://images.pexels.com/photos/26903333/pexels-photo-26903333.jpeg?auto=compress&cs=tinysrgb&w=1920";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.85]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-nova-black"
    >
      {/* Background image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="w-full h-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMG}
            alt="NOVA Spring Summer 2026"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-nova-black"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 pt-28 md:pt-32 pb-10 md:pb-12"
      >
        {/* Top: Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-start justify-between"
        >
          <div>
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/60">
              Evan / Spring Summer 2026
            </p>
          </div>
          <div className="hidden md:block">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 text-right">
              Men&apos;s / 2026
            </p>
          </div>
        </motion.div>

        {/* Center: Headline */}
        <div className="flex-1 flex items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
              className="text-[18vw] md:text-[14vw] lg:text-[12rem] font-bold text-white leading-[0.85] tracking-[-0.04em]"
            >
              MOVE
              <br />
              DIFFERENT.
            </motion.h1>
          </div>
        </div>

        {/* Bottom: Supporting text + CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="max-w-xs"
          >
            <p className="text-xs md:text-sm text-white/70 leading-relaxed tracking-wide">
              Contemporary menswear
              <br />
              built for everyday movement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Link
              href="/shop"
              className="group flex items-center gap-3 text-white"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase font-medium border-b border-white/30 group-hover:border-white pb-1 transition-colors">
                Shop Collection
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-6 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 [writing-mode:vertical-rl] rotate-180">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3 h-3 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
