"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserCheck,
  UserX,
  Clock3,
} from "lucide-react";

export default function AttendanceCard() {
  const total = 665;
  const present = 621;
  const absent = 31;
  const late = 13;

  const percentage = Math.round(
    (present / total) * 100
  );

  return (
    <Card className="rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black">
            Présence aujourd'hui
          </h3>

          <p className="text-sm text-slate-500">
            Situation des élèves
          </p>
        </div>

        <Users className="w-8 h-8 text-sky-500" />
      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            <span>Présents</span>
          </div>

          <span className="font-black">
            {present}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserX className="w-5 h-5 text-red-500" />
            <span>Absents</span>
          </div>

          <span className="font-black">
            {absent}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock3 className="w-5 h-5 text-amber-500" />
            <span>Retards</span>
          </div>

          <span className="font-black">
            {late}
          </span>
        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between text-sm mb-2">
          <span>Taux de présence</span>

          <span className="font-black">
            {percentage}%
          </span>
        </div>

        <Progress value={percentage} />

      </div>

    </Card>
  );
}