"use client";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchCustomersAction } from "@/lib/actions/dashboardActions";
import { useEffect, useRef, useState } from "react";
import { Control, Path, FieldValues } from "react-hook-form";

type CustomerSearchInputProps<T extends FieldValues> = {
  onSelect: (name: string) => void;
  control: Control<T>;
  name: Path<T>;
};

const CustomerSearchInput = <T extends FieldValues>({
  control,
  name,
  onSelect,
}: CustomerSearchInputProps<T>) => {
  const [customerSuggestion, setCustomerSuggestion] = useState<
    { name: string; id: string }[]
  >([]);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch customers with debounce
  useEffect(() => {
    if (!searchTerm) {
      setCustomerSuggestion([]);
      setSuggestionVisible(false);
      return;
    }

    const debounce = setTimeout(async () => {
      const response = await searchCustomersAction(searchTerm);
      if ("data" in response && response.data) {
        setCustomerSuggestion(response.data);
      } else {
        setCustomerSuggestion([]);
      }
      setSuggestionVisible(true);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setCustomerSuggestion([]);
        setSuggestionVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Customer Name</FormLabel>
          <FormControl>
            <div ref={wrapperRef} className="relative">
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setSearchTerm(e.target.value);
                }}
                autoComplete="off"
              />
              {suggestionVisible && (
                <Card className="absolute w-full p-1 py-2 rounded-md mt-2 z-10 border bg-background">
                  {customerSuggestion.length > 0 ? (
                    customerSuggestion.map((customer) => (
                      <p
                        key={customer.id}
                        onClick={() => {
                          onSelect(customer.name);
                          setSearchTerm(customer.name);
                          setSuggestionVisible(false);
                        }}
                        className="cursor-pointer hover:bg-muted p-1 rounded"
                      >
                        {customer.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground font-medium text-sm p-1">
                      No Customer Found
                    </p>
                  )}
                </Card>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomerSearchInput;
