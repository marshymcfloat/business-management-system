"use server";

import {
  AuthLoginValue,
  authSignupSchema,
  AuthSignupValue,
} from "@/schema/auth/authZodSchema";
import prisma from "../prisma";
import { hash } from "bcryptjs";

const salt = 12;

export const createUserAction = async (values: AuthSignupValue) => {
  try {
    const validationResult = authSignupSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, message: "Validation Error" };
    }

    const { email, password, username } = validationResult.data;

    const hashedPassword = await hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...newUser } = user;

    return {
      success: true,
      message: "Created User Successfully",
      data: newUser,
    };
  } catch (err) {
    return { success: false, message: "unexpected error occured" };
  }
};
