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
  const [isLoading, setIsLoading] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  const disableButton = () => {
    setIsLoading(true);
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>Criar Estoque</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar estoque</DialogTitle>
          <StockForm onSucess={closeDialog} onLoading={disableButton} />
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isLoading}>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
