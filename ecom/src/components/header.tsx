'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { FaRegHeart as HeartIcon } from "react-icons/fa";
import { HiOutlineShoppingBag as BagIcon } from "react-icons/hi2";
import { BsFillPersonFill as PersonIcon } from "react-icons/bs";
import { IoIosMenu as MenuIcon } from "react-icons/io";
import localFont from "next/font/local";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Fonts Configurations
const beautyFont = localFont({ 
  src: "../../Fonts/BeautifulPeoplePersonalUse-dE0g.ttf",
  weight: "600",
});

const marieFont = localFont({
  src: "../../Fonts/Merienda-VariableFont_wght.ttf",
  weight: "600",
});

// Centralized Clean Data Structure
const MENU_DATA = {
  women: {
    label: "Women",
    sections: [
      {
        title: "Western Wear",
        links: [
          { name: "Dresses", href: "/women/dresses" },
          { name: "Tops", href: "/women/tops" },
          { name: "T-Shirts", href: "/women/tshirts" },
          { name: "Shirts", href: "/women/shirts" },
          { name: "Co-Ord Sets", href: "/women/coord-sets" },
          { name: "Jackets", href: "/women/jackets" },
        ]
      },
      {
        title: "Featured",
        links: [
          { name: "New Arrivals", href: "/women/new-arrivals" },
          { name: "Best Sellers", href: "/women/best-sellers" },
          { name: "Jeans", href: "/women/jeans" },
          { name: "Trousers", href: "/women/trousers" },
        ],
        hasSale: true,
        saleHref: "/women/sale"
      }
    ]
  },
  men: {
    label: "Men",
    sections: [
      {
        title: "Top Wear",
        links: [
          { name: "T-Shirts", href: "/men/tshirts" },
          { name: "Shirts", href: "/men/shirts" },
          { name: "Polo Shirts", href: "/men/polo-shirts" },
          { name: "Hoodies", href: "/men/hoodies" },
          { name: "Jackets", href: "/men/jackets" },
        ]
      },
      {
        title: "Featured",
        links: [
          { name: "New Arrivals", href: "/men/new-arrivals" },
          { name: "Best Sellers", href: "/men/best-sellers" },
          { name: "Jeans", href: "/men/jeans" },
          { name: "Trousers", href: "/men/trousers" },
        ],
        hasSale: true,
        saleHref: "/men/sale"
      }
    ]
  }
};

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid SSR hydration conflicts with client components
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reusable styling class for desktop dropdown links
  const linkStyles = "text-gray-500 hover:text-[#d60f36] relative w-fit block pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#d60f36] hover:after:w-full after:transition-all after:duration-300 hover:translate-x-1 transition-all duration-200 ease-out";

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-[#d60f36] text-white shadow-md relative z-50">
      
      {/* Brand Logo */}
      <Link href="/">
        <div className={`cursor-pointer text-3xl font-bold ${beautyFont.className} tracking-wider transition-opacity hover:opacity-90`}>
          <span className="text-white text-4xl">C</span><span className="text-white/90">HICOW</span>
        </div>
      </Link>

      {/* Desktop/Laptop Navigation Menu (Hidden on mobile/tablets) */}
      <nav className={`hidden lg:flex items-center gap-8 text-xl font-medium text-white/90 ${marieFont.className}`}>
        <Link href="/" className="hover:text-white border-b-2 border-transparent hover:border-white pb-1 transition-all duration-200">
          Home
        </Link>

        {/* Unified Navigation Context */}
        <NavigationMenu className="relative z-50">
          <NavigationMenuList className="flex gap-8">
            {Object.values(MENU_DATA).map((category) => (
              <NavigationMenuItem key={category.label}>
                <NavigationMenuTrigger className={`bg-transparent ${marieFont.className} text-white/90 text-xl border-b-2 border-transparent hover:border-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white data-[active]:bg-transparent pb-1 transition-all duration-200 shadow-none`}>
                  {category.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="md:absolute top-full left-0 mt-2">
                  <div className="font-sans grid w-[550px] grid-cols-2 gap-12 p-8 bg-white text-gray-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100">
                    
                    {category.sections.map((section, idx) => (
                      <div key={idx} className="flex flex-col gap-3.5 text-[15px]">
                        <h3 className="font-bold text-[16px] text-gray-900 border-b border-gray-100 pb-2 mb-1 tracking-wide uppercase">
                          {section.title}
                        </h3>
                        
                        {section.links.map((link) => (
                          <Link key={link.name} href={link.href} className={linkStyles}>
                            {link.name}
                          </Link>
                        ))}

                        {section.hasSale && section.saleHref && (
                          <Link href={section.saleHref} className="text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-md w-fit hover:bg-red-100/80 transition-all duration-200 ease-out tracking-wide block">
                            Sale
                          </Link>
                        )}
                      </div>
                    ))}

                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Right Side Icons Box */}
      <div className="flex items-center gap-4 md:gap-6 text-2xl text-white/90">
        <Link href="/wishlist" className="hover:text-white hover:scale-110 transition-all duration-200"><HeartIcon /></Link>
        <Link href="/cart" className="hover:text-white hover:scale-110 transition-all duration-200"><BagIcon /></Link>
        <Link href="/profile" className="hover:text-white hover:scale-110 transition-all duration-200"><PersonIcon /></Link>

        {/* Mobile Hamburger Sheet Drawer (Hidden on Laptop layout) */}
        <div className="block lg:hidden text-3xl">
          {isMounted && (
            <Sheet>
              <SheetTrigger asChild>
                <button className="hover:text-white transition-transform active:scale-95 flex items-center justify-center" aria-label="Open navigation menu">
                  <MenuIcon />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:max-w-[400px] bg-white text-gray-900 p-6 overflow-y-auto"
              >
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className={`${beautyFont.className} text-2xl tracking-wider text-[#d60f36]`}>CHICOW</SheetTitle>
                  <SheetDescription className="sr-only">Mobile Navigation Drawer Links</SheetDescription>
                </SheetHeader>
                
                {/* Mobile Navigation List Tree */}
                <nav className="flex flex-col gap-4 mt-6 font-sans">
                  <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-[#d60f36] transition-colors border-b pb-3">
                    Home
                  </Link>
                  
                  {/* Interactive Accordion for Women / Men Categories */}
                  <Accordion type="single" collapsible className="w-full">
                    {Object.values(MENU_DATA).map((category) => (
                      <AccordionItem key={category.label} value={category.label} className="border-b">
                        <AccordionTrigger className={`text-lg font-bold tracking-wide text-gray-900 hover:text-[#d60f36] hover:no-underline py-3 ${marieFont.className}`}>
                          {category.label}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 flex flex-col gap-5">
                          
                          {category.sections.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-2 pl-2">
                              {/* Fixed Closing Tag Below */}
                              <h5 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                                {section.title}
                              </h5>
                              <div className="flex flex-col gap-2 pl-1.5 border-l border-gray-100">
                                {section.links.map((link) => (
                                  <Link key={link.name} href={link.href} className="text-[15px] text-gray-600 hover:text-[#d60f36] py-0.5 transition-colors">
                                    {link.name}
                                  </Link>
                                ))}
                                {section.hasSale && section.saleHref && (
                                  <Link href={section.saleHref} className="text-red-600 font-semibold bg-red-50 text-xs px-2.5 py-1 rounded w-fit mt-1 hover:bg-red-100 transition-colors">
                                    Sale %
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}

                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

    </header>
  );
};

export default Header;