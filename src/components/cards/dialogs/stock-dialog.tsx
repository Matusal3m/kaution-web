"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";

import { useState } from "react";

import { StockForm } from "../forms/stock-form";
import { useRouter } from "next/navigation";

export function StockDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const closeDialog = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>Criar Estoque</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar estoque</DialogTitle>
        </DialogHeader>
        <StockForm onSucess={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
