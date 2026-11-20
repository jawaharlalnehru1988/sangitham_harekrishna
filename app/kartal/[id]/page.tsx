"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ShareButton from '@/components/common/ShareButton';
import SequentialYouTubePlayer from '@/components/common/SequentialYouTubePlayer';
import { ALL_KARTAL_LESSONS, getKartalLessonById, KartalLesson } from '@/lib/kartalData';

export default function KartalLessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [lesson, setLesson] = useState<KartalLesson | null>(null);
    const [prevLesson, setPrevLesson] = useState<KartalLesson | null>(null);
    const [nextLesson, setNextLesson] = useState<KartalLesson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const resolved = await params;
            const item = getKartalLessonById(resolved.id);
            if (!item) {
                setLoading(false);
                return;
            }
            setLesson(item);

            const idx = ALL_KARTAL_LESSONS.findIndex((l) => l.id === item.id);
            if (idx !== -1) {
                setPrevLesson(idx > 0 ? ALL_KARTAL_LESSONS[idx - 1] : null);
                setNextLesson(idx < ALL_KARTAL_LESSONS.length - 1 ? ALL_KARTAL_LESSONS[idx + 1] : null);
            }
            setLoading(false);
        };
        load();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-primary">
                Loading Kartal Lesson...
            </div>
        );
    }

    if (!lesson) {
        notFound();
    }

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
                        href="/kartal"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        All Kartal Lessons
                    </Link>

                    <div className="flex items-center gap-3">
                        <ShareButton
                            title={`${lesson.title} - Kartal Lesson`}
                            text={`Learn ${lesson.title} (${lesson.taal}) with authentic multi-tutor video demonstrations on carnatic.askharekrishna.com!`}
                        />
                    </div>
                </div>

                {/* Lesson Header Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-background-dark/70 border border-black/5 dark:border-white/10 mb-8 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${levelBadgeClass}`}>
                            {lesson.level}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {lesson.taal}
                        </span>
                        {lesson.matras > 0 && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                                {lesson.matras} Matras (Beats)
                            </span>
                        )}
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

                    {/* Beat Structure Highlights */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                                Rhythmic Pattern / Bols
                            </span>
                            <span className="font-mono text-xs sm:text-sm font-bold text-primary">
                                {lesson.bols}
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                                Tala Subdivision &amp; Phrasing
                            </span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                                {lesson.rhythmStructure}
                            </span>
                        </div>
                    </div>

                    {/* Key Technical Points */}
                    {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-black/5 dark:border-white/5">
                            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                                Essential Techniques &amp; Tips
                            </h2>
                            <ul className="space-y-2">
                                {lesson.keyPoints.map((pt, i) => (
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
                                            playerKey={`kartal-${lesson.id}-${vid.id}-${idx}`}
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

                {/* Bottom Navigation (Prev / Next) */}
                <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {prevLesson ? (
                        <Link
                            href={`/kartal/${prevLesson.id}`}
                            className="w-full sm:w-auto inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            <span>Previous: {prevLesson.title}</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    <Link
                        href="/kartal"
                        className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                    >
                        All Lessons
                    </Link>

                    {nextLesson ? (
                        <Link
                            href={`/kartal/${nextLesson.id}`}
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
