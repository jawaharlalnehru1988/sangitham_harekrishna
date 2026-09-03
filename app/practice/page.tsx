"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface PracticeAudio {
    id: number;
    audioPathName: string;
    audioPath: string;
    sort_order: number;
}

interface PracticeVideo {
    id: number;
    youtubevideoUrl: string;
    sort_order: number;
}

interface PracticeLesson {
    id: number;
    orderNumber?: number;
    PracticeCategory: string;
    lessonName: string;
    swarams?: string;
    audioPath?: string | null;
    audios: PracticeAudio[];
    videos: PracticeVideo[];
    created_at: string;
    updated_at: string;
}

const getCategoryMeta = (catName: string): { icon: string; description: string } => {
    const lower = (catName || '').toLowerCase();
    if (lower.includes('sarali') || lower.includes('swaravali')) {
        return {
            icon: 'graphic_eq',
            description: 'Foundational step-by-step swara sequences practiced in three speeds to develop pitch stability and rhythm control.',
        };
    }
    if (lower.includes('jantai')) {
        return {
            icon: 'queue_music',
            description: 'Double-note phrasing exercises (ss rr gg mm...) designed to develop vocal force, speed, and clear articulation.',
        };
    }
    if (lower.includes('dhattu') || lower.includes('thattu')) {
        return {
            icon: 'swap_vert',
            description: 'Zig-zag swara skipping patterns that train mental agility, precise swarasthana placement, and flexible phrasing.',
        };
    }
    if (lower.includes('upper') || lower.includes('mel sthayi')) {
        return {
            icon: 'arrow_upward',
            description: 'High octave reach and upper register vocal flexibility exercises to expand the upper vocal range comfortably.',
        };
    }
    if (lower.includes('lower') || lower.includes('keel sthayi') || lower.includes('keezh')) {
        return {
            icon: 'arrow_downward',
            description: 'Mandra sthayi exploration and lower octave resonance practice to cultivate depth and stability.',
        };
    }
    if (lower.includes('alankaram') || lower.includes('tala')) {
        return {
            icon: 'timer',
            description: 'Mastery of the seven primary rhythmic tala systems (Dhruva, Matya, Rupaka, Jhampa, Triputa, Ata, Eka) set to swaras.',
        };
    }
    return {
        icon: 'library_music',
        description: 'Structured melodic and rhythmic listening practice exercises with audio tracks and video demonstrations.',
    };
};

function PracticeLessonsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [lessons, setLessons] = useState<PracticeLesson[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [categoryParam]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-lesson-practice/`);
                const data: PracticeLesson[] = res.data.results || (Array.isArray(res.data) ? res.data : []);
                const sortedData = [...data].sort((a, b) => {
                    const orderA = a.orderNumber !== undefined ? Number(a.orderNumber) : Number(a.id);
                    const orderB = b.orderNumber !== undefined ? Number(b.orderNumber) : Number(b.id);
                    return orderA - orderB;
                });
                setLessons(sortedData);

                const cats = Array.from(new Set(sortedData.map(l => (l.PracticeCategory || '').trim()))).filter(Boolean);
                setCategories(['All', ...cats]);
            } catch (err) {
                console.error('Error fetching lessons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    const filteredLessons = lessons.filter(lesson => {
        const matchesCategory = selectedCategory === 'All' || lesson.PracticeCategory === selectedCategory;
        const matchesSearch = lesson.lessonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              lesson.PracticeCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (lesson.swarams || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const activeMeta = selectedCategory !== 'All' ? getCategoryMeta(selectedCategory) : null;
    const categoryAudioCount = filteredLessons.reduce((acc, l) => acc + (l.audios?.length || (l.audioPath ? 1 : 0)), 0);
    const categoryVideoCount = filteredLessons.reduce((acc, l) => acc + (l.videos?.length || 0), 0);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Navigation Header */}
            <div className="mb-6 flex items-center justify-between">
                <Link
                    href="/#practice"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to Home
                </Link>

                {selectedCategory !== 'All' && (
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-sm">grid_view</span>
                        View All Categories
                    </button>
                )}
            </div>

            {/* Category Hero Banner */}
            <header className="mb-8 p-6 sm:p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative overflow-hidden shadow-sm dark:shadow-none">
                <div className="absolute -right-8 -top-8 size-44 rounded-full blur-3xl opacity-40 bg-primary/20" />

                <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full text-white bg-primary inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                                {activeMeta ? activeMeta.icon : 'headphones'}
                            </span>
                            {selectedCategory === 'All' ? 'Complete Curriculum' : selectedCategory}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {filteredLessons.length} {filteredLessons.length === 1 ? 'Exercise' : 'Exercises'}
                            {categoryAudioCount > 0 && ` • ${categoryAudioCount} Audio Tracks`}
                            {categoryVideoCount > 0 && ` • ${categoryVideoCount} Videos`}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                        {selectedCategory === 'All' ? 'All Listening Practice Series' : selectedCategory}
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                        {activeMeta ? activeMeta.description : 'Explore structured listening tracks, notation swarams, and video demonstrations for all Carnatic practice series.'}
                    </p>
                </div>
            </header>

            {/* Category Filters Bar & Search */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                    isSelected
                                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                                        : 'bg-white dark:bg-background-dark/60 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:border-primary/40'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Search Input */}
                <div className="relative min-w-[260px]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search exercises or swarams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Lessons Listing Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-36 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            ) : filteredLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredLessons.map((lesson, idx) => {
                        const audioCount = lesson.audios?.length || (lesson.audioPath ? 1 : 0);
                        const videoCount = lesson.videos?.length || 0;
                        const firstLineSwaram = lesson.swarams ? lesson.swarams.split('\n')[0] : null;

                        return (
                            <Link
                                key={lesson.id}
                                href={`/practice/${lesson.id}`}
                                className="group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
                            >
                                <div className="relative z-10">
                                    {/* Top Row: Index Badge & Category Tag */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="size-9 rounded-xl bg-primary/10 text-primary font-extrabold text-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                                #{lesson.orderNumber || idx + 1}
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                {lesson.PracticeCategory}
                                            </span>
                                        </div>

                                        <span className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                        </span>
                                    </div>

                                    {/* Lesson Title */}
                                    <h2 className="font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {lesson.lessonName}
                                    </h2>

                                    {/* Swaram Preview Snippet */}
                                    {firstLineSwaram && (
                                        <div className="mt-3 p-3 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5">
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1">
                                                Notation Preview
                                            </div>
                                            <pre className="font-mono text-xs text-slate-800 dark:text-amber-100 font-medium truncate">
                                                {firstLineSwaram}
                                            </pre>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Meta: Audio / Video Stats */}
                                <div className="relative z-10 mt-5 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs text-primary">graphic_eq</span>
                                            {audioCount} {audioCount === 1 ? 'Audio Part' : 'Audio Parts'}
                                        </span>
                                        {videoCount > 0 && (
                                            <span className="flex items-center gap-1 text-red-500/90 font-semibold">
                                                <span>•</span>
                                                <span className="material-symbols-outlined text-xs">smart_display</span>
                                                {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary group-hover:underline">
                                        Open Practice
                                    </span>
                                </div>

                                {/* Subtle Ambient Glow */}
                                <div className="absolute -right-4 -bottom-4 size-24 rounded-full transition-all duration-500 blur-2xl bg-primary/5 group-hover:bg-primary/20" />
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="p-12 rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 text-center text-slate-400">
                    <span className="material-symbols-outlined text-5xl mb-3 text-slate-300 dark:text-slate-600">search_off</span>
                    <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">No exercises found</h3>
                    <p className="text-sm mt-1">Try selecting another category or clearing your search term.</p>
                </div>
            )}
        </div>
    );
}

export default function AllPracticeLessonsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <Suspense fallback={
                    <div className="max-w-6xl mx-auto">
                        <div className="h-10 w-48 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                        <div className="h-44 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-36 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse" />
                            ))}
                        </div>
                    </div>
                }>
                    <PracticeLessonsContent />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
