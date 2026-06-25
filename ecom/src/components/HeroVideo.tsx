
'use client'
import React from 'react'
import localFont from 'next/font/local'
import bgImage from "../../public/Group 4 bg.png" 
import Image from 'next/image'
import { Button } from './ui/button'
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
  return (
    <section className="relative bg-[#E9B0B0] w-full h-[calc(100vh-80px)] flex items-center select-none overflow-hidden">
      
      {/* LEFT SIDE: Content Container */}
      <div className='w-1/2 px-16 space-y-3 ml-16 z-10 flex flex-col justify-center'>
        
        <h1 className={`${pilar.className} text-8xl text-black leading-none tracking-wide w-fit block`}>
          CHICow
        </h1>
        
        <p className={`text-4xl text-neutral-800 tracking-wide w-fit block pl-4 font-bold ${marieFont.className}`}>
          Define Your Street.
        </p>
        
        <span className='text-base font-normal text-neutral-700 pl-7 tracking-wide w-fit block'>
          Premium streetwear for the bold.
        </span>

        {/* BUTTONS WRAPPER:
          Yahan humne 'items-stretch' add kiya hai aur container ko 'h-12' (ya h-14) ki fixed height di hai.
          Is se donon custom links ke pixel baseline matching ka issue permanently khatam ho jayega.
        */}
        <div className="pl-8 flex gap-4 items-stretch h-14 mt-2">
          
          {/* Shop Now Button */}
          <ButtonProp 
            label="Shop Now"
            variant="primary"
            className={`w-[190px] text-xl ${marieFont.className} !inline-flex !items-center !justify-center !py-0 h-full`}
            href="/shop"
            icon={<CiShop className="text-white size-7 font-bold" />} 
          />

          {/* Explore Gender Dropdown Container */}
          <div className="group relative inline-block text-left h-full">
            <ButtonProp 
              label="Explore Gender"
              variant="primary"
              className={`text-xl ${marieFont.className} !inline-flex !items-center !justify-center !py-0 h-full`}
              href="#" 
              icon={
                <IoChevronDownOutline 
                  className="text-white size-5 transition-transform duration-300 group-hover:rotate-360" 
                />
              }
            />

            {/* Dropdown Menu Layer using Next.js <Link> components */}
            <div className="absolute left-0 mt-2 w-[210px] bg-white rounded-2xl w-full shadow-2xl border border-neutral-100 overflow-hidden z-50 flex flex-col pointer-events-none opacity-0 translate-y-2 transition-all duration-800 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              
              <Link 
                href="/shop/men" 
                className={`px-6 py-3.5 text-neutral-800 hover:bg-neutral-50 hover:border-b-4 hover:border-black text-left text-lg transition-colors duration-200 border-b border-neutral-100 ${marieFont.className}`}
              >
                Men Collection
              </Link>
              
              <Link 
                href="/shop/women" 
                className={`px-6 py-3.5 text-neutral-800 hover:bg-neutral-50 text-left text-lg transition-colors duration-200 border-b border-neutral-100 ${marieFont.className}`}
              >
                Women Collection
              </Link>
              
            

            </div>
          </div>

        </div>
        
      </div>

      {/* RIGHT SIDE: Campaign Image */}
      <div className="relative w-1/2 h-full ml-[-210px]">
        <Image 
          src={bgImage} 
          alt="CHICow Campaign Background" 
          fill 
          className="object-cover" 
          style={{ objectPosition: '70% 25%' }} 
          priority 
        />
      </div>

    </section>
  )
}

