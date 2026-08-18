"use client";

import { Card } from "@/components/ui/card";
import {
  UserPlus,
  CreditCard,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const activities = [
  {
    id: 1,
    icon: UserPlus,
    color: "text-emerald-500",
    title: "Nouvel élève inscrit",
    description: "Ahmed Ben Ali",
    time: "Il y a 10 min",
  },
  {
    id: 2,
    icon: CreditCard,
    color: "text-sky-500",
    title: "Paiement reçu",
    description: "Frais de scolarité",
    time: "Il y a 30 min",
  },
  {
    id: 3,
    icon: GraduationCap,
    color: "text-purple-500",
    title: "Classe créée",
    description: "6APG-A",
    time: "Aujourd'hui",
  },
  {
    id: 4,
    icon: BookOpen,
    color: "text-amber-500",
    title: "Nouvelle matière",
    description: "Informatique",
    time: "Hier",
  },
];

export default function RecentActivities() {
  return (
    <Card className="rounded-3xl p-6 shadow-sm">

      <div className="mb-6">

        <h3 className="text-lg font-black">
          Activités récentes
        </h3>

        <p className="text-sm text-slate-500">
          Dernières opérations effectuées.
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((activity) => {

          const Icon = activity.icon;

          return (

            <div
              key={activity.id}
              className="flex items-start gap-4"
            >

              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

                <Icon
                  className={`w-5 h-5 ${activity.color}`}
                />

              </div>

              <div className="flex-1">

                <p className="font-bold">
                  {activity.title}
                </p>

                <p className="text-sm text-slate-500">
                  {activity.description}
                </p>

              </div>

              <span className="text-xs text-slate-400 whitespace-nowrap">
                {activity.time}
              </span>

            </div>

          );
        })}

      </div>

    </Card>
  );
}