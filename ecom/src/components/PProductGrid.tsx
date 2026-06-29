"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react";
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
  colors?: string | string[];
  discount?: number;
}

interface ProductGridProps {
  products: ProductType[];
  loading: boolean;
}

export default function PProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col gap-4 items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#d60f36] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-neutral-500 animate-pulse font-mono uppercase tracking-widest">
          Loading Products...
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-24 rounded-3xl border border-dashed border-neutral-200">
        <p className="text-base font-semibold text-neutral-400">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 w-full">
      {products.length > 0 && (
        <div className="flex flex-col w-full items-center justify-center overflow-hidden bg-[#ffffff] rounded-3xl p-6 md:p-2 relative">
          <Carousel_006
            products={products.slice(0, 8)}
            loop={true}
            showNavigation={true}
            showPagination={true}
          />
        </div>
      )}
    </div>
  );
}

interface Carousel_006Props {
  products: ProductType[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export function Carousel_006({
  products,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [favorites, setFavorites] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    setIsMounted(true);
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const toggleFavorite = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    console.log("Added to cart:", product);
  };

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{ loop, slidesToScroll: 1 }}
      plugins={autoplay ? [Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })] : []}
    >
      <CarouselContent className="flex items-stretch w-full py-4">
        {products.map((product, index) => {
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

          const isFavorite = !!favorites[product.id];

          return (
            <CarouselItem
              key={product.id || index}
              className="relative flex w-full basis-full sm:basis-[50%] md:basis-[33.333%] lg:basis-[33.333%] p-3"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: !isMounted ? 0.98 : current === index ? 1 : 0.98,
                  opacity: !isMounted ? 0.8 : current === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                <div className="group relative border border-neutral-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer h-full">
                  
                  <div className="relative aspect-[3/4] bg-neutral-50 w-full overflow-hidden shrink-0">
                    <Image
                      src={product['image-url'] || '/placeholder-product.png'} 
                      alt={product.title || "Product image"} 
                      fill
                      sizes="(max-w: 640px) 100vw, (max-w: 768px) 50vw, 33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                      priority={index === 0}
                    />

                    {hasDiscount && (
                      <div className="absolute top-2.5 left-2.5 bg-[#d60f36] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-lg shadow-sm tracking-wider uppercase z-10">
                        {product.discount}% OFF
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(e, product.id)}
                      className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white text-neutral-600 hover:text-[#d60f36] transition-all z-10"
                      aria-label="Add to favorites"
                    >
                      <Heart className={cn("w-4 h-4 transition-colors", isFavorite && "fill-[#d60f36] text-[#d60f36]")} />
                    </button>

                    <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 z-10">
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full bg-[#d60f36] hover:bg-[#b00c2b] text-white text-xs md:text-sm font-semibold py-2 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 flex flex-col flex-grow justify-between gap-2">
                    <div>
                      <p className="text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest font-mono font-medium">
                        {product.category}
                      </p>
                      <h3 className="text-xs md:text-sm font-semibold text-neutral-800 line-clamp-2 mt-1 leading-tight group-hover:text-[#d60f36] transition-colors duration-200">
                        {product.title}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
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
              </motion.div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {showNavigation && (
        <>
          <button 
            type="button"
            onClick={() => api?.scrollPrev()} 
            className="absolute left-[-3px] top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-md p-3 transition-all z-10 hidden sm:block border border-neutral-200" 
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-neutral-800 w-7 h-7" />
          </button>
          <button 
            type="button"
            onClick={() => api?.scrollNext()} 
            className="absolute right-[-3px] top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-md p-3 transition-all z-10 hidden sm:block border border-neutral-200" 
            aria-label="Next slide"
          >
            <ChevronRight className="text-neutral-800 w-7 h-7" />
          </button>
        </>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center mt-4">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: products.length }).map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn("h-2 rounded-full transition-all duration-300", current === index ? "bg-[#d60f36] w-6" : "bg-neutral-300 w-2 hover:bg-neutral-400")}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
}