import { z }from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),

  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required." }),
});