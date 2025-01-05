"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";

import { useState } from "react";

import { StockForm } from "../forms/stock-form";

export function StockDialog() {
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
          <DialogTitle>Criar estoque</DialogTitle>
          <StockForm onSucess={closeDialog} />
        </DialogHeader>
        <DialogFooter>
          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
