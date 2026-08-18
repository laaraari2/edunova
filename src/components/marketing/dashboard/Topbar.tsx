type TopbarProps = {
  compact?: boolean;
};

export default function Topbar({
  compact = false,
}: TopbarProps) {
  if (compact) {
    return (
      <header className="flex h-[58px] min-w-0 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3">
        {/* Search */}
        <div className="flex h-9 w-[92px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-400">
          🔍
        </div>

        {/* Right */}
        <div className="flex min-w-0 items-center gap-2">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm transition hover:bg-slate-50"
          >
            🔔

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* Settings */}
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm transition hover:bg-slate-50"
          >
            ⚙️
          </button>

          {/* Profile */}
          <div className="flex min-w-0 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold leading-tight text-slate-900">
                Administrateur
              </p>

              <p className="truncate text-[8px] leading-tight text-slate-500">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Search */}
      <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
        <span className="text-sm text-slate-400">🔍</span>

        <input
          type="text"
          placeholder="Rechercher un élève, un parent..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Right */}
      <div className="ml-6 flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
        >
          🔔
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
        >
          ⚙️
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Administrateur
            </p>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}