"use client";

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

import shirt from "../../public/advertisement/shirt.jpg";
import girl from "../../public/advertisement/blueFrock.jpg";

// ─── LOCAL FONTS CONFIGURATION (Perfect for Vercel) ───
const marrie = localFont({
  src: '../../Fonts/Merienda-VariableFont_wght.ttf', 
  weight: '100 900', // Variable font ke liye weight range config deployment failure rokta hai
  style: 'normal',
  variable: '--font-marrie'
});

export default function Advertisement() {
  return (
    // Pura component generic wrap inline parent dynamic link 'marrie' variable wrapper ke sath running hai
    <div className={`${marrie.variable} font-sans`}>
      
      {/* ─── REALISTIC EDITORIAL TITLE SECTION ─── */}
      <div className="text-center pt-6 pb-6 bg-white select-none">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#d60f36] font-semibold block mb-2 font-[family-name:var(--font-marrie)]">
          Don't Miss Out
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 uppercase font-[family-name:var(--font-marrie)]">
          Trending <span className="text-[#d60f36]">Now</span>
        </h2>
      </div>

      {/* ─── MATTE LUXURY BACKGROUND CANVAS ─── */}
      <section className="relative w-full h-auto bg-gradient-to-b from-[#b80c2e] to-[#730217] text-white flex items-center justify-center overflow-hidden py-10 md:py-16 px-4 md:px-8">
        
        {/* ─── WIDESCREEN GRID CONTAINER ─── */}
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative z-10">
          
          {/* 📸 LEFT COLUMN: EDITORIAL HERO CAMPAIGN */}
          <div className="w-full flex items-center justify-center">
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full aspect-[4/5] md:h-full rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 bg-stone-950 group cursor-pointer"
            >
              <Image 
                src={girl} 
                alt="Summer Sale Premium Look" 
                fill 
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover object-top transition-transform duration-[800ms] ease-out group-hover:scale-105" 
                priority 
              />
              
              {/* Natural Campaign Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* OVERLAY LAYOUT CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-left select-none z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mb-1 font-[family-name:var(--font-marrie)]">
                  Limited Edition
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-2 font-[family-name:var(--font-marrie)]">
                  Summer <br />
                  <span className="uppercase text-white">Sale</span>
                </h3>
                <p className="text-lg md:text-xl uppercase tracking-widest text-[#ffdfdf] mt-1 font-[family-name:var(--font-marrie)] font-black">
                  Up To 50% Off
                </p>
                
                {/* Clean Inverting Button Bar */}
                <div className="mt-6 inline-flex items-center justify-center bg-white text-stone-950 font-bold text-xs uppercase tracking-widest px-8 py-3.5 shadow-md transition-all duration-300 group-hover:bg-[#d60f36] group-hover:text-white w-fit font-[family-name:var(--font-marrie)]">
                  Buy Now
                </div>
              </div>
            </motion.div>
          </div>

          {/* ⚡ RIGHT COLUMN: MEDIA CARDS */}
          <div className="w-full flex flex-col justify-start gap-6">
            
            {/* 🎥 TOP SLOT: TEASER VIDEO MODULE */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full relative rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 aspect-video bg-stone-950 group"
            >
              <video 
                src="/advertisement/vid.mp4" 
                className="w-full h-full object-cover block"
                autoPlay    
                muted      
                loop        
                playsInline 
                controls 
                preload="none"
              />

              {/* Interactive Fade-out Shield Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/5 pointer-events-none transition-opacity duration-400 group-hover:opacity-0" />

              {/* Text Module Group */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none select-none z-10 transition-all duration-400 group-hover:opacity-0 group-hover:translate-y-1">
                <div className="self-start bg-[#d60f36] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded font-[family-name:var(--font-marrie)]">
                  Teaser Drop
                </div>

                <div className="text-left space-y-0.5">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider block font-[family-name:var(--font-marrie)]">
                    CHICOW New Edits
                  </span>
                  <h4 className="text-xl font-bold uppercase tracking-tight text-white leading-tight font-[family-name:var(--font-marrie)]">
                    Coming Soon <br />
                    <span className="text-stone-950 bg-white px-2 py-0.5 inline-block mt-1.5 rounded text-xs font-bold font-[family-name:var(--font-marrie)]">
                      These Types Of Items
                    </span>
                  </h4>
                </div>
              </div>
            </motion.div>

            {/* 👕 BOTTOM SLOT: SHIRT PRODUCT CARD */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full relative rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/5 bg-stone-950 group aspect-video cursor-pointer"
            >
              <Image 
                src={shirt} 
                alt="Premium Embroidered Shirt"
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover object-center transition-transform duration-[800ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
              
              {/* Organic Flat Panel Layout */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 select-none z-10">
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wider text-white font-[family-name:var(--font-marrie)]">Classic Shirt Line</h5>
                  <p className="text-xs text-white/70 font-medium font-[family-name:var(--font-marrie)]">Upto 30% Off Sale</p>
                </div>
                <div className="w-fit bg-white text-stone-950 font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 transition-colors duration-300 group-hover:bg-[#d60f36] group-hover:text-white font-[family-name:var(--font-marrie)]">
                  Buy Now
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>
    </div>
  );
}