import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface ReductionInstallmentModalProps {
    reductionMonth: string | null;
    setReductionMonth: (val: string | null) => void;
}

export default function ReductionInstallmentModal({ reductionMonth, setReductionMonth }: ReductionInstallmentModalProps) {
    if (!reductionMonth) return null;

    return (
        <div className="fixed inset-0 z-[10005] bg-slate-900/40 flex items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white w-[750px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2 text-slate-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>
                        </div>
                        <span className="font-bold text-slate-800 text-[16px]">Réduction pour une ou plusieurs échéance</span>
                    </div>
                    <button onClick={() => setReductionMonth(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div className="space-y-2 relative z-50">
                        <label className="text-[13px] font-bold text-slate-700">Motif de Réduction <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Input
                                placeholder="Deux frères, enfant d'un professeur..."
                                readOnly
                                className="bg-white border-[#128b9d] ring-1 ring-[#128b9d]/20 h-10 text-[13.5px] shadow-sm font-medium pr-8"
                            />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>

                        {/* Fake Dropdown Popup for screenshot */}
                        <div className="absolute top-full left-0 w-64 mt-1 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1.5 overflow-hidden">
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Divers</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Sans raison</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-[#128b9d] bg-[#f0f9fb]">Trois frères</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Enfant d'un professeur</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Enfant d'un employé</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Parenté</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Deux frères</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-slate-600">Transport une seule fois</div>
                            <div className="px-4 py-1.5 hover:bg-slate-50 text-[13px] cursor-pointer text-[#128b9d] border-t border-gray-50 mt-1 pt-2">Recherche avancée...</div>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <div className="flex-1 mt-6">
                            <Input className="bg-white border-gray-200 h-10 w-full shadow-sm" />
                        </div>
                        <div className="w-24">
                            <label className="text-[13px] font-bold text-slate-700 block mb-2">Unité <span className="text-red-500">*</span></label>
                            <Input defaultValue="DH" className="bg-white border-gray-200 h-10 text-[13.5px] font-medium shadow-sm w-full" />
                        </div>
                    </div>

                    <div className="w-full">
                        <Input className="bg-white border-gray-200 h-10 w-full shadow-sm" />
                    </div>

                    {/* Spacer for the fake dropdown */}
                    <div className="pt-8"></div>

                    <div className="flex items-center gap-4">
                        <span className="text-[13.5px] font-bold text-slate-800">Appliquer pour le reste des mois</span>
                        <div className="w-9 h-5 bg-gray-200 rounded-full cursor-pointer shadow-inner flex items-center px-[2px]">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center gap-4 bg-white shrink-0 mt-4 border-t border-slate-50">
                    <button className="bg-[#128b9d] text-white px-5 py-2.5 rounded-[6px] text-[13.5px] font-medium hover:bg-[#0f7686] transition-all shadow-sm">
                        Confirmer
                    </button>
                    <button onClick={() => setReductionMonth(null)} className="text-[#128b9d] px-5 py-2.5 text-[13.5px] font-medium hover:underline">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
