"use client";

import {
  BellRing,
  Crown,
  DoorOpenIcon,
  LogIn,
  ShoppingBag,
  ShoppingCart,
  User,
  User2Icon,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function HeaderPublic() {
  const { data: session } = authClient.useSession();
  if (!session) {
    return (
      <header className="fixed m-auto justify-between items-center text-shadow-sidebar-accent-foreground text-white font-semibold --font-inter flex flex-row top-0 left-0 right-0 w-screen bg-zinc-900 shadow-sm ">
        <span className="justify-self-start pl-3">
          <Image src={Logo} alt="logo" height={40} width={40} />
        </span>
        <span className="flex flex-row items-center gap-4 p-4">
          <span className="">
            <Link href="#">
              <ShoppingCart />
            </Link>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-1 items-center justify-center">
              <User /> Entre / Cadastre-se
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => redirect("/api/auth/login")}>
                <LogIn /> Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => redirect("/api/auth/signup")}>
                <UserPlus /> Criar conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </header>
    );
  }

  return (
    <header className="fixed m-auto justify-between items-center text-shadow-sidebar-accent-foreground text-white font-semibold --font-inter flex flex-row top-0 left-0 right-0 w-screen bg-zinc-900 shadow-sm ">
      <span className="justify-self-start pl-3">
        <Image src={Logo} alt="logo" height={40} width={40} />
      </span>

      <span className="flex flex-row justify-center items-center gap-4 p-4">
        <span className="">
          <Link href="#">
            <ShoppingCart />
          </Link>
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <BellRing />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <ShoppingBag /> Compra confirmada #1232
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row gap-1 items-center justify-center">
            {/* <User /> {session.user.name} */}
            {session.user.role === "admin" ? (
              <>
                <Crown /> {session.user.name}
              </>
            ) : (
              <>
                <User /> {session.user.name}
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <User2Icon /> Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShoppingBag /> Compras
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => authClient.signOut()}>
              <DoorOpenIcon /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </header>
  );
}
