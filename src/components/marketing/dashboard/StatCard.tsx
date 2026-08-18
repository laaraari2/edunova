type StatCardProps = {
  title: string;
  value: string;
  growth: string;
};

const colors = {
  "Étudiants": "from-blue-500 to-cyan-400",
  "Enseignants": "from-violet-500 to-fuchsia-400",
  "Présence": "from-emerald-500 to-green-400",
  "IA Score": "from-amber-500 to-orange-400",
};

export default function StatCard({
  title,
  value,
  growth,
}: StatCardProps) {
  const gradient =
    colors[title as keyof typeof colors] ??
    "from-slate-600 to-slate-400";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className={`h-2 bg-gradient-to-r ${gradient}`} />

      <div className="p-6">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="mt-3 text-3xl font-bold">
          {value}
        </h3>

        <p className="mt-2 text-sm font-semibold text-green-600">
          ▲ {growth}
        </p>
      </div>

    </div>
  );
}