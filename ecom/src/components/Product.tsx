'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';

// 🔐 Supabase client & clean decoupled component layout import
import { supabase } from '../lib/supabase'; 
import PProductGrid, { ProductType } from './PProductGrid';

// Your exact asset image paths
import all from "../../public/icons/All (1).png";
import tshirt from "../../public/icons/T-shirt.png";
import coords from "../../public/icons/Co-ords.png";
import Frock from "../../public/icons/Frock.png";
import Pant from "../../public/icons/Pant.png";

const marieFont = localFont({
  src: "../../Fonts/Merienda-VariableFont_wght.ttf",
  weight: "600",
});

export default function Product() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', icon: all },
    { id: 'T-shirt', name: 'T-Shirts', icon: tshirt },
    { id: 'coords', name: 'Co-ords', icon: coords },
    { id: 'Frock', name: 'Frocks', icon: Frock },
    { id: 'pant', name: 'Pants', icon: Pant },
  ];

  // 📡 Dynamic client runtime data fetching via Supabase
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // 1. "image-url" wrapped in double quotes fixes PostgREST PGRST125 hyphen error
        let query = supabase.from('Product').select('id, title, price, category, "image-url", discount, colors');

        if (activeCategory !== 'all') {
          query = query.eq('category', activeCategory);
        }

        const { data, error } = await query;
        if (error) throw error;

        // 2. Logs live data directly to your browser inspector panel for visibility
        console.log("Supabase fetched data successfully:", data);
        setProducts((data as unknown as ProductType[]) || []);
      } catch (error) {
        console.error('Error fetching products from database:', error);
      } finally {
        // 3. Clean 'finally' block ensures loading finishes gracefully without build breaks
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory]);

  if (!isMounted) {
    return (
      <section className="w-full py-4 bg-stone-50/50 min-h-[500px]" />
    );
  }

  return (
    <section className="w-full py-4 bg-stone-50/50 select-none">
      <div className="max-w-[1300px] bg-white mx-auto px-4 sm:px-6 flex flex-col gap-8">
        
        {/* 🧭 FILTER BANNER */}
        <div className="bg-[#d60f36] py-5 px-4 md:px-8 rounded-3xl shadow-xl flex flex-col gap-4 items-center w-full">
          <span className={`text-[17px] md:text-[19px] uppercase text-[#e2ddde] block text-center tracking-widest ${marieFont.className}`}>
            Filter By Category
          </span>

          <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 overflow-x-auto w-full scroll-smooth snap-x py-1 px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex flex-col items-center justify-center min-w-[95px] snap-center bg-transparent border-0 outline-none group"
                >
                  {/* ⭕ ICON CIRCLES */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                    isActive
                      ? 'bg-white shadow-xl scale-105'
                      : 'bg-[#b00627] border border-red-400/10 hover:bg-[#bf0b2e]'
                  }`}>
                    <div className={`relative w-7 h-7 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'brightness-100' : 'brightness-0 invert opacity-90'
                    }`}>
                      <Image 
                        src={category.icon} 
                        alt={category.name} 
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* 📋 DYNAMIC FONT LABEL */}
                  <span className={`text-[12px] md:text-sm tracking-wide whitespace-nowrap block mt-2.5 transition-all duration-300 ${marieFont.className} ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#e2ddde]/80 group-hover:text-white font-medium'
                  }`}>
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 📦 CONNECTED INTERDEPENDENT GRID AND CAROUSEL COMPONENT */}
        <PProductGrid products={products} loading={loading} />

      </div>
    </section>
  );
}