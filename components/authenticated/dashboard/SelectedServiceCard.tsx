// components/authenticated/dashboard/SelectedServiceCard.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { TransactionItemValue } from "@/schema/auth/transactionZodSchema";

type SelectedServiceCardProps = {
  service: TransactionItemValue;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

const SelectedServiceCard = ({
  service,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: SelectedServiceCardProps) => {
  const totalPrice = service.price * quantity;

  return (
    <div className="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-amber-100 p-4 text-card-foreground shadow-sm">
      <div className="flex-1">
        <p className="font-semibold ">{service.title}</p>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(service.price)} / unit
        </p>
      </div>

      <div className="mt-4 flex w-full items-center justify-between sm:mt-0 sm:w-auto sm:justify-start sm:gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={onDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-bold">{quantity}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={onIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="min-w-[100px] text-right font-medium">
          {formatCurrency(totalPrice)}
        </p>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SelectedServiceCard;
