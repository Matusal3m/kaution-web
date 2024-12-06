"use client";

import { ColumnDef } from "@tanstack/react-table";

export type InformationAboutUserStock = {
  id: string;
  type: "stocks" | "categories" | "products";
  quantity: number;
};

const translateTypeToPortuguese = (type: string) => {
  switch (type) {
    case "stocks":
      return "Estoques";
    case "categories":
      return "Categorias";
    case "products":
      return "Produtos";
    default:
      return type;
  }
};

export const homeColumns: ColumnDef<InformationAboutUserStock>[] = [
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ renderValue }) => (
      <div>{translateTypeToPortuguese(renderValue() as string)}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantidade existente",
  },
];
