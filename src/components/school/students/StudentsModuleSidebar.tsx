"use client";

import {
    Baby,
    School,
    GraduationCap,
    University,
    Layers,
} from "lucide-react";

const items = [
    { id: "all", label: "Tous", icon: Layers },
    { id: "preschool", label: "Préscolaire" },
    { id: "primary", label: "Primaire", icon: School },
    { id: "college", label: "Collège", icon: GraduationCap },
    { id: "lycee", label: "Lycée", icon: University },
];

export default function StudentsModuleSidebar() {
    return (
     <aside className="w-30 bg-white border-r border-slate-200 shrink-0">

         

           <nav className="px-3 space-y-1">

    {items.map((item, index) => {
      

        return (
            <button
                key={item.id}
                className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left transition
                ${
                    index === 0
                        ? "bg-[#0f8ca0] text-white"
                        : "hover:bg-slate-100 text-slate-700"
                }`}
            >
               

                <span className="text-xs font-medium">
                    {item.label}
                </span>
            </button>
        );
    })}
</nav>
        </aside>
    );
}