"use client";

import React from "react";
import Link from 'next/link';
import localFont from 'next/font/local';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// ─── LOCAL FONT DECLARATION ───
const marieFont = localFont({
  src: "../../Fonts/Merienda-VariableFont_wght.ttf",
  weight: "600",
});

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative isolate w-full bg-[#d60f36] mt-[100px] text-white select-none ${marieFont.className}`}>
      
      {/* ─── SCALLOP CURVES (FIXED & LOCKED TO TOP OF FOOTER) ─── */}
      <div
        className="absolute top-0 left-0 w-full h-[40px] -translate-y-full"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 100%, #d60f36 70%, transparent 73%)",
          backgroundSize: "80px 40px",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="max-w-[1300px] px-6 py-16 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">
          
          {/* 🔗 COLUMN 1: SHOP */}
          <div className="flex flex-col gap-4">
            {/* 🌟 Made headings font-extrabold & white */}
            <h2 className="font-extrabold tracking-widest text-base uppercase text-white">
              Shop
            </h2>
            <nav className="list-none flex flex-col gap-2.5">
              <li>
                <Link href="/category/new-arrivals" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/category/best-sellers" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/category/men" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Men Collection
                </Link>
              </li>
              <li>
                <Link href="/category/women" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Women Collection
                </Link>
              </li>
            </nav>
          </div>

          {/* 🔗 COLUMN 2: CUSTOMER CARE */}
          <div className="flex flex-col gap-4">
            {/* 🌟 Made headings font-extrabold & white */}
            <h2 className="font-extrabold tracking-widest text-base uppercase text-white">
              Customer Care
            </h2>
            <nav className="list-none flex flex-col gap-2.5">
              <li>
                <Link href="/contact" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  FAQs
                </Link>
              </li>
            </nav>
          </div>

          {/* 🔗 COLUMN 3: POLICIES */}
          <div className="flex flex-col gap-4">
            {/* 🌟 Made headings font-extrabold & white */}
            <h2 className="font-extrabold tracking-widest text-base uppercase text-white">
              Our Policies
            </h2>
            <nav className="list-none flex flex-col gap-2.5">
              <li>
                <Link href="/policies/shipping" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/exchange" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Exchange & Returns
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-sm text-white/80 hover:text-white hover:underline underline-offset-4 transition-all duration-200">
                  Terms of Service
                </Link>
              </li>
            </nav>
          </div>

          {/* ✉️ COLUMN 4: NEWSLETTER */}
          <div className="flex flex-col gap-4">
            {/* 🌟 Made headings font-extrabold & white */}
            <h2 className="font-extrabold tracking-widest text-base uppercase text-white">
              Subscribe
            </h2>
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-stretch md:justify-start">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  id="footer-field" 
                  name="footer-field" 
                  placeholder="Your email address"
                  className="w-full bg-white/10 rounded-lg border border-white/20 placeholder-white/50 focus:ring-2 focus:ring-white/40 focus:bg-white focus:text-stone-900 text-sm outline-none text-white py-2 px-3 transition-all duration-200 ease-in-out"
                />
              </div>
              <button className="flex-shrink-0 text-[#d60f36] bg-white border-0 py-2 px-5 focus:outline-none hover:bg-red-50 rounded-lg text-sm font-bold transition-colors duration-200">
                Join
              </button>
            </div>
            <p className="text-red-100 text-xs mt-1 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR (COPYRIGHT & SOCIALS) ─── */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="max-w-[1300px] px-6 py-5 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* LOGO */}
          <Link href="/" className="flex font-extrabold items-center text-white tracking-wider text-xl uppercase">
            CHICOW
          </Link>
          
          {/* COPYRIGHT */}
          <p className="text-xs text-red-100/80">
            © {currentYear} CHICOW. All Rights Reserved.
          </p>
          
          {/* SOCIAL ICONS */}
          <span className="inline-flex justify-center sm:justify-start gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-150">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-150">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="https://indigo.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-150">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors duration-150">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </span>

        </div>
      </div>
    </footer>
  );
}