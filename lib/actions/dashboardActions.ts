"use server";
import {
  createTransactionSchema,
  CreateTransactionValues,
} from "@/schema/auth/transactionZodSchema";
import prisma from "../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { capitalizeText } from "../utils";
import { success } from "zod";

export const searchCustomersAction = async (name: string) => {
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

export const createTransactionAction = async (
  values: CreateTransactionValues
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Please login first" };
    }

    const validationResult = createTransactionSchema.safeParse(values);

    if (!validationResult.success) {
      return { success: false, error: "Invalid inputs " };
    }

    const {
      bookingOption,
      branch,
      customerName,
      items,
      paymentMethod,
      bookingDate,
    } = validationResult.data;

    const foundCustomer = await prisma.customer.findFirst({
      where: { name: validationResult.data.customerName },
    });

    if (!foundCustomer) {
      const capitalizedName = capitalizeText(customerName);

      const newCustomer = await prisma.customer.create({
        data: {
          name: capitalizedName,
        },
      });

      const bookedAt =
        bookingOption === "now" ? new Date() : new Date(bookingDate!);
      const totalAmount = items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      const newTransaction = await prisma.transaction.create({
        data: {
          bookedAt,
          totalAmount,
          totalDiscount: 0,
          grandTotal: totalAmount,
          paymentMethod,
          customerId: newCustomer.id,
          branchId: branch,
          servedById: session.user.id,
          status: "PENDING",
          items: {
            createMany: {
              data: items.map((item) => ({
                priceAtTransaction: item.price,
                serviceUnitId: item.serviceUnitId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });

      return { success: true, message: "Created transaction successfully!" };
    } else {
      const bookedAt =
        bookingOption === "now" ? new Date() : new Date(bookingDate!);
      const totalAmount = items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      const newTransaction = await prisma.transaction.create({
        data: {
          bookedAt,
          totalAmount,
          totalDiscount: 0,
          grandTotal: totalAmount,
          paymentMethod,
          customerId: foundCustomer.id,
          branchId: branch,
          servedById: session.user.id,
          status: "PENDING",
          items: {
            createMany: {
              data: items.map((item) => ({
                priceAtTransaction: item.price,
                serviceUnitId: item.serviceUnitId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });

      return { success: true, message: "Created transaction successfully!" };
    }
  } catch (err) {
    console.error("An unexpected error occured");
    return { success: false, error: "An unexpected error occured" };
  }
};
