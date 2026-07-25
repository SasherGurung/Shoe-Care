import { api } from "@/lib/lib/supabase";
import toast from "react-hot-toast";
import { create } from "zustand";

type Contact = {
  name: string;
  email: string;
  message: string;
};

export type ContactState = {
  contact: Contact[];

  postContact: (contact: Contact) => Promise<void>;
};

export const useContactStore = create<ContactState>((set) => ({
  contact: [],

  // Post Contact
  postContact: async (contact) => {
    try {
      const { data, error } = await api
        .from("contact_messages")
        .insert([contact]);

      if (error) throw error;

      set((state) => ({
        contact: [...state.contact, contact],
      }));

      toast.success("Message sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to post message");
    }
  },
}));
