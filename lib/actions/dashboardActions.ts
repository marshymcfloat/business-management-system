"use server";
import prisma from "../prisma/prisma";

export const searchCustomers = async (name: string) => {
  try {
    const trimmedName = name.trim();

    if (!name.trim()) {
      return { data: [] };
    }
    const customers = await prisma.customer.findMany({
      take: 5,
      where: {
        name: {
          startsWith: trimmedName,
          mode: "insensitive",
        },
      },
      orderBy: {
        name: "asc",
      },
      select: {
        name: true,
        id: true,
      },
    });

    return { data: customers };
  } catch (err) {
    console.error("Database error: Failed to search customer");
    return { success: false, error: "Failed to search customer", data: [] };
  }
};
