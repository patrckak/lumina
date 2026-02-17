import NotFound from "@/app/not-found";
import HeaderPublic from "@/components/header";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const { data: session } = await authClient.getSession();

  if (!session || session.user.role != "admin") {
    return <NotFound />;
  } else
    return (
      <>
        <section className="min-h-screen min-w-screnn bg-slate-900">
          <h1>Cadastro de produto</h1>
        </section>
      </>
    );
}
