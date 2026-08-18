import FadeIn from "@/components/shared/animations/FadeIn";
import MarketingDashboardPreview from "@/components/marketing/dashboard/MarketingDashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-10 lg:min-h-[720px] lg:py-12">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-[120px]" />
        <div className="absolute right-10 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[140px]" />
      </div>

      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-6 lg:grid-cols-[44%_56%] lg:gap-4 xl:px-8">
        {/* LEFT */}
        <FadeIn>
          <div className="min-w-0 max-w-[620px]">
            <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              🚀 Nouvelle génération d'éducation
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 lg:text-5xl xl:text-[4rem]">
              Une plateforme intelligente pour
              <span className="mt-1 block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                toute votre communauté éducative
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Gérez les élèves, enseignants, parents, finances,
              communication, intelligence artificielle et toute la gestion
              de votre établissement depuis une seule plateforme.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-7 py-4 font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Demander une démo
              </button>

              <button
                type="button"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-900 transition duration-300 hover:bg-slate-100"
              >
                Découvrir la plateforme
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 lg:text-3xl">
                  150+
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Établissements
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 lg:text-3xl">
                  24/7
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Support
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 lg:text-3xl">
                  99.9%
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Disponibilité
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 lg:text-3xl">
                  IA
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Assistant intelligent
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* RIGHT */}
        <FadeIn delay={0.2}>
          <div className="relative flex h-full min-w-0 items-center justify-end">
            {/* Glow */}
            <div className="pointer-events-none absolute -left-12 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative flex w-full items-center justify-end">
              <MarketingDashboardPreview />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}