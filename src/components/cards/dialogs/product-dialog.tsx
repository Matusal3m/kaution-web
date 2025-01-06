"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { ProductForm } from "../forms/product-form";
import { useState } from "react";

export function ProductDialog() {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>Criar Estoque</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Produto</DialogTitle>
        </DialogHeader>
        <ProductForm onSucess={closeDialog} />
        <DialogFooter>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
