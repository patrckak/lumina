import { createAuthClient } from "better-auth/react";
import "dotenv/config";
import { toast } from "sonner";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [adminClient()],
});

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      pt: string;
    }
  >
>;
const errorCodes = {
  PASSWORD_TOO_SHORT: {
    en: "password is too short",
    pt: "A senha é muito curta.",
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    en: "user already registered",
    pt: "Usuário já cadastrado, utilize outro e-mail.",
  },
  USER_ALREADY_EXISTS: {
    en: "user already registered",
    pt: "Usuário já cadastrado.",
  },
  INVALID_EMAIL: {
    en: "invalid email address",
    pt: "Endereço de e-mail inválido.",
  },
  EMAIL_NOT_VERIFIED: {
    en: "email not verified",
    pt: "E-Mail não foi verificado.",
  },
  ACCOUNT_NOT_FOUND: {
    en: "account not found",
    pt: "Conta não encontrada.",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: "password or email is incorrect",
    pt: "Senha ou Email incorretos.",
  },
  INVALID_PASSWORD: {
    en: "invalid password",
    pt: "Senha ou Email incorretos!",
  },
  SESSION_EXPIRED: {
    en: "session expired",
    pt: "Sessão expirou, faça login novamente.",
  },
} satisfies ErrorTypes;
export const getErrorMessage = (code: string | any, lang: "pt" | "en") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "Erro interno, contate o suporte.";
};
const { error } = await authClient.signUp.email({
  email: "user@email.com",
  password: "password",
  name: "User",
});
if (error?.code) {
  console.log(getErrorMessage(error.code, "pt"));
}
