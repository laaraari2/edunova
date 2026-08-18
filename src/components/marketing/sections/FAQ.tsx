const faqs = [
  {
    question: "L'abonnement Edunova est-il annuel ?",
    answer:
      "Oui. Les offres Edunova sont proposées sur une base annuelle. Vous choisissez la formule adaptée à votre établissement et bénéficiez de la plateforme pendant toute la période d'abonnement.",
  },
  {
    question: "Quelles sont les différences entre les offres ?",
    answer:
      "Edunova propose trois niveaux d'offre : Essentiel à 6 000 DH/an, Professionnel à 10 000 DH/an et Premium à 15 000 DH/an. Chaque formule propose un niveau différent de fonctionnalités et d'accompagnement.",
  },
  {
    question: "L'application mobile est-elle disponible avec Edunova ?",
    answer:
      "Oui. L'écosystème Edunova est pensé pour fonctionner au-delà de la plateforme web afin de faciliter l'accès aux informations et la communication depuis un smartphone.",
  },
  {
    question: "Que peut faire Edunova AI ?",
    answer:
      "Edunova AI aide l'administration à analyser les données de l'établissement, comprendre les indicateurs importants et obtenir des informations utiles pour mieux piloter son établissement.",
  },
  {
    question: "Edunova AI peut-elle aider les enseignants ?",
    answer:
      "Oui. L'IA est également pensée comme un copilote pour les enseignants. Elle peut notamment les aider à préparer des devoirs, des examens et des fiches pédagogiques, tout en laissant à l'enseignant le contrôle du contenu final.",
  },
  {
    question: "Est-ce que l'établissement contrôle entièrement la plateforme ?",
    answer:
      "Edunova fonctionne comme une solution SaaS. L'établissement utilise la plateforme et ses fonctionnalités pendant sa période d'abonnement, tandis que l'infrastructure et le produit Edunova restent gérés par Edunova.",
  },
  {
    question: "Comment découvrir Edunova avant de s'abonner ?",
    answer:
      "Vous pouvez demander une démonstration afin de découvrir la plateforme, comprendre les fonctionnalités disponibles et déterminer la formule la plus adaptée aux besoins de votre établissement.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-50 py-20 lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            FAQ
          </span>

          <h2 className="mt-7 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Les réponses aux questions
            <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              que vous vous posez.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Découvrez les principales informations concernant Edunova,
            ses fonctionnalités et son fonctionnement.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 open:border-cyan-200 open:shadow-[0_18px_45px_rgba(15,23,42,0.07)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-xs font-bold text-cyan-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm font-bold text-slate-900 sm:text-base">
                    {faq.question}
                  </span>
                </div>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-lg font-medium text-slate-400 transition-transform duration-300 group-open:rotate-45 group-open:bg-cyan-50 group-open:text-cyan-600">
                  +
                </span>
              </summary>

              <div className="px-6 pb-6 pl-[4.5rem] pr-12 sm:px-7 sm:pb-7 sm:pl-[4.75rem]">
                <p className="max-w-3xl text-sm leading-7 text-slate-500">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Vous avez encore des questions ?
          </p>

          <a
            href="#contact"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-cyan-600 transition-colors hover:text-cyan-700"
          >
            Demander une démonstration
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}