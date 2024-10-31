import * as z from "zod";

//contact schema
export const contactSchema = z.object({
  fullname: z
    .string({ required_error: "Full name is required" })
    .email({ message: "Inavlid email" })
    .refine((data) => data.trim() !== "", {
      message: "Full name is required",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .refine((data) => data.trim() !== "", {
      message: "Email is required",
    }),
  subject: z
    .string({ required_error: "Subject is required" })
    .refine((data) => data.trim() !== "", {
      message: "Subject is required",
    }),
  phone: z.number({ required_error: "phone is required" }),
  message: z
    .string({ required_error: "Message is required" })
    .refine((data) => data.trim() !== "", {
      message: "Message is required",
    }),
});
