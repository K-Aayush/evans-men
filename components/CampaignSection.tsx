"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { imageReveal, fadeUp, staggerChildren } from "@/lib/animations";

const IMG_LEFT =
  "https://images.pexels.com/photos/15568482/pexels-photo-15568482.jpeg?auto=compress&cs=tinysrgb&w=1200";
const IMG_RIGHT =
  "https://images.pexels.com/photos/17783348/pexels-photo-17783348.jpeg?auto=compress&cs=tinysrgb&w=900";

export default function CampaignSection() {
  return (
    <section
      id="campaign"
      className="bg-nova-cream py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left large image */}
          <div className="md:col-span-7 md:row-span-2">
            {/* The reveal animation lives on this inner div, which has a
                size resolved from its own aspect-ratio + width — unlike the
                outer grid item, whose height depends on implicit row sizing
                from siblings and can be 0-height when the IntersectionObserver
                first attaches, which stops whileInView from ever firing. */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={imageReveal}
              className="relative aspect-3/4 md:aspect-4/5 overflow-hidden"
            >
              <motion.img
                src={IMG_LEFT}
                alt="The Everyday Edit"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </motion.div>
          </div>

          {/* Right text block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildren}
            className="md:col-span-5 md:col-start-9 flex flex-col justify-center md:py-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-6"
            >
              — Campaign / 01
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[0.95] text-nova-black mb-8"
            >
              The Everyday
              <br />
              Edit
            </motion.h2>
            <motion.blockquote
              variants={fadeUp}
              className="text-lg md:text-xl text-nova-black/60 leading-relaxed mb-10 max-w-md"
            >
              &ldquo;Relaxed silhouettes. Precise construction. Nothing
              unnecessary.&rdquo;
            </motion.blockquote>
            <motion.div variants={fadeUp}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 text-nova-black"
              >
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium border-b border-nova-black/30 group-hover:border-nova-black pb-1 transition-colors">
                  Explore the Edit
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right small image */}
          <div className="md:col-span-5 md:col-start-9">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={imageReveal}
              className="relative aspect-4/5 overflow-hidden"
            >
              <motion.img
                src={IMG_RIGHT}
                alt="The Everyday Edit detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}