"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "../forms/product-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const closeDialog = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>Criar Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
        </DialogHeader>
        <ProductForm onSucess={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
