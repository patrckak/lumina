"use client";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import googleLogo from "@/public/google.svg";
import appleLogo from "@/public/apple.svg";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getErrorMessage } from "../../../../lib/auth-client";
import { redirect, RedirectType } from "next/navigation";

export default function SignIn() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email!,
        password: formData.password!,
        name: formData.name,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          setButtonLoading(true);
        },
        onSuccess: (ctx) => {
          toast(
            "Conta criada! Verifique seu e-mail para confirmar seu cadastro.",
            {
              description() {
                return "Aguarde, você será redirecionado.";
              },
            },
          );
          setTimeout(() => {
            redirect("/");
          }, 2000);
        },
        onError: (ctx) => {
          toast(getErrorMessage(ctx.error.code, "pt"));
        },
      },
    );
    setButtonLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // todos inputs alterados
    const allFilled = Object.values({
      ...formData,
      [id]: value,
    }).every((val) => val && val.trim() !== "");
    setAllInputsFilled(allFilled);
    // senhas ===
    if (id === "password" || id === "confirmPassword") {
      const password = id === "password" ? value : formData.password || "";
      const confirmPassword =
        id === "confirmPassword" ? value : formData.confirmPassword || "";
      setPasswordsMatch(password === confirmPassword);
    }
  };
  return (
    <>
      <span
        onClick={() => redirect("/")}
        className="absolute p-2 rounded-full bg-slate-100 hover:drop-shadow-sm top-10 left-10"
      >
        <ChevronLeft size={20} />
      </span>
      <section className="flex flex-col gap-4 items-center min-h-screen min-w-screen bg-slate-200 dark:bg-slate-700">
        <FieldSet className="absolute bg-slate-100 top-24 p-5 m-4 rounded-md shadow-lg min-w-100 sm:max-w-25">
          <FieldTitle className="mx-auto">
            <h1 className="text-2xl hover:scale-101 text-center font-black --font-inter hover:text-purple-700 transition-all ease-in-out transition-duration-[900ms]">
              Lúmina <br />
              <p className="text-sm font-light">Iluminação eficiênte!</p>
            </h1>
          </FieldTitle>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="João"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">E-Mail</FieldLabel>
              <Input
                onChange={handleInputChange}
                id="email"
                autoComplete="off"
                placeholder="joao@exemplo.com"
                required
              />
              <FieldDescription>E-mail válido para contato</FieldDescription>
            </Field>
            <FieldGroup>
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
              <Field>
                <FieldLabel htmlFor="password">Confirme sua senha</FieldLabel>
                <Input
                  onChange={handleInputChange}
                  id="confirmPassword"
                  autoComplete="off"
                  type="password"
                  placeholder="••••••••"
                />
              </Field>
              {passwordsMatch ? null : (
                <FieldError>Senhas não coincidem</FieldError>
              )}
            </FieldGroup>
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
              disabled={buttonLoading || !passwordsMatch || !allInputsFilled}
              onClick={handleSignUp}
              type="submit"
            >
              {buttonLoading ? <Spinner /> : "Cadastrar"}
            </Button>
          </Field>
        </FieldSet>
      </section>
    </>
  );
}
