'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { imageReveal, fadeUp } from '@/lib/animations';

const lookbookImages = [
  {
    src: 'https://images.pexels.com/photos/15265297/pexels-photo-15265297.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Look 01',
    span: 'md:col-span-4 md:row-span-2',
    aspect: 'aspect-[3/4]',
  },
  {
    src: 'https://images.pexels.com/photos/13080473/pexels-photo-13080473.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Look 02',
    span: 'md:col-span-3',
    aspect: 'aspect-square',
  },
  {
    src: 'https://images.pexels.com/photos/30130736/pexels-photo-30130736.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Look 03',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    src: 'https://images.pexels.com/photos/26903318/pexels-photo-26903318.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Look 04',
    span: 'md:col-span-3',
    aspect: 'aspect-[3/4]',
  },
  {
    src: 'https://images.pexels.com/photos/36771228/pexels-photo-36771228.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Look 05',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    src: 'https://images.pexels.com/photos/32223223/pexels-photo-32223223.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Look 06',
    span: 'md:col-span-4',
    aspect: 'aspect-[3/4]',
  },
];

export default function Lookbook() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="lookbook" className="bg-nova-cream py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 md:mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-nova-black/40 mb-4">
              — Lookbook
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-nova-black">
              Lookbook / 01
            </h2>
          </div>
          <p className="hidden md:block text-sm text-nova-black/50 max-w-xs text-right">
            Spring Summer 2026 — shot on location, styled for movement.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5 auto-rows-auto">
          {lookbookImages.map((img, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={imageReveal}
              className={`col-span-1 ${img.span} group cursor-pointer`}
              onClick={() => setSelected(i)}
            >
              <div className={`relative ${img.aspect} overflow-hidden`}>
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-nova-black/0 group-hover:bg-nova-black/10 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white bg-nova-black/40 px-2 py-1">
                    {img.alt}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-[90vw] md:max-w-200 p-0 bg-nova-black border-none overflow-hidden">
          {selected !== null && (
            <div className="w-full h-[80vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lookbookImages[selected].src}
                alt={lookbookImages[selected].alt}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
