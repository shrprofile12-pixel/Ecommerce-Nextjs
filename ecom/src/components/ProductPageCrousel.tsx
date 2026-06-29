"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface ProductType {
  id: string | number;
  title: string;
  price: number;
  'image-url': string;
  category: string;
  slug: string;
  colors?: string | string[];
  discount?: number;
  tag?: string;
}

interface ProductCarouselProps {
  products: ProductType[];
}

export default function ProductPageCrousel({ products }: ProductCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!products || products.length === 0) return null;

  return (
    // FIX: Pure container ka bg completely transparent/black kiya aur padding alignment set ki
    <div className="relative w-full overflow-hidden bg-transparent py-2">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ loop: true, slidesToScroll: 1 }}
      >
        <CarouselContent className="flex items-stretch w-full py-4">
          {products.map((product, index) => {
            // Colors string/array handling
            let colorList: string[] = [];
            if (product.colors) {
              if (Array.isArray(product.colors)) {
                colorList = product.colors.map(c => String(c).trim()).filter(Boolean);
              } else if (typeof product.colors === 'string') {
                colorList = product.colors.split(',').map(c => c.trim()).filter(Boolean);
              }
            }

            const hasDiscount = product.discount && product.discount > 0;
            const finalPrice = hasDiscount 
              ? product.price - (product.price * (product.discount || 0) / 100)
              : product.price;

            return (
              <CarouselItem
                key={product.id || index}
                className="relative flex w-full basis-full sm:basis-[50%] md:basis-[33.333%] lg:basis-[25%] p-3"
              >
                <Link 
                  href={`/shop/${product.slug}`}
                  // FIX: Card ko bg-zinc-900 aur border-zinc-800 diya taaki black layout par sleek lage
                  className="group relative border border-zinc-800 bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-zinc-900/50 transition-all duration-300 flex flex-col cursor-pointer h-full w-full"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[3/4] bg-zinc-950 w-full overflow-hidden shrink-0">
                    <Image
                      src={product['image-url'] || '/placeholder-product.png'} 
                      alt={product.title || "Product image"} 
                      fill
                      sizes="(max-w: 640px) 100vw, (max-w: 768px) 50vw, 25vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      priority={index === 0}
                    />

                    {/* Discount Badge */}
                    {hasDiscount && (
                      <div className="absolute top-2.5 left-2.5 bg-pink-600 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded-lg shadow-sm tracking-wider uppercase z-10">
                        {product.discount}% OFF
                      </div>
                    )}

                    {/* Product Tag */}
                    {product.tag && (
                      <div className="absolute top-2.5 right-2.5 bg-zinc-800 border border-zinc-700 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-lg shadow-sm tracking-wider uppercase z-10">
                        {product.tag}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-3 md:p-4 flex flex-col flex-grow justify-between gap-2">
                    <div>
                      {/* FIX: Text colors ko bright/muted zinc kiya */}
                      <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-mono font-medium">
                        {product.category}
                      </p>
                      <h3 className="text-xs md:text-sm font-black text-white uppercase line-clamp-2 mt-1 Atlantic leading-tight group-hover:text-pink-500 transition-colors duration-200">
                        {product.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
                      {/* Colors Circles */}
                      {colorList.length > 0 && (
                        <div className="flex items-center gap-1.5 h-4">
                          {colorList.slice(0, 4).map((color, idx) => (
                            <span
                              key={idx}
                              title={color}
                              className="w-3 h-3 rounded-full border border-zinc-700 shadow-sm block"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {colorList.length > 4 && (
                            <span className="text-[10px] font-medium text-zinc-500 font-mono">
                              +{colorList.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Price Tags */}
                      {/* FIX: Color matching details like pink and zinc-500 */}
                      <div className="flex flex-wrap items-baseline gap-1 md:gap-1.5">
                        <span className="text-sm md:text-base font-black text-pink-500">
                          Rs. {Math.round(finalPrice).toLocaleString()}
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] md:text-xs text-zinc-500 line-through font-semibold decoration-zinc-700">
                            Rs. {Number(product.price).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Controls - Dark styling updates */}
        <button 
          type="button"
          onClick={() => api?.scrollPrev()} 
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 shadow-xl p-2.5 transition-all z-20 hidden sm:block border border-zinc-800 hover:border-zinc-700" 
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white w-5 h-5" />
        </button>
        <button 
          type="button"
          onClick={() => api?.scrollNext()} 
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 shadow-xl p-2.5 transition-all z-20 hidden sm:block border border-zinc-800 hover:border-zinc-700" 
          aria-label="Next slide"
        >
          <ChevronRight className="text-white w-5 h-5" />
        </button>

        {/* Pagination dots - Pink active state */}
        <div className="flex w-full items-center justify-center mt-4">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: products.length }).map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn("h-1.5 rounded-full transition-all duration-300", current === index ? "bg-pink-600 w-5" : "bg-zinc-700 w-1.5 hover:bg-zinc-600")}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}