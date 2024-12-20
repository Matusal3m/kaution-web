"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface CreateCardProps {
  title: string;
  content: string;
  button: {
    action: () => void;
    text: string;
  };
}

const cards: CreateCardProps[] = [
  {
    title: "Estoque",
    content: "Crie um para conter várias categorias",
    button: {
      action: () => {},
      text: "Criar estoque",
    },
  },
  {
    title: "Categoria",
    content: "Crie uma para agrupar vários produtos",
    button: {
      action: () => {},
      text: "Criar categoria",
    },
  },
  {
    title: "Produto",
    content: "Registre as informações de um item no seu estoque",
    button: {
      action: () => {},
      text: "Criar produto",
    },
  },
];

export function AddContentCards() {
  return (
    <div className="flex w-full gap-4 justify-between my-4">
      {cards.map((card) => (
        <Card className="flex flex-col justify-between w-1/3" key={card.title} >
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent className="h-1/3">
            <p>{card.content}</p>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            <Button onClick={card.button.action} className="w-full">
              {card.button.text}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
