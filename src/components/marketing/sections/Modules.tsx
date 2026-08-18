const modules = [
  {
    icon: "🎓",
    number: "01",
    title: "Scolarité",
    description:
      "Centralisez toute la gestion pédagogique et le suivi des élèves.",
    items: [
      "Élèves & classes",
      "Absences & retards",
      "Notes & résultats",
    ],
  },
  {
    icon: "🏫",
    number: "02",
    title: "Administration",
    description:
      "Pilotez les opérations quotidiennes de votre établissement depuis un seul espace.",
    items: [
      "Dossiers & inscriptions",
      "Documents",
      "Organisation",
    ],
  },
  {
    icon: "💳",
    number: "03",
    title: "Finance",
    description:
      "Gardez une vision claire des paiements, recettes et échéances.",
    items: [
      "Paiements",
      "Échéances",
      "Suivi financier",
    ],
  },
  {
    icon: "💬",
    number: "04",
    title: "Communication",
    description:
      "Connectez facilement administration, enseignants, parents et élèves.",
    items: [
      "Messages",
      "Notifications",
      "Communication parents",
    ],
  },
  {
    icon: "👥",
    number: "05",
    title: "Ressources humaines",
    description:
      "Organisez vos équipes et simplifiez le suivi administratif du personnel.",
    items: [
      "Personnel",
      "Présences",
      "Suivi administratif",
    ],
  },
  {
    icon: "📊",
    number: "06",
    title: "Pilotage",
    description:
      "Transformez vos données en indicateurs utiles pour mieux décider.",
    items: [
      "Tableaux de bord",
      "Statistiques",
      "Rapports",
    ],
  },
];

export default function Modules() {
  return (
    <section
      id="modules"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-24 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-[130px]" />
        <div className="absolute bottom-0 right-[-160px] h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-semibold text-cyan-700 shadow-sm">
            Modules Edunova
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Tout ce dont votre établissement
            <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              a besoin pour avancer.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Une suite complète de modules connectés pour gérer votre
            établissement avec plus de simplicité, de visibilité et de
            contrôle.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <article
              key={module.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-7
                shadow-[0_12px_40px_rgba(15,23,42,0.04)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-cyan-200
                hover:shadow-[0_25px_60px_rgba(15,23,42,0.09)]
              "
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 text-2xl shadow-sm">
                    {module.icon}
                  </div>

                  <span className="text-xs font-bold tracking-[0.18em] text-slate-300">
                    {module.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-7 text-2xl font-bold tracking-tight text-slate-950">
                  {module.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {module.description}
                </p>

                {/* Items */}
                <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                  {module.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-medium text-slate-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-bold text-cyan-600">
                        ✓
                      </span>

                      {item}
                    </div>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="mt-7 h-1 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 group-hover:w-20" />
              </div>
            </article>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mx-auto mt-12 max-w-4xl rounded-[28px] border border-slate-200 bg-white p-7 text-center shadow-[0_12px_40px_rgba(15,23,42,0.04)] sm:p-9">
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            Une seule plateforme. Des modules qui travaillent ensemble.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Chaque module partage les mêmes données pour vous offrir une
            expérience cohérente, sans multiplier les outils.
          </p>
        </div>
      </div>
    </section>
  );
}