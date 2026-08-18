"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", value: 12000 },
  { month: "Fév", value: 18000 },
  { month: "Mar", value: 15000 },
  { month: "Avr", value: 24000 },
  { month: "Mai", value: 28000 },
  { month: "Juin", value: 31000 },
];

const studentsData = [
  { name: "Maternelle", value: 90 },
  { name: "Primaire", value: 260 },
  { name: "Collège", value: 140 },
  { name: "Lycée", value: 110 },
];

const COLORS = [
  "#0ea5e9",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
];

export default function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* Revenue */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <h3 className="text-lg font-bold mb-6">
          Revenus mensuels
        </h3>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={revenueData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Students */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <h3 className="text-lg font-bold mb-6">
          Répartition des élèves
        </h3>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={studentsData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {studentsData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}