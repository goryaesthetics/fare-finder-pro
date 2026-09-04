import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plane, BellRing, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const features = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: XCircle,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export default function Landing() {
  useEffect(() => {
    document.title = "Flight Price Notifier — 機票降價通知";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <Plane className="size-5 text-primary" />
            Flight Price Notifier
          </span>
          <Button asChild size="sm">
            <Link to="/auth">Sign in / 登入</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="surface-halo relative overflow-hidden">
          <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
            <Reveal>
              <p className="mb-5 inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                台北出發 · 東京 / 首爾
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                <span className="text-gradient">Flight Price Notifier</span>
              </h1>
              <p className="mt-6 text-xl font-medium sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                Set a route and a target price — we email you when the fare drops.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-9 flex justify-center">
                <Button asChild size="lg" style={{ boxShadow: "var(--shadow-glow)" }}>
                  <Link to="/auth">Sign in / 登入</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
                  <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary-glow">
                    <f.icon className="size-5" />
                  </span>
                  <h2 className="text-lg font-semibold">{f.title}</h2>
                  <p className="mt-1 text-sm text-primary-glow/80">{f.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}
