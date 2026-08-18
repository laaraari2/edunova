const features = [
  {
    icon: "🎓",
    title: "Gestion des élèves",
    description:
      "Centralisez les dossiers, inscriptions, absences, résultats et parcours de chaque élève.",
  },
  {
    icon: "👨‍🏫",
    title: "Gestion des enseignants",
    description:
      "Organisez les équipes pédagogiques, emplois du temps, classes et suivi des enseignants.",
  },
  {
    icon: "💳",
    title: "Finance & paiements",
    description:
      "Suivez les paiements, échéances, recettes et finances de votre établissement en temps réel.",
  },
  {
    icon: "📩",
    title: "Communication parents",
    description:
      "Gardez une communication simple et instantanée entre l'établissement, les parents et les élèves.",
  },
  {
    icon: "🤖",
    title: "Edunova AI",
    description:
      "Un assistant intelligent qui analyse votre établissement et vous aide à prendre de meilleures décisions.",
  },
  {
    icon: "📊",
    title: "Pilotage & statistiques",
    description:
      "Visualisez les indicateurs essentiels et pilotez votre établissement depuis un tableau de bord unique.",
  },
];

export default function WhyEdunova() {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-6 py-24 sm:px-10 lg:px-16">
      {/* Decorative background */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Pourquoi Edunova ?
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Tout ce dont votre établissement a{" "}
            <span className="text-cyan-600">besoin.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Une seule plateforme pour simplifier la gestion, améliorer la
            communication et donner à votre établissement les outils dont il a
            besoin pour avancer.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="
                group
                rounded-3xl
                border
                border-slate-200/80
                bg-white
                p-7
                shadow-[0_12px_35px_rgba(15,23,42,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:border-cyan-200
                hover:shadow-[0_24px_55px_rgba(15,23,42,0.10)]
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-50
                  to-blue-50
                  text-2xl
                  shadow-sm
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {feature.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                En savoir plus
                <span aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}