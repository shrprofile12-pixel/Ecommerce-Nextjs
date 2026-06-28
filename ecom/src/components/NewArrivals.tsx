'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../lib/supabase'; 
import { ProductType } from './PProductGrid'; 

export default function NewArrivals() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('Product')
          .select('id, title, price, category, "image-url", discount, colors')
          .eq('tag', 'New-Arrival')
          .order('id', { ascending: false }) 
          .limit(6);

        if (error) throw error;
        setProducts((data as unknown as ProductType[]) || []);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="h-8 w-48 bg-stone-200 animate-pulse rounded mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-stone-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full py-12 bg-white select-none">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 flex flex-col gap-8">
        
        {/* 🏷️ SECTION TITLE */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight">
            New Arrivals 🔥
          </h2>
          <span className="text-sm font-semibold text-[#d60f36] bg-red-50 px-3 py-1 rounded-full">
            Just In
          </span>
        </div>

        {/* 📦 CARD GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {products.map((product) => {
            const imageUrl = product['image-url'] || '/placeholder.png';
            const hasDiscount = product.discount && product.discount > 0;
            
            // Safe parsing if color data is an array or string-split collection
            const productColors = Array.isArray(product.colors) 
              ? product.colors 
              : product.colors 
                ? (product.colors as string).split(',') 
                : [];

            return (
              <div 
                key={product.id} 
                className="group flex flex-col bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative"
              >
                {/* 🌟 DISCOUNT BADGE */}
                {hasDiscount && (
                  <span className="absolute top-2 left-2 z-10 bg-[#d60f36] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
                    -{product.discount}%
                  </span>
                )}

                {/* 📸 PRODUCT IMAGE */}
                <div className="relative aspect-[3/4] w-full bg-stone-50 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    sizes="(max-w-768px) 50vw, (max-w-1024px) 33vw, 16vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* 📝 PRODUCT INFO */}
                <div className="p-3 md:p-4 flex flex-col flex-grow gap-1.5">
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-stone-400">
                    {product.category}
                  </span>
                  
                  <h3 className="text-xs md:text-sm font-semibold text-stone-800 line-clamp-2 min-h-[2rem] group-hover:text-[#d60f36] transition-colors duration-200">
                    {product.title}
                  </h3>

                  {/* 🎨 DYNAMIC COLOR BADGES */}
                  {productColors.length > 0 && (
                    <div className="flex items-center gap-1.5 py-0.5">
                      {productColors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-stone-200 block shadow-sm"
                          style={{ backgroundColor: color.trim() }}
                          title={color.trim()}
                        />
                      ))}
                    </div>
                  )}

                  {/* 💰 PRICING */}
                  <div className="flex items-center gap-2 mt-auto pt-1">
                    <span className="text-sm md:text-base font-bold text-stone-900">
                      Rs. {product.price}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}