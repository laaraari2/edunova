const features = [
  {
    icon: "🎓",
    eyebrow: "Gestion académique",
    title: "Toute la vie scolaire, au même endroit.",
    description:
      "Gérez les élèves, les classes, les absences, les résultats et les enseignants depuis une interface simple et centralisée.",
    points: [
      "Dossiers élèves",
      "Classes & enseignants",
      "Présences & résultats",
    ],
  },
  {
    icon: "💳",
    eyebrow: "Finance",
    title: "Une gestion financière plus simple.",
    description:
      "Suivez les paiements, les échéances et les opérations financières avec une vision claire de votre établissement.",
    points: [
      "Paiements & échéances",
      "Suivi financier",
      "Rapports",
    ],
  },
  {
    icon: "💬",
    eyebrow: "Communication",
    title: "Restez connecté avec votre communauté.",
    description:
      "Facilitez les échanges entre administration, enseignants, parents et élèves depuis un espace centralisé.",
    points: [
      "Messages",
      "Notifications",
      "Communication parents",
    ],
  },
  {
    icon: "📊",
    eyebrow: "Pilotage",
    title: "Prenez de meilleures décisions.",
    description:
      "Visualisez les indicateurs importants de votre établissement et transformez vos données en informations utiles.",
    points: [
      "Tableaux de bord",
      "Statistiques",
      "Rapports & insights",
    ],
  },
];

export default function Features() {
  return (
    <section
  id="features"
  className="relative overflow-hidden bg-white pt-24 pb-6 lg:pt-28 lg:pb-8"
>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-cyan-300/10 blur-[130px]" />
        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Fonctionnalités
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Une plateforme pensée pour
            <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              votre quotidien.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Edunova rassemble les outils essentiels dont votre établissement
            a besoin pour gérer, communiquer et piloter plus efficacement.
          </p>
        </div>

        {/* Main Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_15px_45px_rgba(15,23,42,0.05)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-cyan-200
                hover:shadow-[0_25px_65px_rgba(15,23,42,0.10)]
                sm:p-8
              "
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-500 group-hover:bg-blue-400/15" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 text-2xl shadow-sm">
                    {feature.icon}
                  </div>

                  <span className="text-xs font-bold tracking-[0.18em] text-slate-300">
                    EDUNOVA
                  </span>
                </div>

                <p className="mt-8 text-sm font-semibold text-cyan-600">
                  {feature.eyebrow}
                </p>

                <h3 className="mt-2 max-w-lg text-2xl font-bold leading-tight tracking-tight text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>

                <div className="mt-7 grid gap-2 sm:grid-cols-3">
                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 text-xs font-medium text-slate-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-bold text-cyan-600">
                        ✓
                      </span>

                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* AI Feature */}
        <div className="relative mt-6 overflow-hidden rounded-[32px] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-7 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_320px]">
            {/* AI Content */}
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                🤖
              </div>

              <p className="mt-6 text-sm font-semibold text-cyan-700">
                Intelligence artificielle
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Edunova AI transforme vos données en insights utiles.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Analysez les performances, identifiez les tendances et
                obtenez une vision plus claire de votre établissement grâce à
                un assistant intelligent intégré à votre plateforme.
              </p>
            </div>

            {/* AI Mini Dashboard */}
            <div className="rounded-2xl border border-white bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400">
                    IA Score
                  </p>

                  <p className="mt-1 text-3xl font-extrabold text-slate-950">
                    94%
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-lg">
                  ✨
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Analyse intelligente de votre établissement en temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}