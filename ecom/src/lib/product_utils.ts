import { ProductType } from "@/services/product.service";

export function formatProductData(product: ProductType) {
  // Colors string/array clean structural handling
  let colorList: string[] = [];
  if (product.colors) {
    if (Array.isArray(product.colors)) {
      colorList = product.colors.map(c => String(c).trim()).filter(Boolean);
    } else if (typeof product.colors === 'string') {
      colorList = product.colors.split(',').map(c => c.trim()).filter(Boolean);
    }
  }

  // Discount aur Pricing calculation logic unified
  const hasDiscount = !!(product.discount && product.discount > 0);
  const finalPrice = hasDiscount 
    ? product.price - (product.price * (product.discount || 0) / 100)
    : product.price;

  return {
    colorList,
    hasDiscount,
    finalPrice,
  };
}