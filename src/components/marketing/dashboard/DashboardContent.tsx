type DashboardContentProps = {
  compact?: boolean;
};

export default function DashboardContent({
  compact = false,
}: DashboardContentProps) {
  const stats = [
    {
      title: "Élèves",
      value: "1 248",
      change: "+8%",
      icon: "🎓",
    },
    {
      title: "Enseignants",
      value: "83",
      change: "+2%",
      icon: "👨‍🏫",
    },
    {
      title: "Paiements",
      value: "94%",
      change: "+4%",
      icon: "💳",
    },
    {
      title: "Messages",
      value: "328",
      change: "+12%",
      icon: "📩",
    },
  ];

  const activities = [
    "Nouvel élève inscrit",
    "Paiement confirmé",
    "SMS envoyé aux parents",
    "Emploi du temps publié",
  ];

  return (
    <main
      className={`flex-1 overflow-auto bg-slate-50 ${
        compact ? "p-3" : "p-6"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between ${
          compact ? "mb-3" : "mb-6"
        }`}
      >
        <div>
          <p
            className={`font-medium uppercase tracking-widest text-cyan-600 ${
              compact ? "text-[10px]" : "text-sm"
            }`}
          >
            Établissement
          </p>

          <h2
            className={`mt-1 font-bold text-slate-900 ${
              compact ? "text-lg" : "text-2xl"
            }`}
          >
            École Al Amal
          </h2>
        </div>

        <div
          className={`rounded-xl border border-slate-200 bg-white shadow-sm text-slate-500 ${
            compact
              ? "px-2 py-1 text-[10px]"
              : "px-4 py-2 text-sm"
          }`}
        >
          Année scolaire 2025–2026
        </div>
      </div>

      {/* Stats */}
      <div
        className={`grid grid-cols-4 ${
          compact ? "gap-3" : "gap-5"
        }`}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${
              compact ? "p-3" : "p-5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={compact ? "text-lg" : "text-2xl"}
              >
                {item.icon}
              </span>

              <span
                className={`rounded-full bg-emerald-50 font-semibold text-emerald-600 ${
                  compact
                    ? "px-1.5 py-0.5 text-[10px]"
                    : "px-2 py-1 text-xs"
                }`}
              >
                {item.change}
              </span>
            </div>

            <p
              className={`mt-3 text-slate-500 ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              {item.title}
            </p>

            <h3
              className={`mt-1 font-bold text-slate-900 ${
                compact ? "text-xl" : "text-3xl"
              }`}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>
            {/* Main */}
      <div
        className={`grid grid-cols-[1.5fr_1fr] ${
          compact ? "mt-3 gap-3" : "mt-6 gap-6"
        }`}
      >
        {/* Chart */}
        <section
          className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${
            compact ? "p-3" : "p-6"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3
                className={`font-bold ${
                  compact ? "text-sm" : "text-lg"
                }`}
              >
                Performance
              </h3>

              <p
                className={`text-slate-400 ${
                  compact ? "text-[10px]" : "text-sm"
                }`}
              >
                7 derniers jours
              </p>
            </div>

            <span
              className={`rounded-lg bg-slate-100 text-slate-500 ${
                compact
                  ? "px-2 py-1 text-[10px]"
                  : "px-3 py-2 text-xs"
              }`}
            >
              Cette semaine
            </span>
          </div>

          <div
            className={`flex items-end ${
              compact ? "h-28 gap-2" : "h-56 gap-3"
            }`}
          >
            {[40, 55, 48, 72, 61, 88, 76].map((h, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center justify-end"
              >
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                  style={{ height: `${h}%` }}
                />

                <span
                  className={`mt-1 text-slate-400 ${
                    compact ? "text-[9px]" : "text-xs"
                  }`}
                >
                  {["L", "M", "M", "J", "V", "S", "D"][index]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section
          className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${
            compact ? "p-3" : "p-6"
          }`}
        >
          <h3
            className={`font-bold ${
              compact ? "text-sm" : "text-lg"
            }`}
          >
            Activité récente
          </h3>

          <div className={compact ? "mt-3 space-y-2" : "mt-5 space-y-4"}>
            {activities.map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-3"
              >
                <div
                  className={`flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ${
                    compact
                      ? "h-6 w-6 text-xs"
                      : "h-8 w-8"
                  }`}
                >
                  ✓
                </div>

                <span
                  className={compact ? "text-xs" : "text-sm"}
                >
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
            {/* AI */}
      <section
        className={`rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-blue-50 ${
          compact ? "mt-3 p-3" : "mt-6 p-6"
        }`}
      >
        <div className={`flex ${compact ? "gap-3" : "gap-4"} items-start`}>
          <div
            className={`flex items-center justify-center rounded-xl bg-white shadow-sm ${
              compact
                ? "h-9 w-9 text-lg"
                : "h-12 w-12 text-xl"
            }`}
          >
            🤖
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3
                className={`font-bold text-slate-900 ${
                  compact ? "text-sm" : "text-lg"
                }`}
              >
                Edunova AI
              </h3>

              <span
                className={`rounded-full bg-emerald-100 font-semibold text-emerald-700 ${
                  compact
                    ? "px-2 py-0.5 text-[10px]"
                    : "px-3 py-1 text-xs"
                }`}
              >
                Actif
              </span>
            </div>

            <p
              className={`mt-2 text-slate-600 ${
                compact ? "text-xs" : "text-sm"
              }`}
            >
              Analyse intelligente de votre établissement et
              recommandations automatiques.
            </p>

            <div
              className={`grid grid-cols-2 ${
                compact ? "mt-3 gap-3" : "mt-5 gap-4"
              }`}
            >
              <div
                className={`rounded-xl bg-white shadow-sm ${
                  compact ? "p-3" : "p-4"
                }`}
              >
                <p
                  className={`text-slate-500 ${
                    compact ? "text-xs" : "text-sm"
                  }`}
                >
                  Paiements en retard
                </p>

                <p
                  className={`mt-2 font-bold text-slate-900 ${
                    compact ? "text-xl" : "text-3xl"
                  }`}
                >
                  4
                </p>
              </div>

              <div
                className={`rounded-xl bg-white shadow-sm ${
                  compact ? "p-3" : "p-4"
                }`}
              >
                <p
                  className={`text-slate-500 ${
                    compact ? "text-xs" : "text-sm"
                  }`}
                >
                  Examens générés
                </p>

                <p
                  className={`mt-2 font-bold text-slate-900 ${
                    compact ? "text-xl" : "text-3xl"
                  }`}
                >
                  8
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}