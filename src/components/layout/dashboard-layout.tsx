import Link from "next/link";
import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

import { Check, Home, Menu } from "lucide-react";

import ClerkUserButton from "@/components/molecule/clerk-user-button";
import SubscribeButton from "@/components/molecule/subscribe-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePlan } from "@/hooks/use-plan";
import { api } from "@/utils/api";

import ClickableLogo from "../molecule/clickable-logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  const sync = api.user.sync.useMutation();

  useEffect(() => {
    if (user) {
      sync.mutate({
        email: user.primaryEmailAddress?.emailAddress ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden h-screen border-r bg-muted/40 md:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-16 items-center border-b px-4">
            <ClickableLogo />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <UpgradeCTA />
          </div>
        </div>
      </div>
      <div className="flex h-screen flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-muted/40 p-4 md:justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <ClickableLogo />
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </nav>
              <div className="mt-auto">
                <UpgradeCTA />
              </div>
            </SheetContent>
          </Sheet>
          <div>
            <ClerkUserButton />
          </div>
        </header>
        <main className="flex flex-1 flex-col overflow-scroll p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function UpgradeCTA() {
  const plan = usePlan();

  if (plan === "free")
    return (
      <Card>
        <CardHeader className="px-4 pb-2 pt-4">
          <CardTitle>Upgrade to Pro</CardTitle>
          <CardDescription>
            Unlock more customizability with Pro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-4 pb-4 pt-2">
          <ul className="text-sm">
            <li className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Instant link redirect</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Customize QR</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Customize link slugs</span>
            </li>
          </ul>
          <SubscribeButton billing="annually" className="w-full">
            Upgrade
          </SubscribeButton>
        </CardContent>
      </Card>
    );

  return null;
}