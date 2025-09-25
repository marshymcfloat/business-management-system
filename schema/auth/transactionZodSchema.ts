import { z } from "zod";

export const transactionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  serviceUnitId: z.string().cuid({ message: "Invalid service unit ID" }),
  quantity: z.number().int().min(1, { message: "Quantity must be at least 1" }),
});

export const createTransactionSchema = z
  .object({
    customerName: z.string().min(3, {
      message: "Customer name should be at least 3 characters long",
    }),
    branch: z.string().cuid({ message: "Please select a branch" }),
    paymentMethod: z.enum(["BANK", "CASH", "EWALLET"]),
    bookingOption: z.enum(["now", "later"]),
    bookingDate: z.date().optional(),
    items: z
      .array(transactionItemSchema)
      .min(1, { message: "Please select at least one service" }),
  })
  .refine(
    (data) => {
      if (data.bookingOption === "later") {
        return !!data.bookingDate;
      }
      return true;
    },
    {
      message: "Booking date and time are required for a future booking.",
      path: ["bookingDate"],
    }
  );

export type CreateTransactionValues = z.infer<typeof createTransactionSchema>;

export type TransactionItemValue = z.infer<
  typeof createTransactionSchema
>["items"][number];
