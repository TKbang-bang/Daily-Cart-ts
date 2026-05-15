import { z } from "zod";

// const
export const signupSchema = z.object({
  firstname: z.string().nonempty("Firstname is required").trim(),
  lastname: z.string().nonempty("Lastname is required").trim(),
  email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
  staffCode: z.string().optional(),
  role: z.enum(["client", "manager", "admin"]).optional(),
});

export interface UserSignupSchema extends z.infer<typeof signupSchema> {}

export const signinSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .nonempty("Email is required")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export interface UserSigninSchema extends z.infer<typeof signinSchema> {}
