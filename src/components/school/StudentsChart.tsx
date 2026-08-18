"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

import { Card } from "@/components/ui/card";

const data = [
  {
    name: "Maternelle",
    value: 95,
  },
  {
    name: "Primaire",
    value: 280,
  },
  {
    name: "Collège",
    value: 170,
  },
  {
    name: "Lycée",
    value: 120,
  },
];

const COLORS = [
  "#0ea5e9",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
];

export default function StudentsChart() {
  return (
    <Card className="rounded-3xl p-6 shadow-sm">

      <div className="mb-5">

        <h3 className="text-lg font-black">
          Répartition des élèves
        </h3>

        <p className="text-sm text-slate-500">
          Effectif par cycle scolaire.
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </Card>
  );
}