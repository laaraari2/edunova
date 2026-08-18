import React from 'react';
import { ChevronRight, Settings, ChevronLeft, ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface StudentServicesProps {
    displayedStudent: any;
    setSelectedStudent: (val: any) => void;
    setIsCreating: (val: boolean) => void;
    setCurrentDetailView: (view: string) => void;
    setShowAddServiceModal: (val: boolean) => void;
    setManageService: (service: string) => void;
}

export default function StudentServices({
    displayedStudent, setSelectedStudent, setIsCreating, setCurrentDetailView, setShowAddServiceModal, setManageService
}: StudentServicesProps) {
    return (
        <>
            {/* SUB HEADER (Services View) */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative z-10 w-full animate-in fade-in">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowAddServiceModal(true)}
                        className="bg-[#128b9d] text-white px-[14px] py-[6px] rounded-[6px] text-[13.5px] font-medium hover:bg-[#0f7686] transition-all shadow-sm"
                    >
                        Ajouter Un Service
                    </button>
                    <div className="flex flex-col ml-3">
                        <div className="flex items-center gap-2 text-[12px] font-medium">
                            <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => { setSelectedStudent(null); setIsCreating(false); }}>Apprenant</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 mx-0.5" />
                            <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => setCurrentDetailView('profile')}>{displayedStudent?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-700">
                            Services scolaire
                            <Settings className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md mx-6 flex justify-center">
                    <div className="relative w-full max-w-[400px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                        </div>
                        <Input
                            placeholder="Rechercher..."
                            className="h-10 w-full pl-10 pr-4 bg-white border border-[#128b9d] text-[13.5px] rounded-xl focus-visible:ring-1 focus-visible:ring-[#128b9d]/50 shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6 text-[13.5px]">
                    <span className="font-medium tracking-wide text-slate-500">1-2 / 2</span>
                    <div className="flex items-center gap-1">
                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></div>
                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-slate-50 cursor-pointer"><ChevronRight className="w-4 h-4" /></div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT (Services Table) */}
            <main className="flex-1 overflow-y-auto bg-[#fafbfc] animate-in slide-in-from-right-4 duration-300">
                <div className="w-full bg-white text-slate-800 text-[13px]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 bg-white text-left font-bold text-slate-700">
                                <th className="py-4 px-6 w-[60px]"></th>
                                <th className="py-4 px-4 pl-0">Services</th>
                                <th className="py-4 px-4">Mois début</th>
                                <th className="py-4 px-4 flex items-center gap-1">Mois fin <ChevronDown className="w-3.5 h-3.5 text-slate-400" /></th>
                                <th className="py-4 px-4">Périodicité</th>
                                <th className="py-4 px-4 text-right">Tarif</th>
                                <th className="py-4 px-4 text-right">Réduction annuelle</th>
                                <th className="py-4 px-4 text-right">Dû annuel</th>
                                <th className="py-4 px-4 text-right">Payé</th>
                                <th className="py-4 px-4 text-right">Reste</th>
                                <th className="py-4 px-4 w-[100px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-slate-600">
                            <tr className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-4 px-6"><div className="w-3.5 h-3.5 rounded-full border border-gray-300 group-hover:border-[#128b9d] cursor-pointer"></div></td>
                                <td className="py-4 px-4 pl-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">FI</div>
                                        <span>Frais d'Inscription</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">Novembre</td>
                                <td className="py-4 px-4">Novembre</td>
                                <td className="py-4 px-4">
                                    <span className="border border-gray-200 bg-white rounded-md px-2.5 py-1 text-[12px]">Annuel</span>
                                </td>
                                <td className="py-4 px-4 text-right">1 200,00</td>
                                <td className="py-4 px-4 text-right">0,00</td>
                                <td className="py-4 px-4 text-right">1 200,00</td>
                                <td className="py-4 px-4 text-right">1 200,00</td>
                                <td className="py-4 px-4 text-right">0,00</td>
                                <td className="py-4 px-4 text-center cursor-pointer text-[#128b9d] hover:underline" onClick={() => setManageService("Frais d'Inscription")}>Gérer</td>
                            </tr>
                            <tr className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-4 px-6"><div className="w-3.5 h-3.5 rounded-full border border-gray-300 group-hover:border-[#128b9d] cursor-pointer"></div></td>
                                <td className="py-4 px-4 pl-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">SC</div>
                                        <span>Scolarité</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">Novembre</td>
                                <td className="py-4 px-4">Juin</td>
                                <td className="py-4 px-4">
                                    <span className="border border-gray-200 bg-white rounded-md px-2.5 py-1 text-[12px]">Mensuel</span>
                                </td>
                                <td className="py-4 px-4 text-right">1 300,00</td>
                                <td className="py-4 px-4 text-right">0,00</td>
                                <td className="py-4 px-4 text-right">10 400,00</td>
                                <td className="py-4 px-4 text-right">1 300,00</td>
                                <td className="py-4 px-4 text-right">9 100,00</td>
                                <td className="py-4 px-4 text-center cursor-pointer text-[#128b9d] hover:underline" onClick={() => setManageService("Scolarité")}>Gérer</td>
                            </tr>
                            <tr className="bg-white font-bold text-slate-800 border-b border-gray-200">
                                <td colSpan={5}></td>
                                <td className="py-4 px-4 text-right">2 500,00</td>
                                <td className="py-4 px-4 text-right">0,00</td>
                                <td className="py-4 px-4 text-right">11 600,00</td>
                                <td className="py-4 px-4 text-right">2 500,00</td>
                                <td className="py-4 px-4 text-right">9 100,00</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}
