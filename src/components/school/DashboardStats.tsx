"use client";

import {
  Users,
  GraduationCap,
  Wallet,
  BookOpen,
} from "lucide-react";

const stats = [
  {
    title: "Élèves",
    value: "1 542",
    icon: Users,
    color: "text-sky-600 bg-sky-50",
    evolution: "+12%",
    evolutionColor: "text-emerald-600 bg-emerald-50",
    sparklineColor: "stroke-sky-400",
    sparklineData: "M0,20 Q5,15 10,18 T20,10 T30,15 T40,5 T50,12 T60,8 T70,15 T80,5 T90,10 T100,2",
  },
  {
    title: "Enseignants",
    value: "86",
    icon: BookOpen,
    color: "text-indigo-600 bg-indigo-50",
    evolution: "+4%",
    evolutionColor: "text-emerald-600 bg-emerald-50",
    sparklineColor: "stroke-indigo-400",
    sparklineData: "M0,15 Q5,18 10,12 T20,15 T30,8 T40,12 T50,5 T60,10 T70,5 T80,12 T90,8 T100,15",
  },
  {
    title: "Classes",
    value: "52",
    icon: GraduationCap,
    color: "text-amber-600 bg-amber-50",
    evolution: "+2%",
    evolutionColor: "text-emerald-600 bg-emerald-50",
    sparklineColor: "stroke-amber-400",
    sparklineData: "M0,10 Q5,5 10,8 T20,15 T30,10 T40,18 T50,12 T60,15 T70,8 T80,12 T90,5 T100,10",
  },
  {
    title: "Revenus",
    value: "112 450",
    suffix: " DH",
    icon: Wallet,
    color: "text-emerald-600 bg-emerald-50",
    evolution: "+18%",
    evolutionColor: "text-emerald-600 bg-emerald-50",
    sparklineColor: "stroke-emerald-400",
    sparklineData: "M0,20 Q5,15 10,18 T20,12 T30,15 T40,8 T50,10 T60,5 T70,12 T80,8 T90,15 T100,5",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mt-1 flex items-baseline gap-1">
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-semibold text-slate-500">{stat.suffix}</span>}
                </h2>
              </div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold mb-3 relative z-10">
              <span className={`px-2 py-0.5 rounded-md ${stat.evolutionColor}`}>
                {stat.evolution}
              </span>
              <span className="text-slate-400 font-medium">vs mois dernier</span>
            </div>

            <div className="mt-auto pt-2 opacity-50">
              <svg viewBox="0 0 100 25" className="w-full h-8 overflow-visible">
                <path
                  d={stat.sparklineData}
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={stat.sparklineColor}
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}