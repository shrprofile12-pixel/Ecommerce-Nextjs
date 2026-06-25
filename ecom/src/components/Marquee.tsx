import React from 'react'
import Marque from "react-fast-marquee";
import localFont from "next/font/local";


const marie = localFont({
  src: "../../Fonts/Merienda-VariableFont_wght.ttf",
  weight: "600",
});

const Marquee = () => {
  return (
    <Marque 
      pauseOnHover={true} 
      gradient={false} 
      speed={50} // Aap speed yahan se control kar sakti hain
      className={`bg-[#e69655] ${marie.className} text-white py-2 text-center font-medium tracking-wide flex items-center`}
    >
      <span className="mx-8">⚡ CHICVOW GRAND SALE: UP TO 50% OFF ON ALL REFRESH STYLES! ⚡</span>
      <span className="mx-8">🛍️ FREE SHIPPING ON ALL ORDERS ABOVE RS. 3000! SHOP NOW 🛍️</span>
      <span className="mx-8">✨ ELEVATE YOUR SIGNATURE LOOK TODAY! ✨</span>
    </Marque>
  )
}

export default Marquee