"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  AlertCircle,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Receipt,
  Search,
  Settings,
  TrendingUp,
  User,
  Users,
  X,
  Clock,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Establishment = {
  id: string;
  company_id: string;
  name: string;
  slug: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  setup_completed: boolean;
  created_at: string;
  updated_at: string;
};

type InstitutionView = Establishment & {
  students: number;
  plan: string;
  director: string;
  color: string;
  initial: string;
  createdAt: string;
};

const statusConfig: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ElementType;
  }
> = {
  active: {
    label: "Actif",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    icon: CheckCircle2,
  },

  trial: {
    label: "Essai",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    icon: Clock,
  },

  expired: {
    label: "Expiré",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    icon: AlertCircle,
  },
};

const colors = [
  "#0ea5e9",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
];

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function SuperAdminDashboard() {
  const supabase = useMemo(() => createClient(), []);

  const [sidebarItem, setSidebarItem] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [institutions, setInstitutions] = useState<InstitutionView[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [userEmail, setUserEmail] = useState("");
  const [companyName, setCompanyName] = useState("Edunova");

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copiedManagerLink, setCopiedManagerLink] =
    useState<string | null>(null);

  const [managerLoginLink, setManagerLoginLink] =
    useState<string | null>(null);

  const [institutionName, setInstitutionName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("active");

  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setError(null);

    try {
      console.log("🏢 Loading company dashboard...");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("👤 Current user:", user);

      if (userError || !user) {
        setError(
          "Vous devez être connecté pour accéder à cette console."
        );
        setLoading(false);
        return;
      }

      setUserEmail(user.email ?? "");

      /*
       * OWNER CHECK
       *
       * Le login a déjà confirmé que cet utilisateur est owner.
       * On vérifie quand même ici pour protéger directement la page /company.
       */
      console.log("👑 Checking company_members for OWNER...");

      const {
        data: membership,
        error: membershipError,
      } = await supabase
        .from("company_members")
        .select("company_id, role")
        .eq("user_id", user.id)
        .eq("role", "owner")
        .maybeSingle();

      console.log("👑 Owner membership:", membership);
      console.log("👑 Owner membership error:", membershipError);

      if (membershipError) {
        setError(membershipError.message);
        setLoading(false);
        return;
      }

      if (!membership) {
        setError(
          "Ce compte n'est pas autorisé à accéder à la console administrateur."
        );
        setLoading(false);
        return;
      }

      /*
       * COMPANY
       */
      const {
        data: company,
        error: companyError,
      } = await supabase
        .from("companies")
        .select("id, name, email")
        .eq("id", membership.company_id)
        .maybeSingle();

      if (companyError) {
        setError(companyError.message);
        setLoading(false);
        return;
      }

      if (company) {
        setCompanyName(company.name);
      }

      /*
       * ESTABLISHMENTS
       */
      console.log(
        "🏫 Loading establishments for company:",
        membership.company_id
      );

      const {
        data: establishments,
        error: establishmentsError,
      } = await supabase
        .from("establishments")
        .select(
          `
            id,
            company_id,
            name,
            slug,
            city,
            address,
            phone,
            email,
            status,
            setup_completed,
            created_at,
            updated_at
          `
        )
        .eq("company_id", membership.company_id)
        .order("created_at", { ascending: false });

      console.log("🏫 Establishments:", establishments);
      console.log(
        "🏫 Establishments error:",
        establishmentsError
      );

      if (establishmentsError) {
        setError(establishmentsError.message);
        setLoading(false);
        return;
      }

      const mapped: InstitutionView[] = (
        establishments ?? []
      ).map((item: Establishment, index: number) => ({
        ...item,
        students: 0,
        plan: "—",
        director: "—",
        color: colors[index % colors.length],
        initial: item.name.charAt(0).toUpperCase(),
        createdAt: formatDate(item.created_at),
      }));

      setInstitutions(mapped);
      setLoading(false);
    } catch (err) {
      console.error("🔴 loadDashboard error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors du chargement."
      );

      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  const filteredInstitutions = institutions.filter((inst) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      inst.name.toLowerCase().includes(query) ||
      (inst.city ?? "").toLowerCase().includes(query) ||
      inst.slug.toLowerCase().includes(query);

    const matchesFilter =
      filterStatus === "all" ||
      inst.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const activeCount = institutions.filter(
    (institution) => institution.status === "active"
  ).length;

  const trialCount = institutions.filter(
    (institution) => institution.status === "trial"
  ).length;

  const stats = [
    {
      label: "Institutions",
      value: institutions.length,
      icon: Building2,
      bg: "bg-sky-50",
      iconColor: "text-sky-500",
      change: "Depuis la base de données",
    },

    {
      label: "Apprenants",
      value: "—",
      icon: Users,
      bg: "bg-violet-50",
      iconColor: "text-violet-500",
      change: "Bientôt disponible",
    },

    {
      label: "Abonnements actifs",
      value: activeCount,
      icon: CreditCard,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      change: `${trialCount} en essai`,
    },

    {
      label: "Revenu mensuel",
      value: "—",
      icon: TrendingUp,
      bg: "bg-amber-50",
      iconColor: "text-amber-500",
      change: "Bientôt disponible",
    },
  ];

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      id: "institutions",
      label: "Institutions",
      icon: Building2,
    },

    {
      id: "users",
      label: "Utilisateurs",
      icon: Users,
    },

    {
      id: "billing",
      label: "Facturation",
      icon: Receipt,
    },

    {
      id: "settings",
      label: "Paramètres",
      icon: Settings,
    },
  ];

  function resetForm() {
    setInstitutionName("");
    setCity("");
    setEmail("");
    setPhone("");
    setAddress("");
    setStatus("active");

    setManagerName("");
    setManagerEmail("");
    setManagerPassword("");

    setCopiedManagerLink(null);
  }

  function closeModal() {
    if (saving) return;

    setShowModal(false);
    resetForm();
    setError(null);
  }

  async function handleCreateInstitution() {
    setError(null);
    setSuccess(null);
    setManagerLoginLink(null);
    const name = institutionName.trim();
    const institutionCity = city.trim();
    const mName = managerName.trim();
    const mEmail = managerEmail.trim();

    if (!name || !institutionCity || !mName || !mEmail || !managerPassword) {
      setError("Nom, ville, nom du directeur, email et mot de passe sont obligatoires.");
      return;
    }
    if (managerPassword.length < 6) {
      setError("Le mot de passe du directeur doit contenir au moins 6 caractères.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/auth/create-manager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institutionName: name,
          city: institutionCity,
          email: email.trim() || null,
          phone: phone.trim() || null,
          address: address.trim() || null,
          status,
          managerName: mName,
          managerEmail: mEmail,
          managerPassword,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erreur lors de la création de l'institution.");

      const managerLink = result.loginLink ? `${window.location.origin}${result.loginLink}` : null;
      setManagerLoginLink(managerLink);
      setSuccess("L'institution et le compte directeur ont été créés. Le directeur peut maintenant utiliser le lien et ses identifiants.");
      setShowModal(false);
      resetForm();
      await loadDashboard();
    } catch (err) {
      console.error("🔴 handleCreateInstitution error:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function copyInstitutionLink(slug: string) {
    const link =
      `${window.location.origin}/login?institution=` +
      encodeURIComponent(slug);

    try {
      await navigator.clipboard.writeText(link);

      setCopiedSlug(slug);

      window.setTimeout(() => {
        setCopiedSlug(null);
      }, 1800);
    } catch {
      setError("Impossible de copier le lien.");
    }
  }

  async function copyManagerLink() {
    if (!managerLoginLink) return;

    try {
      await navigator.clipboard.writeText(
        managerLoginLink
      );

      setCopiedManagerLink(managerLoginLink);

      window.setTimeout(() => {
        setCopiedManagerLink(null);
      }, 1800);
    } catch {
      setError(
        "Impossible de copier le lien du directeur."
      );
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] font-sans text-slate-800">

      {/* SIDEBAR */}
      <aside className="z-10 flex w-[260px] shrink-0 flex-col border-r border-slate-100 bg-white shadow-sm">

        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-200">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-[15px] font-extrabold tracking-tight text-slate-900">
              EDUNOVA
            </h1>

            <p className="text-[9px] font-bold uppercase tracking-[3px] text-slate-400">
              Admin Console
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">

          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
            Navigation
          </p>

          {sidebarItems.map((item) => {
            const isActive =
              sidebarItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setSidebarItem(item.id)
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-semibold transition-all ${
                  isActive
                    ? "bg-sky-50 text-sky-600 shadow-sm shadow-sky-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <item.icon
                  className="h-[18px] w-[18px]"
                  strokeWidth={
                    isActive ? 2.5 : 1.5
                  }
                />

                {item.label}

                {item.id === "institutions" && (
                  <span className="ml-auto rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-600">
                    {institutions.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-slate-100 px-4 pb-6 pt-4">

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700"
          >
            <Bell className="h-4 w-4" />

            Notifications

            <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-sky-500" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-500 transition-all hover:bg-red-50 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />

            Déconnexion
          </button>

          <p className="pt-2 text-center text-[10px] font-medium text-slate-400">
            {companyName} · Edunova
          </p>
        </div>
      </aside>

      {/* MAIN */}
      <div className="z-10 flex flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              Tableau de bord
            </h2>

            <p className="mt-0.5 text-[12px] font-medium text-slate-400">
              Bienvenue,{" "}
              <span className="font-bold text-sky-500">
                {userEmail || "Admin"}
              </span>{" "}
              — Vue d&apos;ensemble de la plateforme
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-[13px] font-medium text-slate-500 shadow-sm">
              <Calendar className="h-4 w-4 text-slate-400" />

              {new Date().toLocaleDateString(
                "fr-FR",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </div>

            <div className="relative">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-sky-200">
                SA
              </div>

              <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 space-y-8 overflow-y-auto bg-[#f8fafc] p-8">

          {/* ERROR */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <div className="flex-1">

                <p className="font-bold">
                  Erreur
                </p>

                <p className="mt-1">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">

              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

              <div className="flex-1">

                <p className="font-bold">
                  Succès
                </p>

                <p className="mt-1">
                  {success}
                </p>

                {managerLoginLink && (
                  <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-white p-4 text-left text-slate-800 shadow-sm">

                    <span className="text-[13px] font-semibold text-slate-700">
                      Lien de connexion du directeur
                    </span>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <code className="break-all rounded-xl bg-slate-100 px-3 py-2 text-[13px] text-slate-900">
                        {managerLoginLink}
                      </code>

                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={
                          copyManagerLink
                        }
                        className="h-10 rounded-xl border-slate-200 bg-white text-slate-700"
                      >
                        {copiedManagerLink ===
                        managerLoginLink
                          ? "Copié"
                          : "Copier le lien"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSuccess(null);
                  setManagerLoginLink(null);
                }}
                className="text-emerald-400 hover:text-emerald-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-4 gap-5">

            {stats.map((stat, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-2xl border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-slate-200 hover:shadow-lg"
              >

                <div className="mb-4 flex items-start justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <stat.icon
                      className={`h-5 w-5 ${stat.iconColor}`}
                    />
                  </div>

                  <MoreHorizontal className="h-4 w-4 text-slate-300" />
                </div>

                <div className="mb-1 text-3xl font-black tracking-tight text-slate-900">
                  {stat.value}
                </div>

                <div className="text-[12px] font-semibold text-slate-400">
                  {stat.label}
                </div>

                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                  <TrendingUp className="h-3 w-3" />

                  {stat.change}
                </div>
              </Card>
            ))}
          </div>

          {/* INSTITUTIONS */}
          <div>

            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Institutions
                </h3>

                <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

                  {[
                    {
                      key: "all",
                      label: "Tous",
                    },
                    {
                      key: "active",
                      label: "Actifs",
                    },
                    {
                      key: "trial",
                      label: "Essai",
                    },
                    {
                      key: "expired",
                      label: "Expirés",
                    },
                  ].map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() =>
                        setFilterStatus(f.key)
                      }
                      className={`px-4 py-1.5 text-[12px] font-bold transition-all ${
                        filterStatus === f.key
                          ? "bg-sky-50 text-sky-600"
                          : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">

                <div className="relative">

                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(
                        e.target.value
                      )
                    }
                    className="h-10 w-[280px] rounded-xl border-slate-200 bg-white pl-10 text-[13px] text-slate-700 shadow-sm placeholder:text-slate-400 focus-visible:border-sky-300 focus-visible:ring-sky-200"
                  />
                </div>

                <Button
                  onClick={() => {
                    setError(null);
                    setSuccess(null);
                    setManagerLoginLink(null);
                    resetForm();
                    setShowModal(true);
                  }}
                  className="h-10 gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 text-[13px] font-bold text-white shadow-lg shadow-sky-200 transition-all hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-300"
                >
                  <Plus className="h-4 w-4" />

                  Nouvelle Institution
                </Button>
              </div>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="grid grid-cols-3 gap-5">

                {[1, 2, 3].map((item) => (
                  <Card
                    key={item}
                    className="h-[250px] animate-pulse rounded-2xl border-slate-100 bg-white"
                  />
                ))}
              </div>
            ) : filteredInstitutions.length === 0 ? (

              /* EMPTY */
              <Card className="rounded-2xl border-dashed border-slate-200 bg-white p-12 text-center">

                <Building2 className="mx-auto h-10 w-10 text-slate-300" />

                <h4 className="mt-4 text-sm font-bold text-slate-700">
                  Aucune institution trouvée
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  {institutions.length === 0
                    ? "Commencez par ajouter votre première institution."
                    : "Modifiez votre recherche ou votre filtre."}
                </p>
              </Card>
            ) : (

              /* LIST */
              <div className="grid grid-cols-3 gap-5">

                {filteredInstitutions.map(
                  (inst) => {
                    const statusInfo =
                      statusConfig[
                        inst.status
                      ] ??
                      statusConfig.trial;

                    return (
                      <Card
                        key={inst.id}
                        className="group overflow-hidden rounded-2xl border-slate-100 bg-white shadow-sm transition-all hover:border-sky-200 hover:shadow-xl hover:shadow-sky-50"
                      >

                        <div
                          className="h-1 w-full"
                          style={{
                            background:
                              `linear-gradient(90deg, ${inst.color}, transparent)`,
                          }}
                        />

                        <div className="p-6">

                          <div className="mb-5 flex items-start justify-between">

                            <div className="flex min-w-0 items-center gap-4">

                              <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black text-white shadow-lg"
                                style={{
                                  backgroundColor:
                                    inst.color,

                                  boxShadow:
                                    `0 8px 20px ${inst.color}33`,
                                }}
                              >
                                {inst.initial}
                              </div>

                              <div className="min-w-0">

                                <h4 className="truncate text-[14px] font-bold leading-tight text-slate-800 transition-colors group-hover:text-sky-600">
                                  {inst.name}
                                </h4>

                                <div className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-slate-400">

                                  <MapPin className="h-3 w-3" />

                                  {inst.city || "—"}
                                </div>
                              </div>
                            </div>

                            <Badge
                              className={`${statusInfo.bg} ${statusInfo.color} shrink-0 gap-1 rounded-lg border px-2 py-0.5 text-[10px] font-bold`}
                            >
                              <statusInfo.icon className="h-3 w-3" />

                              {statusInfo.label}
                            </Badge>
                          </div>

                          <div className="mb-5 grid grid-cols-3 gap-3">

                            <div className="rounded-lg bg-slate-50 p-3 text-center">

                              <div className="text-[16px] font-black text-slate-800">
                                —
                              </div>

                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Élèves
                              </div>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-3 text-center">

                              <div className="text-[12px] font-bold text-sky-500">
                                —
                              </div>

                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Plan
                              </div>
                            </div>

                            <div className="rounded-lg bg-slate-50 p-3 text-center">

                              <div className="text-[11px] font-bold text-slate-600">
                                {inst.createdAt}
                              </div>

                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Depuis
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-4">

                            <div className="flex min-w-0 items-center gap-2 text-[12px] font-medium text-slate-500">

                              <User className="h-3.5 w-3.5 shrink-0" />

                              <span className="truncate">
                                {inst.email ||
                                  "Email non renseigné"}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                copyInstitutionLink(
                                  inst.slug
                                )
                              }
                              className="flex shrink-0 items-center gap-1 text-[12px] font-bold text-sky-500 transition-colors hover:text-sky-600"
                            >
                              {copiedSlug ===
                              inst.slug ? (
                                <>
                                  <Check className="h-3 w-3" />
                                  Copié
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  Lien
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </Card>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CREATE INSTITUTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">

          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />

          <Card className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-3xl border-slate-200 bg-white shadow-2xl">

            <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-violet-500 to-sky-500" />

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-4">

              <div>

                <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Nouvelle Institution
                </h3>

                <p className="mt-0.5 text-[12px] font-medium text-slate-400">
                  Ajoutez un nouvel établissement à la plateforme
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-600 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5 p-6">

              {/* NAME */}
              <div className="space-y-2">

                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Nom de l&apos;établissement{" "}
                  <span className="text-red-400">
                    *
                  </span>
                </label>

                <Input
                  value={institutionName}
                  onChange={(e) =>
                    setInstitutionName(
                      e.target.value
                    )
                  }
                  placeholder="Ex: Groupe Scolaire Al Oumrane"
                  disabled={saving}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50"
                />
              </div>

              {/* CITY / STATUS */}
              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">

                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Ville{" "}
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <Input
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    placeholder="Ex: Casablanca"
                    disabled={saving}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="space-y-2">

                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Statut
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    disabled={saving}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[14px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:opacity-60"
                  >
                    <option value="trial">
                      Essai gratuit
                    </option>

                    <option value="active">
                      Actif
                    </option>

                    <option value="expired">
                      Expiré
                    </option>
                  </select>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="space-y-2">

                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Adresse
                </label>

                <Input
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Adresse de l'établissement"
                  disabled={saving}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50"
                />
              </div>

              {/* EMAIL / PHONE */}
              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">

                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="email@ecole.ma"
                      type="email"
                      disabled={saving}
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">

                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Téléphone
                  </label>

                  <div className="relative">

                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="06 00 00 00 00"
                      disabled={saving}
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* MANAGER */}
              <div className="mt-5 border-t border-slate-100 pt-5">

                <h4 className="mb-4 text-[13px] font-bold text-slate-800">
                  Compte Directeur
                </h4>

                <div className="space-y-4">

                  {/* MANAGER NAME */}
                  <div className="space-y-2">

                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Nom complet{" "}
                      <span className="text-red-400">
                        *
                      </span>
                    </label>

                    <div className="relative">

                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <Input
                        value={managerName}
                        onChange={(e) =>
                          setManagerName(
                            e.target.value
                          )
                        }
                        placeholder="Nom du directeur"
                        disabled={saving}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10"
                      />
                    </div>
                  </div>

                  {/* MANAGER EMAIL / PASSWORD */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-2">

                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Email (Identifiant){" "}
                        <span className="text-red-400">
                          *
                        </span>
                      </label>

                      <div className="relative">

                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          value={managerEmail}
                          onChange={(e) =>
                            setManagerEmail(
                              e.target.value
                            )
                          }
                          placeholder="directeur@ecole.ma"
                          type="email"
                          disabled={saving}
                          className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">

                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Mot de passe{" "}
                        <span className="text-red-400">
                          *
                        </span>
                      </label>

                      <Input
                        value={managerPassword}
                        onChange={(e) =>
                          setManagerPassword(
                            e.target.value
                          )
                        }
                        placeholder="••••••••"
                        type="password"
                        disabled={saving}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/50 p-6 pt-4">

              <Button
                variant="ghost"
                onClick={closeModal}
                disabled={saving}
                className="h-11 rounded-xl px-6 font-bold text-slate-500"
              >
                Annuler
              </Button>

              <Button
                onClick={
                  handleCreateInstitution
                }
                disabled={saving}
                className="h-11 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 font-bold text-white shadow-lg shadow-sky-200 hover:from-sky-400 hover:to-blue-500 disabled:opacity-60"
              >

                {saving ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                    Création...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />

                    Ajouter l&apos;institution
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}