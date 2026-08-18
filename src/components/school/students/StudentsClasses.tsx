const classes = ["A", "B", "C", "D"];

export default function StudentsClasses() {
  return (
    <div className="flex gap-2">
      {classes.map((cls) => (
        <button
          key={cls}
          className="w-10 h-10 rounded-lg border hover:bg-slate-100"
        >
          {cls}
        </button>
      ))}
    </div>
  );
}