const levels = ["1AP", "2AP", "3AP", "4AP", "5AP", "6AP"];

export default function StudentsLevels() {
  return (
    <div className="flex gap-2">
      {levels.map((level) => (
        <button
          key={level}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
        >
          {level}
        </button>
      ))}
    </div>
  );
}