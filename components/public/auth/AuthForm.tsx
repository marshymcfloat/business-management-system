import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
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
import { createUserAction } from "@/lib/actions/authActions";
import {
  authLoginSchema,
  AuthLoginValue,
  AuthSignupValue,
  authSignupSchema,
} from "@/schema/auth/authZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormContentType = "login" | "signup";

const SignInForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const form = useForm<AuthLoginValue>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formInputs = Object.keys(
    authLoginSchema.shape
  ) as (keyof AuthLoginValue)[];

  return (
    <Form {...form}>
      <form action="" className="space-y-4">
        {formInputs.map((input) => (
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
          No account?{" "}
          <span
            className="font-medium underline underline-offset-2 cursor-pointer"
            onClick={onSwitch}
          >
            Sign up
          </span>
        </p>
        <Button className="w-full">Login</Button>
      </form>
    </Form>
  );
};

const SignUpForm = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const form = useForm<AuthSignupValue>({
    resolver: zodResolver(authSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formInputs = Object.keys(
    authSignupSchema.shape
  ) as (keyof AuthSignupValue)[];

  const { isSubmitting } = form.formState;
  const onSubmit = async (values: AuthSignupValue) => {
    try {
      const result = await createUserAction(values);

      if (!result.success) {
        toast(result.message);
        return;
      }

      const signInResponse = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!signInResponse?.ok || signInResponse.error) {
        toast(signInResponse?.error);

        return;
      }

      toast(result.message);
      router.push(`/${result.data?.id}`);
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <ChevronLeft
          className="absolute text-accent-foreground cursor-pointer size-4 rounded-full hover:bg-muted duration-150 transition-all  top-4 left-4"
          size={16}
          onClick={onBack}
        />
        {formInputs.map((input) => (
          <FormField
            key={input}
            control={form.control}
            name={input}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{input}</FormLabel>
                <FormControl>
                  <Input
                    type={input === "email" ? "email" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting && <LoaderCircle className="animate-spin" />}
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
const AuthForm = () => {
  const [formContent, setFormContent] = useState<FormContentType>("login");
  return (
    <>
      {formContent === "login" ? (
        <SignInForm onSwitch={() => setFormContent("signup")} />
      ) : (
        <SignUpForm onBack={() => setFormContent("login")} />
      )}
    </>
  );
};

export default AuthForm;
