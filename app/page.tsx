import { GradientBackground } from "@/components/gradient-background";
import HeaderPublic from "@/components/header";
import HomeLogo from "@/components/homeLogo";
import StarProducts from "@/components/starred-products";

export default function Home() {
  return (
    <>
      <section
        id="inicio"
        className="h-[50vh] min-w-screen bg-linear-to-bl flex flex-col  "
      >
        <GradientBackground className="shadow-2xl flex min-h-full min-w-full items-center justify-center">
          <HeaderPublic />
          <HomeLogo />
        </GradientBackground>
      </section>

      <section
        id="destaques"
        className="min-h-screen min-w-screen bg-zinc-100 shadow-lg"
      >
        <StarProducts />
      </section>
      <section className="min-h-screen min-w-screen">newsletter + info</section>
    </>
  );
}
