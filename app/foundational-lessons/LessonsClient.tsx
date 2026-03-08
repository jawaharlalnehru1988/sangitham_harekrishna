"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Lesson {
    id: number;
    division: string;
    topic: string;
    lesson: string;
    audioPath: string | null;
    created_at: string;
    updated_at: string;
}

interface LessonsClientProps {
    initialLessons: Lesson[];
}

const ITEMS_PER_PAGE = 6;

export default function LessonsClient({ initialLessons }: LessonsClientProps) {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(initialLessons.length / ITEMS_PER_PAGE);

    const currentLessons = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return initialLessons.slice(start, start + ITEMS_PER_PAGE);
    }, [initialLessons, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (initialLessons.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">inventory_2</span>
                <h3 className="text-xl font-bold text-slate-500">No lessons found</h3>
                <p className="text-slate-600 mt-2">Check back later for new content!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-8 bg-background-dark/40 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 pl-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">View Mode</span>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center justify-center size-10 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
                        title="Grid View"
                    >
                        <span className="material-symbols-outlined text-xl">grid_view</span>
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`flex items-center justify-center size-10 rounded-lg transition-all ${viewMode === 'table' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white'}`}
                        title="Table View"
                    >
                        <span className="material-symbols-outlined text-xl">format_list_bulleted</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {currentLessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                onClick={() => router.push(`/foundational-lessons/${lesson.id}`)}
                                className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 p-5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                            >
                                <div className="absolute -right-4 -top-4 size-24 rounded-full bg-blue-400 opacity-5 blur-2xl" />

                                <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-background-dark/40 border border-white/5 shadow-inner text-blue-400">
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            auto_stories
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                                                {lesson.division}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight tracking-tight mb-2 group-hover:text-primary transition-colors">
                                            {lesson.topic}
                                        </h4>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                            Start Lesson
                                        </span>
                                        <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-background-dark/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">#</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Topic</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Division</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLessons.map((lesson, idx) => (
                                        <tr
                                            key={lesson.id}
                                            onClick={() => router.push(`/foundational-lessons/${lesson.id}`)}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                                {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-200 group-hover:text-primary transition-colors">
                                                    {lesson.topic}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                                                    {lesson.division}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                                                    View
                                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 bg-background-dark/40 p-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`flex items-center justify-center size-10 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-primary text-background-dark shadow-lg shadow-primary/20 scale-110' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
}
