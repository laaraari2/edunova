import { MoreVertical } from "lucide-react";

interface Student {
  name: string;
  id: string;
  class: string;
  initial: string;
  color: string;
}

interface StudentsTableProps {
  students: Student[];
  onStudentClick?: (student: Student) => void;
}

export default function StudentsTable({ students, onStudentClick }: StudentsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Élève
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Matricule
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Classe
            </th>
            <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
              Statut
            </th>
            <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {!students || students.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-16 text-center text-slate-400">
                Aucun élève disponible
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => onStudentClick?.(student)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${student.color}`}>
                      {student.initial}
                    </div>
                    <span className="font-medium text-slate-800">{student.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600">
                  {student.id}
                </td>
                <td className="px-5 py-4">
                  <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {student.class}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 ring-1 ring-inset ring-emerald-600/20">
                    Actif
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}