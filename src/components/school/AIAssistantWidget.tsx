"use client";

import { Bot, ChevronRight, Users, Clock, CalendarX, UserX, FileText } from "lucide-react";

export default function AIAssistantWidget() {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col h-full shadow-sm">

            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-lg font-black text-[#4f46e5]">Assistant IA</h2>
            </div>

            <div className="bg-indigo-50/50 rounded-2xl p-4 flex items-center gap-4 mb-6 cursor-pointer hover:bg-indigo-50 transition-colors border border-indigo-100/50">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6 text-[#4f46e5]" />
                </div>
                <p className="text-sm font-medium text-slate-700 leading-snug flex-1">
                    Que puis-je faire pour vous aujourd&apos;hui ?
                </p>
                <ChevronRight className="w-5 h-5 text-indigo-300 shrink-0" />
            </div>

            <div className="flex-1 space-y-4">

                <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">12 familles avec impayés</span>
                    </div>
                    <span className="text-xs font-bold text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity">Voir</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                            <CalendarX className="w-4 h-4 text-orange-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">8 absences non justifiées</span>
                    </div>
                    <span className="text-xs font-bold text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity">Voir</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <UserX className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">3 enseignants sans emploi du temps</span>
                    </div>
                    <span className="text-xs font-bold text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity">Voir</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-pink-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">5 nouvelles préinscriptions</span>
                    </div>
                    <span className="text-xs font-bold text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity">Voir</span>
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-purple-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">2 factures en retard</span>
                    </div>
                    <span className="text-xs font-bold text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity">Voir</span>
                </div>

            </div>

            <button className="w-full mt-6 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-indigo-200">
                <Bot className="w-4 h-4" />
                Poser une question à l&apos;IA
            </button>

        </div>
    );
}
