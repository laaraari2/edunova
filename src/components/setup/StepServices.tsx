import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "./types";

interface StepServicesProps {
    services: Service[];
    openedCard: string | null;
    selectedLevels: string[];
    tuitionFees: Record<string, number>;
    transportType: 2 | 4;
    transportPrices: Record<number, number>;
    cantineType: string;
    cantinePrice: number;
    servicePrices: Record<string, number>;
    serviceFrequencies: Record<string, "mensuel" | "annuel">;
    selectedTheme: string;
    toggleService: (id: string) => void;
    toggleCard: (id: string) => void;
    setTuitionFees: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setTransportType: (val: 2 | 4) => void;
    setTransportPrices: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    setCantineType: (val: string) => void;
    setCantinePrice: (val: number) => void;
    setServicePrices: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    setServiceFrequencies: React.Dispatch<React.SetStateAction<Record<string, "mensuel" | "annuel">>>;
    setShowServiceModal: (show: boolean) => void;
    onPrev: () => void;
    onNext: () => void;
}

export function StepServices({
    services,
    openedCard,
    selectedLevels,
    tuitionFees,
    transportType,
    transportPrices,
    cantineType,
    cantinePrice,
    servicePrices,
    serviceFrequencies,
    selectedTheme,
    toggleService,
    toggleCard,
    setTuitionFees,
    setTransportType,
    setTransportPrices,
    setCantineType,
    setCantinePrice,
    setServicePrices,
    setServiceFrequencies,
    setShowServiceModal,
    onPrev,
    onNext,
}: StepServicesProps) {
    return (
        <section className="max-w-5xl mx-auto">
            <Badge variant="secondary" className="rounded-full mb-3">Étape 4</Badge>
            <h2 className="text-3xl font-black">Services proposés</h2>
            <p className="text-slate-500 mt-2 mb-8">
                Sélectionnez les services proposés par votre établissement.
            </p>

            {/* Frais d'inscription */}
            <Card className="rounded-3xl p-6 mb-6">
                <h3 className="font-black text-lg mb-5">📋 Frais d&apos;inscription</h3>
                <div className="flex items-center justify-between">
                    <span className="font-semibold">Montant</span>
                    <Input type="number" placeholder="0 DH" className="w-40" />
                </div>
            </Card>

            {/* Other services */}
            <div className="grid md:grid-cols-2 gap-5">
                {services
                    .filter((service) => service.id !== "FI")
                    .map((service) => {
                        const Icon = service.icon;
                        return (
                            <Card
                                key={service.id}
                                className="rounded-3xl p-5 cursor-pointer hover:border-sky-400"
                                onClick={() => toggleService(service.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Checkbox
                                            checked={service.checked}
                                            onCheckedChange={() => toggleService(service.id)}
                                        />
                                        <Icon className={`w-6 h-6 ${service.color}`} />
                                        <div>
                                            <p className="font-black">{service.name}</p>
                                            <p className="text-xs text-slate-400">
                                                {service.req ? "Service obligatoire" : "Service optionnel"}
                                            </p>
                                        </div>
                                    </div>

                                    {service.checked && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCard(service.id);
                                            }}
                                        >
                                            {openedCard === service.id ? "Fermer" : "Configurer"}
                                        </Button>
                                    )}
                                </div>

                                {/* Tuition fees inline config */}
                                {openedCard === service.id && service.id === "FS" && (
                                    <div className="mt-5 border-t pt-5 space-y-3">
                                        <p className="font-bold text-slate-700">Frais de scolarité</p>
                                        {selectedLevels.map((level) => (
                                            <div key={level} className="flex items-center justify-between">
                                                <span>{level}</span>
                                                <Input
                                                    type="number"
                                                    className="w-40"
                                                    placeholder="0 DH"
                                                    value={tuitionFees[level] ?? ""}
                                                    onChange={(e) =>
                                                        setTuitionFees({ ...tuitionFees, [level]: Number(e.target.value) })
                                                    }
                                                />
                                            </div>
                                        ))}
                                        <div className="flex justify-end mt-4">
                                            <Button size="sm" style={{ backgroundColor: selectedTheme }} onClick={() => toggleCard(service.id)}>
                                                Enregistrer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Transport inline config */}
                                {openedCard === service.id && service.id === "TS" && (
                                    <div className="mt-5 border-t pt-5 space-y-4">
                                        <p className="font-bold text-slate-700">Configuration du transport</p>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-600">Tarif mensuel - 2 Trajets (DH)</label>
                                            <Input
                                                type="number"
                                                placeholder="0 DH"
                                                value={transportPrices[2] || ""}
                                                onChange={(e) => setTransportPrices({ ...transportPrices, [2]: Number(e.target.value) })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-600">Tarif mensuel - 4 Trajets (DH)</label>
                                            <Input
                                                type="number"
                                                placeholder="0 DH"
                                                value={transportPrices[4] || ""}
                                                onChange={(e) => setTransportPrices({ ...transportPrices, [4]: Number(e.target.value) })}
                                            />
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <Button size="sm" style={{ backgroundColor: selectedTheme }} onClick={() => toggleCard(service.id)}>
                                                Enregistrer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Cantine inline config */}
                                {openedCard === service.id && service.id === "CAN" && (
                                    <div className="mt-5 border-t pt-5 space-y-4">
                                        <p className="font-bold text-slate-700">Configuration de la cantine</p>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-600">Type de restauration</label>
                                            <Select value={cantineType} onValueChange={(v) => setCantineType(v || "dejeuner")}>
                                                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="dejeuner">Déjeuner</SelectItem>
                                                    <SelectItem value="gouter">Goûter</SelectItem>
                                                    <SelectItem value="dejeuner-gouter">Déjeuner + Goûter</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-600">Tarif mensuel (DH)</label>
                                            <Input
                                                type="number"
                                                placeholder="0 DH"
                                                value={cantinePrice || ""}
                                                onChange={(e) => setCantinePrice(Number(e.target.value))}
                                            />
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <Button size="sm" style={{ backgroundColor: selectedTheme }} onClick={() => toggleCard(service.id)}>
                                                Enregistrer
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Generic Service inline config */}
                                {openedCard === service.id && !["FS", "TS", "CAN"].includes(service.id) && (
                                    <div className="mt-5 border-t pt-5 space-y-4">
                                        <p className="font-bold text-slate-700">Configuration de {service.name}</p>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Fréquence de paiement</label>
                                                <Select
                                                    value={serviceFrequencies[service.id] || "mensuel"}
                                                    onValueChange={(v) => setServiceFrequencies({ ...serviceFrequencies, [service.id]: v as "mensuel" | "annuel" })}
                                                >
                                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="mensuel">Mensuel</SelectItem>
                                                        <SelectItem value="annuel">Annuel</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Tarif (DH)</label>
                                                <Input
                                                    type="number"
                                                    placeholder="0 DH"
                                                    value={servicePrices[service.id] || ""}
                                                    onChange={(e) => setServicePrices({ ...servicePrices, [service.id]: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <Button size="sm" style={{ backgroundColor: selectedTheme }} onClick={() => toggleCard(service.id)}>
                                                Enregistrer
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
            </div>

            <div className="mt-6">
                <Button variant="outline" onClick={() => setShowServiceModal(true)}>
                    + Ajouter un service personnalisé
                </Button>
            </div>

            <div className="flex justify-between mt-10">
                <Button variant="outline" onClick={onPrev}>
                    <ArrowLeft className="w-4 h-4 mr-2" />Précédent
                </Button>
                <Button style={{ backgroundColor: selectedTheme }} onClick={onNext}>
                    Continuer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </section>
    );
}
