import { supabase } from "@/lib/supabase"; 
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 
import ProductPageCrousel from "@/components/ProductPageCrousel";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // 1. URL se dynamic slug uthayein
  const { slug } = await params;

  // 2. Supabase se current product fetch karein
  const { data: product, error } = await supabase
    .from("Product")
    .select("*")
    .eq("slug", slug)
    .single();

  // 3. Agar nahi mila toh 404
  if (error || !product) {
    notFound();
  }

  // 4. Same Category ke related products fetch karein (Current product ko hata kar)
  const { data: relatedProductsData } = await supabase
    .from("Product")
    .select("*")
    .eq("category", product.category)
    .not("id", "eq", product.id)
    .limit(8);

  // 🔄 FALLBACK LOGIC: Agar is category mein koi aur product nahi mila, toh dusre general products load karo
  let relatedProducts = relatedProductsData;
  if (!relatedProducts || relatedProducts.length === 0) {
    const { data: fallbackProducts } = await supabase
      .from("Product")
      .select("*")
      .not("id", "eq", product.id)
      .limit(8);
    relatedProducts = fallbackProducts;
  }

  // 🎨 Colors handling logic
  let colorList: string[] = [];
  if (product.colors) {
    if (Array.isArray(product.colors)) {
      colorList = product.colors.map(c => String(c).trim()).filter(Boolean);
    } else if (typeof product.colors === 'string') {
      colorList = product.colors.split(',').map(c => c.trim()).filter(Boolean);
    }
  }

  // 🏷️ Discount and Pricing Calculations
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount 
    ? product.price - (product.price * (product.discount || 0) / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      {/* Back to Shop Link */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="text-zinc-400 hover:text-pink-600 transition text-sm font-medium">
          ← Back to Collection
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* 📸 Left Side: Product Image Card */}
        <div className="relative border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl h-[450px] md:h-[600px] w-full group">
          <Image
            src={product['image-url'] || "/web.png"} 
            alt={product.title || "Product Image"} 
            fill
            sizes="(max-w: 768px) 100vw, 50vw"
            className="object-contain hover:scale-105 transition duration-500"
            priority
          />

          {/* 🏷️ Top-Left: Discount Percent Tag */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-md tracking-widest uppercase z-10">
              {product.discount}% OFF
            </div>
          )}

          {/* 🚀 Top-Right: Dynamic Status Tag */}
          {product.tag && (
            <div className="absolute top-4 right-4 bg-zinc-800 border border-zinc-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md tracking-widest uppercase z-10">
              {product.tag}
            </div>
          )}
        </div>

        {/* 📝 Right Side: Product Details */}
        <div className="flex flex-col sticky top-6">
          <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-2">
            CHICOW STREETWEAR
          </span>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase break-words leading-tight">
            {product.title} 
          </h1>
          
          {/* Main Pricing Section */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl md:text-4xl font-black text-pink-500">
              Rs. {Math.round(finalPrice).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xl text-zinc-500 line-through font-semibold decoration-zinc-700">
                Rs. {Number(product.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Dynamic Colors Section */}
          {colorList.length > 0 && (
            <div className="mt-6 border-t border-zinc-900 pt-4">
              <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase mb-2">
                Available Colors
              </h3>
              <div className="flex gap-2">
                {colorList.map((color, idx) => (
                  <span
                    key={idx}
                    title={color}
                    className="w-6 h-6 rounded-full border border-zinc-700 shadow-md block transition-transform hover:scale-110 cursor-help"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-6 border-t border-zinc-900 pt-4">
            <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase">
              Product Description
            </h3>
            <p className="mt-3 text-zinc-400 leading-relaxed text-base font-light">
              {product.description || "Premium streetwear piece crafted with elite fabric, high-density print, and ultimate comfort. Tailored for the bold."}
            </p>
          </div>

          {/* Size Options */}
          <div className="mt-6 border-t border-zinc-900 pt-4">
            <h3 className="text-sm font-bold tracking-wider text-zinc-400 uppercase mb-3">
              Select Size
            </h3>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button 
                  key={size} 
                  type="button"
                  className="w-12 h-12 border border-zinc-800 rounded-md flex items-center justify-center font-bold text-sm hover:border-pink-600 hover:text-pink-600 hover:bg-zinc-950 transition-all active:scale-95"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 🛒 CTA Buttons Group */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
            <button 
              type="button" 
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-black py-4 rounded-xl tracking-widest active:scale-[0.98] transition-all duration-200"
            >
              ADD TO BAG
            </button>

            <button 
              type="button" 
              className="flex-1 bg-pink-600 text-white font-black py-4 rounded-xl tracking-widest hover:bg-pink-700 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-pink-600/20"
            >
              BUY IT NOW
            </button>
          </div>

        </div>
      </div>
      
      {/* 🔄 Related Products Carousel Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-20 border-t border-zinc-900 pt-12">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase mb-6">
            You May Also Like
          </h2>
          <ProductPageCrousel products={relatedProducts} />
        </div>
      )}

    </div>
  );
}