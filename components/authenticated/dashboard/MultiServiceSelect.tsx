// components/authenticated/dashboard/MultiServiceSelect.tsx
// (This is the recommended component from the previous answer)
"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ConfiguredServiceUnitType } from "./CreateTransactionForm";
import { TransactionItemValue } from "@/schema/auth/transactionZodSchema";

type MultiServiceSelectProps = {
  services: ConfiguredServiceUnitType[];
  selectedItems: { serviceUnitId: string; [key: string]: any }[];
  onToggle: (service: TransactionItemValue) => void;
  isDisabled?: boolean;
};

const MultiServiceSelect = ({
  services,
  selectedItems,
  onToggle,
  isDisabled = false,
}: MultiServiceSelectProps) => {
  const selectedServiceIds = new Set(
    selectedItems.map((item) => item.serviceUnitId)
  );

  const getButtonText = () => {
    if (selectedItems.length === 0) return "Please Select Service/s";
    if (selectedItems.length === 1) {
      const service = services.find(
        (s) => s.id === selectedItems[0].serviceUnitId
      );
      return service?.title || "1 service selected";
    }
    return `${selectedItems.length} services selected`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            selectedItems.length === 0 && "text-muted-foreground"
          )}
          disabled={isDisabled}
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput placeholder="Search services..." />
          <CommandList>
            <CommandEmpty>No service found.</CommandEmpty>
            <CommandGroup>
              {services.map((service) => {
                const isSelected = selectedServiceIds.has(service.id);
                return (
                  <CommandItem
                    key={service.id}
                    onSelect={() =>
                      onToggle({
                        title: service.title,
                        price: service.price,
                        serviceUnitId: service.id,
                        quantity: 1,
                        id: service.id,
                      })
                    }
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {service.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiServiceSelect;
