"use client";

import React from "react";
import {
  GraduationCap,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  Smartphone,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100] px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">Madrassati</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Solutions", "Fonctionnalités", "Tarifs", "Contact"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-slate-500 hover:text-sky-500 transition-colors">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/parent">
            <Button variant="ghost" className="text-slate-600 font-bold">Portail Parent</Button>
          </Link>
          <Link href="/setup">
            <Button className="bg-sky-500 hover:bg-sky-600 rounded-xl px-6 h-11 font-bold text-white shadow-lg shadow-sky-200">
              Essai Gratuit
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-8 relative overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-sky-50 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Badge className="bg-sky-50 text-sky-600 hover:bg-sky-50 border-none px-4 py-1.5 rounded-full text-xs font-bold gap-2">
              <Zap className="w-3 h-3 fill-sky-500 text-sky-500" /> NOUVEAUTÉ : Version Next.js est en ligne
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              L'excellence <span className="text-sky-500 italic">numérique</span> pour votre école.
            </h1>
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
              Simplifiez la gestion de votre établissement avec Eduvora. Une plateforme intuitive, sécurisée et complète pour les écoles modernes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/setup">
                <Button className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg gap-2 shadow-xl shadow-slate-200">
                  Démarrer l'installation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold text-lg hover:bg-slate-50">
                  Démo Admin
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-sky-200/20 blur-3xl rounded-full scale-90" />
            <Card className="relative border-slate-100 shadow-2xl rounded-3xl overflow-hidden p-2 bg-slate-50">
              <img
                src="https://img.freepik.com/free-vector/user-interface-design-concept-landing-page_52683-76342.jpg"
                alt="Dashboard Preview"
                className="rounded-2xl w-full border border-slate-200"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900">Tout ce dont vous avez besoin</h2>
            <p className="text-slate-500">Une suite d'outils puissants conçus pour les administrateurs, les enseignants et les parents.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Gestion Financière", desc: "Suivez les paiements, factures et dépenses en temps réel.", icon: BarChart3, color: "bg-emerald-50 text-emerald-500" },
              { title: "Portail Parent", desc: "Une application dédiée pour un suivi scolaire transparent.", icon: Smartphone, color: "bg-violet-50 text-violet-500" },
              { title: "Contrôle d'Accès", desc: "Sécurisez les entrées et sorties de votre établissement.", icon: ShieldCheck, color: "bg-sky-50 text-sky-500" },
            ].map((f, i) => (
              <Card key={i} className="p-8 border-none shadow-sm hover:shadow-xl transition-shadow rounded-3xl">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8">
        <Card className="max-w-5xl mx-auto bg-sky-500 p-16 rounded-[48px] text-center space-y-8 shadow-2xl shadow-sky-200 border-none">
          <h2 className="text-4xl md:text-5xl font-black text-white">Prêt à transformer votre école ?</h2>
          <p className="text-sky-50 text-xl font-medium max-w-xl mx-auto">Rejoignez plus de 500 établissements qui font confiance à Madrassati.</p>
          <div className="flex justify-center pt-4">
            <Link href="/setup">
              <Button size="lg" className="bg-white hover:bg-slate-50 text-sky-600 rounded-2xl h-16 px-12 font-black text-xl shadow-lg">
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-400 font-medium tracking-wide decoration-sky-500/30">
          DESIGNED WITH PASSION BY EDUVORA PLATFORM • &copy; 2026
        </p>
      </footer>
    </div>
  );
}
