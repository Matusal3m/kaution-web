"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { AddContentCard } from "./add-content-cards";
import { Category, Product, Stock } from "@/shared/types";
import { kautionApiService } from "@/shared/services/api";

type FormValues = Stock | Category | Product;

export function AddContentDialogs() {
  const [openDialog, setOpenDialog] = useState<
    "stock" | "category" | "product" | null
  >(null);

  const form = useForm<FormValues>();

  const handleSubmit = async (data: FormValues) => {
    try {
      if (openDialog === "stock") {
        await kautionApiService.stock.create(data as Stock);
      } else if (openDialog === "category") {
        await kautionApiService.category.create(data as Category);
      } else if (openDialog === "product") {
        await kautionApiService.product.create(data as Product);
      }
      form.reset();
      setOpenDialog(null);
    } catch (error) {
      console.error("Error creating content:", error);
    }
  };

  return (
    <>
      <AddContentCard
        cards={[
          {
            title: "Estoque",
            content: "Crie um para conter várias categorias",
            button: {
              action: () => setOpenDialog("stock"),
              text: "Criar estoque",
            },
          },
          {
            title: "Categoria",
            content: "Crie uma para agrupar vários produtos",
            button: {
              action: () => setOpenDialog("category"),
              text: "Criar categoria",
            },
          },
          {
            title: "Produto",
            content: "Registre as informações de um item no seu estoque",
            button: {
              action: () => setOpenDialog("product"),
              text: "Criar produto",
            },
          },
        ]}
      />

      <Dialog
        open={openDialog === "stock"}
        onOpenChange={() => setOpenDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Estoque</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Input
              placeholder="Nome do Estoque"
              {...form.register("name", { required: "O nome é obrigatório" })}
            />
            <Button type="submit">Criar Estoque</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog === "category"}
        onOpenChange={() => setOpenDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Input
              placeholder="Nome da Categoria"
              {...form.register("name", { required: "O nome é obrigatório" })}
            />
            <Select {...form.register("stockId", { required: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Estoque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Estoque 1</SelectItem>
                <SelectItem value="2">Estoque 2</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Criar Categoria</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog === "product"}
        onOpenChange={() => setOpenDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Produto</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <Input
              placeholder="Nome do Produto"
              {...form.register("name", { required: "O nome é obrigatório" })}
            />
            <Input
              placeholder="Descrição"
              {...form.register("description", {
                required: "A descrição é obrigatória",
              })}
            />
            <Input
              placeholder="Quantidade"
              type="number"
              {...form.register("quantity", {
                required: "A quantidade é obrigatória",
              })}
            />
            <Select {...form.register("categoryId", { required: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a Categoria" />
              </SelectTrigger>
              <SelectContent>
                {/* Substitua com dados reais */}
                <SelectItem value="1">Categoria 1</SelectItem>
                <SelectItem value="2">Categoria 2</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Criar Produto</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
