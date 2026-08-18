import React from 'react';
import { ChevronRight, Settings, MoreHorizontal, ChevronLeft, UserMinus, ShieldCheck, Clock, Bell } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface StudentAbsencesProps {
    displayedStudent: any;
    setSelectedStudent: (val: any) => void;
    setIsCreating: (val: boolean) => void;
    setCurrentDetailView: (view: string) => void;
}

export default function StudentAbsences({
    displayedStudent, setSelectedStudent, setIsCreating, setCurrentDetailView
}: StudentAbsencesProps) {
    return (
        <>
            {/* SUB HEADER (Absences View) */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative z-10 w-full animate-in fade-in">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col ml-3">
                        <div className="flex items-center gap-2 text-[12px] font-medium">
                            <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => { setSelectedStudent(null); setIsCreating(false); }}>Apprenant</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 mx-0.5" />
                            <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => setCurrentDetailView('profile')}>{displayedStudent?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-700">
                            Absences
                            <Settings className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md mx-6 flex justify-center">
                    <div className="relative w-full max-w-[400px]">
                        <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                            <div className="flex items-center gap-2 bg-white border border-[#128b9d]/30 px-2 py-1 rounded text-[12px] font-bold text-[#128b9d]">
                                <span className="bg-[#128b9d] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">A</span>
                                Apprenant
                                <span className="text-slate-800 ml-1">{displayedStudent?.name}</span>
                                <MoreHorizontal className="w-3.5 h-3.5 ml-1 text-slate-400" />
                            </div>
                            <div className="flex-1 text-[13px] text-slate-400 pl-2">Rechercher...</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-[13.5px]">
                    <span className="font-medium tracking-wide text-slate-500">1-3 / 3</span>
                    <div className="flex items-center gap-1">
                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 bg-white cursor-not-allowed"><ChevronLeft className="w-4 h-4" /></div>
                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 bg-white cursor-not-allowed"><ChevronRight className="w-4 h-4" /></div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT (Absences) */}
            <main className="flex-1 overflow-y-auto bg-[#fafbfc] animate-in slide-in-from-right-4 duration-300 flex flex-col">
                {/* Stats Section */}
                <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-100 shadow-sm p-5 flex items-center gap-5">
                        <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                            <UserMinus className="w-7 h-7 text-red-300" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-800">3</div>
                            <div className="text-[13px] text-slate-500 font-medium">Total absences</div>
                        </div>
                    </Card>
                    <Card className="bg-white border-gray-100 shadow-sm p-5 flex items-center gap-5">
                        <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-7 h-7 text-green-300" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-800">0</div>
                            <div className="text-[13px] text-slate-500 font-medium">Total justifié</div>
                        </div>
                    </Card>
                    <Card className="bg-white border-gray-100 shadow-sm p-5 flex items-center gap-5">
                        <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center">
                            <Clock className="w-7 h-7 text-yellow-300" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-800">3</div>
                            <div className="text-[13px] text-slate-500 font-medium">Total non justifié</div>
                        </div>
                    </Card>
                </div>

                {/* Table Section */}
                <div className="px-8 flex-1">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden flex flex-col">
                        <table className="w-full text-[13px] text-left">
                            <thead className="bg-[#fcfdfe] border-b border-gray-100">
                                <tr className="text-slate-800 font-bold">
                                    <th className="py-4 px-4 w-10">
                                        <div className="w-4 h-4 border border-gray-200 rounded cursor-pointer"></div>
                                    </th>
                                    <th className="py-4 px-2">Journée</th>
                                    <th className="py-4 px-2">Matricule</th>
                                    <th className="py-4 px-2">Apprenant</th>
                                    <th className="py-4 px-2">Classe</th>
                                    <th className="py-4 px-2">Durée</th>
                                    <th className="py-4 px-2">Motif</th>
                                    <th className="py-4 px-2">Status</th>
                                    <th className="py-4 px-2 text-center">Communication</th>
                                    <th className="py-4 px-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-slate-600 font-medium">
                                {[
                                    { date: "10/09/2025", duration: "Journée" },
                                    { date: "11/09/2025", duration: "Journée" },
                                    { date: "12/09/2025", duration: "Journée" }
                                ].map((abs, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="w-4 h-4 border border-gray-200 rounded cursor-pointer"></div>
                                        </td>
                                        <td className="py-4 px-2 text-slate-800">{abs.date}</td>
                                        <td className="py-4 px-2">{displayedStudent?.id}</td>
                                        <td className="py-4 px-2 flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-full ${displayedStudent?.color} text-white flex items-center justify-center text-[10px] font-bold`}>
                                                {displayedStudent?.name.charAt(0)}
                                            </div>
                                            <span className="text-slate-700">{displayedStudent?.name}</span>
                                        </td>
                                        <td className="py-4 px-2">{displayedStudent?.class}</td>
                                        <td className="py-4 px-2">{abs.duration}</td>
                                        <td className="py-4 px-2"></td>
                                        <td className="py-4 px-2">
                                            <span className="bg-[#fff1f0] text-[#cf1322] px-3 py-1 rounded-full text-[11px] font-bold border border-[#ffa39e]/20">
                                                Non justifié
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <Bell className="w-4 h-4 text-slate-400 mx-auto cursor-pointer hover:text-slate-600 transition-colors" strokeWidth={1.5} />
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="text-[#128b9d] font-bold cursor-pointer hover:underline text-[12px]">Détails</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="h-10 shrink-0"></div>
            </main>
        </>
    );
}
