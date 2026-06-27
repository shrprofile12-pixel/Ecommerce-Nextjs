'use client'

import React from 'react'
import Image from 'next/image'

// Exact match with your database schema columns
export interface Product {
  id: string | number
  title: string
  price: number
  'image-url': string 
  category: string
  colors?: string | string[]
  discount?: number
}

interface ProductGridProps {
  products: Product[]
  loading: boolean
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  
  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col gap-4 items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d60f36] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-neutral-500 animate-pulse font-mono uppercase tracking-widest">
          Loading Products...
        </p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-24 bg-neutral-50/50 rounded-3xl border border-dashed border-neutral-200">
        <p className="text-base font-semibold text-neutral-400">
          No products found in this category.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4 md:gap-6 w-full min-h-[400px] animate-fadeIn pb-12">
      {products.map((product) => {
        
        // 🛠️ Dynamic array structure helper for color tracking
        let colorList: string[] = [];
        if (product.colors) {
          if (Array.isArray(product.colors)) {
            colorList = product.colors.map(c => String(c).trim()).filter(Boolean);
          } else if (typeof product.colors === 'string') {
            colorList = product.colors.split(',').map(c => c.trim()).filter(Boolean);
          }
        }

        // 🧮 Sale calculation checks
        const hasDiscount = product.discount && product.discount > 0;
        const finalPrice = hasDiscount 
          ? product.price - (product.price * (product.discount || 0) / 100)
          : product.price;

        return (
          <div 
            key={product.id} 
            className="group relative border border-black/20 border-2 bg-white hover:bg-amber-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Next.js Optimized Product Image Container */}
            <div className="relative aspect-[3/4] bg-neutral-50 w-full overflow-hidden">
              <Image
                src={product['image-url'] || '/placeholder-product.png'} 
                alt={product.title || "Product image"} 
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                priority={false}
              />

              {/* 🏷️ DISCOUNT BADGE OVERLAY */}
              {hasDiscount && (
                <div className="absolute top-2.5 left-2.5 bg-[#d60f36] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-lg shadow-sm tracking-wider uppercase z-10">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Product Details Area */}
            <div className="p-3 md:p-4 flex flex-col flex-grow justify-between gap-2">
              <div>
                {/* 🏷️ CATEGORY TAG */}
                <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest font-mono font-medium">
                  {product.category}
                </p>
                
                {/* PRODUCT TITLE */}
                <h3 className="text-xs md:text-sm font-semibold text-neutral-800 line-clamp-2 mt-1 leading-tight group-hover:text-[#d60f36] transition-colors duration-200">
                  {product.title}
                </h3>
              </div>

              {/* LOWER ROW: Colors & Price Row */}
              <div className="flex flex-col gap-2 mt-1">
                
                {/* 🎨 DYNAMIC COLORS BAR */}
                {colorList.length > 0 && (
                  <div className="flex items-center gap-1.5 h-4">
                    {colorList.slice(0, 4).map((color, idx) => (
                      <span
                        key={idx}
                        title={color}
                        className="w-3 h-3 rounded-full border border-neutral-200/80 shadow-sm block"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {colorList.length > 4 && (
                      <span className="text-[10px] font-medium text-neutral-400 font-mono">
                        +{colorList.length - 4}
                      </span>
                    )}
                  </div>
                )}
                
                {/* 💰 DYNAMIC PRICE TAGS */}
                <div className="flex flex-wrap items-baseline gap-1 md:gap-1.5">
                  <span className="text-sm md:text-base font-bold text-[#d60f36]">
                    Rs. {Math.round(finalPrice).toLocaleString()}
                  </span>
                  
                  {hasDiscount && (
                    <span className="text-[11px] md:text-xs text-neutral-400 line-through font-medium decoration-neutral-300">
                      Rs. {Number(product.price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}