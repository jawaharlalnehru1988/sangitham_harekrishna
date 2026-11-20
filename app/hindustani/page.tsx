"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShareButton from '@/components/common/ShareButton';
import { HINDUSTANI_STAGES, ALL_HINDUSTANI_LESSONS, RECOMMENDED_HINDUSTANI_CHANNELS } from '@/lib/hindustaniData';

function HindustaniLessonList() {
    const [selectedStage, setSelectedStage] = useState<string>('all');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredLessons = ALL_HINDUSTANI_LESSONS.filter((lesson) => {
        const matchesStage =
            selectedStage === 'all' ||
            HINDUSTANI_STAGES.find((s) => s.id === selectedStage)?.lessons.some((l) => l.id === lesson.id);

        const matchesLevel = selectedLevel === 'All' || lesson.level.toLowerCase() === selectedLevel.toLowerCase();

        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
            !query ||
            lesson.title.toLowerCase().includes(query) ||
            lesson.subtitle.toLowerCase().includes(query) ||
            lesson.scaleOrRaag.toLowerCase().includes(query) ||
            lesson.sargamNotes.toLowerCase().includes(query) ||
            lesson.vocalFocus.toLowerCase().includes(query) ||
            lesson.description.toLowerCase().includes(query) ||
            lesson.videos.some((v) => v.title.toLowerCase().includes(query) || v.tutor.toLowerCase().includes(query));

        return matchesStage && matchesLevel && matchesQuery;
    });

    const totalVideos = ALL_HINDUSTANI_LESSONS.reduce((acc, l) => acc + l.videos.length, 0);

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Header />

            <main role="main" className="flex-grow pb-32 px-4 pt-6 max-w-7xl mx-auto w-full">
                {/* Breadcrumbs & Share */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Home
                    </Link>

                    <ShareButton
                        title="Sacred Hindustani Vocal Lessons in Chronological Order"
                        text="Learn Hindustani classical vocal music from Kharaj ka Riyaz, 10 Thaats, and Alankars to classical Ragas, Bandishes, and sacred kirtan on carnatic.askharekrishna.com!"
                    />
                </div>

                {/* Hero Banner */}
                <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 mb-10 shadow-2xl">
                    <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full min-h-[280px]">
                        <Image
                            src="/hindustani_sangeet.jpg"
                            alt="Hindustani Classical Vocal Lessons"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md self-start mb-3">
                                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span>{ALL_HINDUSTANI_LESSONS.length} Chronological Lessons • {totalVideos} Multi-Tutor Videos</span>
                            </div>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                                Hindustani Classical Vocal Lessons
                            </h1>
                            <p className="text-xs sm:text-base text-amber-100/90 max-w-2xl mt-2 leading-relaxed">
                                Master sacred Hindustani classical singing in strict chronological progression: from Kharaj ka Riyaz and breath control to 10 Bhatkhande Thaats, Meend, Murkis, classical Raga Bandishes, and soulful Braj devotional kirtan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chronological Learning Roadmap Stepper */}
                <div className="p-6 rounded-3xl bg-white dark:bg-background-dark/60 border border-black/5 dark:border-white/10 mb-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">route</span>
                        <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                            Chronological Learning Stages (Step-by-Step Curriculum)
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {HINDUSTANI_STAGES.map((stg) => {
                            const isSelected = selectedStage === stg.id;
                            return (
                                <button
                                    key={stg.id}
                                    onClick={() => setSelectedStage(isSelected ? 'all' : stg.id)}
                                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                        isSelected
                                            ? 'bg-primary/10 border-primary text-slate-950 dark:text-white ring-2 ring-primary/30 shadow-md'
                                            : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-primary/30'
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary text-slate-950">
                                                Stage {stg.stageNumber}
                                            </span>
                                            <span className="material-symbols-outlined text-base text-primary">
                                                {stg.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                                            {stg.name.split(':')[1]?.trim() || stg.name}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                            {stg.badge}
                                        </p>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5 text-[10px] font-bold text-primary">
                                        {stg.lessons.length} Lessons
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="p-6 rounded-3xl bg-white dark:bg-background-dark/60 border border-black/5 dark:border-white/10 mb-8 shadow-sm space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search vocal lessons by raga, sargam notes, riyaz technique, or tutor name..."
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

                {/* Lessons Grid in Chronological Order */}
                {filteredLessons.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white dark:bg-background-dark/40 border border-black/5 dark:border-white/10 my-10">
                        <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Vocal Lessons Found</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Try adjusting your search query or reset your filters.
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
                                        {/* Stage & Level Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary text-slate-950">
                                                Stage {lesson.stageNumber}
                                            </span>
                                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${levelBadgeClass}`}>
                                                {lesson.level}
                                            </span>
                                            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">ondemand_video</span>
                                                {lesson.videos.length} Tutors
                                            </span>
                                        </div>

                                        {/* Title & Subtitle */}
                                        <Link href={`/hindustani/${lesson.id}`} className="block">
                                            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                                                {lesson.title}
                                            </h3>
                                        </Link>
                                        <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                                            {lesson.scaleOrRaag}
                                        </p>

                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                                            {lesson.description}
                                        </p>

                                        {/* Sargam & Focus Preview Box */}
                                        <div className="mt-4 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] space-y-1.5">
                                            <div className="font-mono text-slate-700 dark:text-slate-300 font-semibold truncate">
                                                <span className="text-primary font-bold mr-1.5">Sargam:</span>
                                                {lesson.sargamNotes}
                                            </div>
                                            <div className="text-slate-500 dark:text-slate-400 truncate">
                                                <span className="font-bold mr-1.5 text-amber-600 dark:text-amber-400">Focus:</span>
                                                {lesson.vocalFocus}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
                                        <Link
                                            href={`/hindustani/${lesson.id}`}
                                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-primary text-slate-950 font-extrabold text-xs hover:bg-primary-hover shadow-sm shadow-primary/20 transition-all cursor-pointer"
                                        >
                                            <span>Learn Lesson</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>

                                        <ShareButton
                                            title={`Learn ${lesson.title} - Hindustani Vocal`}
                                            text={`Master ${lesson.title} (${lesson.scaleOrRaag}) in chronological progression with verified classical vocal tutorials on carnatic.askharekrishna.com!`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Recommended YouTube Channels with Full Lesson Series */}
                <div className="mt-14 p-6 sm:p-10 rounded-3xl bg-white dark:bg-background-dark/70 border border-black/5 dark:border-white/10 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-black/5 dark:border-white/5">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">subscriptions</span>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Recommended YouTube Channels with Complete Hindustani Vocal Series
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
                                Explore these verified Indian classical vocal academies and master tutors featuring systematic riyaz workouts, thaat exercises, ragas, and devotional kirtan courses.
                            </p>
                        </div>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 self-start sm:self-auto shrink-0">
                            {RECOMMENDED_HINDUSTANI_CHANNELS.length} Verified Channels
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {RECOMMENDED_HINDUSTANI_CHANNELS.map((ch, idx) => (
                            <div
                                key={idx}
                                className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-red-500/30 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="size-8 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                                                <span className="material-symbols-outlined text-base">smart_display</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-1">
                                                    {ch.channelName}
                                                </h3>
                                                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                                    {ch.handle}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 mb-2">
                                        {ch.subscriberBadge}
                                    </span>

                                    <div className="mb-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-0.5">
                                            Featured Playlist:
                                        </span>
                                        <a
                                            href={ch.seriesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[11px] font-bold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 line-clamp-2"
                                        >
                                            {ch.seriesTitle}
                                        </a>
                                    </div>

                                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-3">
                                        {ch.description}
                                    </p>
                                </div>

                                <div className="pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                        {ch.specialty.split(',')[0]}
                                    </span>
                                    <a
                                        href={ch.channelUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-red-600 dark:text-red-400 hover:underline shrink-0"
                                    >
                                        <span>Visit</span>
                                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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

export default function HindustaniPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading Hindustani Vocal Lessons...</div>}>
            <HindustaniLessonList />
        </Suspense>
    );
}
