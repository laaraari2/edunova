const aiTools = [
  {
    icon: "📝",
    title: "Générer des devoirs",
    description:
      "Créez rapidement des exercices adaptés au niveau et aux objectifs pédagogiques.",
  },
  {
    icon: "📋",
    title: "Préparer des examens",
    description:
      "Générez des sujets structurés et variés pour faciliter la préparation des évaluations.",
  },
  {
    icon: "📚",
    title: "Créer des fiches pédagogiques",
    description:
      "Aidez les enseignants à préparer leurs fiches et à organiser leurs séances plus efficacement.",
  },
  {
    icon: "📊",
    title: "Analyser les performances",
    description:
      "Transformez les données de l'établissement en informations utiles pour mieux décider.",
  },
];

export default function AISection() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-slate-950 py-20 lg:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            <span>✦</span>
            Edunova AI
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Une intelligence qui accompagne
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              toute votre communauté.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Edunova AI aide l'administration à mieux piloter l'établissement
            et accompagne les enseignants dans leur travail pédagogique
            quotidien.
          </p>
        </div>

        {/* Main panel */}
        <div className="mt-14 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
          <div className="grid lg:grid-cols-[1fr_420px]">
            {/* AI capabilities */}
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl shadow-lg shadow-cyan-500/10">
                  ✦
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Assistant intelligent
                  </p>

                  <p className="text-xs text-slate-500">
                    Propulsé par Edunova AI
                  </p>
                </div>
              </div>

              <h3 className="mt-8 max-w-xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Gagnez du temps sur les tâches qui demandent le plus
                d'effort.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                L'intelligence artificielle devient un véritable copilote
                pour votre établissement, sans remplacer le jugement de
                l'administration ou de l'enseignant.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {aiTools.map((tool) => (
                  <div
                    key={tool.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-lg">
                      {tool.icon}
                    </div>

                    <h4 className="mt-4 text-sm font-bold text-white">
                      {tool.title}
                    </h4>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Preview */}
            <div className="border-t border-white/10 bg-slate-900/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-2xl border border-white/10 bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-sm">
                      ✦
                    </div>

                    <div>
                      <p className="text-xs font-bold text-white">
                        Edunova AI
                      </p>

                      <p className="text-[10px] text-emerald-400">
                        ● Assistant disponible
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-600">
                    AI
                  </span>
                </div>

                {/* Conversation */}
                <div className="space-y-4 p-5">
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-cyan-500/10 px-4 py-3">
                    <p className="text-xs leading-5 text-cyan-100">
                      Prépare-moi un devoir de mathématiques pour une classe
                      de 6ème.
                    </p>
                  </div>

                  <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white/[0.06] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">✦</span>
                      <span className="text-[10px] font-bold text-cyan-300">
                        Edunova AI
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Bien sûr. Je peux préparer une évaluation structurée
                      avec exercices, niveau de difficulté et objectifs
                      pédagogiques.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-300">
                        Proposition générée
                      </span>

                      <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold text-emerald-400">
                        Prêt
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-4/5 rounded-full bg-white/10" />
                      <div className="h-2 w-3/5 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <span className="text-[10px] text-slate-600">
                      Demander quelque chose à Edunova AI...
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500 text-xs text-white">
                      ↑
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-[11px] leading-5 text-slate-600">
                L'enseignant conserve toujours le contrôle et peut modifier
                le contenu généré avant son utilisation.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-sm text-cyan-300">
            ✓
          </span>

          <p className="text-sm text-slate-400">
            Une IA conçue pour assister les équipes, pas pour remplacer leur
            expertise.
          </p>
        </div>
      </div>
    </section>
  );
}