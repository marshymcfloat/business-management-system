import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const BookButton = () => {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className=" absolute bottom-4 right-4 hover:bottom-4.5 "
      >
        <Button className="size-12 rounded-full">
          <Plus className="size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookButton;
