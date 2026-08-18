import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface CancelMonthModalProps {
    cancelMonth: string | null;
    setCancelMonth: (val: string | null) => void;
}

export default function CancelMonthModal({ cancelMonth, setCancelMonth }: CancelMonthModalProps) {
    if (!cancelMonth) return null;

    return (
        <div className="fixed inset-0 z-[10005] bg-slate-900/40 flex items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white w-[600px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2 text-slate-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>
                        </div>
                        <span className="font-bold text-slate-800 text-[16px]">Annuler une ou plusieurs échéances</span>
                    </div>
                    <button onClick={() => setCancelMonth(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-8">
                    <div className="space-y-2 relative">
                        <label className="text-[13px] font-bold text-slate-700">Motif d'annulation <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Input
                                value="Radiation..."
                                readOnly
                                className="bg-white border-[#128b9d] ring-1 ring-[#128b9d]/20 h-10 text-[13.5px] pr-8 shadow-sm font-medium"
                            />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#128b9d]" />
                        </div>

                        {/* Fake Dropdown Popup (visual only based on screenshot) */}
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-50 py-1.5 overflow-hidden">
                            <div className="px-4 py-2 hover:bg-slate-50 text-[13.5px] cursor-pointer text-[#128b9d] bg-[#f0f9fb]">Radiation</div>
                            <div className="px-4 py-2 hover:bg-slate-50 text-[13.5px] cursor-pointer text-slate-600">Autres</div>
                            <div className="px-4 py-2 hover:bg-slate-50 text-[13.5px] cursor-pointer text-[#128b9d]">Recherche avancée...</div>
                        </div>
                    </div>

                    {/* Spacer to push toggle down because of the absolute dropdown overlapping manually */}
                    <div className="pt-24 shrink-0"></div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                        <span className="text-[13.5px] font-bold text-slate-800">Annuler les échéances pour le reste des mois</span>
                        <div className="w-9 h-5 bg-gray-200 rounded-full cursor-pointer shadow-inner flex items-center px-[2px]">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center gap-4 bg-white shrink-0">
                    <button className="bg-[#128b9d] text-white px-4 py-2.5 rounded-[6px] text-[13.5px] font-medium hover:bg-[#0f7686] transition-all shadow-sm">
                        Confirmer
                    </button>
                    <button onClick={() => setCancelMonth(null)} className="bg-slate-50 text-slate-700 px-4 py-2.5 rounded-[6px] text-[13.5px] font-medium hover:bg-slate-100 transition-all shadow-sm border border-gray-200">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
