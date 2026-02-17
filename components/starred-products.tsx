"use server";

import ProductCard from "./product-card";
import { product } from "../app/generated/prisma/browser";
import { prisma } from "@/constructor/PrismaConstructor";

export default async function StarProducts() {
  const products = await prisma.product.findMany({
    where: {
      starred: true,
    },
  });

  return (
    <>
      <h1 className="text-center pt-36 sm:text-1xl md:text-3xl pb-10 text-black font-bold">
        Produtos em destaque
      </h1>

      <span className="mx-auto min-h-fit p-5 flex flex-row flex-10 max-w-screen tems-center justify-center  ">
        {products.map((p: product) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.name}
            price={p.price}
            description={p.description}
          />
        ))}
      </span>
    </>
  );
}
