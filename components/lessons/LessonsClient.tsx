"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface Lesson {
    id: number;
    division: string;
    category_name?: string;
    topic: string;
    lesson: string;
    audioPath: string | null;
    created_at: string;
    updated_at: string;
}

interface LessonsClientProps {
    initialLessons: Lesson[];
    basePath: string;
    icon?: string;
    accentColor?: string;
    bgColor?: string;
    customColor?: string;
}

const ITEMS_PER_PAGE = 25;

// Helper to convert hex to rgba
const hexToRgba = (hex: string, opacity: number) => {
    if (!hex || !hex.startsWith('#')) return `rgba(99, 102, 241, ${opacity})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function LessonsClient({
    initialLessons,
    basePath,
    icon = "auto_stories",
    accentColor = "text-blue-400",
    bgColor = "from-blue-500/10 to-indigo-600/10",
    customColor
}: LessonsClientProps) {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(initialLessons.length / ITEMS_PER_PAGE);

    const sortedLessons = useMemo(() => {
        return [...initialLessons].sort((a, b) => a.id - b.id);
    }, [initialLessons]);

    const currentLessons = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedLessons.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedLessons, currentPage]);

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
            <div className="flex items-center justify-between mb-8 bg-black/5 dark:bg-background-dark/40 p-2 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 pl-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">View Mode</span>
                </div>
                <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center justify-center size-10 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                        title="Grid View"
                    >
                        <span className="material-symbols-outlined text-xl">grid_view</span>
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`flex items-center justify-center size-10 rounded-lg transition-all ${viewMode === 'table' ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
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
                                onClick={() => router.push(`${basePath}/${lesson.id}`)}
                                className="group relative overflow-hidden rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm hover:shadow-md dark:shadow-none p-5"
                                style={{ 
                                    backgroundColor: customColor ? hexToRgba(customColor, 0.1) : undefined,
                                    borderColor: customColor ? hexToRgba(customColor, 0.2) : undefined,
                                }}
                            >
                                <div 
                                    className={`absolute -right-4 -top-4 size-24 rounded-full opacity-5 blur-2xl ${!customColor ? accentColor : ''}`} 
                                    style={customColor ? { backgroundColor: customColor } : {}}
                                />

                                <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                                    <div 
                                        className={`flex size-12 items-center justify-center rounded-xl bg-black/5 dark:bg-background-dark/40 border border-black/5 dark:border-white/5 shadow-inner ${!customColor ? accentColor : ''}`}
                                        style={customColor ? { color: customColor } : {}}
                                    >
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {icon}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span 
                                                className={`text-[10px] font-bold uppercase tracking-widest bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full ${!customColor ? accentColor : ''}`}
                                                style={customColor ? { color: customColor } : {}}
                                            >
                                                {lesson.category_name || lesson.division}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight tracking-tight mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                                            {lesson.topic}
                                        </h4>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <span 
                                            className={`text-[10px] font-bold uppercase tracking-widest ${!customColor ? accentColor : ''}`}
                                            style={customColor ? { color: customColor } : {}}
                                        >
                                            Start Lesson
                                        </span>
                                        <span 
                                            className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                            style={customColor ? { color: customColor } : {}}
                                        >
                                            arrow_forward
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm dark:shadow-none">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5">
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">#</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">Topic</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentLessons.map((lesson, idx) => (
                                        <tr
                                            key={lesson.id}
                                            onClick={() => router.push(`${basePath}/${lesson.id}`)}
                                            className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/5 transition-colors group cursor-pointer"
                                        >
                                            <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300">
                                                {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                                                    {lesson.topic}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div 
                                                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-primary/70 dark:group-hover:text-white transition-colors"
                                                    style={customColor ? { color: customColor } : {}}
                                                >
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
                <div className="flex items-center justify-center gap-2 mt-12 bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10 backdrop-blur-sm">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center size-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`flex items-center justify-center size-10 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:border-primary/50'}`}
                                style={currentPage === i + 1 && customColor ? { backgroundColor: customColor } : {}}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center size-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
}
