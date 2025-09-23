"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { useState } from "react";
import AuthForm from "./AuthForm";
const AuthButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>Get Started</Button>
        </DialogTrigger>

        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-center uppercase">Login</DialogTitle>
          </DialogHeader>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthButton;
