"use client";

import {
  UserPlus,
  Receipt,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Nouvel élève inscrit",
    subtitle: "Aucun enregistrement",
    time: "Aujourd'hui",
    icon: UserPlus,
    color: "bg-sky-100 text-sky-600",
  },
  {
    id: 2,
    title: "Paiement reçu",
    subtitle: "Aucun paiement",
    time: "Aujourd'hui",
    icon: Receipt,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Classe créée",
    subtitle: "Aucune classe",
    time: "Aujourd'hui",
    icon: GraduationCap,
    color: "bg-violet-100 text-violet-600",
  },
  {
    id: 4,
    title: "Présence enregistrée",
    subtitle: "Aucune présence",
    time: "Aujourd'hui",
    icon: CalendarDays,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function DashboardActivities() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-black">
          Activités récentes
        </h2>

        <button className="text-sky-600 text-sm font-semibold hover:underline">
          Voir tout
        </button>

      </div>

      <div className="space-y-4">

        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {activity.subtitle}
                  </p>

                </div>

              </div>

              <span className="text-xs text-slate-400">
                {activity.time}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}