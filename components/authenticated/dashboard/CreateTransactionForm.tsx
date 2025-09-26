"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import {
  createTransactionSchema,
  CreateTransactionValues,
  TransactionItemValue,
} from "@/schema/auth/transactionZodSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import CustomerSearchInput from "./CustomerSearchInput";
import DatePicker from "./DatePicker";
import MultiServiceSelect from "./MultiServiceSelect";
import { Card } from "@/components/ui/card";
import SelectedServiceCard from "./SelectedServiceCard";
import { useMutation } from "@tanstack/react-query";
import { createTransactionAction } from "@/lib/actions/dashboardActions";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";

type ConfiguredBranchType = { title: string; id: string };
export type ConfiguredServiceUnitType = {
  title: string;
  price: number;
  id: string;
  branchId: string;
};

const CreateTransactionForm = ({
  services,
  branches,
}: {
  services: ConfiguredServiceUnitType[];
  branches: ConfiguredBranchType[];
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<CreateTransactionValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      customerName: "",
      branch: "",
      items: [],
      paymentMethod: "CASH",
      bookingOption: "now",
      bookingDate: new Date(),
    },
  });

  const bookingOption = form.watch("bookingOption");

  useEffect(() => {
    if (bookingOption === "now") {
      form.setValue("bookingDate", new Date());
      form.clearErrors("bookingDate");
    } else {
      form.setValue("bookingDate", undefined);
    }
  }, [bookingOption, form]);

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleServiceToggle = (service: TransactionItemValue) => {
    const itemIndex = fields.findIndex(
      (item) => item.serviceUnitId === service.serviceUnitId
    );
    if (itemIndex > -1) {
      remove(itemIndex);
    } else {
      append(service);
    }
  };

  const watchedBranch = form.watch("branch");
  const filteredServices = services.filter((s) => s.branchId === watchedBranch);

  function onIncrease(serviceId: string) {
    const index = fields.findIndex((item) => item.id === serviceId);
    if (index !== -1) {
      const current = fields[index];
      update(index, { ...current, quantity: current.quantity + 1 });
    }
  }

  function onDecrease(serviceId: string) {
    const index = fields.findIndex((item) => item.id === serviceId);
    if (index !== -1) {
      const current = fields[index];
      if (current.quantity > 1) {
        update(index, { ...current, quantity: current.quantity - 1 });
      } else {
        remove(index);
      }
    }
  }

  function onRemove(serviceId: string) {
    const index = fields.findIndex((item) => item.id === serviceId);
    if (index !== -1) {
      remove(index);
    }
  }

  const grandTotal = fields.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const { mutate, isPending } = useMutation({
    mutationFn: createTransactionAction,
    onSuccess: (data) => {
      toast(data?.message);
      closeButtonRef.current?.click();
    },
    onError: (data) => {
      toast(data.message);
    },
  });

  function onSubmit(values: CreateTransactionValues) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <DialogClose asChild>
          <button ref={closeButtonRef} className="hidden" />
        </DialogClose>
        <CustomerSearchInput
          onSelect={(name) => form.setValue("customerName", name)}
          control={form.control}
          name="customerName"
        />

        <div className="grid grid-cols-2 gap-4 items-start">
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bookingOption"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Booking Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select booking time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="now">Now</SelectItem>
                    <SelectItem value="later">Later</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {bookingOption === "later" && (
          <FormField
            control={form.control}
            name="bookingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Booking Date & Time</FormLabel>
                <DatePicker value={field.value} onChange={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="space-y-2">
          <FormLabel>Services</FormLabel>
          <MultiServiceSelect
            services={filteredServices}
            selectedItems={fields}
            onToggle={handleServiceToggle}
            isDisabled={!watchedBranch}
          />
          <FormField
            control={form.control}
            name="items"
            render={() => <FormMessage />}
          />
        </div>

        <Card className="p-2">
          {fields.length > 0 ? (
            fields.map((item) => (
              <SelectedServiceCard
                key={item.id}
                onDecrease={() => onDecrease(item.id)}
                onIncrease={() => onIncrease(item.id)}
                onRemove={() => onRemove(item.id)}
                quantity={item.quantity}
                service={item}
              />
            ))
          ) : (
            <p className="mx-auto text-center font-medium text-muted-foreground capitalize">
              No service selected
            </p>
          )}
        </Card>

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH">Cash</SelectItem>
                    <SelectItem value="BANK">Bank</SelectItem>
                    <SelectItem value="EWALLET">E-Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="">
          <p>
            Grand Total:<span className="font-medium"> {grandTotal}</span>
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <LoaderCircle className="animate-spin" />}
          Create Transaction
        </Button>
      </form>
    </Form>
  );
};

export default CreateTransactionForm;
