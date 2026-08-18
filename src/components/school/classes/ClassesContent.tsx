"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, AlertCircle, Loader2 } from "lucide-react";

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

export default function ClassesContent({ institution }: ClassesContentProps) {
    const [classes, setClasses] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        async function fetchClasses() {
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

                if (fetchError) {
                    throw fetchError;
                }

                setClasses(data || []);
            } catch (err: any) {
                console.error("Error fetching classes:", err);
                setError(err.message || "Une erreur est survenue lors du chargement des classes.");
            } finally {
                setLoading(false);
            }
        }

        fetchClasses();
    }, [institution?.id]);

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

    if (error) {
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
            {/* Header */}
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
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-medium">Total des classes</span>
                    <span className="text-lg font-black text-[#128b9d]">{classes.length}</span>
                </div>
            </div>

            {/* Content */}
            {classes.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                        <GraduationCap className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">Aucune classe trouvée</h3>
                    <p className="text-slate-500 max-w-md">
                        Aucune classe n&apos;a encore été créée pour cet établissement. Les classes configurées lors de l&apos;installation apparaîtront ici.
                    </p>
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

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Année</span>
                                    <span className="text-sm font-semibold text-slate-700">{cls.school_year}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Statut</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 ${cls.status === 'active'
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {cls.status === 'active' ? 'Actif' : cls.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
