import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary" | "tertiary";
  href: string;
  icon?: React.ReactNode;
  className?: string;
}

const ButtonProp = ({ label, variant, href, icon, className }: ButtonProps) => {
  const variants = {
    primary: "bg-[#d60f36] transparent  text-white hover:bg-[#d60f10] hover:drop-shadow-xl  hover:border-black hover:border-4 rounded-2xl border-2 border-black",  
    secondary: "bg-blue-500 text-white hover:bg-blue-600",
    tertiary: "bg-gray-500 text-white hover:bg-gray-600"
  };  

  return (
    <Link href={href} className={`inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-300 ${variants[variant]} ${className || ''}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  )
}

export default ButtonProp