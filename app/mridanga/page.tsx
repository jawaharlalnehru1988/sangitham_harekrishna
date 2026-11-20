"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { API_BASE_URL } from '@/lib/constants';
import ShareButton from '@/components/common/ShareButton';

interface MridangaAudio {
    id: number;
    songName: string;
    audioPath: string;
    mantras_and_notes?: string;
    sort_order: number;
}

interface MridangaVideo {
    id: number;
    title: string;
    youtubevideoUrl: string;
    mantras_and_notes?: string;
    sort_order: number;
}

interface MridangaKirtanDemo {
    id: number;
    title: string;
    youtubevideoUrl: string;
    mantras_and_notes?: string;
    sort_order: number;
}

interface MridangaLesson {
    id: number;
    tala_name: string;
    tala_category?: string;
    level: 'beginner' | 'medium' | 'advanced';
    matras?: number | null;
    mantras_and_notes?: string;
    description: string;
    sort_order: number;
    audios: MridangaAudio[];
    videos: MridangaVideo[];
    kirtan_demos: MridangaKirtanDemo[];
    created_at: string;
    updated_at: string;
}

const CATEGORIES = [
    { id: 'all', label: 'All Categories' },
    { id: 'daspahira', label: 'Daspahira' },
    { id: 'kaharba', label: 'Kaharba' },
    { id: 'dadra', label: 'Dadra' },
    { id: 'lofa', label: 'Lofa' },
    { id: 'rupak', label: 'Rupak' },
    { id: 'jhap', label: 'Jhap' },
    { id: 'teen', label: 'Teen' },
    { id: 'matan', label: 'Matan' },
    { id: 'rela', label: 'Rela' },
    { id: 'duggi', label: 'Duggi Style' },
    { id: 'udaan', label: 'Udaan (Pickup Beats)' },
];

function MridangaLessonList() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [lessons, setLessons] = useState<MridangaLesson[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) {
            setSelectedCategory(cat.toLowerCase());
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-mridanga-lessons/?page_size=100`);
                const data = res.data.results || (Array.isArray(res.data) ? res.data : []);
                setLessons(data);
            } catch (err) {
                console.error('Error fetching mridanga lessons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    const filteredLessons = lessons.filter((lesson) => {
        // Category filter
        if (selectedCategory !== 'all') {
            const cat = (lesson.tala_category || 'daspahira').toLowerCase();
            if (cat !== selectedCategory.toLowerCase()) {
                return false;
            }
        }

        // Level filter
        if (selectedLevel !== 'All' && lesson.level.toLowerCase() !== selectedLevel.toLowerCase()) {
            return false;
        }

        // Search filter
        if (searchQuery.trim() === '') return true;
        const q = searchQuery.toLowerCase();
        const videoNotes = lesson.videos?.map(v => v.mantras_and_notes || '').join(' ').toLowerCase() || '';
        const demoNotes = lesson.kirtan_demos?.map(kd => kd.mantras_and_notes || '').join(' ').toLowerCase() || '';
        return (
            lesson.tala_name.toLowerCase().includes(q) ||
            (lesson.tala_category && lesson.tala_category.toLowerCase().includes(q)) ||
            (lesson.mantras_and_notes && lesson.mantras_and_notes.toLowerCase().includes(q)) ||
            videoNotes.includes(q) ||
            demoNotes.includes(q) ||
            (lesson.description && lesson.description.toLowerCase().includes(q)) ||
            (lesson.matras && String(lesson.matras).includes(q))
        );
    });

    const getLevelBadge = (level: string) => {
        switch (level) {
            case 'beginner':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Beginner
                    </span>
                );
            case 'medium':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Medium
                    </span>
                );
            case 'advanced':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        Advanced
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Top Navigation */}
            <div className="mb-6">
                <Link
                    href="/#mridanga"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mb-4"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back to Home
                </Link>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Mridanga Lessons Directory
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Browse Sri Khol talas, bols, and step-by-step video tutorials
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                        <ShareButton
                            title={selectedCategory === 'all' ? 'Mridanga Lessons Directory' : `Mridanga Lessons - ${CATEGORIES.find(c => c.id === selectedCategory)?.label || selectedCategory}`}
                            category={selectedCategory === 'all' ? 'Sri Khol' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
                            text="Explore authentic Gaudiya kirtan mridanga beats and video tutorials."
                            variant="pill"
                            label={selectedCategory === 'all' ? 'Share Directory' : 'Share Category'}
                        />
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl border border-black/5 dark:border-white/10">
                            {filteredLessons.length} {filteredLessons.length === 1 ? 'Lesson' : 'Lessons'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            selectedCategory === cat.id
                                ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                : 'bg-white dark:bg-background-dark/80 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:border-primary/30'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Search and Level Filters */}
            <div className="bg-white dark:bg-background-dark/60 rounded-2xl border border-black/5 dark:border-white/10 p-4 mb-8 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-96">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search tala name, beats, mantras..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        )}
                    </div>

                    {/* Level Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        {['All', 'Beginner', 'Medium', 'Advanced'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedLevel(type)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                                    selectedLevel === type
                                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                        : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                                }`}
                            >
                                {type === 'All' ? 'All Levels' : `${type}`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-56 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5"
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredLessons.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-background-dark/40 rounded-2xl border border-black/5 dark:border-white/10">
                    <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">
                        graphic_eq
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                        No Mridanga Lessons Found
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                        No lessons match your current selection in this category. Try switching categories or level filter.
                    </p>
                </div>
            )}

            {/* Mridanga Cards Grid */}
            {!loading && filteredLessons.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map((lesson) => {
                        const videoCount = lesson.videos?.length || 0;
                        const audioCount = lesson.audios?.length || 0;

                        const rawMantra = lesson.mantras_and_notes ||
                            lesson.videos?.find(v => v.mantras_and_notes)?.mantras_and_notes ||
                            '';

                        const mantraLines = rawMantra
                            ? rawMantra.split('\n').filter(l => l.trim() && !l.startsWith('[')).slice(0, 2).join('\n')
                            : '';

                        return (
                            <Link
                                key={lesson.id}
                                href={`/mridanga/${lesson.id}`}
                                className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2">
                                            {getLevelBadge(lesson.level)}
                                            {lesson.matras && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                                    {lesson.matras} Beats
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ShareButton
                                                title={lesson.tala_name}
                                                category={lesson.tala_category}
                                                url={`/mridanga/${lesson.id}`}
                                                text={`Learn ${lesson.tala_name} Sri Khol beats and kirtan variations.`}
                                                variant="icon"
                                            />
                                            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <span className="material-symbols-outlined text-base">
                                                    arrow_forward
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="font-extrabold text-xl leading-snug tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {lesson.tala_name}
                                    </h2>

                                    {mantraLines && (
                                        <div className="mt-3 bg-slate-50 dark:bg-black/30 p-3 rounded-xl border border-black/5 dark:border-white/5 font-mono text-[11px] text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                            {mantraLines}
                                        </div>
                                    )}

                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-3 leading-relaxed font-medium">
                                        {lesson.description}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                                        <span className="material-symbols-outlined text-sm text-red-500">
                                            play_circle
                                        </span>
                                        {videoCount} {videoCount === 1 ? 'Tutorial' : 'Tutorials'}
                                    </span>
                                    {audioCount > 0 && (
                                        <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-sm text-primary">
                                                audio_file
                                            </span>
                                            {audioCount} {audioCount === 1 ? 'Audio' : 'Audios'}
                                        </span>
                                    )}
                                </div>

                                {/* Background Glow */}
                                <div className="absolute -right-6 -bottom-6 size-28 rounded-full transition-all duration-500 blur-2xl bg-primary/5 group-hover:bg-primary/15" />
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function AllMridangaLessonsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <Suspense fallback={
                    <div className="max-w-7xl mx-auto flex items-center justify-center py-20">
                        <div className="size-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                }>
                    <MridangaLessonList />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
