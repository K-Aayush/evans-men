"use client";

import { motion } from "framer-motion";
import { lineReveal, imageReveal, viewportOnce } from "@/lib/animations";

const IMG_LEFT =
  "https://images.pexels.com/photos/28640766/pexels-photo-28640766.jpeg?auto=compress&cs=tinysrgb&w=900";
const IMG_RIGHT =
  "https://images.pexels.com/photos/13885989/pexels-photo-13885989.jpeg?auto=compress&cs=tinysrgb&w=900";

export default function StatementSection() {
  return (
    <section className="bg-nova-cream py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={lineReveal}
          className="mb-2"
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-12">
            — Manifesto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Editorial image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={imageReveal}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_LEFT}
                alt="Manifesto — movement in motion"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Center: Typography */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="space-y-2 md:space-y-4">
              {["CLOTHES", "SHOULDN\u2019T", "SHOUT."].map((line, i) => (
                <motion.h2
                  key={line}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.12,
                  }}
                  className="text-[16vw] md:text-[10vw] lg:text-[8rem] font-bold tracking-[-0.04em] leading-[0.9] text-nova-black"
                >
                  {line}
                </motion.h2>
              ))}
            </div>

            <div className="mt-8 md:mt-12">
              {["THEY SHOULD", "MOVE WITH YOU."].map((line, i) => (
                <motion.h2
                  key={line}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4 + i * 0.12,
                  }}
                  className="text-[10vw] md:text-[6vw] lg:text-[5rem] font-bold tracking-[-0.04em] leading-[0.9] text-nova-black/20"
                >
                  {line}
                </motion.h2>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Second editorial image + supporting text */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 max-w-md"
          >
            <p className="text-sm md:text-base text-nova-black/60 leading-relaxed">
              We build garments that move with you — not against you. Every
              seam, every cut, every fabric chosen for one purpose: freedom in
              motion. No noise. No excess. Just clothing that works.
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mt-6">
              — Evan, Spring Summer 2026
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={imageReveal}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_RIGHT}
                alt="Manifesto — freedom in motion"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
