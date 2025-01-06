import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { create } from "@/shared/services/api/stock-service";

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
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo duas caractéries" })
    .max(50, { message: "O nome não deve ultrapassar 50 caractéries" }),
});

async function onSubmit({ name }: z.infer<typeof formSchema>) {
  await create({ name });
}

interface StockFormProps {
  onSucess: () => void;
}

export function StockForm({ onSucess }: StockFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome para o Estoque</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cozinha, departamento de limpeza, etc..."
                  {...field}
                />
              </FormControl>
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
