import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  zipcode: z.string().regex(/^\d{5}$/, "Postal code must be exactly 5 digits"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;