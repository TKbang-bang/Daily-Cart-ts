"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    firstname: zod_1.z.string().nonempty("Firstname is required").trim(),
    lastname: zod_1.z.string().nonempty("Lastname is required").trim(),
    email: zod_1.z
        .string()
        .email("Invalid email")
        .nonempty("Email is required")
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters"),
    staffCode: zod_1.z.string().optional(),
    role: zod_1.z.enum(["client", "manager", "admin"]).optional(),
});
