"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StockDialog } from "./dialogs/stock-dialog";
import { CategoryDialog } from "./dialogs/category-dialog";

interface CardProps {
  title: string;
  content: string;
  key: "stock-card" | "category-card" | "product-card";
  dialog?: JSX.Element;
}

const cards: CardProps[] = [
  {
    title: "Estoque",
    content: "Crie um para conter várias categorias",
    key: "stock-card",
    dialog: <StockDialog />,
  },
  {
    title: "Categoria",
    content: "Crie uma para agrupar vários produtos",
    key: "category-card",
    dialog: <CategoryDialog />,
  },
  {
    title: "Produto",
    content: "Registre as informações de um item no seu estoque",
    key: "product-card",
  },
];

export function ContentCards() {
  return (
    <div className="flex w-full gap-4 justify-between my-4">
      {cards.map((card) => (
        <Card className="flex flex-col justify-between w-1/3" key={card.key}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent className="h-1/3">
            <p>{card.content}</p>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            {card.dialog}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
