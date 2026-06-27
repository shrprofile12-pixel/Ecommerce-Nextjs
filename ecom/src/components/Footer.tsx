"use client";

import React from "react";

export default function Footer() {
  return (
    // 'relative' aur 'isolate' zaroori hain taake curves footer ke sath locked rahein aur baki content ke upar aayein
    <section className="relative isolate w-full h-[300px] bg-[#d60f36] mt-[100px]">
      
      {/* ─── SCALLOP CURVES (FIXED & LOCKED TO TOP OF FOOTER) ─── */}
      <div
        className="absolute top-0 left-0 w-full h-[40px] -translate-y-full"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 100%, #d60f36 70%, transparent 73%)",
          backgroundSize: "80px 40px",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Footer Content */}
      <div className="text-[#ffffff] flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold tracking-wider">CHICOW</h2>
        <p className="text-sm mt-2 opacity-70">© 2026 CHICOW. All Rights Reserved.</p>
      </div>
      
    </section>
  );
}