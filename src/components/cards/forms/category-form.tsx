"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { create } from "@/shared/services/api/category-service";
import { all } from "@/shared/services/api/stock-service";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo duas caractéries" })
    .max(50, { message: "O nome não deve ultrapassar 50 caractéries" }),
  stockId: z.string({ required_error: "É preciso escolher um estoque" }),
});

async function onSubmit({ name, stockId }: z.infer<typeof formSchema>) {
  await create({ name, stockId: parseInt(stockId) });
}

interface CategoryFormProps {
  onSucess: () => void;
}

export function CategoryForm({ onSucess }: CategoryFormProps) {
  const [selectItems, setSelectItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const renderSelectItem = async () => {
      const stocks = await all();

      const selectItems = stocks.map((stock) => (
        <SelectItem value={String(stock.id)} key={stock.id}>
          {stock.name}
        </SelectItem>
      ));

      setSelectItems(selectItems);
    };

    renderSelectItem();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      stockId: "",
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onSucess();
    }
  }, [onSucess, form.formState.isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome para a Categoria</FormLabel>
              <Input
                placeholder="Cozinha, departamento de limpeza, etc..."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="stockId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria do produto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estoque para a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{selectItems}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
