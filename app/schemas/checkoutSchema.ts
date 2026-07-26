import { z } from "zod";

export const checkoutSchema = z.object({
  full_Name: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{7,15}$/, "Phone number must be 7–15 digits"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters long"),
  postal_Code: z
    .string()
    .regex(/^[0-9]{4,10}$/, "Postal code must be 4–10 digits"),
  shipping_Method: z
    .string()
    .min(1, "Shipping method is required"),
  payment_Method: z
    .string()
    .min(1, "Payment method is required"),
});