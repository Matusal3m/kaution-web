import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { create, all } from "@/shared/services/api/category-service";
import { Stock } from "@/shared/types";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo duas caractéries" })
    .max(50, { message: "o nome não deve ultrapassar 5 caractéries" }),
  stockId: z.number({ required_error: "É preciso escolher um estoque" }),
});

interface CategoryFormProps {
  onSucess: () => void;
}

export function CategoryForm({ onSucess }: CategoryFormProps) {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      setStocks(await all());
    };
    fetchStocks();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({ name, stockId }: z.infer<typeof formSchema>) {
    await create({ name, stockId });
  }

  if (form.formState.isSubmitSuccessful) {
    onSucess();
  }

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
          control={form.control}
          name="stockId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um estoque para a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stocks.map((stock) => (
                    <SelectItem key={stock.id} value={stock.id}>
                      {stock.name}
                    </SelectItem>
                  ))}
                </SelectContent>
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
