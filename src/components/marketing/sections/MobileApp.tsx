export default function MobileApp() {
  const benefits = [
    "Notifications en temps réel",
    "Suivi des élèves",
    "Communication avec les parents",
    "Accès aux informations partout",
  ];

  return (
    <section
  id="mobile-app"
  className="relative overflow-hidden bg-white pt-4 pb-14 lg:pt-6 lg:pb-16"
>

    
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="relative grid items-center gap-14 px-7 py-12 sm:px-10 lg:grid-cols-[1fr_400px] lg:px-16 lg:py-16">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur">
                <span>📱</span>
                Application mobile Edunova
              </div>

              <h2 className="mt-7 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                Votre établissement,
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  partout avec vous.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Edunova vous accompagne au-delà de la plateforme web.
                Administration, enseignants, parents et élèves restent
                connectés depuis leur smartphone.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 text-sm font-medium text-slate-200"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-xs text-cyan-300">
                      ✓
                    </span>

                    {benefit}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
                  Découvrir l’application
                </button>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                   iOS
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                  ▶ Android
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="relative mx-auto w-full max-w-[290px]">
              <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative rounded-[42px] border-[6px] border-slate-700 bg-slate-950 p-2 shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
                {/* Notch */}
                <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-950" />

                <div className="overflow-hidden rounded-[32px] bg-slate-50">
                  {/* App header */}
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-600 px-5 pb-7 pt-9 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-cyan-100">
                          Bonjour,
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          Administrateur
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                        A
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] text-cyan-100">
                        Tableau de bord
                      </p>

                      <p className="mt-1 text-xl font-extrabold">
                        Edunova
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-3 shadow-sm">
                        <p className="text-[8px] text-slate-400">
                          Élèves
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-slate-900">
                          1 248
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-3 shadow-sm">
                        <p className="text-[8px] text-slate-400">
                          Présence
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-cyan-600">
                          97%
                        </p>
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-bold text-slate-700">
                          Activité récente
                        </p>

                        <span className="text-[8px] font-semibold text-cyan-600">
                          Voir tout
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="h-7 w-7 rounded-full bg-cyan-50" />
                          <div className="flex-1">
                            <div className="h-2 w-4/5 rounded-full bg-slate-100" />
                            <div className="mt-1.5 h-1.5 w-2/5 rounded-full bg-slate-50" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="h-7 w-7 rounded-full bg-blue-50" />
                          <div className="flex-1">
                            <div className="h-2 w-3/5 rounded-full bg-slate-100" />
                            <div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-slate-50" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="h-7 w-7 rounded-full bg-violet-50" />
                          <div className="flex-1">
                            <div className="h-2 w-2/3 rounded-full bg-slate-100" />
                            <div className="mt-1.5 h-1.5 w-2/5 rounded-full bg-slate-50" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI */}
                    <div className="rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🤖</span>

                        <span className="text-[9px] font-bold text-cyan-700">
                          Edunova AI
                        </span>
                      </div>

                      <p className="mt-1.5 text-[8px] leading-4 text-slate-500">
                        Votre assistant intelligent est prêt.
                      </p>
                    </div>
                  </div>

                  {/* Bottom navigation */}
                  <div className="grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-3">
                    {["⌂", "🎓", "💬", "☰"].map((icon, index) => (
                      <div
                        key={icon}
                        className={`text-center text-sm ${
                          index === 0
                            ? "text-cyan-600"
                            : "text-slate-300"
                        }`}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}