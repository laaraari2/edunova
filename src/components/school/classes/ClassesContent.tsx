"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    GraduationCap,
    AlertCircle,
    Loader2,
    Plus,
    Pencil,
    Trash2,
    X,
    Check,
} from "lucide-react";

interface ClassesContentProps {
    institution?: {
        id: string;
        name: string;
        slug: string;
        logo_url: string | null;
    } | null;
}

type ClassData = {
    id: string;
    establishment_id: string;
    name: string;
    level_code: string;
    school_year: string;
    status: string;
};

type FormState = {
    name: string;
    level_code: string;
    school_year: string;
};

const emptyForm: FormState = {
    name: "",
    level_code: "",
    school_year: "",
};

export default function ClassesContent({ institution }: ClassesContentProps) {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<ClassData | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const supabase = createClient();

    const fetchClasses = async () => {
        if (!institution?.id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from("classes")
                .select("id, establishment_id, name, level_code, school_year, status")
                .eq("establishment_id", institution.id)
                .order("level_code", { ascending: true })
                .order("name", { ascending: true });

            if (fetchError) throw fetchError;
            setClasses(data || []);
        } catch (err: any) {
            console.error("Error fetching classes:", err);
            setError(err.message || "Une erreur est survenue lors du chargement des classes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchClasses();
    }, [institution?.id]);

    const openCreate = () => {
        setEditingClass(null);
        setForm(emptyForm);
        setFormError(null);
        setModalOpen(true);
    };

    const openEdit = (cls: ClassData) => {
        setEditingClass(cls);
        setForm({
            name: cls.name,
            level_code: cls.level_code,
            school_year: cls.school_year,
        });
        setFormError(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) return;
        setModalOpen(false);
        setEditingClass(null);
        setForm(emptyForm);
        setFormError(null);
    };

    const saveClass = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!institution?.id) return;

        const name = form.name.trim();
        const levelCode = form.level_code.trim();
        const schoolYear = form.school_year.trim();

        if (!name || !levelCode || !schoolYear) {
            setFormError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            setSaving(true);
            setFormError(null);

            if (editingClass) {
                const { data, error: updateError } = await supabase
                    .from("classes")
                    .update({
                        name,
                        level_code: levelCode,
                        school_year: schoolYear,
                    })
                    .eq("id", editingClass.id)
                    .eq("establishment_id", institution.id)
                    .select("id, establishment_id, name, level_code, school_year, status")
                    .single();

                if (updateError) throw updateError;

                setClasses((current) =>
                    current
                        .map((item) => item.id === data.id ? data : item)
                        .sort((a, b) =>
                            a.level_code.localeCompare(b.level_code) ||
                            a.name.localeCompare(b.name)
                        )
                );
            } else {
                const { data, error: insertError } = await supabase
                    .from("classes")
                    .insert({
                        establishment_id: institution.id,
                        name,
                        level_code: levelCode,
                        school_year: schoolYear,
                        status: "active",
                    })
                    .select("id, establishment_id, name, level_code, school_year, status")
                    .single();

                if (insertError) throw insertError;
                setClasses((current) =>
                    [...current, data].sort((a, b) =>
                        a.level_code.localeCompare(b.level_code) ||
                        a.name.localeCompare(b.name)
                    )
                );
            }

            closeModal();
        } catch (err: any) {
            console.error("Error saving class:", err);
            if (err?.code === "23505") {
                setFormError("Cette classe existe déjà pour cette année scolaire.");
            } else {
                setFormError(err.message || "Impossible d'enregistrer la classe.");
            }
        } finally {
            setSaving(false);
        }
    };

    const deleteClass = async (cls: ClassData) => {
        if (!institution?.id) return;

        const confirmed = window.confirm(
            `Supprimer la classe « ${cls.name} » pour l'année ${cls.school_year} ?`
        );
        if (!confirmed) return;

        try {
            setDeletingId(cls.id);
            setError(null);

            const { error: deleteError } = await supabase
                .from("classes")
                .delete()
                .eq("id", cls.id)
                .eq("establishment_id", institution.id);

            if (deleteError) throw deleteError;

            setClasses((current) => current.filter((item) => item.id !== cls.id));
        } catch (err: any) {
            console.error("Error deleting class:", err);
            setError(err.message || "Impossible de supprimer la classe.");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-50 min-h-[400px]">
                <div className="flex flex-col items-center text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#128b9d]" />
                    <p>Chargement des classes...</p>
                </div>
            </div>
        );
    }

    if (error && classes.length === 0) {
        return (
            <div className="flex-1 p-6 bg-slate-50">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4 text-red-600">
                    <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-bold text-lg">Erreur de chargement</h3>
                        <p className="mt-1 text-red-500">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-[#128b9d]" />
                        Classes
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        Gérez les classes et les sections de votre établissement.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <span className="text-sm text-slate-500 font-medium">Total des classes</span>
                        <span className="text-lg font-black text-[#128b9d]">{classes.length}</span>
                    </div>
                    <button
                        type="button"
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#128b9d] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0f7d8d]"
                    >
                        <Plus className="h-4 w-4" />
                        Ajouter une classe
                    </button>
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {classes.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                        <GraduationCap className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">Aucune classe trouvée</h3>
                    <p className="text-slate-500 max-w-md mb-5">
                        Aucune classe n&apos;a encore été créée pour cet établissement.
                    </p>
                    <button
                        type="button"
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                        <Plus className="h-4 w-4" />
                        Créer la première classe
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {classes.map((cls) => (
                        <div
                            key={cls.id}
                            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 group-hover:text-[#128b9d] transition-colors">
                                        {cls.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                                            {cls.level_code}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-[#eef9fb] flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-5 h-5 text-[#128b9d]" />
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Année</span>
                                    <span className="text-sm font-semibold text-slate-700">{cls.school_year}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-2 inline-block w-fit ${cls.status === "active"
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-slate-100 text-slate-500"
                                    }`}>
                                        {cls.status === "active" ? "Actif" : cls.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => openEdit(cls)}
                                        title="Modifier"
                                        className="h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-[#128b9d] flex items-center justify-center"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => void deleteClass(cls)}
                                        disabled={deletingId === cls.id}
                                        title="Supprimer"
                                        className="h-9 w-9 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {deletingId === cls.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/30 p-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <h2 className="text-xl font-black text-slate-900">
                                    {editingClass ? "Modifier la classe" : "Ajouter une classe"}
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    {institution?.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="h-9 w-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
                                aria-label="Fermer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={saveClass} className="p-6 space-y-5">
                            {formError && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {formError}
                                </div>
                            )}

                            <label className="block">
                                <span className="text-sm font-bold text-slate-700">Nom de la classe</span>
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Ex. 3AEP-2"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#128b9d] focus:ring-2 focus:ring-[#128b9d]/10"
                                    autoFocus
                                />
                            </label>

                            <div className="grid grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-sm font-bold text-slate-700">Niveau</span>
                                    <input
                                        value={form.level_code}
                                        onChange={(e) => setForm({ ...form, level_code: e.target.value })}
                                        placeholder="Ex. 3AEP"
                                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#128b9d] focus:ring-2 focus:ring-[#128b9d]/10"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-bold text-slate-700">Année scolaire</span>
                                    <input
                                        value={form.school_year}
                                        onChange={(e) => setForm({ ...form, school_year: e.target.value })}
                                        placeholder="2026-2027"
                                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#128b9d] focus:ring-2 focus:ring-[#128b9d]/10"
                                    />
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#128b9d] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0f7d8d] disabled:opacity-60"
                                >
                                    {saving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Check className="h-4 w-4" />
                                    )}
                                    {saving ? "Enregistrement..." : editingClass ? "Enregistrer" : "Ajouter"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
