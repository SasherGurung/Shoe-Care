import { api } from "@/lib/lib/supabase";
import toast from "react-hot-toast";
import { create } from "zustand";

type Products = {
  id: string;
  title: string;
  images: string[];
  thumbnail: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  sku: string;
};

export type ProductsState = {
  products: Products[];

  fetchProduct: () => Promise<void>;

  fetchProductById: (id: string) => Promise<Products | null>;
};

export const useProductStore = create<ProductsState>((set) => ({
  products: [],

  // Fetch Products
  fetchProduct: async () => {
    try {
      const { data, error } = await api.from("products").select("*");

      if (error) throw error;

      set(() => ({
        products: data || [],
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  },

  // Fetch Product by id
  fetchProductById: async (id: string) => {
    try {
      const { data, error } = await api
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Products;
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product");
      return null;
    }
  },
}));
