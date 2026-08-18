"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

const data = [
  { month: "Sep", revenue: 18000 },
  { month: "Oct", revenue: 22000 },
  { month: "Nov", revenue: 25000 },
  { month: "Dec", revenue: 24000 },
  { month: "Jan", revenue: 29000 },
  { month: "Feb", revenue: 32000 },
];

export default function RevenueChart() {
  return (
    <Card className="rounded-3xl p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-black">
          Revenus mensuels
        </h3>

        <p className="text-sm text-slate-500">
          Évolution des revenus de l'établissement.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#0ea5e9"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#0ea5e9"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0ea5e9"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}