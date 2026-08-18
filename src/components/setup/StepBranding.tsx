import React from "react";
import { School, CloudUpload, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { THEME_COLORS } from "./constants";

interface StepBrandingProps {
    schoolName: string;
    schoolType: string;
    logoPreview: string | null;
    selectedTheme: string;
    isSaving: boolean;
    setSchoolName: (name: string) => void;
    setSchoolType: (type: string) => void;
    setSelectedTheme: (theme: string) => void;
    setShowLogoModal: (show: boolean) => void;
    onFinish: () => void;
}

export function StepBranding({
    schoolName,
    schoolType,
    logoPreview,
    selectedTheme,
    isSaving,
    setSchoolName,
    setSchoolType,
    setSelectedTheme,
    setShowLogoModal,
    onFinish,
}: StepBrandingProps) {
    return (
        <section className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="rounded-full mb-3">Étape 5 · Optionnel</Badge>
            <h2 className="text-3xl font-black">Identité visuelle</h2>
            <p className="text-slate-500 mt-2 mb-8">
                Personnalisez le nom, le type et l&apos;apparence de votre établissement.
            </p>

            <Card className="rounded-3xl p-7">
                <label className="block text-sm font-black mb-2">Nom de l&apos;établissement</label>
                <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="h-12 rounded-xl" />

                <label className="block text-sm font-black mt-6 mb-2">Type</label>
                <Select value={schoolType} onValueChange={(val: string | null) => setSchoolType(val || "")}>
                    <SelectTrigger className="h-12 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Établissement scolaire">Établissement scolaire</SelectItem>
                        <SelectItem value="École privée">École privée</SelectItem>
                        <SelectItem value="École publique">École publique</SelectItem>
                        <SelectItem value="Groupe scolaire">Groupe scolaire</SelectItem>
                    </SelectContent>
                </Select>

                <label className="block text-sm font-black mt-6 mb-2">Logo</label>
                <div className="flex gap-5 items-center">
                    <div className="w-28 h-28 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden">
                        {logoPreview
                            ? <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
                            : <School className="w-9 h-9 text-slate-300" />}
                    </div>
                    <Button variant="outline" onClick={() => setShowLogoModal(true)}>
                        <CloudUpload className="w-4 h-4 mr-2" />Importer un logo
                    </Button>
                </div>

                <label className="block text-sm font-black mt-6 mb-3">Couleur principale</label>
                <div className="flex gap-3 flex-wrap">
                    {THEME_COLORS.map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={`w-10 h-10 rounded-full border-4 ${selectedTheme === color ? "border-slate-900" : "border-white shadow"
                                }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedTheme(color)}
                        />
                    ))}
                </div>

                <div className="mt-7 p-4 rounded-2xl bg-emerald-50 flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <p className="text-xs text-emerald-800">Ces éléments pourront être modifiés ultérieurement.</p>
                </div>
            </Card>

            <Button
                type="button"
                className="mt-8"
                disabled={isSaving}
                style={{ backgroundColor: selectedTheme }}
                onClick={onFinish}
            >
                {isSaving ? "Enregistrement..." : "Terminer l'installation"}
                {!isSaving && <CheckCircle2 className="w-5 h-5 ml-2" />}
            </Button>
        </section>
    );
}
