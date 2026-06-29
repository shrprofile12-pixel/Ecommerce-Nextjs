import { supabase } from "@/lib/supabase";

export interface ProductType {
  id: string | number;
  title: string;
  price: number;
  'image-url': string;
  category: string;
  slug: string;
  colors?: string | string[];
  discount?: number;
  tag?: string;
  description?: string;
}

export const ProductService = {
  /**
   * Slug ke through single product fetch karne ke liye
   */
  async getBySlug(slug: string): Promise<ProductType | null> {
    try {
      const { data, error } = await supabase
        .from("Product")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) return null;
      return data as ProductType;
    } catch (err) {
      console.error(`Error fetching product by slug (${slug}):`, err);
      return null;
    }
  },

  /**
   * Related products load karne ke liye (Auto-fallback embedded logic)
   */
  async getRelated(category: string, currentProductId: string | number, limit = 8): Promise<ProductType[]> {
    try {
      // 1. Same category ke products line-up karein
      const { data: related, error } = await supabase
        .from("Product")
        .select("*")
        .eq("category", category)
        .not("id", "eq", currentProductId)
        .limit(limit);

      if (!error && related && related.length > 0) {
        return related as ProductType[];
      }

      // 2. Fallback: Agar same category empty ho toh general items load karein
      const { data: fallback } = await supabase
        .from("Product")
        .select("*")
        .not("id", "eq", currentProductId)
        .limit(limit);

      return (fallback as ProductType[]) || [];
    } catch (err) {
      console.error("Error fetching related products:", err);
      return [];
    }
  }
};