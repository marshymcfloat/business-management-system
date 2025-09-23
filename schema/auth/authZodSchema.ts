import { z } from "zod";

export const authLoginSchema = z.object({
  email: z
    .email({ message: "Please provide a valid email" })
    .max(50, { message: "Email should not exceed 50 characters" }),

  password: z
    .string()
    .min(6, { message: "Password should have at least 6 characters" })
    .regex(/[a-z]/, {
      message: "Password should have at least one lowercase character",
    })
    .regex(/[A-Z]/, {
      message: "Password should have at least one uppercase character",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password should have at least one special character",
    }),
});

export const authSignupSchema = z
  .object({
    email: z
      .email({ message: "Please provide a valid email" })
      .max(50, { message: "Email should not exceed 50 characters" }),

    password: z
      .string()
      .min(6, { message: "Password should have at least 6 characters" })
      .regex(/[a-z]/, {
        message: "Password should have at least one lowercase character",
      })
      .regex(/[A-Z]/, {
        message: "Password should have at least one uppercase character",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password should have at least one special character",
      }),

    confirmPassword: z.string(),
  })
  .superRefine((input, ctx) => {
    if (input.password !== input.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password do not match",
      });
    }
  });

export type AuthLoginValue = z.infer<typeof authLoginSchema>;
export type AuthSignupValue = z.infer<typeof authSignupSchema>;
