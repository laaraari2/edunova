"use client";

import React, { useState } from "react";
import {
  Search,
  QrCode,
  Link as LinkIcon,
  ArrowLeft,
  Check,
  Phone,
  User,
  GraduationCap,
  Clock,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function ParentPortal() {
  const [screen, setScreen] = useState("search");
  const [loading, setLoading] = useState(false);
  const [schoolName, setSchoolName] = useState("");

  const nextScreen = (next: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScreen(next);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 font-sans flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />

      {/* Header */}
      <header className="h-20 border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/40 flex items-center justify-between px-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Madrassati</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Parent Gateway</p>
          </div>
        </div>
        <Badge variant="outline" className="border-slate-700 text-slate-400 gap-2 px-3 py-1">
          <ShieldCheck className="w-3 h-3 text-sky-400" /> Secure Connection
        </Badge>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <Card className="w-full max-w-[480px] bg-slate-900/60 border-slate-800 backdrop-blur-2xl p-8 rounded-[32px] border-t-slate-700/50 shadow-2xl relative overflow-hidden">

          {/* Progress Dots */}
          {screen !== "success" && (
            <div className="flex justify-center gap-2 mb-10">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${screen === 'search' ? 'w-8 bg-sky-500' : 'w-2 bg-slate-700'}`} />
              <div className={`h-1.5 rounded-full transition-all duration-300 ${screen === 'code' ? 'w-8 bg-sky-500' : 'w-2 bg-slate-700'}`} />
              <div className={`h-1.5 rounded-full transition-all duration-300 ${screen === 'account' ? 'w-8 bg-sky-500' : 'w-2 bg-slate-700'}`} />
            </div>
          )}

          {/* Screen: Search */}
          {screen === "search" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Trouver votre établissement</h2>
                <p className="text-sm text-slate-400">Entrez le nom ou le code de l'école de votre enfant.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Nom de l'établissement</label>
                  <Input
                    placeholder="Ex: Eduvora Academy"
                    className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:border-sky-500/50 transition-all"
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full h-12 bg-sky-500 hover:bg-sky-600 rounded-xl font-bold gap-2 text-white shadow-lg shadow-sky-500/20"
                  onClick={() => nextScreen("code")}
                  disabled={loading}
                >
                  {loading ? "Recherche..." : "Continuer"} <Search className="w-4 h-4" />
                </Button>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800"></span></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-[#121826] px-2 text-slate-500">Ou scanner</span></div>
                </div>
                <Button variant="outline" className="w-full h-12 border-slate-800 bg-transparent hover:bg-slate-800 rounded-xl font-bold gap-2">
                  <QrCode className="w-4 h-4" /> QR Code
                </Button>
              </div>
            </div>
          )}

          {/* Screen: Code */}
          {screen === "code" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="mx-auto w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-4">
                <LinkIcon className="w-8 h-8 text-sky-400" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Code d'appairage</h2>
                <p className="text-sm text-slate-400">Saisissez le code fourni par <span className="text-sky-400 font-bold">{schoolName || "l'établissement"}</span>.</p>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Ex: 58-942-X"
                  className="bg-slate-950/50 border-slate-800 h-14 rounded-xl text-center text-xl font-mono tracking-widest uppercase focus:border-sky-500"
                />
                <Button
                  className="w-full h-12 bg-sky-500 hover:bg-sky-600 rounded-xl font-bold text-white shadow-lg shadow-sky-500/20"
                  onClick={() => nextScreen("account")}
                  disabled={loading}
                >
                  Vérifier le code
                </Button>
                <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-300" onClick={() => setScreen("search")}>
                  Retour
                </Button>
              </div>
            </div>
          )}

          {/* Screen: Account */}
          {screen === "account" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Créer un profil parent</h2>
                <p className="text-sm text-slate-400">Complétez vos informations pour finaliser le lien.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 ml-1">PRENOM</label>
                  <Input className="bg-slate-950/50 border-slate-800 h-11" placeholder="Prénom" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 ml-1">NOM</label>
                  <Input className="bg-slate-950/50 border-slate-800 h-11" placeholder="Nom" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 ml-1">RELATION</label>
                <Select defaultValue="father">
                  <SelectTrigger className="bg-slate-950/50 border-slate-800 h-11">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="father">Père</SelectItem>
                    <SelectItem value="mother">Mère</SelectItem>
                    <SelectItem value="tutor">Tuteur Légal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 ml-1">TELEPHONE</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <Input className="bg-slate-950/50 border-slate-800 h-11 pl-10" placeholder="06 00 00 00 00" />
                </div>
              </div>
              <Button
                className="w-full h-12 bg-sky-500 hover:bg-sky-600 rounded-xl font-bold text-white shadow-lg shadow-sky-500/20 mt-4"
                onClick={() => nextScreen("success")}
                disabled={loading}
              >
                Terminer l'inscription
              </Button>
            </div>
          )}

          {/* Screen: Success */}
          {screen === "success" && (
            <div className="space-y-8 text-center animate-in zoom-in duration-500">
              <div className="mx-auto w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-10 h-10 text-amber-500 animate-pulse" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Lien en attente</h2>
                <p className="text-sm text-slate-400 leading-relaxed px-4">
                  Votre demande de liaison a été envoyée avec succès à <span className="text-sky-400 font-bold">{schoolName || "l'école"}</span>.<br />Vous recevrez une notification dès que l'administration validera votre compte.
                </p>
              </div>
              <Button variant="outline" className="border-slate-800 bg-transparent hover:bg-slate-800 h-12 px-10 rounded-xl font-bold" onClick={() => nextScreen("search")}>
                Terminer
              </Button>
            </div>
          )}

        </Card>
      </main>

      <footer className="h-16 flex items-center justify-center text-[11px] text-slate-600 font-medium tracking-wide">
        POWERED BY EDUVORA PLATFORM • &copy; 2026
      </footer>
    </div>
  );
}
