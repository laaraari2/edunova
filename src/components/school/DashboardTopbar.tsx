"use client";

import {
  Bell,
  Search,
  UserCircle2,
  Settings,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardTopbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">

      {/* Recherche */}

      <div className="relative w-[420px]">

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

        <Input
          placeholder="Rechercher un élève, une classe..."
          className="pl-10 h-11 rounded-xl"
        />

      </div>

      {/* Actions */}

      <div className="flex items-center gap-3">

        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
        >
          <Bell className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
        >
          <Settings className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3 rounded-xl border px-3 py-2">

          <UserCircle2 className="w-9 h-9 text-sky-500" />

          <div>

            <p className="font-semibold text-sm">
              Administrateur
            </p>

            <p className="text-xs text-slate-500">
              admin@school.com
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}