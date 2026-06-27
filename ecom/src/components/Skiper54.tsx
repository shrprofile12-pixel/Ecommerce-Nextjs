"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import Elemnt from "../../public/Frame 7.png"
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const Beauty = localFont({
  src: "../../Fonts/BeautifulPeoplePersonalUse-dE0g.ttf",
  display: "swap",
  variable: "--font-beauty",
});

const Skiper54 = () => {
  const chicowCategories = [
    {
      name: "Man",
      description: "Sharp tailoring meets everyday comfort. Elevated essentials for the modern man.",
      image: "https://fpgegqvoemuiortivkra.supabase.co/storage/v1/object/public/product-images/fit.jfif"
    },
    {
      name: "Woman",
      description: "Effortless elegance designed for the modern woman. Timeless pieces for every occasion.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop" 
    },
    {
      name: "Unisex",
      description: "Styles with no boundaries. Made for everyone, everywhere.",
      image: "https://fpgegqvoemuiortivkra.supabase.co/storage/v1/object/public/product-images/7%20Inclusive%20Fashion%20Designers%20to%20Follow.jfif"
    }
  ];

  const formattedImages = chicowCategories.map((item) => ({
    src: item.image,
    alt: item.name,
    title: item.name,
    desc: item.description,
  }));

  return (
    <div className="relative w-full overflow-hidden bg-[#FDFBF7] py-16 md:pt-9 flex flex-col items-center justify-center">
      
      {/* ─── FIXED SECTION TITLE WITH BACKGROUND ELEMENT & LOCAL FONT ─── */}
      {/* Wrapper me font variable class inject ki hai taake CSS rules apply ho sakein */}
      <div className={cn("relative flex items-center justify-center text-center mb-16 select-none h-24 w-full max-w-xl mx-auto", Beauty.variable)}>
        
        {/* Background decorative brush perfectly center align ho raha hai line break ke bina */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-90">
          {/* <Image
            src={Elemnt}
            alt="Decorative line"
            width={380}
            height={90}
            className="object-contain mt-15"
            priority
          /> */}
        </div>
        
        {/* Custom font key class 'font-[family-name]' apply ki hai */}
        <h2 className="relative z-10 text-4xl font-bold md:text-5xl  tracking-wide text-gray-900 mix-blend-multiply font-[family-name:var(--font-beauty)] capitalize pt-2">
          Shop Categories
        </h2>
      </div>

      <Carousel_006
        images={formattedImages}
        className="max-w-7xl w-full px-6 md:px-4 "
        loop={true}
        showNavigation={true}
        showPagination={true}
        autoplay={false}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string; desc: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full relative", className)}
      opts={{
        loop,
        slidesToScroll: 1,
        align: "center",
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 3000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex  md:grid md:grid-cols-3 gap-6 md:gap-8 md:transform-none md:flex-none -ml-4 md:ml-0 items-stretch">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="pl-4 md:pl-0 relative   border-[#d60f36] border-4 rounded-xl bg-[#d60f36] flex flex-col w-full basis-[85%] sm:basis-[50%] md:basis-full justify-start select-none group"
          >
            <div className="w-full aspect-[3/4] relative overflow-hidden rounded-3xl shadow-md cursor-pointer bg-[#cc7586]">
              <motion.div
                initial={false}
                animate={{
                  clipPath:
                    typeof window !== "undefined" && window.innerWidth >= 768
                      ? "inset(0% 0% 0% 0% round 1.5rem)"
                      : current !== index
                      ? "inset(6% 2% 6% 2% round 1.5rem)" 
                      : "inset(0% 0% 0% 0% round 1.5rem)",
                }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={cn(
                    "h-full w-full object-cover scale-100 transition-all duration-700 group-hover:scale-105",
                    "md:opacity-100",
                    current !== index ? "opacity-60 md:opacity-100" : "opacity-100"
                  )}
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80 opacity-90 transition-opacity duration-300 group-hover:via-black/30 group-hover:to-black/95" />

                {/* DESKTOP TEXT WITH HOVER REVEAL */}
                <div className="hidden md:flex absolute inset-0 flex-col justify-between p-6 z-10 pointer-events-none">
                  <div className="text-left">
                    <h3 className="text-xl font-black uppercase tracking-widest text-white border-l-4 border-[#d60f36] pl-3 mt-1">
                      {img.title}
                    </h3>
                  </div>
                  
                  <div className="text-left opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-xs md:text-[13px] text-gray-200 font-medium leading-relaxed max-w-[95%]">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* MOBILE TEXT SYSTEM */}
            <div className="md:hidden w-full">
              <AnimatePresence mode="wait">
                {current === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-8 left-0 flex flex-col w-full translate-y-full items-center justify-center text-center px-4"
                  >
                    <h3 className="text-xl font-black uppercase tracking-wider text-gray-900">
                      {img.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-[260px]">
                      {img.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Controls for Mobile */}
      {showNavigation && (
        <div className="absolute top-[40%] -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-30 px-2 md:hidden">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="pointer-events-auto rounded-full bg-white/90 border border-gray-100 p-3 shadow-md text-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="pointer-events-auto rounded-full bg-white/90 border border-gray-100 p-3 shadow-md text-gray-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Pagination Controls for Mobile */}
      {showPagination && (
        <div className="flex w-full items-center justify-center mt-12 md:hidden">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all duration-300",
                  current === index ? "bg-[#d60f36] w-6" : "bg-gray-300",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};

export { Skiper54 };