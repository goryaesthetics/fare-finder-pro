import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/app")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "你的航線追蹤儀表板 — Flight Price Notifier dashboard." },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      { property: "og:description", content: "Your route-tracking dashboard." },
    ],
  }),
  component: AppShell,
});

function AppShell() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) void navigate({ to: "/auth", replace: true });
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Plane className="size-5 text-primary" />
            Flight Price Notifier
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={async () => {
              await signOut();
              await navigate({ to: "/", replace: true });
            }}
          >
            Sign out / 登出
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Hi {user?.email ?? ""}</h1>
        <div className="mt-8 rounded-2xl border border-border bg-card p-8">
          <p className="text-base">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
