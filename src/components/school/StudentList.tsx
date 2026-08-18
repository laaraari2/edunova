import React from 'react';
import { CheckCircle2, Layers, Clock } from 'lucide-react';

interface StudentListProps {
    studentsData: any[];
    setSelectedStudent: (student: any) => void;
    setCurrentDetailView: (view: string) => void;
}

export default function StudentList({ studentsData, setSelectedStudent, setCurrentDetailView }: StudentListProps) {
    return (
        <main className="flex-1 p-6 overflow-y-auto bg-[#fafafa]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max">
                {studentsData.map((d, i) => (
                    <div
                        key={i}
                        onClick={() => { setSelectedStudent(d); setCurrentDetailView("profile"); }}
                        className="flex bg-white rounded-[10px] border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#128b9d]/30 hover:ring-1 hover:ring-[#128b9d]/20 transition-all cursor-pointer group"
                    >
                        {/* Photo Placeholder View */}
                        <div className="w-[120px] flex items-center justify-center bg-white p-2">
                            <div className="w-16 h-[85px] bg-[#e2e8f0] rounded-lg mt-2 relative overflow-hidden flex flex-col items-center">
                                <div className="w-7 h-7 bg-white rounded-full mt-2 opacity-50"></div>
                                <div className="w-12 h-10 bg-white rounded-t-[10px] mt-2 opacity-50"></div>
                            </div>
                        </div>

                        {/* Info Area */}
                        <div className="flex-1 p-4 pl-0 py-4 flex flex-col justify-between">
                            {/* Top Row */}
                            <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-slate-800 text-[14.5px]">{d.name}</h3>
                                <CheckCircle2 className="w-5 h-5 text-[#2eb33c]" fill="currentColor" stroke="white" strokeWidth={1} />
                            </div>

                            <div className="space-y-1.5 mt-2 mb-3">
                                <div className="flex items-center text-slate-500 text-[13px] gap-2.5">
                                    <div className="px-1.5 py-[1px] border border-gray-300 rounded text-[11px] font-bold text-gray-500 leading-none">12</div>
                                    <span>{d.id}</span>
                                </div>
                                <div className="flex items-center text-slate-500 text-[13px] gap-2.5">
                                    <Layers className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                                    <span>{d.class}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-dotted border-gray-200">
                                <Clock className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                                <div className={`w-6 h-6 rounded-full ${d.color} text-white flex items-center justify-center text-[12px] font-bold shadow-sm`}>
                                    {d.initial}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
