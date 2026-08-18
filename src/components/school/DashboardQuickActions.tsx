"use client";

import {
  UserPlus,
  Receipt,
  GraduationCap,
  CalendarDays,
  BookOpen,
  Settings,
} from "lucide-react";

const actions = [
  {
    title: "Nouvel élève",
    icon: UserPlus,
    color: "bg-sky-100 text-sky-600",
  },
  {
    title: "Encaissement",
    icon: Receipt,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Nouvelle classe",
    icon: GraduationCap,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Présences",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Notes",
    icon: BookOpen,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Paramètres",
    icon: Settings,
    color: "bg-slate-100 text-slate-700",
  },
];

export default function DashboardQuickActions() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6">

      <h2 className="text-xl font-black mb-6">
        Actions rapides
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="rounded-2xl border border-slate-200 hover:border-sky-400 transition p-5 flex flex-col items-center gap-3 hover:shadow-md"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color}`}
              >
                <Icon className="w-7 h-7" />
              </div>

              <span className="font-semibold text-sm text-center">
                {action.title}
              </span>
            </button>
          );
        })}

      </div>

    </div>
  );
}