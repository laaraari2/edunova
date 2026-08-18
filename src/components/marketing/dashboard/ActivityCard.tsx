export default function ActivityCard() {
  const items = [
    "Ahmed inscrit",
    "Paiement reçu",
    "Classe créée",
    "Rapport IA généré",
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="font-semibold">
        Activité récente
      </h3>

      <div className="mt-6 space-y-4">
        {items.map((item)=>(
          <div
            key={item}
            className="rounded-xl bg-slate-50 p-3 text-sm"
          >
            ✅ {item}
          </div>
        ))}
      </div>

    </div>
  );
}