"use client";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
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

export default function RecoverPage() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [buttonLoadingEnd, setButtonLoadingEnd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSignUp = async () => {
    setButtonLoading(true);
    // TODO: Implementar lógica de recuperação
    toast.info("Funcionalidade em desenvolvimento.");
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
              <FieldDescription>
                Digite seu e-mail para recuperar sua senha
              </FieldDescription>
              <Input
                onChange={handleInputChange}
                id="email"
                autoComplete="off"
                placeholder="joao@exemplo.com"
                required
              />
            </Field>
          </FieldGroup>
          <Field>
            <Button
              disabled={buttonLoading || !allInputsFilled}
              onClick={handleSignUp}
              type="submit"
            >
              {buttonLoading ? <Spinner /> : "Enviar"}{" "}
              {buttonLoadingEnd && "Link enviado!"}
            </Button>
          </Field>
        </FieldSet>
      </section>
    </>
  );
}
