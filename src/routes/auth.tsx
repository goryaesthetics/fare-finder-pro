import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in / 登入 — Flight Price Notifier" },
      {
        name: "description",
        content: "登入或註冊 Flight Price Notifier，開始追蹤台北出發的機票價格。",
      },
      { property: "og:title", content: "Sign in / 登入 — Flight Price Notifier" },
      {
        property: "og:description",
        content: "Sign in or create an account to start tracking flight prices.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handle(mode: "in" | "up", event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    setError(null);
    setPending(true);
    try {
      if (mode === "in") await signIn(email, password);
      else await signUp(email, password);
      await navigate({ to: "/app" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="surface-halo flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <Link to="/" className="mb-8 flex items-center gap-2 font-semibold tracking-tight">
        <Plane className="size-5 text-primary" />
        Flight Price Notifier
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6">
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in / 登入</TabsTrigger>
            <TabsTrigger value="signup">Sign up / 註冊</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form className="mt-6 space-y-4" onSubmit={(e) => handle("in", e)}>
              <Field />
              <Button type="submit" className="w-full" disabled={pending}>
                登入
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form className="mt-6 space-y-4" onSubmit={(e) => handle("up", e)}>
              <Field />
              <Button type="submit" className="w-full" disabled={pending}>
                註冊
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}

function Field() {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password / 密碼</Label>
        <Input id="password" name="password" type="password" required minLength={6} />
      </div>
    </>
  );
}
