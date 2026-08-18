"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Clock3,
  CreditCard,
  Bell,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Paiements en attente",
    description: "18 familles n'ont pas encore payé ce mois.",
    color: "text-red-500",
    badge: "Urgent",
  },
  {
    id: 2,
    title: "Retards aujourd'hui",
    description: "13 élèves sont arrivés après 08:00.",
    color: "text-amber-500",
    badge: "Info",
  },
  {
    id: 3,
    title: "Réunion pédagogique",
    description: "Vendredi à 15:00.",
    color: "text-sky-500",
    badge: "Événement",
  },
];

export default function DashboardAlerts() {
  return (
    <Card className="rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="text-lg font-black">
            Alertes
          </h3>

          <p className="text-sm text-slate-500">
            Informations importantes
          </p>
        </div>

        <Bell className="w-7 h-7 text-sky-500" />

      </div>

      <div className="space-y-4">

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className="rounded-2xl border p-4 hover:bg-slate-50 transition"
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                {alert.id === 1 && (
                  <CreditCard className="w-5 h-5 text-red-500 mt-1" />
                )}

                {alert.id === 2 && (
                  <Clock3 className="w-5 h-5 text-amber-500 mt-1" />
                )}

                {alert.id === 3 && (
                  <AlertTriangle className="w-5 h-5 text-sky-500 mt-1" />
                )}

                <div>

                  <h4 className="font-bold">
                    {alert.title}
                  </h4>

                  <p className="text-sm text-slate-500 mt-1">
                    {alert.description}
                  </p>

                </div>

              </div>

              <Badge>
                {alert.badge}
              </Badge>

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}