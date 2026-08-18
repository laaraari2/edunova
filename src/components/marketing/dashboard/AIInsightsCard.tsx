import { Brain, Sparkles, TrendingUp, TriangleAlert } from "lucide-react";

export default function AIInsightsCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2 text-white shadow-md">
            <Brain size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Edunova AI
            </h3>

            <p className="text-sm text-slate-500">
              Analyse intelligente en temps réel
            </p>
          </div>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          IA Active
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">

        <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
          <TrendingUp className="mt-1 text-green-600" size={20} />

          <div>
            <p className="font-medium">
              Présence en hausse
            </p>

            <p className="text-sm text-slate-500">
              +4% cette semaine.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
          <TriangleAlert className="mt-1 text-amber-500" size={20} />

          <div>
            <p className="font-medium">
              Élèves à suivre
            </p>

            <p className="text-sm text-slate-500">
              3 élèves nécessitent une attention particulière.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
          <Sparkles className="mt-1 text-blue-600" size={20} />

          <div>
            <p className="font-medium">
              Recommandation IA
            </p>

            <p className="text-sm text-slate-500">
              Générer automatiquement un rapport pédagogique.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}