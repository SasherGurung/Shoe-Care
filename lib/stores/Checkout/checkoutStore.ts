import { api } from "@/lib/lib/supabase";
import toast from "react-hot-toast";
import { create } from "zustand";

type Checkout = {
  full_Name: string;
  email: string;
  phone: string;
  city: string;
  postal_Code: string;
  shipping_Method: string;
  payment_Method: string;
};

export type CheckoutState = {
  checkout: Checkout[];

  placeOrder: (checkout: Checkout) => Promise<Checkout | null>;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  checkout: [],

  // Place Order
  placeOrder: async (checkout) => {
    try {
      const { data, error } = await api
        .from("checkout_details")
        .insert([checkout])
        .select()
        .single();

      if (error) {
        toast.error(error.message);
        return null;
      }

      set((state) => ({
        checkout: [...state.checkout, checkout],
      }));

      toast.success("Order placed successfully");
      return data as Checkout;
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
      return null;
    }
  },
}));
