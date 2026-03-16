"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  History,
  CreditCard,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react";
import { supabase } from "../../lib/supabase/client";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/generator",
    label: "Generator",
    icon: Wand2,
  },
  {
    href: "/dashboard/history",
    label: "History",
    icon: History,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-white/5 lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              <Sparkles className="h-4 w-4 text-cyan-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Selliora AI</p>
              <p className="text-xs text-white/45">Dashboard</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                  isActive
                    ? "border-cyan-400/20 bg-cyan-400/10 text-white"
                    : "border-transparent text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-300" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <p className="text-sm font-medium text-white">Selliora Workspace</p>
            <p className="mt-1 text-xs leading-5 text-white/60">
              Manage content generation, usage, billing, and credits.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}