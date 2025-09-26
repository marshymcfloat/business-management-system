import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateTransactionFormDataContainer from "./CreateTransactionFormDataContainer";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";

const BookButton = () => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className=" absolute bottom-4 right-4 hover:bottom-4.5  "
      >
        <Button className="size-12 rounded-full">
          <Plus className="size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Add Service</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Card className="w-[300px] h-[500px]"></Card>}>
          <CreateTransactionFormDataContainer />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default BookButton;
