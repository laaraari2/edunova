import React from "react";
import { School, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Establishment } from "./types";

interface StepWelcomeProps {
    institution: Establishment;
    selectedTheme: string;
    onNext: () => void;
}

export function StepWelcome({ institution, selectedTheme, onNext }: StepWelcomeProps) {
    return (
        <section className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="rounded-full mb-3">Étape 1</Badge>
            <h2 className="text-3xl font-black text-slate-900">Bienvenue sur Edunova 👋</h2>
            <p className="text-slate-500 mt-2 mb-8">Nous allons configurer votre établissement en quelques étapes.</p>

            <Card className="rounded-3xl p-8">
                <div className="flex items-center gap-5">
                    <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white"
                        style={{ backgroundColor: selectedTheme }}
                    >
                        <School className="w-9 h-9" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-slate-400">Établissement détecté</p>
                        <h3 className="text-2xl font-black mt-1">{institution.name}</h3>
                        <p className="text-sm text-slate-400">{institution.slug}</p>
                    </div>
                </div>
                <div className="mt-7 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
                    L&apos;établissement est correctement connecté à Supabase.
                </div>
            </Card>

            <div className="flex justify-end mt-8">
                <Button className="h-12 rounded-xl" style={{ backgroundColor: selectedTheme }} onClick={onNext}>
                    Commencer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </section>
    );
}
