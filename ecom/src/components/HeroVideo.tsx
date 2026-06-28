'use client'
import React, { useState, useEffect } from 'react'
import localFont from 'next/font/local'
import bgImage from "../../public/Group 4 bg.png" 
import Image from 'next/image'
import ButtonProp from "../components/ButtonProp"
import { CiShop } from "react-icons/ci"
import { IoChevronDownOutline } from "react-icons/io5"
import Link from 'next/link'

const pilar = localFont({
  src: '../../Fonts/BeautifulPeoplePersonalUse-dE0g.ttf',
  display: 'swap',
})

const marieFont = localFont({
  src: "../../Fonts/Merienda-VariableFont_wght.ttf",
  weight: "600",
})

export default function HeroVideoSection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <section className="relative bg-[#E9B0B0] w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]" />
    )
  }

  return (
    <section className="relative bg-[#E9B0B0] w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] flex flex-col md:flex-row items-center select-none overflow-hidden">
      
      <div className='w-full md:w-1/2 px-6 sm:px-12 md:px-16 lg:pl-24 py-12 md:py-0 space-y-4 z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left'>
        
        <h1 className={`${pilar.className} text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black leading-none tracking-wide block`}>
          CHICow
        </h1>
        
        <p className={`text-2xl sm:text-3xl md:text-4xl text-neutral-800 tracking-wide block md:pl-4 font-bold ${marieFont.className}`}>
          Define Your Street.
        </p>
        
        <span className='text-sm sm:text-base font-normal text-neutral-700 md:pl-7 tracking-wide block max-w-sm md:max-w-none'>
          Premium streetwear for the bold.
        </span>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 items-center sm:items-stretch h-auto sm:h-12 md:h-14 mt-4 md:pl-2">
          
          <div className="w-full sm:w-auto h-12 sm:h-full">
            <ButtonProp 
              label="Shop Now"
              variant="primary"
              className={`w-full sm:w-auto text-lg md:text-xl ${marieFont.className} !inline-flex !items-center !justify-center !py-0 h-full px-6`}
              href="/shop"
              icon={<CiShop className="text-white size-6 md:size-7 font-bold" />} 
            />
          </div>

          <div className="group relative inline-block text-left w-full sm:w-auto h-12 sm:h-full">
            <ButtonProp 
              label="Explore Gender"
              variant="primary"
              className={`w-full sm:w-auto text-lg md:text-xl ${marieFont.className} !inline-flex !items-center !justify-center !py-0 h-full`}
              href="#" 
              icon={
                <IoChevronDownOutline 
                  className="text-white size-4 md:size-5 transition-transform duration-300 group-hover:rotate-180" 
                />
              }
            />

            <div className="absolute  left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-full min-w-[210px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 flex flex-col pointer-events-none opacity-0 translate-y-2 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <Link 
                href="/shop/men" 
                className={`px-6 py-3.5 text-neutral-800 hover:bg-neutral-50 hover:border-b-4 hover:border-black text-left text-lg transition-colors duration-200 border-b border-neutral-100 ${marieFont.className}`}
              >
                Men Collection
              </Link>
              
              <Link 
                href="/shop/women" 
                className={`px-6 py-3.5 text-neutral-800 hover:bg-neutral-50 text-left text-lg transition-colors duration-200 ${marieFont.className}`}
              >
                Women Collection
              </Link>
            </div>
          </div>

        </div>
        
      </div>

      <div className="relative w-full md:w-1/2 h-[380px] sm:h-[480px] md:h-full md:ml-[-60px] lg:ml-[-110px] z-0">
        <Image 
          src={bgImage} 
          alt="CHICow Campaign Background" 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover" 
          style={{ objectPosition: '74% 25%' }} 
          priority 
        />
      </div>

    </section>
  )
}