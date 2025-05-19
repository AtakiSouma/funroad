import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "User name must be at least 3 characters")
    .max(63, "User name must be less than 63 characters "),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
