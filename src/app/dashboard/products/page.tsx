"use client";

import { Product } from "@/shared/types";
import { productColumns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table";
import { useStorage } from "@/contexts/storeage";

async function getData(): Promise<Product[]> {
  return [
    {
      id: "728ed52f",
      name: "Queijo",
      description: "Apenas para clientes",
      quantity: 10,
    },
    {
      id: "a1b2c3d4",
      name: "Leite",
      description: "Produto fresco e pasteurizado",
      quantity: 20,
    },
    {
      id: "e5f6g7h8",
      name: "Pão",
      description: "Pão francês recém-saído do forno",
      quantity: 50,
    },
    {
      id: "i9j0k1l2",
      name: "Manteiga",
      description: "Manteiga sem sal de alta qualidade",
      quantity: 15,
    },
    {
      id: "m3n4o5p6",
      name: "Arroz",
      description: "Arroz branco tipo 1",
      quantity: 30,
    },
    {
      id: "q7r8s9t0",
      name: "Feijão",
      description: "Feijão preto selecionado",
      quantity: 25,
    },
    {
      id: "u1v2w3x4",
      name: "Açúcar",
      description: "Açúcar refinado para todas as ocasiões",
      quantity: 40,
    },
    {
      id: "y5z6a7b8",
      name: "Café",
      description: "Café moído premium",
      quantity: 18,
    },
    {
      id: "c9d0e1f2",
      name: "Macarrão",
      description: "Macarrão tipo espaguete",
      quantity: 12,
    },
    {
      id: "g3h4i5j6",
      name: "Óleo de cozinha",
      description: "Óleo de soja refinado",
      quantity: 22,
    },
    {
      id: "k7l8m9n0",
      name: "Sabonete",
      description: "Sabonete hidratante com fragrância de lavanda",
      quantity: 35,
    },
    {
      id: "o1p2q3r4",
      name: "Shampoo",
      description: "Shampoo para cabelos secos",
      quantity: 10,
    },
    {
      id: "s5t6u7v8",
      name: "Condicionador",
      description: "Condicionador para cabelos cacheados",
      quantity: 8,
    },
    {
      id: "w9x0y1z2",
      name: "Papel higiênico",
      description: "Pacote com 12 rolos",
      quantity: 50,
    },
    {
      id: "a3b4c5d6",
      name: "Farinha de trigo",
      description: "Farinha tipo 1 para panificação",
      quantity: 14,
    },
    {
      id: "e7f8g9h0",
      name: "Chocolate",
      description: "Barra de chocolate ao leite",
      quantity: 17,
    },
    {
      id: "i1j2k3l4",
      name: "Refrigerante",
      description: "Refrigerante de cola 2L",
      quantity: 24,
    },
    {
      id: "m5n6o7p8",
      name: "Água mineral",
      description: "Garrafa de água mineral 1,5L",
      quantity: 60,
    },
    {
      id: "q9r0s1t2",
      name: "Detergente",
      description: "Detergente líquido neutro",
      quantity: 20,
    },
    {
      id: "u3v4w5x6",
      name: "Esponja de limpeza",
      description: "Esponja multiuso para cozinha",
      quantity: 30,
    },
    {
      id: "y7z8a9b0",
      name: "Sabão em pó",
      description: "Sabão em pó para roupas brancas",
      quantity: 15,
    },
  ];
}

export default function ProductsDashboard() {
  const { products } = useStorage();

  return <DataTable columns={productColumns} data={products} />;
}
