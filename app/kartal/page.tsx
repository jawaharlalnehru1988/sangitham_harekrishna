"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShareButton from '@/components/common/ShareButton';
import { KARTAL_CATEGORIES, ALL_KARTAL_LESSONS } from '@/lib/kartalData';

function KartalLessonList() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredLessons = ALL_KARTAL_LESSONS.filter((lesson) => {
        const matchesCategory =
            selectedCategory === 'all' ||
            KARTAL_CATEGORIES.find((c) => c.id === selectedCategory)?.lessons.some((l) => l.id === lesson.id);

        const matchesLevel = selectedLevel === 'All' || lesson.level.toLowerCase() === selectedLevel.toLowerCase();

        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
            !query ||
            lesson.title.toLowerCase().includes(query) ||
            lesson.subtitle.toLowerCase().includes(query) ||
            lesson.taal.toLowerCase().includes(query) ||
            lesson.bols.toLowerCase().includes(query) ||
            lesson.description.toLowerCase().includes(query) ||
            lesson.videos.some((v) => v.title.toLowerCase().includes(query) || v.tutor.toLowerCase().includes(query));

        return matchesCategory && matchesLevel && matchesQuery;
    });

    const totalVideos = ALL_KARTAL_LESSONS.reduce((acc, l) => acc + l.videos.length, 0);

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Header />

            <main role="main" className="flex-grow pb-32 px-4 pt-6 max-w-7xl mx-auto w-full">
                {/* Breadcrumbs */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Home
                    </Link>

                    <ShareButton
                        title="Sacred Kartal Music & Kirtan Tala Lessons"
                        text="Explore authentic Gaudiya Vaishnava Kartal (karatala) lessons across Daspahira, Kaharba, Dadra, Khemta, and Lofa talas with multi-tutor video demonstrations!"
                    />
                </div>

                {/* Hero Banner */}
                <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 mb-10 shadow-2xl">
                    <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full min-h-[280px]">
                        <Image
                            src="/kartal_music.jpg"
                            alt="Welcome to Kartal Music"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md self-start mb-3">
                                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>{ALL_KARTAL_LESSONS.length} Lessons Available • {totalVideos} Tutorial Videos</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                                Welcome to Kartal Music
                            </h1>
                            <p className="text-xs sm:text-base text-amber-100/90 max-w-2xl mt-2 leading-relaxed">
                                Sacred Vaishnava bell-metal karatalas, hand grip mechanics, open (khuli) and closed (bandha) sound techniques, and systematic lessons for all traditional kirtan taals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="p-6 rounded-3xl bg-white dark:bg-background-dark/60 border border-black/5 dark:border-white/10 mb-8 shadow-sm space-y-5">
                    {/* Search Bar */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search by tala (Daspahira, Kaharba, Dadra, Khemta, Lofa), tutor name, or lesson title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                <span className="material-symbols-outlined text-base">close</span>
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                                selectedCategory === 'all'
                                    ? 'bg-primary text-slate-950 shadow-md shadow-primary/20'
                                    : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                            }`}
                        >
                            All Categories ({ALL_KARTAL_LESSONS.length})
                        </button>
                        {KARTAL_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                                    selectedCategory === cat.id
                                        ? 'bg-primary text-slate-950 shadow-md shadow-primary/20'
                                        : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                                }`}
                            >
                                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                                <span>{cat.name} ({cat.lessons.length})</span>
                            </button>
                        ))}
                    </div>

                    {/* Level Filter Tabs */}
                    <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
                            Level:
                        </span>
                        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setSelectedLevel(lvl)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    selectedLevel === lvl
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lessons Grid */}
                {filteredLessons.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-background-dark/40 border border-black/5 dark:border-white/10 my-10">
                        <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Kartal Lessons Found</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Try adjusting your search query or switching categories.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLessons.map((lesson) => {
                            const levelBadgeClass =
                                lesson.level === 'Beginner'
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                    : lesson.level === 'Intermediate'
                                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';

                            return (
                                <div
                                    key={lesson.id}
                                    className="p-6 rounded-3xl bg-white dark:bg-background-dark/60 border border-black/5 dark:border-white/10 hover:border-primary/40 dark:hover:border-primary/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-xl"
                                >
                                    <div>
                                        {/* Header Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${levelBadgeClass}`}>
                                                {lesson.level}
                                            </span>
                                            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">ondemand_video</span>
                                                {lesson.videos.length} Tutors
                                            </span>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <Link href={`/kartal/${lesson.id}`} className="block">
                                            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                                {lesson.title}
                                            </h3>
                                        </Link>
                                        <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                                            {lesson.taal}
                                        </p>

                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                                            {lesson.description}
                                        </p>

                                        {/* Bols & Structure Box */}
                                        <div className="mt-4 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px]">
                                            <div className="font-mono text-slate-700 dark:text-slate-300 font-semibold truncate">
                                                <span className="text-primary font-bold mr-1.5">Beat Pattern:</span>
                                                {lesson.bols}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
                                        <Link
                                            href={`/kartal/${lesson.id}`}
                                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-primary text-slate-950 font-extrabold text-xs hover:bg-primary-hover shadow-sm shadow-primary/20 transition-all cursor-pointer"
                                        >
                                            <span>Learn Lesson</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>

                                        <ShareButton
                                            title={`Learn ${lesson.title} on Kartal`}
                                            text={`Learn ${lesson.title} (${lesson.taal}) with authentic Gaudiya Vaishnava multi-tutor video demonstrations on carnatic.askharekrishna.com!`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Back to Home Link */}
                <div className="text-center pt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                    >
                        <span>Return to Main Platform</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function KartalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading Kartal Lessons...</div>}>
            <KartalLessonList />
        </Suspense>
    );
}
