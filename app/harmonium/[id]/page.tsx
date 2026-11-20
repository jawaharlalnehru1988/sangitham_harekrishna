"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShareButton from '@/components/common/ShareButton';
import SequentialYouTubePlayer from '@/components/common/SequentialYouTubePlayer';
import {
    ALL_HARMONIUM_LESSONS,
    getHarmoniumLessonById,
    HarmoniumLesson,
    getRecommendedChannelsForStage,
    RECOMMENDED_HARMONIUM_CHANNELS,
} from '@/lib/harmoniumData';

export default function HarmoniumLessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const lesson = getHarmoniumLessonById(id);

    if (!lesson) {
        notFound();
    }

    const idx = ALL_HARMONIUM_LESSONS.findIndex((l) => l.id === lesson.id);
    const prevLesson = idx > 0 ? ALL_HARMONIUM_LESSONS[idx - 1] : null;
    const nextLesson = idx < ALL_HARMONIUM_LESSONS.length - 1 ? ALL_HARMONIUM_LESSONS[idx + 1] : null;
    const [showAllChannels, setShowAllChannels] = useState(false);

    const levelBadgeClass =
        lesson.level === 'Beginner'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
            : lesson.level === 'Intermediate'
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            <Header />

            <main role="main" className="flex-grow pb-32 px-4 pt-6 max-w-5xl mx-auto w-full">
                {/* Top Nav & Breadcrumbs */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <Link
                        href="/harmonium"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        All Harmonium Lessons (Stage {lesson.stageNumber})
                    </Link>

                    <div className="flex items-center gap-3">
                        <ShareButton
                            title={`${lesson.title} - Harmonium Lesson`}
                            text={`Learn ${lesson.title} (${lesson.scaleOrRaag}) in chronological order with multi-tutor video demonstrations on carnatic.askharekrishna.com!`}
                        />
                    </div>
                </div>

                {/* Lesson Header Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-background-dark/70 border border-black/5 dark:border-white/10 mb-8 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-primary text-slate-950">
                            Stage {lesson.stageNumber}
                        </span>
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${levelBadgeClass}`}>
                            {lesson.level}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {lesson.categoryName}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        {lesson.title}
                    </h1>
                    <p className="text-sm sm:text-base text-amber-600 dark:text-amber-400 font-medium mt-1">
                        {lesson.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                        {lesson.description}
                    </p>

                    {/* Sargam & Finger Progression Box */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                                Sargam Notes / Scale Structure
                            </span>
                            <span className="font-mono text-xs sm:text-sm font-bold text-primary">
                                {lesson.sargamNotes}
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                                Recommended Fingering &amp; Bellows
                            </span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                                {lesson.fingerPattern}
                            </span>
                        </div>
                    </div>

                    {/* Step-by-Step Curriculum Objectives */}
                    {lesson.curriculumObjectives && lesson.curriculumObjectives.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5">
                            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                                Chronological Learning Milestones
                            </h2>
                            <ul className="space-y-2">
                                {lesson.curriculumObjectives.map((pt, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                                        <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Video Tutorials Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-2xl">smart_display</span>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Multi-Tutor Video Demonstrations ({lesson.videos.length})
                            </h2>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Watch in sequence with auto-resume
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lesson.videos.map((vid, idx) => (
                            <div
                                key={vid.id}
                                className="p-5 rounded-3xl bg-white dark:bg-background-dark/70 border border-black/5 dark:border-white/10 shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className="mb-3">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                            Tutor {idx + 1} • {vid.tutor}
                                        </span>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                                            {vid.title}
                                        </h3>
                                    </div>

                                    {/* Responsive YouTube Player with Sequential & Resume Support */}
                                    <div className="rounded-2xl overflow-hidden aspect-video bg-black/90 mb-3 shadow-md">
                                        <SequentialYouTubePlayer
                                            videoId={vid.id}
                                            title={vid.title}
                                            playerKey={`harmonium-${lesson.id}-${vid.id}-${idx}`}
                                            seqIndex={idx}
                                        />
                                    </div>
                                </div>

                                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                                    {vid.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended YouTube Channels with Full Lesson Series */}
                <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-background-dark/70 border border-black/5 dark:border-white/10 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/5 dark:border-white/5">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">subscriptions</span>
                                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    Recommended YouTube Channels &amp; Series
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Discover dedicated YouTube channels offering extensive, step-by-step harmonium lesson playlists, riyaz exercises, and full courses.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowAllChannels((prev) => !prev)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-all self-start sm:self-auto cursor-pointer"
                        >
                            <span>{showAllChannels ? 'Show Stage Specific' : `View All Channels (${RECOMMENDED_HARMONIUM_CHANNELS.length})`}</span>
                            <span className="material-symbols-outlined text-sm">
                                {showAllChannels ? 'filter_alt' : 'expand_more'}
                            </span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(showAllChannels ? RECOMMENDED_HARMONIUM_CHANNELS : getRecommendedChannelsForStage(lesson.stageNumber)).map((ch, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-red-500/30 transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="size-10 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-black text-sm shrink-0 group-hover:scale-105 transition-transform">
                                                <span className="material-symbols-outlined text-xl">smart_display</span>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                                    {ch.channelName}
                                                </h3>
                                                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                                                    {ch.handle}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 shrink-0">
                                            {ch.subscriberBadge}
                                        </span>
                                    </div>

                                    <div className="mt-3 mb-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-0.5">
                                            Featured Lesson Series Playlist:
                                        </span>
                                        <a
                                            href={ch.seriesUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 inline-flex items-center gap-1 group/link"
                                        >
                                            <span className="line-clamp-1">{ch.seriesTitle}</span>
                                            <span className="material-symbols-outlined text-xs shrink-0 opacity-70 group-hover/link:opacity-100">open_in_new</span>
                                        </a>
                                    </div>

                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                        {ch.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                        🎯 {ch.specialty}
                                    </span>
                                    <a
                                        href={ch.channelUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[11px] font-extrabold text-red-600 dark:text-red-400 hover:underline shrink-0"
                                    >
                                        <span>Visit Channel</span>
                                        <span className="material-symbols-outlined text-xs">arrow_outward</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation (Prev / Next in strict Chronological Order) */}
                <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {prevLesson ? (
                        <Link
                            href={`/harmonium/${prevLesson.id}`}
                            className="w-full sm:w-auto inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <span>Previous: {prevLesson.title}</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    <Link
                        href="/harmonium"
                        className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                    >
                        All Harmonium Lessons
                    </Link>

                    {nextLesson ? (
                        <Link
                            href={`/harmonium/${nextLesson.id}`}
                            className="w-full sm:w-auto inline-flex items-center justify-end gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                        >
                            <span>Next: {nextLesson.title}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
