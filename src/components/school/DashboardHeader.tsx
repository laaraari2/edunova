"use client";

import Image from "next/image";
import {
  Search,
  CalendarDays,
  Bell,
  ChevronDown,
  School,
} from "lucide-react";

interface DashboardHeaderProps {
  institution?: {
    name: string;
    logo_url: string | null;
  } | null;
}

export default function DashboardHeader({ institution }: DashboardHeaderProps) {
  return (
    <div className="h-16 border-b flex items-center gap-3 px-5">

      {/* Welcome + School Card */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 w-full">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900">
            Tableau de bord
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            Voici un aperçu de votre établissement aujourd&apos;hui.
          </p>
        </div>

        {/* School Card */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm">
          {institution?.logo_url ? (
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
              <Image
                src={institution.logo_url}
                alt={institution.name || "École"}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#128b9d] flex items-center justify-center shrink-0">
              <School className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <p className="font-bold text-slate-800 text-sm">
              {institution?.name || "Mon École"}
            </p>
            <p className="text-xs text-slate-400">Casablanca, Maroc</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
        </div>

      </div>
    </div>
  );
}