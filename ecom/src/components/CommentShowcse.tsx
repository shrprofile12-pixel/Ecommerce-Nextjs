import React from 'react'
import { AnimatedTestimonials } from '../components/ui/animated-testimonials' // 🌟 Path unchanged

const CommentShowcse = () => {
  // 📝 CHICOW Store ke liye Premium Testimonials Data
  const chicowTestimonials = [
    {
      quote: "The fabric quality and stitching details are absolutely top-notch. Finding premium streetwear with the perfect premium fit in Pakistan used to be hard, but CHICOW nailed it!",
      name: "Zayan Ahmed",
      designation: "Verified Buyer",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      quote: "Amazing customer support! I had an issue with the sizing of my jacket, but their exchange process was lightning fast and hassle-free. Will definitely shop again.",
      name: "Ayesha Malik",
      designation: "Loyal Customer",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    },
    {
      quote: "Super comfortable designs and the colors don't fade even after multiple washes. The attention to detail on the packaging also deserves a 5-star rating!",
      name: "Hamza Sheikh",
      designation: "Fashion Influencer",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    // 🎨 Wrapper div to give horizontal layout margin
    <div className="max-w-[1300px] mx-auto px-4 my-12">
      {/* 🌟 Background set to #e9b0b0 and corners rounded-2xl */}
      <section className="w-full  rounded-2xl py-12 md:py-16">
        
        {/* 🏷️ Heading Section */}
        <div className="w-full mx-auto px-6 text-center mb-4">
          {/* 🌟 Heading changed to "Trusted Customer Reviews" */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-950 uppercase">
            Trusted Customer Reviews
          </h2>
          <p className="text-stone-700 text-sm mt-2 max-w-md mx-auto font-medium">
            Real reviews from real CHICOW customers.
          </p>
        </div>

        {/* 🚀 Rendered Aceternity Component */}
        <AnimatedTestimonials  testimonials={chicowTestimonials} autoplay={true} />
        
      </section>
    </div>
  )
}

export default CommentShowcse