import { api } from "@/lib/lib/supabase";
import toast from "react-hot-toast";
import { create } from "zustand";

// Form type: everything is string (because inputs always give strings)
export type Checkout = {
  full_Name: string;
  email: string;
  phone: string; // string from input
  city: string;
  postal_Code: string; // string from input
  shipping_Method: string;
  payment_Method: string;
};

// DB insert type: numeric fields are converted to number | null
export type CheckoutInsert = Omit<Checkout, "phone" | "postal_Code"> & {
  phone: number | null;
  postal_Code: number | null;
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
      // sanitize numeric fields before inserting
      const sanitizedCheckout: CheckoutInsert = {
        ...checkout,
        phone: checkout.phone ? parseInt(checkout.phone, 10) : null,
        postal_Code: checkout.postal_Code
          ? parseInt(checkout.postal_Code, 10)
          : null,
      };

      const { data, error } = await api
        .from("checkout_details")
        .insert([sanitizedCheckout])
        .select()
        .single();

      if (error) {
        toast.error(error.message);
        return null;
      }

      // keep original string-based checkout in local state (for UI consistency)
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
