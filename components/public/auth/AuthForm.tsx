import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authLoginSchema, AuthLoginValue } from "@/schema/auth/authZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const form = useForm<AuthLoginValue>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginInputs = Object.keys(
    form.control._defaultValues
  ) as (keyof AuthLoginValue)[];

  return (
    <>
      <Form {...form}>
        <form action="" className="space-y-6">
          {loginInputs.map((input) => (
            <FormField
              key={input}
              control={form.control}
              name={input}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{input}</FormLabel>
                  <FormControl>
                    <Input type={input} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <p className="text-center">
            Dont have an account?{" "}
            <span className="underline underline-offset-4 font-medium cursor-pointer">
              Sign up
            </span>
          </p>
          <Button className="flex w-full mt-16">Login</Button>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
