"use client";

import { Product } from "@/shared/types";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

const validateValueChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setChangingValue: React.Dispatch<any>
) => {
  const value = event.target.value;

  if (value === "") {
    setChangingValue(0);
  }

  const newValue = parseInt(value);

  if (isNaN(newValue)) return;

  setChangingValue(newValue);
};

// Essa verificação da chamada precisa ser refeita, 
// o estado do React não é sincrono, logo o valor aqui acaba sendo o anterior.
// Isso precisa de correção para implemenar essa funcionalidade

const handeCellBlur = async (
  event: React.FocusEvent<HTMLInputElement>,
  previousDenifitiveValue: any,
  setDefinitiveValue: React.Dispatch<any>
) => {
  // Implementar o service para mudança do valor
  const newValue = parseInt(event.target.value);

  // Descomentar quando o estado for consertado
  
  // if (newValue === parseInt(previousDenifitiveValue as string)) {
  //   console.log("Valores iguais, requisão não é necessária");
  //   return;
  // }
  
  setDefinitiveValue(newValue);
  console.log("Requisão ao banco...");
};

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ renderValue }) => {
      const [prevValue, setPrevValue] = useState(renderValue());
      const [cellValue, setCellValue] = useState(prevValue);

      return (
        <input
          onBlur={(event) => handeCellBlur(event, prevValue, setPrevValue)}
          onChange={(event) => validateValueChange(event, setCellValue)}
          value={cellValue as string}
          className="w-12 text-center bg-transparent"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const productInformations = `Produto: ${product.name}\nDescrição: ${product.description}\nQuantidade: ${product.quantity}`;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(productInformations)}
            >
              Copiar informações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
