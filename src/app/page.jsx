import { cookies } from "next/headers";
import Calculators from "../components/Calculators";
import ThemeToggle from "../components/ThemeToggle";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieMode = cookieStore.get("hbc-theme-mode")?.value;
  const initialMode = cookieMode === "dark" || cookieMode === "light" || cookieMode === "system" ? cookieMode : "system";

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--bg-base) text-(--text-primary)">
      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:px-8 md:py-14">
        <section className="rounded-4xl border border-(--border-soft) bg-(--hero-surface) p-7 shadow-[0_20px_80px_var(--hero-shadow)] backdrop-blur-sm md:p-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-(--text-muted)">Home Brewer Toolkit</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-(--text-primary) md:text-5xl">Kalkulatory i przeliczniki dla piwowara domowego</h1>
            </div>
            <ThemeToggle initialMode={initialMode} />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-(--text-muted) md:text-base">
            Wa<span className="font-bold text-[18px]">rz i rz</span>ądź...
          </p>
        </section>

        <section className="rounded-4xl border border-(--border-soft) bg-(--surface-1) p-4 shadow-[0_10px_50px_var(--surface-shadow)] backdrop-blur md:p-6">
          <Calculators />
        </section>
      </div>
    </main>
  );
}
