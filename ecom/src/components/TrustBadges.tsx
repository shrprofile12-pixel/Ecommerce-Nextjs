import React from 'react';
import { FaCreditCard, FaShippingFast, FaTshirt } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function TrustBadges() {
  const badges = [
    {
      id: 1,
      icon: <FaShippingFast className="w-9 h-9 md:w-12 md:h-12 text-white" />, // 🚀 Increased icon size
      title: "Nationwide Shipping",
    },
    {
      id: 2,
      icon: <FaCreditCard className="w-9 h-9 md:w-12 md:h-12 text-white" />, // 🚀 Increased icon size
      title: "Cash On Delivery",
    },
    {
      id: 3,
      icon: <FaTshirt className="w-9 h-9 md:w-12 md:h-12 text-white" />, // 🚀 Increased icon size
      title: "Easy Size Exchange",
    },
    {
      id: 4,
      icon: <RiVerifiedBadgeFill className="w-9 h-9 md:w-12 md:h-12 text-white" />, // 🚀 Increased icon size
      title: "Premium Fabric Quality",
    },
  ];

  return (
    <section className="w-full bg-[#d60f36] py-12 md:py-16 select-none text-white">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 flex flex-col gap-10 md:gap-12">
        
        {/* 🛡️ BADGES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 items-start">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className="flex flex-col items-center text-center gap-4 px-2"
            >
              {/* ICON WRAPPER */}
              <div className="flex items-center justify-center min-h-[48px]">
                {badge.icon}
              </div>
              
              {/* LABEL */}
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[160px]">
                {badge.title}
              </span>
            </div>
          ))}
        </div>

        {/* 💰 NOTICE STATEMENT */}
        <div className="text-center border-t border-white/20 pt-6 md:pt-8">
          <p className="text-xs md:text-sm text-red-100 font-medium tracking-wide">
            Pay via bank transfer and enjoy an instant 5% saving on your order.
          </p>
        </div>

      </div>
    </section>
  );
}