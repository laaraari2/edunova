import React from 'react';
import { ChevronDown, Languages, Camera, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface EditMemberModalProps {
    editMember: string | null;
    setEditMember: (val: string | null) => void;
}

export default function EditMemberModal({ editMember, setEditMember }: EditMemberModalProps) {
    if (!editMember) return null;

    return (
        <div className="fixed inset-0 z-[10005] bg-slate-900/40 flex items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white w-[850px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 relative">
                {/* Header */}
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 relative z-20 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2 text-slate-500">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>
                        </div>
                        <span className="font-bold text-slate-800 text-[16px]">Membre famille</span>
                    </div>
                    <button onClick={() => setEditMember(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="flex gap-8 relative">
                        {/* Left Column */}
                        <div className="flex-1 space-y-5">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">Lien de famille <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <div className="bg-white border-[#128b9d] ring-1 ring-[#128b9d]/20 rounded-md h-10 px-3 flex items-center shadow-sm w-full">
                                        <span className="bg-[#128b9d] text-white px-1.5 py-0.5 rounded text-[12.5px] font-medium">Père</span>
                                    </div>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">Prénom <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Input defaultValue="Toufik" className="bg-white border-gray-200 h-10 text-[13.5px] font-medium shadow-sm pr-10" />
                                    <Languages className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">Nom <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Input defaultValue="BEJJANI" className="bg-white border-gray-200 h-10 text-[13.5px] font-medium shadow-sm pr-10" />
                                    <Languages className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 space-y-5">
                            <div className="space-y-2 relative pr-[88px]">
                                <label className="text-[13px] font-bold text-slate-700">Téléphone <span className="text-red-500">*</span></label>
                                <div className="flex gap-3">
                                    <Input defaultValue="+212" className="bg-white border-gray-200 h-10 w-16 text-center text-[13.5px] font-medium shadow-sm" />
                                    <Input defaultValue="06XX46893166" className="bg-white border-gray-200 h-10 flex-1 text-[13.5px] font-medium shadow-sm" />
                                </div>

                                {/* Avatar placeholder right next to top input */}
                                <div className="absolute right-0 top-0 w-[72px] h-[72px] border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50/50 shadow-sm">
                                    <div className="relative">
                                        <Camera className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
                                        <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-gray-200 rounded-full border border-white flex items-center justify-center text-gray-500">
                                            <Plus className="w-3 h-3" strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">E-mail</label>
                                <Input defaultValue="toufik.bejjani@example.com" className="bg-white border-gray-200 h-10 text-[13.5px] font-medium shadow-sm" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">Adresse</label>
                                <div className="relative">
                                    <Input placeholder="Adresse..." className="bg-white border-gray-200 h-10 text-[13.5px] font-medium shadow-sm pr-10" />
                                    <Languages className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <span className="text-[13px] font-bold text-slate-800">Donnez-lui l'accès à l'application mobile</span>
                                <div className="w-9 h-5 bg-[#2299e5] rounded-full relative cursor-pointer shadow-inner">
                                    <div className="absolute right-[2px] top-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 flex items-center gap-4 bg-white shrink-0 mt-2">
                    <button className="bg-[#128b9d] text-white px-4 py-2.5 rounded-[6px] text-[13.5px] font-medium hover:bg-[#0f7686] transition-all shadow-sm">
                        Enregistrer et fermer
                    </button>
                    <button className="bg-slate-50 text-slate-700 px-4 py-2.5 rounded-[6px] text-[13.5px] font-medium border border-gray-200 shadow-sm hover:bg-slate-100 transition-all">
                        Supprimer
                    </button>
                    <button onClick={() => setEditMember(null)} className="text-[#128b9d] px-2 py-2 text-[13.5px] font-medium hover:underline">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
