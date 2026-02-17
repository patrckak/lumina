"use client";

import { Button } from "@/components/ui/button";
import { CircleX, Home } from "lucide-react";
import { redirect } from "next/navigation";

export default function NotFound() {
  return (
    <section className="min-w-screen min-h-screen bg-slate-200 flex flex-row justify-center items-center">
      <span className="p-4 bg-slate-100 rounded-md text-1xl text-red-400 text-shadow-md flex flex-col gap-2 items-center justify-center">
        <span className="flex flex-row gap-2 items-center justify-center">
          <CircleX className="text-7xl" />
          <p className="text-neutral-800 font-medium">Página nao encontrada.</p>
        </span>
        <p className="text-sm text-neutral-500">Código: 404</p>
        <Button onClick={() => redirect("/")} variant={"link"}>
          <Home /> Ir para loja
        </Button>
      </span>
    </section>
  );
}
