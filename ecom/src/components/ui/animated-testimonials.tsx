"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion"; 
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // 👈 Hydration guard state

  // Mount hone par state ko true karein
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  // Jab tak component browser par fully load na ho jaye, basic static structure return karein
  if (!isMounted) {
    return (
      <div className="mx-auto max-w-sm px-4 py-12 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="relative h-80 w-full" />
          <div className="flex flex-col justify-between min-h-[320px] bg-[#d60f36] rounded-3xl p-8 shadow-2xl text-white border border-white/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
        
        {/* 📸 IMAGE STACK PANEL */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-xl border-4 border-white/10"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* 💬 TEXT PANEL */}
        <div className="flex flex-col justify-between min-h-[320px] bg-[#d60f36] rounded-3xl p-8 shadow-2xl text-white border border-white/20">
          <motion.div
            key={active}
            initial={{
              y: 15,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -15,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-extrabold tracking-wide text-white">
              {testimonials[active].name}
            </h3>
            
            <p className="text-xs font-semibold tracking-widest uppercase text-red-200/90 mt-1">
              {testimonials[active].designation}
            </p>
            
            <motion.p className="mt-6 text-base md:text-lg leading-relaxed font-medium text-white/95">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(8px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* 🔘 CONTROLLER BUTTONS */}
          <div className="flex gap-3 pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#d60f36] border border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:-translate-x-0.5" />
            </button>
            
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white text-white hover:text-[#d60f36] border border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};