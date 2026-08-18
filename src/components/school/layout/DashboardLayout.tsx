"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white text-slate-800 font-sans overflow-hidden">
        {sidebar}
      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden bg-slate-50">

        {/* TOP HEADER */}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 bg-white">

          <div className="flex items-center gap-6 h-full">

            {/* Apps button */}
            <div className="h-full flex items-center cursor-pointer px-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center h-full space-x-6 text-[13.5px] font-medium text-slate-600">
              <div className="h-full flex items-center cursor-pointer hover:text-slate-800">Accès</div>
              <div className="h-full flex items-center text-slate-800 cursor-pointer">Carte Scolaire</div>
              <div className="h-full flex items-center cursor-pointer hover:text-slate-800">Rapports</div>
              <div className="h-full flex items-center cursor-pointer hover:text-slate-800">Analyse</div>
              <div className="h-full flex items-center cursor-pointer hover:text-slate-800">Configuration</div>
            </nav>

          </div>

          {/* Right side */}
          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2 text-slate-600 bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer">
              <span className="text-[13px] font-medium">2025-2026</span>
            </div>

            <div className="p-2 border border-gray-200 rounded-md cursor-pointer text-slate-600 hover:bg-slate-50 relative">
              🔔
            </div>

            <div className="w-9 h-9 rounded-full bg-[#ad2432] text-white flex items-center justify-center font-bold text-[14px] cursor-pointer">
              A
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
     <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}