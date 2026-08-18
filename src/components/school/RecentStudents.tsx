"use client";

import Image from "next/image";

const recentStudents = [
    {
        id: "1",
        name: "Youssef El Amrani",
        class: "3APG A",
        image: "https://i.pravatar.cc/150?u=1",
    },
    {
        id: "2",
        name: "Fatima Zahra",
        class: "2APIC B",
        image: "https://i.pravatar.cc/150?u=2",
    },
    {
        id: "3",
        name: "Amine Benali",
        class: "1BAC Sc",
        image: "https://i.pravatar.cc/150?u=3",
    },
    {
        id: "4",
        name: "Sara Touil",
        class: "4APIC A",
        image: "https://i.pravatar.cc/150?u=4",
    },
    {
        id: "5",
        name: "Ilyass Karimi",
        class: "2BAC Lettres",
        image: "https://i.pravatar.cc/150?u=5",
    },
];

export default function RecentStudents() {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col shadow-sm">

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-slate-800">Élèves récents</h2>
                <span className="text-xs font-bold text-[#4f46e5] cursor-pointer hover:underline">Voir tout</span>
            </div>

            <div className="flex-1 space-y-4">
                {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                <Image
                                    src={student.image}
                                    alt={student.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{student.name}</p>
                                <p className="text-xs text-slate-500">{student.class}</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase">
                            Nouveau
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}
