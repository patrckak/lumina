"use client";

import Image from "next/image";
import bg from "@/public/bg.svg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, StarsIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface ProductCardProps {
  title: string;
  description: string | null;
  id: number;
  price: number;
  image?: any;
}

function ProductCard({
  title,
  description,
  id,
  price,
  image,
}: Readonly<ProductCardProps>) {
  image = bg || image;

  if (id) {
    return (
      <Card className="text-center w-fit bg-zinc-50 border-zinc-50 border-0 border-rounded-sm max-w-sm overflow-hidden transition-all hover:shadow-xl">
        <CardHeader className="p-0 mt-[-15]">
          <h3 className="text-2xl font-semibold">{title}</h3>
        </CardHeader>
        <Image src={image} alt={title} className="h-72 w-full object-cover" />
        <CardContent className="justify-center flex flex-col gap-4 p-2 group">
          <p className="text-sm text-wrap  -mt-5 mx-10 text-muted-foreground italic line-clamp-2">
            {description}
          </p>
          <span className="text-2xl transition-colors ease-in-out duration-500 font-semibold font-mono text-primary">
            R$ {price}
          </span>
          <Separator className="my-0 w-[50%] m-auto" />
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-col gap-2 items-center justify-center">
          <Button className="mx-auto w-full group transition-all duration-500 ease-in-out hover:bg-[#5d0ec0]">
            <span className="hidden group-hover:block transition-all ease-in-out duration-300">
              Adicionar ao carrinho
            </span>
            <ShoppingCart className="block group-hover:hidden transition-all ease-in-out duration-300" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
  return null;
}

export default ProductCard;
