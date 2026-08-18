"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Search,
    Settings,
    LayoutGrid,
    FileText,
    PieChart,
    ChevronDown,
    Calendar,
    Clock,
    MoreVertical,
    Box,
    Image as ImageIcon,
    Users,
    Bell,
    Bus,
    Megaphone,
    CalendarCheck,
    BookMarked,
    UserCog,
    Wrench,
    ChevronLeft,
    ChevronRight,
    Filter,
    Layers,
    Columns,
    List,
    Copy,
    CheckCircle2,
    Monitor,
    Users2,
    CircleDashed,
    CalendarDays,
    Send,
    MoreHorizontal,
    MapPin,
    Building2,
    Camera,
    Plus,
    Edit2 as PencilIcon,
    Languages,
    UserMinus,
    Banknote,
    Trash2,
    ArrowRight,
    ShieldCheck,
    Phone,
    Mail,School
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Institution = {
    id: string;
    company_id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    setup_completed: boolean;
};

  {/* Dashboard */}


export default function Dashboard() {
    const router = useRouter();
    const [setupChecked, setSetupChecked] = useState(false);
    const [activeTab, setActiveTab] = useState("Accès");
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [classes, setClasses] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [currentDetailView, setCurrentDetailView] = useState("profile");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const [selectedServiceModal, setSelectedServiceModal] = useState("");
    const [manageService, setManageService] = useState<string | null>(null);
    const [cancelMonth, setCancelMonth] = useState<string | null>(null);
    const [reductionMonth, setReductionMonth] = useState<string | null>(null);
    const [editMember, setEditMember] = useState<string | null>(null);
    const [activeFormTab, setActiveFormTab] = useState('famille');
const [isSaved, setIsSaved] = useState(false);

const searchParams = useSearchParams();
const institutionSlug = searchParams.get("institution");
const [institution, setInstitution] = useState<Institution | null>(null);

  {/* useEffect */}


  useEffect(() => {
    let cancelled = false;

    async function loadInstitution() {
        if (!institutionSlug) {
            router.replace("/setup");
            return;
        }

        console.log(
            "🏫 Chargement établissement:",
            institutionSlug
        );

        const { data, error } = await supabase
            .from("establishments")
            .select(
                "id, company_id, name, slug, logo_url, setup_completed"
            )
            .eq("slug", institutionSlug)
            .maybeSingle();

        if (cancelled) return;

        if (error) {
            console.error(
                "❌ Erreur établissement:",
                error
            );

            setSetupChecked(true);
            return;
        }

        if (!data) {
            console.error(
                "❌ Établissement introuvable:",
                institutionSlug
            );

            setSetupChecked(true);
            return;
        }

        console.log(
            "✅ Établissement chargé:",
            data
        );

        if (!data.setup_completed) {
            router.replace(
                `/setup?institution=${encodeURIComponent(
                    data.slug
                )}`
            );
            return;
        }

        setInstitution(data);
        setSetupChecked(true);
    }

    void loadInstitution();

    return () => {
        cancelled = true;
    };
}, [institutionSlug, router]);


useEffect(() => {
    if (!institution) return;

    const loadClasses = async () => {
        const { data, error } = await supabase
            .from("classes")
            .select("*")
            .eq("establishment_id", institution.id)
            .eq("status", "active")
            .order("level_code")
            .order("name");

        if (error) {
            console.error("Erreur classes:", error);
            return;
        }

        console.log("📚 Classes:", data);
        setClasses(data || []);
    };

    loadClasses();
}, [institution]);


    if (!setupChecked) return null;

    const displayedStudent = selectedStudent || (isCreating ? {
        name: "",
        id: "",
        class: "",
        initial: "",
        color: "bg-slate-200"
    } : null);

       {/* allModules */}

  const allModules = [
    { id: "Dashboard", name: "Dashboard", icon: LayoutGrid, color: "text-slate-500", isActiveColor: "text-[#108c9d]" },
    { id: "Accès", name: "Accès", icon: Users, color: "text-[#ed5565]", isActiveColor: "text-[#108c9d]" },
    { id: "Finance", name: "Finance", icon: Monitor, color: "text-[#3b82f6]", isActiveColor: "text-blue-500" },
    { id: "Vie scolaire", name: "Vie scolaire", icon: Users2, color: "text-[#10b981]", isActiveColor: "text-emerald-500" },
    { id: "CRM/Préinscription", name: "CRM/Préinscription", icon: Filter, color: "text-[#06b6d4]", isActiveColor: "text-cyan-500" },
    { id: "Transport", name: "Transport", icon: CircleDashed, color: "text-[#8b5cf6]", isActiveColor: "text-violet-500" },
    { id: "Planification", name: "Planification", icon: LayoutGrid, color: "text-[#14b8a6]", isActiveColor: "text-teal-500" },
    { id: "Communication", name: "Communication", icon: Send, color: "text-[#3b82f6]", isActiveColor: "text-blue-500" },
    { id: "Personnels", name: "Personnels", icon: UserCog, color: "text-[#f43f5e]", isActiveColor: "text-rose-500" },
    { id: "Apps", name: "Apps", icon: PieChart, color: "text-[#f59e0b]", isActiveColor: "text-amber-500" },
    { id: "Paramètres", name: "Paramètres", icon: Settings, color: "text-[#f59e0b]", isActiveColor: "text-amber-500" },
];


    const dashboardStats = [
    {
        label: "Élèves",
        value: "—",
        icon: Users,
        description: "Total des élèves",
    },
    {
        label: "Enseignants",
        value: "—",
        icon: UserCog,
        description: "Personnel enseignant",
    },
    {
        label: "Classes",
        value: "—",
        icon: Building2,
        description: "Classes actives",
    },
    {
        label: "Présence",
        value: "—",
        icon: CalendarCheck,
        description: "Présence aujourd'hui",
    },
];

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

    const levels = [...new Set(classes.map(c => c.level_code))];



    return (
        <div className="flex h-screen bg-white text-slate-800 font-sans overflow-hidden">

            {/* SIDEBAR WRAPPER */}
            <div className={`relative transition-all duration-300 shrink-0 z-[1000] ${sidebarOpen ? 'w-[230px]' : 'w-0'}`}>
                <aside className={`absolute top-0 left-0 bottom-0 w-[230px] flex flex-col justify-between border-r border-[#e5e7eb] bg-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        {/* Logo Area */}
                     {/* Logo Area */}
<div className="flex flex-col items-center justify-center py-6 px-4">
    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden mb-3">
        {institution?.logo_url ? (
            <img
                src={institution.logo_url}
                alt={`Logo ${institution.name}`}
                className="w-full h-full object-contain p-2"
            />
        ) : (
            <School className="w-7 h-7 text-[#148ea1]" />
        )}
    </div>

    <span className="text-[15px] font-black text-[#1e293b] text-center leading-tight">
        {institution?.name || "Établissement"}
    </span>

    <span className="text-[10px] font-semibold text-slate-400 mt-1">
        Edunova
    </span>
</div>

                        {/* Modules List */}
                        <nav className="flex flex-col py-2 flex-1 overflow-y-auto">
                            <div className="flex items-center justify-between px-6 mb-3">
                                <div className="text-[12px] font-semibold text-slate-400">MODULES</div>
                                <Copy className="w-[14px] h-[14px] text-slate-400 cursor-pointer hover:text-slate-600" />
                            </div>

                            <ul className="flex flex-col gap-0.5">
                                {allModules.map((m) => {
                                    const isActive = activeTab === m.id;
                                    return (
                                        <li
                                            key={m.id}
                                            className={`flex items-center justify-between py-[11px] pr-4 cursor-pointer transition-colors relative mb-1
                                  ${isActive ? 'bg-[#e0f2f7] text-[#0a6d7a] rounded-r-full select-none shadow-md shadow-[#128b9d]/10' : 'text-slate-600 hover:bg-slate-100'}`}
                                            onClick={() => setActiveTab(m.id)}
                                        >
                                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#108c9f] rounded-r-md"></div>}

                                            <div className={`flex items-center gap-4 ${isActive ? 'ml-6' : 'ml-6'}`}>
                                                <m.icon className={`w-[18px] h-[18px] ${isActive ? m.isActiveColor : m.color} ${m.id === 'Accès' && !isActive ? 'opacity-80' : ''}`} strokeWidth={1.5} />
                                                <span className="text-[13.5px] font-bold leading-none">{m.name}</span>
                                            </div>

                                            <MoreVertical className={`w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100 text-[#0a6d7a]' : ''}`} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Version */}
                        <div className="flex items-center justify-center py-6 text-xs text-slate-400 border-t border-transparent">
                            Version 1.4.5
                        </div>

                        {/* Context Switcher Bottom */}
                        <div className="flex items-center justify-between border-t border-slate-200">
                            <div className="flex-1 py-3 px-6 text-[12px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer">
                                RÉCENTS
                            </div>
                            <div className="px-3 py-1 bg-slate-100/80 mr-4 rounded text-[11px] font-bold text-slate-500">
                                17
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Toggle Button */}
                <button
                    className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-7 bg-white border border-gray-200 text-slate-400 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 hover:text-[#128b9d] transition-colors z-[1001]"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 ml-0.5" />}
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-full bg-white relative z-10 w-full overflow-hidden">
                {/* TOP HEADER */}
                <header className="h-16 border-b border-gray-200 flex items-center justify-between pr-6 pl-4 shrink-0 bg-white">
                    <div className="flex items-center gap-6 h-full">
                        <div className="h-full flex items-center cursor-pointer px-2 opacity-60 hover:opacity-100 transition-opacity">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                            </div>
                        </div>
                        <nav className="flex items-center h-full space-x-6 text-[13.5px] font-medium text-slate-600">
                            <div className="h-full flex items-center border-b-2 border-transparent cursor-pointer hover:text-slate-800">Accès</div>
                            <div className="h-full flex items-center text-slate-800 border-b-2 border-transparent cursor-pointer">Carte Scolaire</div>
                            <div className="h-full flex items-center border-b-2 border-transparent cursor-pointer hover:text-slate-800">Rapports</div>
                            <div className="h-full flex items-center border-b-2 border-transparent cursor-pointer hover:text-slate-800">Analyse</div>
                            <div className="h-full flex items-center border-b-2 border-transparent cursor-pointer hover:text-slate-800">Configuration</div>
                        </nav>
                    </div>



                    {/* Top Right Tools */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2 text-slate-600 bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                           <span className="text-[13px] font-medium"> 2025-2026</span>
                        </div>
                        <div className="p-2 border border-gray-200 rounded-md cursor-pointer text-slate-600 hover:bg-slate-50 relative shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                            <Clock className="w-4 h-4" strokeWidth={1.5} />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white translate-x-1/3 -translate-y-1/3 shadow-[0_0_0_2px_white]"></div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[#ad2432] text-white flex flex-col items-center justify-center font-bold text-[14px] shadow-sm ml-2 cursor-pointer shadow-red-500/20">
                            A
                        </div>
                    </div>
                </header>

                {/* Conditionally render Sub-Header and Content based on state */}
               {activeTab === "Dashboard" ? (
    <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8">
                <p className="text-sm font-semibold text-[#128b9d]">
                    Tableau de bord
                </p>

                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                    Vue d’ensemble
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Suivez les informations principales de votre établissement.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Apprenants
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-900">
                        347
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Enseignants
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-900">
                        0
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Classes
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-900">
                        0
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Présences aujourd’hui
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-slate-900">
                        —
                    </p>
                </div>
            </div>
        </div>
    </main>
) : !displayedStudent ? (
                    <>
                        {/* SUB HEADER / TOOLBAR (Grid View) */}
                        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative z-10 w-full animate-in fade-in">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => { setIsCreating(true); setCurrentDetailView("profile"); }}
                                    className="bg-[#128b9d] text-white px-[18px] py-[7px] rounded-lg text-[13.5px] font-medium hover:bg-[#0f7686] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                                >
                                    Nouveau
                                </button>
                                <div className="flex items-center gap-2 text-slate-600 font-medium text-[15px] ml-2 cursor-pointer group">
                                    Apprenant <Settings className="w-[15px] h-[15px] text-slate-400 group-hover:text-slate-600 transition-colors" strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="flex items-center justify-center flex-1 max-w-md mx-6">
                                <div className="relative w-full max-w-[400px]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                                    </div>
                                    <Input
                                        placeholder="Rechercher..."
                                        className="h-10 w-full pl-10 pr-4 bg-slate-50 border-gray-200 text-[13.5px] rounded-xl placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-300 shadow-inner shadow-slate-100/50"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 text-slate-500 text-[13.5px]">
                                    <span className="font-medium tracking-wide">1-80 / 347</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 bg-white">
                                            <ChevronLeft className="w-4 h-4" />
                                        </div>
                                        <div className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 cursor-pointer bg-white">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-[34px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                    <div className="px-2.5 h-full flex items-center bg-[#f0f9fb] text-[#128b9d] border-r border-gray-200 cursor-pointer">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="18" rx="1" /><rect x="14" y="3" width="7" height="18" rx="1" /></svg>
                                    </div>
                                    <div className="px-2.5 h-full flex items-center text-slate-400 hover:bg-slate-50 cursor-pointer bg-white">
                                        <List className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT AREA (Sidebar + Grid) */}
                        <div className="flex-1 flex overflow-hidden animate-in slide-in-from-bottom-2 duration-300">

                            {/* Inner Left Sidebar */}
                            <aside className="w-[200px] bg-[#fbfcfd] border-r border-gray-100 py-6 px-4 shrink-0 overflow-y-auto">
                              <div className="flex flex-col space-y-1">

    <div className="bg-[#f0f9fb] text-[#128b9d] font-semibold text-[13.5px] px-4 py-2.5 rounded-lg cursor-pointer">
        Tous
    </div>

    {levels.map(level => (
        <div
            key={level}
            className="text-slate-600 hover:text-[#128b9d] font-medium text-[13.5px] px-4 py-2.5 cursor-pointer flex items-center gap-2 transition-colors"
        >
            <div className="w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45"></div>

            {level}
        </div>
    ))}

</div>
                            </aside>

                            {/* Grid */}
                            <main className="flex-1 p-6 overflow-y-auto bg-[#fafafa]">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max">
                                    {studentsData.map((d, i) => (
                                        <div
                                            key={i}
                                            onClick={() => { setSelectedStudent(d); setCurrentDetailView("profile"); }}
                                            className="flex bg-white rounded-[10px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#128b9d]/30 hover:ring-1 hover:ring-[#128b9d]/20 transition-all cursor-pointer group"
                                        >
                                            {/* Photo Placeholder View */}
                                            <div className="w-[120px] flex items-center justify-center bg-white p-2">
                                                <div className="w-16 h-[85px] bg-[#e2e8f0] rounded-lg mt-2 relative overflow-hidden flex flex-col items-center">
                                                    <div className="w-7 h-7 bg-white rounded-full mt-2 opacity-50"></div>
                                                    <div className="w-12 h-10 bg-white rounded-t-[10px] mt-2 opacity-50"></div>
                                                </div>
                                            </div>

                                            {/* Info Area */}
                                            <div className="flex-1 p-4 pl-0 py-4 flex flex-col justify-between">
                                                {/* Top Row */}
                                                <div className="flex items-start justify-between">
                                                    <h3 className="font-semibold text-slate-800 text-[14.5px]">{d.name}</h3>
                                                    <CheckCircle2 className="w-5 h-5 text-[#2eb33c]" fill="currentColor" stroke="white" strokeWidth={1} />
                                                </div>

                                                <div className="space-y-1.5 mt-2 mb-3">
                                                    <div className="flex items-center text-slate-500 text-[13px] gap-2.5">
                                                        <div className="px-1.5 py-[1px] border border-gray-300 rounded text-[11px] font-bold text-gray-500 leading-none">12</div>
                                                        <span>{d.id}</span>
                                                    </div>
                                                    <div className="flex items-center text-slate-500 text-[13px] gap-2.5">
                                                        <Layers className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                                                        <span>{d.class}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-dotted border-gray-200">
                                                    <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                                                    <div className={`w-6 h-6 rounded-full ${d.color} text-white flex items-center justify-center text-[12px] font-bold shadow-sm`}>
                                                        {d.initial}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </main>
                        </div>
                    </>
                ) : currentDetailView === 'profile' ? (
                    <>
                        {/* SUB HEADER (Profile/Creation View) */}
                        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 shrink-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative z-10 w-full animate-in fade-in">
                            <div className="flex items-center gap-4">
                                <button
                                    className="bg-transparent border border-[#cbd5e1] text-[#94a3b8] px-[16px] py-[6px] rounded-lg text-[13.5px] font-medium hover:bg-slate-50 transition-all"
                                    onClick={() => { setSelectedStudent(null); setIsCreating(false); setIsSaved(false); }}
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
                                        <span className="text-[#128b9d] cursor-pointer hover:underline" onClick={() => { setSelectedStudent(null); setIsCreating(false); setIsSaved(false); }}>{isCreating ? 'Nouveau' : 'Apprenant'}</span>
                                        <ChevronRight className="w-3 h-3 text-slate-400 mx-0.5" />
                                        <span className="text-[#128b9d] cursor-pointer hover:underline">{isCreating && !isSaved ? 'Apprenant' : (isSaved ? 'Nada WERTY' : displayedStudent?.name)}</span>
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
                ) : currentDetailView === 'services' ? (
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
                ) : currentDetailView === 'absences' ? (
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
                ) : null}

                {/* Cancel Month Modal */}
                {cancelMonth && (
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
                )}

                {/* Reduction Installment Modal */}
                {reductionMonth && (
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
                )}

                {/* Edit Member Modal */}
                {editMember && (
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
                )}

            </div>
        </div>
    );
}

const GridMenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-slate-500">
        <rect x="3" y="3" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="10" y="3" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="17" y="3" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="3" y="10" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="10" y="10" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="17" y="10" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="3" y="17" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="10" y="17" width="4" height="4" rx="1" fill="currentColor" />
        <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor" />
    </svg>
)

const TriangleIcon = () => (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="text-[#128b9d] opacity-80 group-hover:opacity-100 transition-opacity">
        <path d="M7 5L0.25 9.33013L0.25 0.669873L7 5Z" fill="currentColor" />
    </svg>
)
