"use client";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import googleLogo from "@/public/google.svg";
import appleLogo from "@/public/apple.svg";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getErrorMessage } from "../../../../lib/auth-client";
import { redirect } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { email } from "../../../../lib/email-sender";
import { prisma } from "@/constructor/PrismaConstructor";
import { debt } from "../../../generated/prisma/browser";

export default function SignIn() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [saveSession, setSaveSession] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSaveSession = () => {
    setSaveSession(!saveSession);
  };

  const handleSignUp = async () => {
    setButtonLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: formData.email!,
      password: formData.password!,
      rememberMe: true,
      callbackURL: process.env.BETTER_AUTH_URL,
    });
    if (error) {
      toast.error(getErrorMessage(error.code, "pt"));
      setButtonLoading(false);

      return;
    }
    if (data.user) {
      let userSync = await prisma.user.findFirst({
        where: { authId: data.user.id },
      });

      if (!userSync) {
        let authIdStg = data.user.id.toString();
        let nameStg = data.user.name?.toString() || "Usuário Lúmina";
        let newUser = await prisma.user.create({
          data: {
            authId: authIdStg,
            name: nameStg,
            debtId: (await prisma.debt.create({ data: { debtValue: 0 } }))
              .debtId,
          },
        });
        if (newUser) {
          toast.success("Bem-vindo, " + nameStg + "!", {
            description: "Sua conta foi criada com sucesso.",
          });
        }
      }

      toast.success("Login realizado com sucesso!", {
        description: "Você será redirecionado.",
      });
      setTimeout(() => {
        redirect("/");
      }, 1500);
    }
    setButtonLoading(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // Check if all inputs are filled
    const allFilled = Object.values({
      ...formData,
      [id]: value,
    }).every((val) => val && val.trim() !== "");
    setAllInputsFilled(allFilled);
  };
  return (
    <>
      <span
        onClick={() => redirect("/")}
        className="absolute p-2 rounded-full bg-slate-100 hover:drop-shadow-sm top-10 left-10"
      >
        <ChevronLeft size={20} />
      </span>{" "}
      <section className="flex flex-col gap-4 items-center min-h-screen min-w-screen bg-slate-200 dark:bg-slate-700">
        <FieldSet className="absolute bg-slate-100 top-32 p-5 m-4 rounded-md shadow-lg min-w-100 sm:max-w-25">
          <FieldTitle className="mx-auto">
            <h1 className="text-2xl hover:scale-101 text-center font-black --font-inter hover:text-purple-700 transition-all ease-in-out transition-duration-[900ms]">
              Lúmina <br />
              <p className="text-sm font-light">Iluminação eficiênte!</p>
            </h1>
          </FieldTitle>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">E-Mail</FieldLabel>
              <Input
                onChange={handleInputChange}
                id="email"
                autoComplete="off"
                placeholder="joao@exemplo.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                onChange={handleInputChange}
                id="password"
                autoComplete="off"
                type="password"
                placeholder="••••••••"
              />
            </Field>
            <Field className="flex items-center justify-center flex-row">
              <Switch
                checked={saveSession}
                onClick={handleSaveSession}
                className="max-w-7.5"
                name="savesession"
              />
              <Label htmlFor="savesession">Lembrar de mim</Label>
            </Field>
          </FieldGroup>
          <FieldSeparator />
          <FieldGroup className="flex flex-col gap-2 items-center">
            <p className="text-center text-sm font-sans font-medium">
              Você também pode...
            </p>

            <div className="flex flex-row gap-3 items-center justify-center">
              <Button
                variant="link"
                className="hover:scale-102 transition-transform ease-in-out"
              >
                <Image src={googleLogo} alt="Google" width={30} height={30} />
              </Button>
              <Button
                variant="link"
                className="hover:scale-102 transition-transform ease-in-out"
              >
                <Image src={appleLogo} alt="Apple" width={30} height={30} />
              </Button>
            </div>
          </FieldGroup>
          <Field>
            <Button
              disabled={buttonLoading || !allInputsFilled}
              onClick={handleSignUp}
              type="submit"
            >
              {buttonLoading ? <Spinner /> : "Entrar"}
            </Button>
          </Field>
        </FieldSet>
      </section>
    </>
  );
}
