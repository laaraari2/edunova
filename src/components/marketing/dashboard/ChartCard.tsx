export default function ChartCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="text-lg font-semibold">
        Performance
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        7 derniers jours
      </p>

      <div className="mt-8 flex h-56 items-end gap-4">
        {[35,60,45,90,75,100,82].map((h)=>(
          <div
            key={h}
            className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
            style={{height:`${h}%`}}
          />
        ))}
      </div>

    </div>
  );
}