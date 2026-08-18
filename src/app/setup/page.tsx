"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { School, CheckCircle2, Info, LifeBuoy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Establishment, Service } from "@/components/setup/types";
import { DEFAULT_SERVICES, STEPS, levelsByCycle } from "@/components/setup/constants";
import { StepWelcome } from "@/components/setup/StepWelcome";
import { StepSchoolYear } from "@/components/setup/StepSchoolYear";
import { StepCycles } from "@/components/setup/StepCycles";
import { StepServices } from "@/components/setup/StepServices";
import { StepBranding } from "@/components/setup/StepBranding";
import { LogoModal } from "@/components/setup/LogoModal";
import { ServiceModal } from "@/components/setup/ServiceModal";

// ─── Supabase Client ─────────────────────────────────────────────────────────
const supabase = createClient();

// ─── Suspense Wrapper ────────────────────────────────────────────────────────
export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
            <School className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black">Chargement...</h1>
          <p className="text-sm text-slate-500 mt-2">Chargement de votre établissement</p>
        </div>
      </div>
    }>
      <SetupWizard />
    </Suspense>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
function SetupWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const institutionSlug = searchParams.get("institution");

  // =====================
  // States
  // =====================

  // ── Institution state ──────────────────────────────────────────────────────
  const [institution, setInstitution] = useState<Establishment | null>(null);
  const [loadingInstitution, setLoadingInstitution] = useState(true);
  const [institutionError, setInstitutionError] = useState<string | null>(null);
  const [setupCompleted, setSetupCompleted] = useState(false);

  // ── Wizard navigation ─────────────────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);

  // ── School info ────────────────────────────────────────────────────────────
  const [schoolName, setSchoolName] = useState("");
  const [schoolType, setSchoolType] = useState("Établissement scolaire");
  const [schoolYear, setSchoolYear] = useState(
    `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
  );

  // ── Cycles, levels & classes ───────────────────────────────────────────────
  const [selectedCycles, setSelectedCycles] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [sectionsCount, setSectionsCount] = useState<Record<string, number>>({});
  const [appellation, setAppellation] = useState<"num" | "alpha">("num");
  const [classesByLevel, setClassesByLevel] = useState<Record<string, string[]>>({});

  // ── Services & fees ────────────────────────────────────────────────────────
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [tuitionFees, setTuitionFees] = useState<Record<string, number>>({});
  const [registrationFee, setRegistrationFee] = useState(0);
  const [openedCard, setOpenedCard] = useState<string | null>(null);
  const [servicePrices, setServicePrices] = useState<Record<string, number>>({});
  const [serviceFrequencies, setServiceFrequencies] = useState<Record<string, "mensuel" | "annuel">>({});

  // ── Transport ──────────────────────────────────────────────────────────────
  const [transportType, setTransportType] = useState<2 | 4>(2);
  const [transportPrices, setTransportPrices] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });

  // ── Cantine ────────────────────────────────────────────────────────────────
  const [cantineType, setCantineType] = useState("dejeuner");
  const [cantinePrice, setCantinePrice] = useState(0);

  // ── Branding ───────────────────────────────────────────────────────────────
  const [selectedTheme, setSelectedTheme] = useState("#0ea5e9");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // ── Modals ─────────────────────────────────────────────────────────────────
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  // ── Saving ─────────────────────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false);

  // =====================
  // Effects
  // =====================

  /** Load institution from Supabase on mount */
  useEffect(() => {
    let cancelled = false;

    async function loadInstitution() {
      setLoadingInstitution(true);
      setInstitutionError(null);

      if (!institutionSlug) {
        setInstitutionError("Aucun slug d'établissement n'a été fourni.");
        setLoadingInstitution(false);
        return;
      }

      try {
        console.log("🏫 Chargement établissement:", institutionSlug);

        const { data, error } = await supabase
          .from("establishments")
          .select("id, company_id, name, slug, city, address, phone, email, status, setup_completed, created_at, updated_at")
          .eq("slug", institutionSlug)
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          console.error("❌ Erreur Supabase:", error);
          setInstitutionError(error.message || "Impossible de charger l'établissement.");
          setLoadingInstitution(false);
          return;
        }

        if (!data) {
          setInstitutionError(`L'établissement "${institutionSlug}" est introuvable.`);
          setLoadingInstitution(false);
          return;
        }

        const item = data as Establishment;
        console.log("✅ Établissement chargé:", item);

        setInstitution(item);
        setSchoolName(item.name);
        setSetupCompleted(Boolean(item.setup_completed));
        setLoadingInstitution(false);
      } catch (error) {
        console.error("❌ Erreur inattendue:", error);
        setInstitutionError(error instanceof Error ? error.message : "Une erreur est survenue.");
        setLoadingInstitution(false);
      }
    }

    void loadInstitution();
    return () => { cancelled = true; };
  }, [institutionSlug]);

  /** Generate class names when levels / sections change */
  useEffect(() => {
    const generated: Record<string, string[]> = {};

    selectedLevels.forEach((levelCode) => {
      const count = sectionsCount[levelCode] || 1;
      generated[levelCode] = Array.from(
        { length: count },
        (_, i) =>
          `${levelCode}-${appellation === "num" ? i + 1 : String.fromCharCode(65 + i)}`
      );
    });

    setClassesByLevel(generated);
  }, [selectedLevels, sectionsCount, appellation]);

  // =====================
  // Helpers
  // =====================

  function go(next: number) {
    setStep(next);
    if (next === 1) setProgress(20);
    else if (next === 2) setProgress(35);
    else if (Math.floor(next) === 3) setProgress(50);
    else if (Math.floor(next) === 4) setProgress(70);
    else if (next === 5) setProgress(90);
    else if (next === 6) setProgress(100);
  }

  function toggleCycle(cycle: string) {
    const levels = levelsByCycle[cycle as keyof typeof levelsByCycle];
    const codes = levels.map(([, code]) => code);

    setSelectedCycles((current) => {
      const isRemoving = current.includes(cycle);
      if (isRemoving) {
        // Remove cycle & its levels
        setSelectedLevels((prev) => prev.filter((l) => !codes.includes(l)));
        return current.filter((c) => c !== cycle);
      } else {
        // Add cycle & auto-select all its levels
        setSelectedLevels((prev) => [...prev, ...codes.filter((c) => !prev.includes(c))]);
        return [...current, cycle];
      }
    });
  }

  function toggleLevel(code: string) {
    setSelectedLevels((current) =>
      current.includes(code)
        ? current.filter((item) => item !== code)
        : [...current, code]
    );
  }

  function toggleService(id: string) {
    setServices((list) => list.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s)));
  }

  function toggleRequired(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setServices((list) => list.map((s) => (s.id === id ? { ...s, req: !s.req } : s)));
  }

  function toggleCard(id: string) {
    setOpenedCard((prev) => (prev === id ? null : id));
  }

  function handleAddCustomService(name: string) {
    const newId = `CUSTOM_${Date.now()}`;
    const newService: Service = {
      id: newId,
      name,
      icon: CheckCircle2,
      color: "text-slate-500",
      req: false,
      checked: true,
    };
    setServices((prev) => [...prev, newService]);
    setOpenedCard(newId); // Open the card automatically to configure it
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image valide.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Le logo ne doit pas dépasser 5 MB.");
      return;
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setShowLogoModal(false);
  }

  // =====================
  // Finish Setup
  // =====================

  async function handleFinishSetup() {
    console.log("🚀 ENTER handleFinishSetup");

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log("👤 Current Supabase user:", user?.id);
    console.log("👤 User error:", userError);

    if (!institution) {
      alert("Aucun établissement chargé.");
      return;
    }

    setIsSaving(true);

    try {
      console.log("💾 Enregistrement setup:", institution.id);

      let logoUrl = institution.logo_url || null;

      // 1. Upload du logo
      if (logoFile) {
        console.log("📤 Upload du logo...");

        const extension = logoFile.name.split(".").pop()?.toLowerCase() || "png";
        const filePath = `${institution.slug}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("institution-logos")
          .upload(filePath, logoFile, {
            contentType: logoFile.type,
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("❌ Erreur upload logo:", uploadError);
          alert(uploadError.message || "Impossible d'envoyer le logo.");
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("institution-logos")
          .getPublicUrl(filePath);

        logoUrl = publicUrlData.publicUrl;
        console.log("✅ Logo uploadé:", logoUrl);
      }

      // 2. Enregistrement des classes
      const classRows = Object.entries(classesByLevel).flatMap(
        ([levelCode, classNames]) =>
          classNames.map((className) => ({
            establishment_id: institution.id,
            name: className,
            level_code: levelCode,
            school_year: schoolYear,
            status: "active",
          }))
      );

      if (classRows.length > 0) {
        console.log("🏫 Enregistrement des classes:", classRows);

        // Supprimer les anciennes classes pour cette institution et année scolaire
        const { error: deleteError } = await supabase
          .from("classes")
          .delete()
          .eq("establishment_id", institution.id)
          .eq("school_year", schoolYear);

        if (deleteError) {
          console.error("❌ Erreur suppression anciennes classes:", deleteError);
        }

        const { error: classesError } = await supabase
          .from("classes")
          .upsert(classRows, { onConflict: "establishment_id,name,school_year" });

        if (classesError) {
          console.error("❌ Erreur lors de l'enregistrement des classes:", classesError);
          alert(classesError.message || "Impossible d'enregistrer les classes.");
          return;
        }

        console.log("✅ Classes enregistrées");
      }

      // 3. Mise à jour de l'établissement
      const { data, error } = await supabase
        .from("establishments")
        .update({
          setup_completed: true,
          logo_url: logoUrl,
          enabled_cycles: selectedCycles,
          updated_at: new Date().toISOString(),
        })
        .eq("id", institution.id)
        .select("id, company_id, name, slug, city, address, phone, email, status, setup_completed, logo_url, created_at, updated_at")
        .maybeSingle();

      if (error) {
        console.error("❌ Erreur lors de l'enregistrement:", error);
        alert(error.message || "Impossible d'enregistrer la configuration.");
        return;
      }

      console.log("✅ Setup enregistré:", data);

      if (data) setInstitution(data as Establishment);
      setSetupCompleted(true);
      if (logoUrl) setLogoPreview(logoUrl);

      localStorage.setItem("edunova_setup_complete", "true");
      localStorage.setItem("institution_slug", institution.slug);

      // 4. Passer au dashboard
      go(6);
    } catch (err) {
      console.error("❌ Erreur inattendue:", err);
      alert(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSaving(false);
    }
  }

  // =====================
  // Render
  // =====================

  if (loadingInstitution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
            <School className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black">Chargement...</h1>
          <p className="text-sm text-slate-500 mt-2">Chargement de votre établissement</p>
        </div>
      </div>
    );
  }

  if (institutionError || !institution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <Card className="max-w-lg w-full p-8 rounded-3xl">
          <Info className="w-8 h-8 text-red-500 mb-4" />
          <h1 className="text-2xl font-black">Impossible de charger l&apos;établissement</h1>
          <p className="text-slate-500 mt-4">{institutionError || "Établissement introuvable."}</p>
          <div className="mt-5 p-4 rounded-2xl bg-slate-50">
            <p className="text-xs font-bold text-slate-400 uppercase">Slug demandé</p>
            <p className="font-mono text-sm mt-1">{institutionSlug || "Aucun slug"}</p>
          </div>
          <Button className="mt-6 rounded-xl" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-30 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: selectedTheme }}
          >
            <School className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">Configuration initiale</p>
            <h1 className="font-black text-slate-900">{institution.name}</h1>
          </div>
        </div>
        {setupCompleted && <Badge className="bg-emerald-500">Configuration terminée</Badge>}
      </header>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-20 bottom-0 w-[280px] bg-white border-r border-slate-200 p-6 flex-col">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Progression</p>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-8">
          <div className="h-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <nav className="space-y-3">
          {STEPS.map(([title, desc], i) => {
            const id = i + 1;
            const active = Math.floor(step) === id;
            const done = step > id;
            return (
              <button
                key={id}
                type="button"
                disabled={id > step}
                onClick={() => go(id)}
                className={`w-full text-left p-3 rounded-2xl flex items-center gap-3 ${active ? "bg-sky-50 text-sky-700" : done ? "text-slate-700" : "text-slate-400"
                  }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${active ? "bg-sky-500 text-white" : done ? "bg-emerald-50 text-emerald-600" : "bg-slate-100"
                    }`}
                >
                  {done ? <CheckCircle2 className="w-5 h-5" /> : id}
                </span>
                <span>
                  <span className="block text-sm font-black">{title}</span>
                  <span className="block text-xs opacity-70">{desc}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-5">
          <div className="flex gap-2">
            <LifeBuoy className="w-4 h-4 text-sky-500" />
            <p className="text-xs text-slate-500">Configurez votre établissement étape par étape.</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <main className="lg:ml-[280px] pt-20 min-h-screen">
        <div className="h-1 bg-slate-100">
          <div className="h-full transition-all" style={{ width: `${progress}%`, backgroundColor: selectedTheme }} />
        </div>

        <div className="max-w-6xl mx-auto px-5 lg:px-10 py-10">

          {/* ── Step 1: Bienvenue ──────────────────────────────────────────── */}
          {step === 1 && (
            <StepWelcome
              institution={institution}
              selectedTheme={selectedTheme}
              onNext={() => go(2)}
            />
          )}

          {/* ── Step 2: Année scolaire ────────────────────────────────────── */}
          {step === 2 && (
            <StepSchoolYear
              schoolYear={schoolYear}
              setSchoolYear={setSchoolYear}
              selectedTheme={selectedTheme}
              onPrev={() => go(1)}
              onNext={() => go(3)}
            />
          )}

          {/* ── Step 3: Cycles & Niveaux ──────────────────────────────────── */}
          {step === 3 && (
            <StepCycles
              selectedCycles={selectedCycles}
              selectedLevels={selectedLevels}
              sectionsCount={sectionsCount}
              classesByLevel={classesByLevel}
              selectedTheme={selectedTheme}
              toggleCycle={toggleCycle}
              toggleLevel={toggleLevel}
              setSectionsCount={setSectionsCount}
              setSelectedLevels={setSelectedLevels}
              onPrev={() => go(2)}
              onNext={() => go(4)}
            />
          )}

          {/* ── Step 4: Services ───────────────────────────────────────────── */}
          {step === 4 && (
            <StepServices
              services={services}
              openedCard={openedCard}
              selectedLevels={selectedLevels}
              tuitionFees={tuitionFees}
              transportType={transportType}
              transportPrices={transportPrices}
              cantineType={cantineType}
              cantinePrice={cantinePrice}
              servicePrices={servicePrices}
              serviceFrequencies={serviceFrequencies}
              selectedTheme={selectedTheme}
              toggleService={toggleService}
              toggleCard={toggleCard}
              setTuitionFees={setTuitionFees}
              setTransportType={setTransportType}
              setTransportPrices={setTransportPrices}
              setCantineType={setCantineType}
              setCantinePrice={setCantinePrice}
              setServicePrices={setServicePrices}
              setServiceFrequencies={setServiceFrequencies}
              setShowServiceModal={setShowServiceModal}
              onPrev={() => go(3)}
              onNext={() => go(5)}
            />
          )}

          {/* ── Step 5: Identité visuelle ──────────────────────────────────── */}
          {step === 5 && (
            <StepBranding
              schoolName={schoolName}
              schoolType={schoolType}
              logoPreview={logoPreview}
              selectedTheme={selectedTheme}
              isSaving={isSaving}
              setSchoolName={setSchoolName}
              setSchoolType={setSchoolType}
              setSelectedTheme={setSelectedTheme}
              setShowLogoModal={setShowLogoModal}
              onFinish={handleFinishSetup}
            />
          )}

          {/* ── Step 6: Confirmation ───────────────────────────────────────── */}
          {step === 6 && (
            <section className="min-h-[650px] flex flex-col items-center justify-center text-center">
              <div className="w-28 h-28 rounded-full bg-green-500 text-white flex items-center justify-center mb-8">
                <CheckCircle2 className="w-14 h-14" />
              </div>
              <h1 className="text-4xl font-black">Félicitations ! 🎉</h1>
              <p className="text-xl text-slate-500 max-w-xl mt-5 mb-10">
                L&apos;installation de <strong className="text-slate-800">&quot;{schoolName || institution.name}&quot;</strong> est terminée.
              </p>
              <Button
                className="h-14 px-10 rounded-2xl bg-slate-950 hover:bg-slate-800"
                onClick={() => router.push(`/school?institution=${encodeURIComponent(institution.slug)}`)}
              >
                Accéder au tableau de bord <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </section>
          )}
        </div>
      </main>

      {/* ── Dialogs ─────────────────────────────────────────────────────────── */}
      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        onAdd={handleAddCustomService}
        selectedTheme={selectedTheme}
      />

      <LogoModal
        isOpen={showLogoModal}
        onClose={() => setShowLogoModal(false)}
        onUpload={handleLogoUpload}
      />
    </div>
  );
}