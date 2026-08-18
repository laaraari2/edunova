export default function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 py-20 lg:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] px-7 py-12 text-center shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:px-10 lg:px-16 lg:py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Découvrez Edunova
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Prêt à faire évoluer
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              votre établissement ?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Découvrez une plateforme pensée pour simplifier la gestion,
            connecter votre communauté et donner aux équipes les outils
            nécessaires pour mieux travailler au quotidien.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Demander une démonstration
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="#pricing"
              className="inline-flex min-w-[170px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Voir les offres
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Gestion centralisée
            </span>

            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Application mobile
            </span>

            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Edunova AI
            </span>

            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Support & accompagnement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}