import { GraduationCap, Bus, UserRound, Theater, Palette, Music, LayoutGrid, BookOpen } from "lucide-react";
import { Service } from "./types";

export const levelsByCycle = {
    Maternelle: [
        ["Crèche", "CRE"], ["Toute Petite Section", "TPS"],
        ["Petite Section", "PS"], ["Moyenne Section", "MS"], ["Grande Section", "GS"],
    ],
    Primaire: [
        ["1ère APG", "1APG"], ["2ème APG", "2APG"], ["3ème APG", "3APG"],
        ["4ème APG", "4APG"], ["5ème APG", "5APG"], ["6ème APG", "6APG"],
    ],
    Collège: [
        ["1ère APIC", "1APIC"], ["2ème APIC", "2APIC"], ["3ème APIC", "3APIC"],
    ],
    Lycée: [
        ["Tronc Commun", "TC"], ["1ère Bac", "1BAC"], ["2ème Bac", "2BAC"],
    ],
};

export const DEFAULT_SERVICES: Service[] = [
    { id: "FI", name: "Frais d'inscription", icon: GraduationCap, color: "text-slate-500", req: true, checked: true },
    { id: "FS", name: "Frais de scolarité", icon: BookOpen, color: "text-purple-500", req: true, checked: true },
    { id: "TS", name: "Transport scolaire", icon: Bus, color: "text-yellow-500", req: false, checked: false },
    { id: "CAN", name: "Cantine", icon: UserRound, color: "text-pink-500", req: false, checked: false },
    { id: "THE", name: "Théâtre", icon: Theater, color: "text-red-500", req: false, checked: false },
    { id: "AP", name: "Arts plastiques", icon: Palette, color: "text-cyan-500", req: false, checked: false },
    { id: "MUS", name: "Musique", icon: Music, color: "text-green-500", req: false, checked: false },
    { id: "BIB", name: "Bibliothèque", icon: LayoutGrid, color: "text-slate-600", req: false, checked: false },
];

export const STEPS = [
    ["Bienvenue", "Présentation"],
    ["Année scolaire", "Période actuelle"],
    ["Cycles & niveaux", "Structure scolaire"],
    ["Services", "Services proposés"],
    ["Identité visuelle", "Logo & thème"],
];

export const THEME_COLORS = ["#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#0f172a"];
