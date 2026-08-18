import React from 'react';
import {
    ChevronRight, Settings, Banknote, Building2, Users, UserMinus,
    ChevronLeft, Camera, Plus, Copy, Languages, PencilIcon,
    ShieldCheck, Phone, Mail, Trash2, ArrowRight, ChevronDown
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface StudentProfileProps {
    isCreating: boolean;
    setIsCreating: (val: boolean) => void;
    displayedStudent: any;
    setSelectedStudent: (val: any) => void;
    isSaved: boolean;
    setIsSaved: (val: boolean) => void;
    setCurrentDetailView: (view: string) => void;
    activeFormTab: string;
    setActiveFormTab: (tab: string) => void;
    setEditMember: (member: string) => void;
}

export default function StudentProfile({
    isCreating, setIsCreating, displayedStudent, setSelectedStudent,
    isSaved, setIsSaved, setCurrentDetailView, activeFormTab, setActiveFormTab, setEditMember
}: StudentProfileProps) {
    return (
        <>
            {/* SUB HEADER (Profile/Creation View) */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative z-10 w-full animate-in fade-in">
                <div className="flex items-center gap-4">
                    <button
                        className="bg-transparent border border-[#cbd5e1] text-[#94a3b8] px-[16px] py-[6px] rounded-lg text-[13.5px] font-medium hover:bg-slate-50 transition-all"
                        onClick={() => { setSelectedStudent(null); setIsCreating(true); setIsSaved(false); }}
                    >
                        Nouveau
                    </button>

                    {isSaved && (
                        <button className="bg-[#128b9d] text-white px-4 py-1.5 rounded-[6px] text-[13.5px] font-medium hover:bg-[#0f7686] transition-all shadow-sm ml-2">
                            Inscription
                        </button>
                    )}

                    <div className="flex flex-col ml-1">
                        <div className="flex items-center gap-2 text-[12px] font-medium">
                            <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => { setSelectedStudent(null); setIsCreating(false); setIsSaved(false); }}>{isCreating ? 'Apprenant' : 'Apprenant'}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 mx-0.5" />
                            <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => { if (isCreating && !isSaved) { setSelectedStudent(null); setIsCreating(false); setIsSaved(false); } }}>{isCreating && !isSaved ? 'Nouveau' : (isSaved ? 'Nada WERTY' : displayedStudent?.name)}</span>
                            {(isCreating && !isSaved) && (
                                <>
                                    <ChevronRight className="w-3 h-3 text-slate-400 mx-0.5" />
                                    <span className="text-slate-800 font-semibold italic opacity-60">Nouveau</span>
                                </>
                            )}
                        </div>
                        {!isCreating && (
                            <div className="flex items-center gap-2 text-slate-600 font-medium text-[15px]">
                                <span className="text-slate-800 font-semibold">{displayedStudent?.name}</span>
                                <Settings className="w-[15px] h-[15px] text-slate-400 cursor-pointer hover:text-slate-600 transition-colors ml-1" strokeWidth={1.5} />
                            </div>
                        )}
                        {isCreating && !isSaved && (
                            <div className="flex items-center gap-4 text-slate-400 ml-1 mt-0.5">
                                <div
                                    onClick={() => setIsSaved(true)}
                                    className="w-[22px] h-[22px] border border-gray-200 rounded flex items-center justify-center bg-white shadow-sm hover:bg-[#128b9d] hover:text-white transition-all cursor-pointer group"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                                </div>
                                <div className="w-[22px] h-[22px] border border-gray-200 rounded flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 cursor-pointer">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-lg h-10 shadow-sm bg-white divide-x divide-gray-100 overflow-hidden text-[10.5px] font-medium text-slate-600">
                        <div className="px-3.5 h-full flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                            <Banknote className="w-4 h-4 text-[#e53e3e]" strokeWidth={2} />
                            <div className="flex flex-col"><span className="text-[#e53e3e] leading-[1.1]">Montant dû</span><span className="text-[#e53e3e] font-bold text-[11.5px] leading-[1.1]">1 250</span></div>
                        </div>
                        <div className="px-3.5 h-full flex items-center gap-2 cursor-pointer hover:bg-slate-50 bg-[#f0f9fb]/40" onClick={() => setCurrentDetailView('services')}>
                            <Building2 className="w-4 h-4 text-[#128b9d]" strokeWidth={2} />
                            <div className="flex flex-col"><span className="text-[#128b9d] leading-[1.1]">Services</span><span className="text-[#128b9d] font-bold text-[11.5px] leading-[1.1]">4</span></div>
                        </div>
                        <div className="px-3.5 h-full flex items-center gap-2 cursor-pointer hover:bg-slate-50">
                            <Users className="w-4 h-4 text-[#128b9d]" strokeWidth={2} />
                            <div className="flex flex-col"><span className="text-[#128b9d] leading-[1.1]">Fratrie</span><span className="text-[#128b9d] font-bold text-[11.5px] leading-[1.1]">1</span></div>
                        </div>
                        <div className="px-3.5 h-full flex items-center gap-2 cursor-pointer hover:bg-slate-50 min-w-[95px]" onClick={() => setCurrentDetailView('absences')}>
                            <UserMinus className="w-4 h-4 text-[#e53e3e]" strokeWidth={2} />
                            <div className="flex flex-col"><span className="text-[#e53e3e] leading-[1.1]">Absences</span><span className="text-[#e53e3e] font-bold text-[11.5px] leading-[1.1]">3</span></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-[13.5px]">
                    <span className="font-medium tracking-wide text-slate-500">5 / 10</span>
                    <div className="flex items-center gap-1">
                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-slate-50 cursor-pointer bg-white"><ChevronLeft className="w-4 h-4" /></div>
                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-slate-50 cursor-pointer bg-white"><ChevronRight className="w-4 h-4" /></div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT (Detail View) */}
            <main className="flex-1 overflow-y-auto bg-[#fafbfc] animate-in slide-in-from-right-4 duration-300">
                {isSaved && (
                    <div className="mx-8 mt-4 bg-[#e6f4f9] border border-[#128b9d]/20 px-6 py-2 rounded-lg flex items-center gap-3 text-[#128b9d] text-[13.5px]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        <span className="font-medium">Les informations d'identification de l'apprenant ont été remplies avec succès. Vous pouvez procéder à l'inscription en cliquant sur le bouton (Inscription).</span>
                    </div>
                )}

                <div className="p-6 lg:p-8 flex justify-center">
                    <div className="max-w-[1050px] w-full bg-white border border-gray-200 rounded-xl shadow-sm text-slate-800 mb-8 h-fit">
                        <div className="p-8 pb-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-3">
                                        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Fiche apprenant</h1>
                                        {isSaved ? (
                                            <Badge className="bg-[#fff1f0] text-[#cf1322] hover:bg-[#fff1f0] border-none shadow-none text-[11px] font-bold px-2 py-0.5 mt-1 rounded-md">Non-inscrit</Badge>
                                        ) : (
                                            <Badge className={`bg-[#e4fcde] text-[#4d9b3a] hover:bg-[#e4fcde] border-none shadow-none text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1 rounded-md ${isCreating ? 'hidden' : ''}`}>Inscrit</Badge>
                                        )}
                                    </div>
                                    <p className="text-[13.5px] text-slate-500 mb-6 max-w-2xl font-medium">
                                        Veuillez remplir les informations d'identification de l'apprenant afin de pouvoir procéder à l'inscription.
                                    </p>
                                    <div className="flex items-center gap-8 text-[13.5px] font-medium mb-8">
                                        <div className="flex gap-2"><span className="text-slate-500">Niveau</span><span className="font-bold text-slate-700">{isCreating && !isSaved ? "" : displayedStudent?.class.split('-')[0]}</span></div>
                                        <div className="flex gap-2"><span className="text-slate-500">Classe</span><span className="font-bold text-slate-700">{isCreating && !isSaved ? "" : displayedStudent?.class}</span></div>
                                        <div className="flex items-center gap-2"><span className="text-slate-500">Matricule</span><span className="font-bold text-slate-700">{isCreating && !isSaved ? "" : displayedStudent?.id}</span> <Copy className={`w-[14px] h-[14px] text-slate-400 cursor-pointer hover:text-slate-600 ${isCreating && !isSaved ? 'hidden' : ''}`} /></div>
                                        <div className="flex items-center gap-2"><span className="text-slate-500">Code d'appariement</span><span className="font-bold text-slate-700">{isCreating && !isSaved ? "" : "47748"}</span> <Copy className={`w-[14px] h-[14px] text-slate-400 cursor-pointer hover:text-slate-600 ${isCreating && !isSaved ? 'hidden' : ''}`} /></div>
                                    </div>
                                </div>

                                <div className="w-[100px] h-[100px] rounded-xl border-2 border-gray-100 bg-white flex items-center justify-center text-gray-300 relative shadow-sm mt-2">
                                    <Camera className="w-10 h-10 mb-2 fill-gray-200 stroke-1" />
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 shadow-sm">
                                        <Plus className="w-[18px] h-[18px]" strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-10">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">Prénom <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Input defaultValue={isCreating ? "" : displayedStudent?.name.split(' ')[0]} placeholder={isCreating ? "Prénom..." : ""} className="bg-white border-gray-200 h-11 pr-10 focus-visible:ring-[#128b9d] text-[14px] font-medium shadow-sm" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-slate-600">
                                            <Languages className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">Date de naissance <span className="text-red-500">*</span></label>
                                    <Input defaultValue={isCreating ? "" : "13/03/2006"} placeholder={isCreating ? "JJ/MM/AAAA" : ""} className="bg-white border-gray-200 h-11 focus-visible:ring-[#128b9d] text-[14px] font-medium shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">Nom <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Input defaultValue={isCreating ? "" : displayedStudent?.name.split(' ').slice(1).join(' ')} placeholder={isCreating ? "Nom..." : ""} className="bg-white border-gray-200 h-11 pr-10 focus-visible:ring-[#128b9d] text-[14px] font-medium shadow-sm uppercase" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-slate-600">
                                            <Languages className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">Genre <span className="text-red-500">*</span></label>
                                    <div className="flex items-center gap-8 h-11 border border-gray-200 rounded-md px-4 bg-white shadow-sm">
                                        <label className="flex items-center gap-2 cursor-pointer text-[13.5px] font-medium text-slate-600 hover:text-slate-800">
                                            <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center`}></div>
                                            <span>Masculin</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer text-[13.5px] font-medium text-slate-600 hover:text-slate-800">
                                            <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center`}>
                                                <div className={`w-2 h-2 rounded-full bg-[#128b9d] ${isCreating && !isSaved ? 'opacity-0' : 'opacity-100'}`}></div>
                                            </div>
                                            <span>Féminin</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Form Tabs */}
                            <div className="border-b border-gray-200 mt-6 px-10 flex gap-6">
                                {['famille', 'infos', 'scolarite', 'sante', 'aliment', 'transport', 'inscriptions'].map((tab) => {
                                    const labels: Record<string, string> = { famille: 'Famille', infos: 'Informations personnelles', scolarite: 'Scolarité', sante: 'Santé', aliment: 'Aliment', transport: 'Transport', inscriptions: 'Inscription(s)' };
                                    return (
                                        <button key={tab} onClick={() => setActiveFormTab(tab)} className={`pb-3 border-b-2 text-[13.5px] px-2 text-center transition-colors ${activeFormTab === tab ? 'border-[#128b9d] text-slate-800 font-bold' : 'border-transparent text-slate-500 hover:text-slate-700 font-medium'}`}>{labels[tab]}</button>
                                    );
                                })}
                            </div>

                            {/* Tab Content areas */}
                            <div className="flex-1">
                                {/* === TAB: Famille === */}
                                {activeFormTab === 'famille' && (
                                    <div className="px-10 pb-12 pt-8">
                                        {isCreating && !isSaved ? (
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-4 h-4 rounded-full border-2 border-[#128b9d] flex items-center justify-center mt-1 cursor-pointer">
                                                        <div className="w-2 h-2 rounded-full bg-[#128b9d]"></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-bold text-slate-800 leading-none">Créer une nouvelle famille</span>
                                                        <span className="text-[12.5px] text-slate-400 mt-1">Créez une famille en remplissant les informations nécessaires pour créer une nouvelle famille d'apprenant.</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 opacity-60">
                                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center mt-1 cursor-pointer"></div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-bold text-slate-600 leading-none">Affecter à une famille existante</span>
                                                        <span className="text-[12.5px] text-slate-400 mt-1">Sélectionnez une famille existante à affecter avec l'apprenant.</span>
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-slate-400 font-bold text-[13.5px] cursor-pointer hover:text-slate-600">
                                                    <Plus className="w-4 h-4" /> Créer une famille
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2 text-slate-600 mb-1">
                                                    <Users className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                                                    <span className="font-bold text-[14px] text-slate-700">Famille Toufik BEJJANI</span>
                                                    <PencilIcon className="w-3 h-3 ml-1 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors" strokeWidth={2.5} />
                                                </div>

                                                <div className="mt-4 mb-3">
                                                    <h3 className="text-[13px] font-bold text-slate-800">Membres de famille</h3>
                                                    <p className="text-[12.5px] text-slate-500 mt-0.5">Vous pouvez ajouter des membres de la famille ci-dessous.</p>
                                                </div>

                                                <button className="mt-3 mb-6 flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-[12.5px] font-bold text-slate-500 hover:bg-slate-50 transition-colors shadow-sm bg-white">
                                                    <Plus className="w-[14px] h-[14px]" /> Ajouter un membre famille
                                                </button>

                                                <div className="flex flex-wrap gap-4">
                                                    {/* Member Card 1 */}
                                                    <div onClick={() => setEditMember('toufik')} className="cursor-pointer w-[320px] border border-gray-100 rounded-[10px] p-5 relative bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-gray-900/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all group">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <div className="text-[14px] font-bold text-slate-800 mb-1">Toufik BEJJANI</div>
                                                                <div className="flex items-center gap-2 text-[12.5px]">
                                                                    <span className="text-slate-400">Père</span>
                                                                    <span className="text-[#128b9d] font-medium bg-[#f0f9fb] px-1.5 py-0.5 rounded text-[11px]">Res. Légal</span>
                                                                </div>
                                                            </div>
                                                            <div className="relative">
                                                                <div className="w-10 h-10 rounded-full bg-[#c53d46] text-white flex items-center justify-center font-bold text-[16px]">T</div>
                                                                <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-[#3b82f6] rounded-full border-2 border-white flex items-center justify-center text-white">
                                                                    <ShieldCheck className="w-2.5 h-2.5" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5 mb-6">
                                                            <div className="flex items-center gap-2 text-[12.5px] text-slate-500 font-medium">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                <span>06XX46893166</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[12.5px] text-slate-500 font-medium overflow-hidden">
                                                                <Mail className="w-3.5 h-3.5 shrink-0" />
                                                                <span className="truncate">toufik.bejjani@example.com</span>
                                                            </div>
                                                        </div>

                                                        <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[11.5px] text-slate-400 font-medium">
                                                            <div className="flex items-center">
                                                                Ajouté par : <Trash2 className="w-3.5 h-3.5 ml-2 cursor-pointer hover:text-red-500 transition-colors" />
                                                            </div>
                                                            <ArrowRight className="w-3.5 h-3.5 cursor-pointer hover:text-slate-600" />
                                                        </div>
                                                    </div>

                                                    {/* Member Card 2 */}
                                                    <div className="w-[320px] border border-gray-100 rounded-[10px] p-5 relative bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-gray-900/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <div className="text-[14px] font-bold text-slate-800 mb-1">Nabila BAKKALI</div>
                                                                <div className="flex items-center gap-2 text-[12.5px]">
                                                                    <span className="text-slate-400">Mère</span>
                                                                </div>
                                                            </div>
                                                            <div className="relative">
                                                                <div className="w-10 h-10 rounded-full bg-[#af6b48] text-white flex items-center justify-center font-bold text-[16px]">N</div>
                                                                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#3b82f6] rounded-full border-2 border-white"></div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5 mb-6">
                                                            <div className="flex items-center gap-2 text-[12.5px] text-slate-500 font-medium">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                <span>06XX5743164</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[12.5px] text-slate-500 font-medium overflow-hidden">
                                                                <Mail className="w-3.5 h-3.5 shrink-0" />
                                                                <span className="truncate">nabila.bakkali@example.com</span>
                                                            </div>
                                                        </div>

                                                        <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[11.5px] text-slate-400 font-medium">
                                                            <div className="flex items-center">
                                                                Ajouté par : <Trash2 className="w-3.5 h-3.5 ml-2 cursor-pointer hover:text-red-500 transition-colors" />
                                                            </div>
                                                            <ArrowRight className="w-3.5 h-3.5 cursor-pointer hover:text-slate-600" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Accompagnants Section */}
                                                <div className="mt-10">
                                                    <h3 className="text-[13px] font-bold text-slate-800">Accompagnants</h3>
                                                    <p className="text-[12.5px] text-slate-500 mt-0.5">Vous pouvez ajouter des accompagnants ci-dessous.</p>

                                                    <button className="mt-4 flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-[12.5px] font-bold text-slate-500 hover:bg-slate-50 transition-colors shadow-sm bg-white">
                                                        <Plus className="w-[14px] h-[14px]" /> Ajouter un accompagnant
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* === TAB: Informations personnelles === */}
                                {activeFormTab === 'infos' && (
                                    <div className="px-10 pb-12 pt-6">
                                        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Lieu de naissance</label>
                                                <Input placeholder="Lieu de naissance..." className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Téléphone</label>
                                                <div className="flex gap-3">
                                                    <Input defaultValue="+212" className="bg-white border-gray-200 h-11 w-16 text-center text-[14px] font-medium shadow-sm" />
                                                    <Input defaultValue="06XX94669190" className="bg-white border-gray-200 h-11 flex-1 text-[14px] font-medium shadow-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Nationalité</label>
                                                <Input defaultValue="Marocaine" className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">E-mail</label>
                                                <Input defaultValue="abdellah.abouassi.2017@example.com" className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                        </div>

                                        <p className="text-[12px] text-slate-400 mt-8 font-medium">Les champs suivis d'un <span className="text-red-500">*</span> sont obligatoires.</p>
                                    </div>
                                )}

                                {/* === TAB: Scolarité === */}
                                {activeFormTab === 'scolarite' && (
                                    <div className="px-10 pb-12 pt-6">
                                        <h3 className="text-[14px] font-bold text-slate-700 mb-5">Informations scolaires</h3>

                                        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                                            <div className="space-y-1">
                                                <label className="text-[13px] font-bold text-slate-700">Date de la première inscription</label>
                                                <p className="text-[13.5px] text-slate-600 font-medium">03/09/2025</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[13px] font-bold text-slate-700">Date d'arrivée</label>
                                                <p className="text-[13.5px] text-slate-600 font-medium">01/09/2025</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Dernier niveau</label>
                                                <Input placeholder="Dernier niveau..." className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Code Massar</label>
                                                <Input placeholder="Code massar..." className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Nombre d'années redoublées</label>
                                                <Input defaultValue="0" className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Situation scolaire</label>
                                                <div className="relative">
                                                    <Input placeholder="Privé, Public, Non formel, Autres pays..." readOnly className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm text-slate-400 pr-8 cursor-pointer" />
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">École d'origine</label>
                                                <Input placeholder="École d'origine..." className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                        </div>

                                        {/* Suivi des dossiers */}
                                        <div className="mt-10 border-t border-gray-100 pt-6">
                                            <h3 className="text-[13px] font-bold text-slate-700 mb-4">Suivi des dossiers de l'apprenant</h3>
                                            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                                                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                    Attestation de radiation
                                                </label>
                                                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                    Dossier de l'apprenant demandé
                                                </label>
                                                <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                    <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                    Dossier de l'apprenant reçu
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* === TAB: Santé === */}
                                {activeFormTab === 'sante' && (
                                    <div className="px-10 pb-12 pt-6">
                                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                L'apprenant a-t-il un handicap ?
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Est-ce que l'apprenant a un médecin ?
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Groupe Sanguin
                                            </label>
                                        </div>

                                        <p className="text-[12px] text-slate-400 mt-8 font-medium">Les champs suivis d'un <span className="text-red-500">*</span> sont obligatoires.</p>
                                    </div>
                                )}

                                {/* === TAB: Aliment === */}
                                {activeFormTab === 'aliment' && (
                                    <div className="px-10 pb-12 pt-6">
                                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Ne mange pas
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Intolérances
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Allergie
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Sieste
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer text-[13px] text-slate-600 font-medium hover:text-slate-800">
                                                <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0"></div>
                                                Comportement
                                            </label>
                                        </div>

                                        <p className="text-[12px] text-slate-400 mt-8 font-medium">Les champs suivis d'un <span className="text-red-500">*</span> sont obligatoires.</p>
                                    </div>
                                )}

                                {/* === TAB: Transport === */}
                                {activeFormTab === 'transport' && (
                                    <div className="px-10 pb-12 pt-6">
                                        <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Quartier <span className="text-red-500">*</span></label>
                                                <Input defaultValue="Massira 2" className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-slate-700">Adresse</label>
                                                <Input defaultValue="HAY EL MAAMOURA N° 17 SEC 4 BLOC 2 TEMARA" className="bg-white border-gray-200 h-11 text-[14px] font-medium shadow-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[13px] text-slate-400 font-medium">Circuit</label>
                                                <p className="text-[13.5px] text-[#128b9d] font-bold">CIRCUIT 2 MASSIRA 1+2</p>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[13px] text-slate-400 font-medium">Véhicule</label>
                                                <p className="text-[13.5px] text-slate-700 font-bold">V03</p>
                                            </div>
                                        </div>

                                        <button className="mt-4 text-[13px] text-[#128b9d] font-medium hover:underline flex items-center gap-1">
                                            <ArrowRight className="w-3.5 h-3.5" /> Modifier le circuit
                                        </button>

                                        <p className="text-[12px] text-slate-400 mt-8 font-medium">Les champs suivis d'un <span className="text-red-500">*</span> sont obligatoires.</p>
                                    </div>
                                )}

                                {/* === TAB: Inscription(s) === */}
                                {activeFormTab === 'inscriptions' && (
                                    <div className="px-10 pb-8 pt-6">
                                        <table className="w-full text-[13px] text-left">
                                            <thead>
                                                <tr className="border-b border-gray-200 text-slate-700 font-bold">
                                                    <th className="py-3 px-2">Années scolaires</th>
                                                    <th className="py-3 px-2">Date d'inscription</th>
                                                    <th className="py-3 px-2">Date d'entrée</th>
                                                    <th className="py-3 px-2 flex items-center gap-1">Niveau <ChevronDown className="w-3 h-3 text-slate-400" /></th>
                                                    <th className="py-3 px-2">Classe</th>
                                                    <th className="py-3 px-2">Résultat</th>
                                                    <th className="py-3 px-2"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-600 font-medium">
                                                <tr className="border-b border-gray-50 hover:bg-slate-50/50">
                                                    <td className="py-3.5 px-2">2025 - 2026</td>
                                                    <td className="py-3.5 px-2">03/09/2025</td>
                                                    <td className="py-3.5 px-2">01/09/2025</td>
                                                    <td className="py-3.5 px-2">3AEP</td>
                                                    <td className="py-3.5 px-2">3AEP-2 (SPINOZA)</td>
                                                    <td className="py-3.5 px-2">
                                                        <span className="bg-[#e6f4ea] text-[#1e8e3e] px-2.5 py-1 rounded-[6px] text-[11.5px] font-bold">En cours</span>
                                                    </td>
                                                    <td className="py-3.5 px-2 text-[#128b9d] font-medium cursor-pointer hover:underline">Modifier</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <p className="text-[12px] text-slate-400 mt-8 font-medium">Les champs suivis d'un <span className="text-red-500">*</span> sont obligatoires.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
