const plans = [
  {
    name: "Essentiel",
    price: "6 000",
    description:
      "Pour les établissements qui souhaitent centraliser leur gestion et commencer simplement.",
    features: [
      "Gestion des élèves",
      "Gestion des enseignants",
      "Classes & groupes",
      "Suivi des absences",
      "Gestion des résultats",
      "Tableau de bord essentiel",
    ],
    button: "Choisir Essentiel",
    highlighted: false,
  },
  {
    name: "Professionnel",
    price: "10 000",
    description:
      "Pour les établissements qui veulent aller plus loin dans la gestion, la communication et le pilotage.",
    features: [
      "Tout ce qui est inclus dans Essentiel",
      "Finance & paiements",
      "Communication parents",
      "Notifications",
      "Statistiques avancées",
      "Application mobile",
      "Edunova AI",
    ],
    button: "Choisir Professionnel",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "15 000",
    description:
      "Pour les établissements qui souhaitent exploiter pleinement l'écosystème Edunova.",
    features: [
      "Tout ce qui est inclus dans Professionnel",
      "Pilotage avancé",
      "Analyses & insights",
      "Fonctionnalités IA avancées",
      "Accompagnement renforcé",
      "Priorité sur le support",
    ],
    button: "Choisir Premium",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Tarification
          </span>

          <h2 className="mt-7 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Une offre adaptée à
            <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              votre établissement.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Des formules annuelles simples et transparentes pour choisir les
            fonctionnalités dont votre établissement a réellement besoin.
          </p>
        </div>

        {/* Plans */}
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[28px] border p-7 transition-all duration-300 sm:p-8 ${
                plan.highlighted
                  ? "border-cyan-300 bg-slate-950 text-white shadow-[0_25px_70px_rgba(8,145,178,0.18)] lg:-translate-y-3"
                  : "border-slate-200 bg-white text-slate-950 shadow-[0_15px_45px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
              }`}
            >
              {/* Recommended */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  Recommandé
                </div>
              )}

              {/* Plan name */}
              <div>
                <p
                  className={`text-sm font-bold ${
                    plan.highlighted ? "text-cyan-300" : "text-cyan-600"
                  }`}
                >
                  {plan.name}
                </p>

                <p
                  className={`mt-4 text-sm leading-6 ${
                    plan.highlighted ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-8">
                <div className="flex items-end gap-2">
                  <span
                    className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${
                      plan.highlighted ? "text-white" : "text-slate-950"
                    }`}
                  >
                    {plan.price}
                  </span>

                  <span
                    className={`pb-1 text-sm font-medium ${
                      plan.highlighted ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    DH / an
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className={`my-8 h-px ${
                  plan.highlighted ? "bg-white/10" : "bg-slate-100"
                }`}
              />

              {/* Features */}
              <div className="flex-1">
                <p
                  className={`text-xs font-bold uppercase tracking-[0.15em] ${
                    plan.highlighted ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Inclus dans l'offre
                </p>

                <ul className="mt-5 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          plan.highlighted
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "bg-cyan-50 text-cyan-600"
                        }`}
                      >
                        ✓
                      </span>

                      <span
                        className={
                          plan.highlighted
                            ? "text-slate-300"
                            : "text-slate-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <a
                href="#contact"
                className={`mt-9 flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-slate-100"
                    : "border border-slate-200 bg-slate-50 text-slate-900 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50"
                }`}
              >
                {plan.button}
                <span className="ml-2">→</span>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <span className="text-cyan-600">✓</span>

          <p className="text-sm text-slate-500">
            Abonnement annuel • Une formule claire • Une plateforme complète
          </p>
        </div>
      </div>
    </section>
  );
}