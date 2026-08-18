import { MoreVertical } from "lucide-react";

interface Student {
  name: string;
  id: string;
  class: string;
  initial: string;
  color: string;
}

interface StudentsCardsProps {
  students: Student[];
  onStudentClick?: (student: Student) => void;
}

export default function StudentsCards({ students, onStudentClick }: StudentsCardsProps) {
  if (!students || students.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-6 text-center text-slate-500">
          Aucun élève
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {students.map((student, index) => (
        <div
          key={index}
          className="group relative rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md cursor-pointer"
          onClick={() => onStudentClick?.(student)}
        >
          <div className="absolute right-4 top-4">
            <button className="rounded-md p-1 text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold text-white ${student.color}`}>
              {student.initial}
            </div>
            <h3 className="mb-1 font-semibold text-slate-800">{student.name}</h3>
            <div className="mb-1 text-sm text-slate-500">{student.id}</div>
            <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {student.class}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}