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
    Mail, School, User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

import DashboardSidebar from "@/components/school/DashboardSidebar";
import DashboardTopbar from "@/components/school/DashboardTopbar";
import StudentsContent from "@/components/school/students/StudentsContent";
import ClassesContent from "@/components/school/classes/ClassesContent";
import StudentProfile from "@/components/school/StudentProfile";
import StudentServices from "@/components/school/StudentServices";
import StudentAbsences from "@/components/school/StudentAbsences";
import CancelMonthModal from "@/components/school/CancelMonthModal";
import ReductionInstallmentModal from "@/components/school/ReductionInstallmentModal";
import EditMemberModal from "@/components/school/EditMemberModal";
import DashboardContent from "@/components/school/DashboardContent";

const supabase = createClient();

type Institution = {
    id: string;
    company_id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    setup_completed: boolean;
};

{/* Dashboard */ }


export default function Dashboard() {
    return (
        <React.Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Chargement du tableau de bord...</p>
                </div>
            </div>
        }>
            <SchoolDashboardContent />
        </React.Suspense>
    );
}

function SchoolDashboardContent() {
    const router = useRouter();
    const [setupChecked, setSetupChecked] = useState(false);
    const [activeModule, setActiveModule] = useState("dashboard");
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
    const [institution, setInstitution] = useState<Institution | null>(null);
    const searchParams = useSearchParams();

    const urlInstitutionSlug = searchParams.get("institution");

    useEffect(() => {
        if (urlInstitutionSlug) {
            localStorage.setItem("institution_slug", urlInstitutionSlug);
        }
    }, [urlInstitutionSlug]);

    const institutionSlug =
        urlInstitutionSlug ??
        (typeof window !== "undefined"
            ? localStorage.getItem("institution_slug")
            : null);

    {/* useEffect */ }


    useEffect(() => {
        let cancelled = false;

        async function loadInstitution() {
            console.log("DEBUG [loadInstitution start]: Checking auth session...");

            // 1. Check authentication first
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                console.log("DEBUG [loadInstitution]: No valid session found. Redirecting to /login");
                router.replace("/login");
                return;
            }

            console.log("DEBUG [loadInstitution]: Session valid. Checking institutionSlug =", institutionSlug);
            if (!institutionSlug) {
                console.log("DEBUG [loadInstitution]: No institutionSlug found. Redirecting to /setup");
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
                console.log("DEBUG [loadInstitution]: Supabase error. Redirecting to /setup? Wait, no, it sets setupChecked(true).");
                setSetupChecked(true);
                return;
            }

            if (!data) {
                console.error(
                    "❌ Établissement introuvable:",
                    institutionSlug
                );
                console.log("DEBUG [loadInstitution]: No data found for slug. Setting setupChecked(true).");
                setSetupChecked(true);
                return;
            }

            console.log(
                "✅ Établissement chargé:",
                data
            );

            if (!data.setup_completed) {
                console.log("DEBUG [loadInstitution]: setup_completed is false. Redirecting to /setup");
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

    {/* allModules */ }

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
                <aside
                    className={`absolute top-0 left-0 bottom-0 w-[230px] flex flex-col border-r border-[#e5e7eb] bg-white overflow-hidden transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full">
                        <DashboardSidebar
                            institution={institution}
                            activeModule={activeModule}
                            setActiveModule={setActiveModule}
                        />
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
            <div className="flex-1 flex flex-col h-full bg-slate-50 relative z-10 overflow-hidden pl-4">

                {/* TOP HEADER */}


                {/* Conditionally render Sub-Header and Content based on state */}
                {displayedStudent ? (
                    currentDetailView === 'profile' ? (
                        <StudentProfile
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            displayedStudent={displayedStudent}
                            setSelectedStudent={setSelectedStudent}
                            isSaved={isSaved}
                            setIsSaved={setIsSaved}
                            setCurrentDetailView={setCurrentDetailView}
                            activeFormTab={activeFormTab}
                            setActiveFormTab={setActiveFormTab}
                            setEditMember={setEditMember}
                        />
                    ) : currentDetailView === 'services' ? (
                        <StudentServices
                            displayedStudent={displayedStudent}
                            setSelectedStudent={setSelectedStudent}
                            setIsCreating={setIsCreating}
                            setCurrentDetailView={setCurrentDetailView}
                            setShowAddServiceModal={setShowAddServiceModal}
                            setManageService={setManageService}
                        />
                    ) : currentDetailView === 'absences' ? (
                        <StudentAbsences
                            displayedStudent={displayedStudent}
                            setSelectedStudent={setSelectedStudent}
                            setIsCreating={setIsCreating}
                            setCurrentDetailView={setCurrentDetailView}
                        />
                    ) : null
                ) : activeModule === "dashboard" ? (
                    <DashboardContent institution={institution} />
                ) : activeModule === "classes" ? (
                    <ClassesContent institution={institution} />
                ) : activeModule === "students" ? (
                    <>
                        <DashboardTopbar />
                        {/* CONTENT AREA (Sidebar + Grid) */}
                        <div className="flex-1 flex overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                            {/* CONTENT AREA */}
                            <div className="flex-1 flex overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
                                    <StudentsContent
                                        onStudentClick={(student: any) => {
                                            setSelectedStudent(student);
                                            setIsCreating(false);
                                            setCurrentDetailView('profile');
                                        }}
                                        onNewStudent={() => {
                                            setSelectedStudent(null);
                                            setIsCreating(true);
                                            setIsSaved(false);
                                            setCurrentDetailView('profile');
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}

                {/* Modals */}
                <CancelMonthModal cancelMonth={cancelMonth} setCancelMonth={setCancelMonth} />
                <ReductionInstallmentModal reductionMonth={reductionMonth} setReductionMonth={setReductionMonth} />
                <EditMemberModal editMember={editMember} setEditMember={setEditMember} />


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
