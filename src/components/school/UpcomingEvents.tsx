"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Réunion pédagogique",
    date: "05 Septembre",
    icon: Users,
    color: "text-sky-500",
  },
  {
    id: 2,
    title: "Rentrée scolaire",
    date: "08 Septembre",
    icon: GraduationCap,
    color: "text-emerald-500",
  },
  {
    id: 3,
    title: "Examens du 1er semestre",
    date: "15 Décembre",
    icon: BookOpen,
    color: "text-purple-500",
  },
];

export default function UpcomingEvents() {
  return (
    <Card className="rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="text-lg font-black">
            Événements
          </h3>

          <p className="text-sm text-slate-500">
            Calendrier scolaire
          </p>
        </div>

        <CalendarDays className="w-7 h-7 text-sky-500" />

      </div>

      <div className="space-y-4">

        {events.map((event) => {

          const Icon = event.icon;

          return (

            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border p-4 hover:bg-slate-50 transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${event.color}`} />
                </div>

                <div>

                  <p className="font-bold">
                    {event.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {event.date}
                  </p>

                </div>

              </div>

              <Badge>
                À venir
              </Badge>

            </div>

          );
        })}

      </div>

    </Card>
  );
}