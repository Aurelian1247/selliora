"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  Wand2,
  History,
  CreditCard,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/generator", label: "Generator", icon: Wand2 },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const menu = (
    <div className="fixed inset-0 z-[999999] bg-[#050816]">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <p className="text-white font-semibold">Menu</p>

        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-xl hover:bg-white/10"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-3 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white"
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* 🔥 PORTAL */}
      {mounted && open && createPortal(menu, document.body)}
    </>
  );
}