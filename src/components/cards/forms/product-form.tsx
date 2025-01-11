import { Button } from "@/components/ui/button";
import {
  Form,
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
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import productService from "@/services/api/product-service";
import categoryService, { UserCategory } from "@/services/api/category-service";

type selectItemsData = Record<
  string,
  {
    stock: { id: number; name: string };
    categories: Array<{ id: number; name: string }>;
  }
>;

function renderSelectGroups(selectItemsData: selectItemsData) {
  const selectGroups = [];
  for (const key in selectItemsData) {
    const { categories, stock } = selectItemsData[key];

    const selectGroup = (
      <SelectGroup key={key}>
        <SelectLabel className="text-xl">{stock.name}</SelectLabel>
        {categories.length !== 0 &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={`{"categoryId": "${category.id}", "stockId": "${stock.id}"}`}
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

function parseSelectItemsData(categoriesData: UserCategory[]) {
  const selectItemsData: selectItemsData = {};

  categoriesData.forEach(({ stock: stockName, stockId, id, name }) => {
    const key = stockName;
    const category = { id, name };
    const stock = { id: stockId, name: stockName };
    const currentObj = selectItemsData[key];

    if (!currentObj) {
      selectItemsData[key] = {
        stock,
        categories: [category],
      };
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
    .max(50, { message: "A descrição não deve ultrapassar 50 caractéries" }),
  quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "O valor precisa ser um número",
  }),
  ids: z.string(),
});

async function onSubmit({
  name,
  description,
  quantity,
  ids,
}: z.infer<typeof formSchema>) {
  const { stockId, categoryId } = JSON.parse(ids) as {
    stockId: number;
    categoryId: number;
  };

  await productService.create({
    name,
    description,
    quantity: parseInt(quantity),
    categoryId,
    stockId,
  });
}

interface ProductFormProps {
  onSucess: () => void;
}

export function ProductForm({ onSucess }: ProductFormProps) {
  const [selectGroups, setSelectGroups] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const categoriesData = await categoryService.all();
      const selectItemsData = parseSelectItemsData(categoriesData);
      const selectGroups = renderSelectGroups(selectItemsData);

      setSelectGroups(selectGroups);
    };
    fetchStocks();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      quantity: "0",
      ids: "",
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
        <Button disabled={form.formState.isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
