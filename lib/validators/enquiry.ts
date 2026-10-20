import { z } from "zod";

/** Zod schema for the enquiry form — mirrors EnquiryFormData type */
export const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  district: z.string().min(2, "Please select your district").max(60),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  /** Honeypot — must be empty */
  website: z.string().max(0, "Bot detected").optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Zod schema for the contact form */
export const contactSchema = enquirySchema;

export type ContactInput = z.infer<typeof contactSchema>;
