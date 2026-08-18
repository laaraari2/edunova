const items = [
  { label: "Tableau de bord", icon: "▦", active: true },
  { label: "Élèves", icon: "🎓" },
  { label: "Enseignants", icon: "👨‍🏫" },
  { label: "Finance", icon: "💳" },
  { label: "Communication", icon: "📩" },
  { label: "Edunova AI", icon: "🤖" },
  { label: "Paramètres", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        flex
        h-full
        w-[180px]
        shrink-0
        flex-col
        border-r
        border-slate-200
        bg-white
      "
    >
      {/* Logo */}
      <div className="border-b border-slate-100 px-5 py-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Edunova
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Education OS
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
              item.active
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="text-base">{item.icon}</span>

            <span className="text-sm font-medium">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* AI Card */}
      <div className="p-3">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">🤖</span>

            <span className="text-sm font-bold text-cyan-700">
              Edunova AI
            </span>
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Votre assistant intelligent pour analyser les performances de votre établissement.
          </p>
        </div>
      </div>
    </aside>
  );
}