import React from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepSchoolYearProps {
    schoolYear: string;
    setSchoolYear: (year: string) => void;
    selectedTheme: string;
    onPrev: () => void;
    onNext: () => void;
}

export function StepSchoolYear({ schoolYear, setSchoolYear, selectedTheme, onPrev, onNext }: StepSchoolYearProps) {
    return (
        <section className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="rounded-full mb-3">Étape 2</Badge>
            <h2 className="text-3xl font-black">Année scolaire</h2>
            <p className="text-slate-500 mt-2 mb-8">Sélectionnez la période scolaire active.</p>

            <Card className="rounded-3xl p-8">
                <div className="flex gap-4 mb-6">
                    <Calendar className="w-6 h-6 text-sky-500" />
                    <div>
                        <h3 className="font-black">Période actuelle</h3>
                        <p className="text-sm text-slate-400">Cette information pourra être modifiée ultérieurement.</p>
                    </div>
                </div>

                <Select value={schoolYear} onValueChange={(val) => setSchoolYear(val as string)}>
                    <SelectTrigger className="h-14 rounded-2xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((y) => (
                            <SelectItem key={y} value={`${y}-${y + 1}`}>{y}-{y + 1}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Card>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onPrev}>
                    <ArrowLeft className="w-4 h-4 mr-2" />Précédent
                </Button>
                <Button style={{ backgroundColor: selectedTheme }} onClick={onNext}>
                    <ArrowRight className="w-4 h-4 mr-2" />Suivant
                </Button>
            </div>
        </section>
    );
}
