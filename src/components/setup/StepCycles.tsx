import React, { useState } from "react";
import { GraduationCap, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { levelsByCycle } from "@/components/setup/constants";

interface StepCyclesProps {
    selectedCycles: string[];
    toggleCycle: (cycle: string) => void;
    selectedLevels: string[];
    setSelectedLevels: React.Dispatch<React.SetStateAction<string[]>>;
    selectedTheme: string;
    sectionsCount: Record<string, number>;
    setSectionsCount: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    toggleLevel: (code: string) => void;
    classesByLevel: Record<string, string[]>;
    onPrev: () => void;
    onNext: () => void;
}

export function StepCycles({
    selectedCycles,
    toggleCycle,
    selectedLevels,
    setSelectedLevels,
    selectedTheme,
    sectionsCount,
    setSectionsCount,
    toggleLevel,
    classesByLevel,
    onPrev,
    onNext,
}: StepCyclesProps) {
    const [showPreview, setShowPreview] = useState(false);

    return (
        <section className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="rounded-full mb-3">Étape 3</Badge>
            <h2 className="text-3xl font-black">Cycles & niveaux</h2>
            <p className="text-slate-500 mt-2 mb-8">
                Sélectionnez les cycles de votre établissement. Les niveaux seront automatiquement ajoutés.
            </p>

            {/* Cycle selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.keys(levelsByCycle).map((cycle) => {
                    const isSelected = selectedCycles.includes(cycle);
                    const levelCount = levelsByCycle[cycle as keyof typeof levelsByCycle].length;
                    return (
                        <Card
                            key={cycle}
                            onClick={() => toggleCycle(cycle)}
                            className={`cursor-pointer rounded-2xl border-2 transition-all ${isSelected ? "border-sky-500 bg-sky-50 shadow-md shadow-sky-100" : "border-slate-200 hover:border-slate-300"
                                }`}
                        >
                            <div className="p-5 flex flex-col items-center gap-2">
                                <GraduationCap className={`w-8 h-8 ${isSelected ? "text-sky-600" : "text-slate-400"}`} />
                                <span className={`font-black ${isSelected ? "text-sky-700" : "text-slate-600"}`}>{cycle}</span>
                                <span className="text-xs text-slate-400">{levelCount} niveaux</span>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Level table per selected cycle */}
            {selectedCycles.length > 0 && (
                <div className="space-y-6">
                    {selectedCycles.map((cycle) => {
                        const levels = levelsByCycle[cycle as keyof typeof levelsByCycle];
                        const cycleLevelCodes = levels.map(([, code]) => code);
                        const allSelected = cycleLevelCodes.every((c) => selectedLevels.includes(c));

                        return (
                            <Card key={cycle} className="rounded-3xl overflow-hidden">
                                {/* Cycle header */}
                                <div className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedTheme }}>
                                            <GraduationCap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-sm">{cycle}</h3>
                                            <p className="text-xs text-slate-400">
                                                {cycleLevelCodes.filter((c) => selectedLevels.includes(c)).length}/{levels.length} niveaux actifs
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (allSelected) {
                                                setSelectedLevels((prev) => prev.filter((l) => !cycleLevelCodes.includes(l)));
                                            } else {
                                                setSelectedLevels((prev) => [...prev, ...cycleLevelCodes.filter((c) => !prev.includes(c))]);
                                            }
                                        }}
                                        className="text-xs font-bold px-3 py-1 rounded-lg transition-colors"
                                        style={{ color: selectedTheme, backgroundColor: `${selectedTheme}15` }}
                                    >
                                        {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
                                    </button>
                                </div>

                                {/* Table header */}
                                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-3 border-b text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <span>Niveau</span>
                                    <span className="w-24 text-center">Sections</span>
                                    <span className="w-16 text-center">Actif</span>
                                </div>

                                {/* Level rows */}
                                <div className="divide-y divide-slate-100">
                                    {levels.map(([name, code]) => {
                                        const isActive = selectedLevels.includes(code);
                                        return (
                                            <div
                                                key={code}
                                                className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-3 transition-colors ${isActive ? "bg-white" : "bg-slate-50/50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${isActive ? "bg-sky-500" : "bg-slate-200"}`} />
                                                    <span className={`text-sm font-semibold ${isActive ? "text-slate-800" : "text-slate-400"}`}>
                                                        {name}
                                                    </span>
                                                    <span className="text-xs text-slate-300 font-mono">{code}</span>
                                                </div>

                                                {/* Sections count */}
                                                <Select
                                                    value={(sectionsCount[code] || 1).toString()}
                                                    onValueChange={(value) =>
                                                        setSectionsCount((current) => ({ ...current, [code]: Number(value) }))
                                                    }
                                                    disabled={!isActive}
                                                >
                                                    <SelectTrigger className={`w-24 h-9 rounded-xl text-center ${!isActive ? "opacity-40" : ""}`}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                                            <SelectItem key={n} value={n.toString()}>
                                                                {n} {n === 1 ? "section" : "sections"}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>

                                                {/* Toggle switch */}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleLevel(code)}
                                                    className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${isActive ? "bg-sky-500" : "bg-slate-200"
                                                        }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${isActive ? "translate-x-5" : "translate-x-0"
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Class preview */}
            {selectedLevels.length > 0 && Object.values(classesByLevel).flat().length > 0 && (
                <div className="mt-8">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center justify-between w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-500">
                                <LayoutGrid className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-sm text-slate-800">Aperçu des classes générées</h3>
                                <p className="text-xs text-slate-500">
                                    {Object.values(classesByLevel).flat().length} classes seront créées automatiquement
                                </p>
                            </div>
                        </div>
                        {showPreview ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>

                    {showPreview && (
                        <Card className="rounded-3xl mt-4 border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(classesByLevel).map(([level, classes]) => (
                                    <div key={level} className="space-y-3">
                                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                            <div className="w-2 h-2 rounded-full bg-sky-500" />
                                            <p className="text-xs font-black text-slate-700 uppercase tracking-wider">{level}</p>
                                            <Badge variant="secondary" className="ml-auto text-[10px] h-5 px-1.5 bg-slate-100 text-slate-500">
                                                {classes.length}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {classes.map((c) => (
                                                <span key={c} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>
            )}

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onPrev}>
                    <ArrowLeft className="w-4 h-4 mr-2" />Précédent
                </Button>
                <Button
                    style={{ backgroundColor: selectedTheme }}
                    onClick={() => {
                        if (selectedLevels.length === 0) {
                            alert("Veuillez sélectionner au moins un niveau.");
                            return;
                        }
                        onNext();
                    }}
                >
                    Continuer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </section>
    );
}
