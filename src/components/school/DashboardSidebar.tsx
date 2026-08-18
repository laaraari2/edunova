"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import {
  LayoutDashboard,
  Users,
  UserCog,
  GraduationCap,
  ClipboardCheck,
  BookMarked,
  CreditCard,
  FileText,
  Calculator,
  BarChart3,
  MessageCircle,
  MessageSquare,
  Mail,
  Bell,
  Bot,
  TrendingUp,
  Eye,
  Settings,
  UsersRound,
  ShieldCheck,
  School,
  HelpCircle,
  ChevronRight,
  LogOut,
} from "lucide-react";

type Institution = {
  id: string;
  company_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  setup_completed: boolean;
};

interface DashboardSidebarProps {
  institution: Institution | null;
  activeModule: string;
  setActiveModule: React.Dispatch<React.SetStateAction<string>>;
}

type MenuItem = {
  title: string;
  href: string;
  icon: any;
  badge?: boolean;
  tag?: string;
};

type MenuGroup = {
  title: string;
  icon: any;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    title: "Académique",
    icon: GraduationCap,
    items: [
      { title: "Élèves", href: "/school", icon: Users },
      { title: "Enseignants", href: "/school/teachers", icon: UserCog },
      { title: "Classes", href: "/school", icon: GraduationCap },
      { title: "Examens", href: "/school/exams", icon: ClipboardCheck },
      { title: "Notes & Bulletins", href: "/school/grades", icon: BookMarked },
    ],
  },
  {
    title: "Finance",
    icon: CreditCard,
    items: [
      { title: "Paiements", href: "/school/payments", icon: CreditCard },
      { title: "Factures", href: "/school/invoices", icon: FileText },
      { title: "Comptabilité", href: "/school/accounting", icon: Calculator },
      { title: "Rapports financiers", href: "/school/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Communication",
    icon: MessageCircle,
    items: [
      { title: "Messages", href: "/school/messages", icon: MessageCircle },
      { title: "SMS", href: "/school/sms", icon: MessageSquare },
      { title: "Email", href: "/school/email", icon: Mail },
      { title: "Notifications", href: "/school/notifications", icon: Bell },
    ],
  },
  {
    title: "IA & Analytique",
    icon: Bot,
    items: [
      { title: "Assistant IA", href: "/school/ai-assistant", icon: Bot },
      { title: "Analyses", href: "/school/analytics", icon: TrendingUp },
      { title: "Prévisions", href: "/school/forecasts", icon: Eye },
    ],
  },
  {
    title: "Paramètres",
    icon: Settings,
    items: [
      { title: "Paramètres", href: "/school/settings", icon: Settings },
      { title: "Utilisateurs", href: "/school/users", icon: UsersRound },
      { title: "Rôles & Permissions", href: "/school/roles", icon: ShieldCheck },
    ],
  },
];

export default function DashboardSidebar({
  institution,
  activeModule,
  setActiveModule,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const schoolName = institution?.name;
  const dashboardActive = activeModule === "dashboard";

  const [openSection, setOpenSection] = useState<string>("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  useEffect(() => {
    if (activeModule === "dashboard") {
      setOpenSection("");
      return;
    }

    const currentGroup = menuGroups.find((group) =>
      group.items.some((item) => {
        if (item.title === "Élèves") return activeModule === "students";
        if (item.title === "Classes") return activeModule === "classes";
        return pathname === item.href || pathname.startsWith(item.href + "/");
      })
    );

    if (currentGroup) {
      setOpenSection(currentGroup.title);
    }
  }, [pathname, activeModule]);

  const isSectionOpen = (title: string) => openSection === title;

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? "" : title));
  };

  return (
    <aside className="w-[260px] h-full flex flex-col bg-white border-r border-slate-200 shadow-sm">

      {/* Logo */}
      <div className="border-b border-slate-200 px-6 py-6 text-center">
        <h2 className="text-xl font-extrabold text-slate-800">
          {schoolName}
        </h2>

        <div className="mt-5 flex justify-center">
          {institution?.logo_url ? (
            <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-lg shadow-cyan-100">
              <Image
                src={institution.logo_url}
                alt={schoolName || "Logo"}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-[#128b9d] flex items-center justify-center">
              <School className="w-9 h-9 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-5 custom-scrollbar">

        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Tableau de bord
        </p>

        {/* Tableau de bord */}
        <Link
          href="/school"
          onClick={() => setActiveModule("dashboard")}
          className={`flex items-center gap-3 rounded-xl px-4 py-2.5 mb-4 transition-all duration-300 ${dashboardActive
            ? "bg-[#128b9d] text-white shadow-md"
            : "text-slate-700 hover:bg-[#eef9fb] hover:text-[#128b9d]"
            }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Tableau de bord</span>
        </Link>

        {/* Accordion Menu */}
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-2">

            {/* Header */}
            <button
              onClick={() => toggleSection(group.title)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${isSectionOpen(group.title)
                ? "bg-[#128b9d] text-white shadow-md"
                : "hover:bg-[#eef9fb] text-slate-600"
                }`}
            >
              {/* Left */}
              <div
                className={`flex items-center gap-2 transition-colors duration-300 ${isSectionOpen(group.title)
                  ? "text-white"
                  : "text-slate-500"
                  }`}
              >
                <group.icon className="w-4 h-4" />
                <span className="text-[12px] font-bold uppercase tracking-[0.18em]">
                  {group.title}
                </span>
              </div>

              {/* Arrow */}
              <ChevronRight
                className={`w-4 h-4 transition-all duration-300 ${isSectionOpen(group.title)
                  ? "rotate-90 text-white"
                  : "text-slate-400"
                  }`}
              />
            </button>

            {/* Items */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isSectionOpen(group.title)
                ? "max-h-[500px] opacity-100 mt-2"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="ml-6 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.title === "Élèves"
                      ? activeModule === "students"
                      : item.title === "Classes"
                        ? activeModule === "classes"
                        : pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => {
                        if (item.title === "Élèves") {
                          setActiveModule("students");
                        } else if (item.title === "Classes") {
                          setActiveModule("classes");
                        } else {
                          setActiveModule(""); // Clear active module for other routes
                        }
                      }}
                      className={`group flex items-center gap-3 rounded-lg px-4 py-2 transition ${active
                        ? "bg-[#128b9d] text-white shadow-sm"
                        : "text-slate-600 hover:bg-[#eef9fb] hover:text-[#128b9d]"
                        }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors duration-200 ${active
                          ? "text-white"
                          : "text-slate-400 group-hover:text-[#128b9d]"
                          }`}
                      />
                      <span className="flex-1 text-sm font-medium">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      )}
                      {item.tag && (
                        <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[9px] font-bold text-[#128b9d]">
                          {item.tag}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4 space-y-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-500 transition-all hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
        <div className="text-center">
          <p className="text-[11px] text-slate-400">
            Powered by{" "}
            <span className="font-semibold text-[#128b9d]">
              EduNova ERP
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}