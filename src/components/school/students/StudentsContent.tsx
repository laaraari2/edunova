import { useState } from "react";
import StudentsModuleSidebar from "./StudentsModuleSidebar";
import StudentsToolbar from "./StudentsToolbar";
import StudentsCards from "./StudentsCards";
import StudentsTable from "./StudentsTable";

const studentsData = [
  { name: "Abdellah ABOU ASSI", id: "1553", class: "3AEP-2 (SPINOZA)", initial: "T", color: "bg-[#be3643]" },
  { name: "Abdellah MOUTAWAKIL", id: "0710", class: "3AEP-1 (CHERKAOUI)", initial: "I", color: "bg-[#1f9392]" },
  { name: "Abdelmoughit NEFZI", id: "0988", class: "3ASC-1 (P. RICOEUR)", initial: "A", color: "bg-[#25ab44]" },
  { name: "Abdennour BOUDRAA", id: "1499", class: "2ASC-1 (F W HEGEL)", initial: "A", color: "bg-[#673ab7]" },
  { name: "Abderrahmane KHATIB", id: "0443", class: "2ASC-1 (F W HEGEL)", initial: "L", color: "bg-[#d4991c]" },
  { name: "Abderrahmane MIFTAH", id: "0953", class: "1AEP-1 (BAUDELAIRE)", initial: "A", color: "bg-[#673ab7]" },
  { name: "Abrar OUAHMANE", id: "1108", class: "1AEP-1 (BAUDELAIRE)", initial: "M", color: "bg-[#2bbb76]" },
  { name: "Achraf SIMAAN", id: "0574", class: "6AEP-1 (DARWICH)", initial: "J", color: "bg-[#c52b36]" },
];

interface StudentsContentProps {
  onStudentClick?: (student: any) => void;
  onNewStudent?: () => void;
}

export default function StudentsContent({ onStudentClick, onNewStudent }: StudentsContentProps = {}) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar secondaire */}
      <StudentsModuleSidebar />

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-5">
          {/* Header */}
          <StudentsToolbar viewMode={viewMode} setViewMode={setViewMode} onNewStudent={onNewStudent} />

          {/* Students */}
          {viewMode === 'grid' ? (
            <StudentsCards students={studentsData} onStudentClick={onStudentClick} />
          ) : (
            <StudentsTable students={studentsData} onStudentClick={onStudentClick} />
          )}

        </div>
      </div>
    </div>
  );
}