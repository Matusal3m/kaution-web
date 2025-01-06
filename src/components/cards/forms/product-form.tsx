import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import {
  CategoryDashboardResponse,
  getCategories,
} from "@/shared/services/api/dashboard-service";
import { create } from "@/shared/services/api/product-service";

type selectItemsData = Record<
  string,
  {
    stock: { id: number; name: string };
    categories: Array<{ id: number; name: string }>;
  }
>;

function generateSelectGroups(selectItemsData: selectItemsData) {
  const selectGroups = [];
  for (const key in selectItemsData) {
    const { categories, stock } = selectItemsData[key];

    const selectGroup = (
      <SelectGroup>
        <SelectLabel>{stock.name}</SelectLabel>
        {categories.map((category) => (
          <SelectItem
            value={`{"categoryId": "${category.id}"}, "stockId": "${stock.id}"`}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectGroup>
    );

    selectGroups.push(selectGroup);
  }

  return selectGroups;
}

function parseSelectItemsData(categoriesData: CategoryDashboardResponse) {
  const selectItemsData: selectItemsData = {};

  categoriesData.forEach(({ stock, category }) => {
    const key = stock.name;
    const currentObj = selectItemsData[key];

    if (!currentObj) {
      selectItemsData[key] = { stock, categories: [category] };
      return;
    }

    const newCategories = [...currentObj.categories, category].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    selectItemsData[key] = { stock, categories: newCategories };
  });

  return selectItemsData;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo duas caractéries" })
    .max(50, { message: "O nome não deve ultrapassar 50 caractéries" }),
  description: z
    .string()
    .max(50, { message: "A descrição não deve ultrapassar 50 caractéries" })
    .default(""),
  quantity: z.number().default(0),
  ids: z.string(),
});

interface ProductFormProps {
  onSucess: () => void;
}

export function ProductForm({ onSucess }: ProductFormProps) {
  const [selectGroups, setSelectGroups] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const categoriesData = await getCategories();
      const selectItemsData = parseSelectItemsData(categoriesData);
      const selectGroups = generateSelectGroups(selectItemsData);

      setSelectGroups(selectGroups);
    };
    fetchStocks();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({
    name,
    description,
    quantity,
    ids,
  }: z.infer<typeof formSchema>) => {
    const { stockId, categoryId } = JSON.parse(ids) as {
      stockId: number;
      categoryId: number;
    };

    await create({ name, description, quantity, categoryId, stockId });
  };

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
              <FormLabel>Nome do produto</FormLabel>
              <Input
                placeholder="Cozinha, departamento de limpeza, etc..."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do produto</FormLabel>
              <Input
                placeholder="Chave de fenda, sabão em pó, etc..."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade inicial de produtos</FormLabel>
              <Input type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o local do produto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{selectGroups}</SelectContent>
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
