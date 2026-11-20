"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound, useParams } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface PracticeAudio {
    id: number;
    audioPathName: string;
    audioPath: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface PracticeVideo {
    id: number;
    youtubevideoUrl: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
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

const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

import SequentialYouTubePlayer from '@/components/common/SequentialYouTubePlayer';
import ShareButton from '@/components/common/ShareButton';

export default function PracticeLessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const routeParams = useParams();
    const id = (routeParams?.id as string) || '';

    // Cache-first initialization to prevent reload wipe / skeleton flash on mobile tab resume
    const [lesson, setLesson] = useState<PracticeLesson | null>(() => {
        if (typeof window === 'undefined' || !id) return null;
        try {
            const cached = sessionStorage.getItem(`cached_practice_lesson_${id}`);
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return null;
    });

    const [allLessons, setAllLessons] = useState<PracticeLesson[]>(() => {
        if (typeof window === 'undefined' || !id) return [];
        try {
            const cached = sessionStorage.getItem(`cached_practice_all_${id}`);
            if (cached) return JSON.parse(cached);
        } catch (e) {}
        return [];
    });

    const [loading, setLoading] = useState<boolean>(() => {
        if (typeof window === 'undefined' || !id) return true;
        try {
            return !sessionStorage.getItem(`cached_practice_lesson_${id}`);
        } catch (e) {
            return true;
        }
    });

    const [prevLesson, setPrevLesson] = useState<PracticeLesson | null>(null);
    const [nextLesson, setNextLesson] = useState<PracticeLesson | null>(null);
    const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
    const [activePlayingKey, setActivePlayingKey] = useState<string | null>(null);
    const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

    // Restore scroll position
    useEffect(() => {
        if (!id || typeof window === 'undefined') return;
        const scrollKey = `practice_scroll_${id}`;
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                try {
                    sessionStorage.setItem(scrollKey, window.scrollY.toString());
                } catch (e) {}
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        try {
            const savedScroll = sessionStorage.getItem(scrollKey);
            if (savedScroll) {
                setTimeout(() => {
                    window.scrollTo({ top: parseFloat(savedScroll), behavior: 'instant' });
                }, 100);
            }
        } catch (e) {}

        return () => {
            clearTimeout(scrollTimeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [id]);

    useEffect(() => {
        let isCurrent = true;

        const loadLesson = async () => {
            try {
                const effectiveId = id || (await params).id;
                if (!effectiveId) return;

                // 1. Fetch single lesson
                const res = await axios.get(`${API_BASE_URL}/carnatic-lesson-practice/${effectiveId}/`);
                const currentLesson: PracticeLesson = res.data;
                if (!isCurrent) return;

                setLesson(currentLesson);
                try {
                    sessionStorage.setItem(`cached_practice_lesson_${effectiveId}`, JSON.stringify(currentLesson));
                } catch (e) {}

                // 2. Fetch lessons and filter strictly within the SAME category for sequential navigation
                const allRes = await axios.get(`${API_BASE_URL}/carnatic-lesson-practice/`);
                const rawList: PracticeLesson[] = allRes.data.results || (Array.isArray(allRes.data) ? allRes.data : []);
                
                const sameCategoryLessons = rawList
                    .filter(l => (l.PracticeCategory || '').trim() === (currentLesson.PracticeCategory || '').trim())
                    .sort((a, b) => {
                        const orderA = a.orderNumber !== undefined ? Number(a.orderNumber) : Number(a.id);
                        const orderB = b.orderNumber !== undefined ? Number(b.orderNumber) : Number(b.id);
                        return orderA - orderB;
                    });

                if (!isCurrent) return;
                setAllLessons(sameCategoryLessons);
                try {
                    sessionStorage.setItem(`cached_practice_all_${effectiveId}`, JSON.stringify(sameCategoryLessons));
                } catch (e) {}

                const currentIdx = sameCategoryLessons.findIndex(l => Number(l.id) === Number(effectiveId));
                if (currentIdx !== -1) {
                    setPrevLesson(currentIdx > 0 ? sameCategoryLessons[currentIdx - 1] : null);
                    setNextLesson(currentIdx < sameCategoryLessons.length - 1 ? sameCategoryLessons[currentIdx + 1] : null);
                }
            } catch (err) {
                console.error('Error loading practice lesson:', err);
            } finally {
                if (isCurrent) setLoading(false);
            }
        };

        loadLesson();

        return () => {
            isCurrent = false;
        };
    }, [id]);

    const handleAudioPlay = (audioId: number) => {
        Object.entries(audioRefs.current).forEach(([key, audioEl]) => {
            if (Number(key) !== audioId && audioEl) {
                audioEl.pause();
            }
        });
        setActiveAudioId(audioId);
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="max-w-4xl mx-auto px-4 pt-16">
                    <div className="h-4 w-32 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                    <div className="h-44 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse mb-8" />
                    <div className="space-y-4">
                        <div className="h-20 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
                        <div className="h-20 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!lesson) {
        return notFound();
    }

    // Fallback: If audios array is empty but legacy audioPath exists, display it as 1 audio
    const audiosToDisplay = (lesson.audios && lesson.audios.length > 0)
        ? lesson.audios
        : (lesson.audioPath ? [{
            id: 0,
            audioPathName: lesson.lessonName,
            audioPath: lesson.audioPath,
            sort_order: 0,
            created_at: lesson.created_at,
            updated_at: lesson.updated_at
        }] : []);

    const videosToDisplay = lesson.videos || [];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link to Category Practice List */}
                    <Link
                        href={`/practice?category=${encodeURIComponent(lesson.PracticeCategory || '')}`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mb-6"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to {lesson.PracticeCategory || 'Practice Series'}
                    </Link>

                    {/* Lesson Banner Card */}
                    <header className="mb-8 p-6 sm:p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative overflow-hidden shadow-sm dark:shadow-none">
                        <div className="absolute -right-8 -top-8 size-40 rounded-full blur-3xl opacity-50 bg-primary/20" />

                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white bg-primary inline-block">
                                        {lesson.PracticeCategory}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        {audiosToDisplay.length} Audio Part{audiosToDisplay.length === 1 ? '' : 's'}
                                        {videosToDisplay.length > 0 && ` • ${videosToDisplay.length} Video${videosToDisplay.length === 1 ? '' : 's'}`}
                                    </span>
                                </div>
                                <ShareButton
                                    title={lesson.lessonName}
                                    category={lesson.PracticeCategory}
                                    text={`Practice ${lesson.lessonName} with interactive audio tracks, swaram notation, and video tutorials.`}
                                    variant="pill"
                                    label="Share Lesson"
                                />
                            </div>

                            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {lesson.lessonName}
                            </h1>

                            {lesson.swarams ? (
                                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-black/30 border border-primary/20 backdrop-blur-sm">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">music_note</span>
                                        Swarams
                                    </div>
                                    <pre className="font-mono text-xs sm:text-sm md:text-base text-slate-800 dark:text-amber-100 font-semibold whitespace-pre-wrap leading-relaxed tracking-wider overflow-x-auto">
                                        {lesson.swarams}
                                    </pre>
                                </div>
                            ) : null}
                        </div>
                    </header>

                    {/* Audio Parts Section */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
                                Audio Practice Tracks
                            </h2>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {audiosToDisplay.length} Available
                            </span>
                        </div>

                        {audiosToDisplay.length > 0 ? (
                            <div className="space-y-4">
                                {audiosToDisplay.map((audio, index) => {
                                    const isActive = activeAudioId === audio.id;
                                    return (
                                        <div
                                            key={audio.id || index}
                                            className={`p-5 rounded-2xl border transition-all duration-300 ${
                                                isActive
                                                    ? 'border-primary shadow-lg shadow-primary/10 bg-primary/5'
                                                    : 'border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/30'
                                            }`}
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`size-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-sm ${isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                                                        #{index + 1}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                                                            Audio Track {index + 1}
                                                        </span>
                                                        <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                                                            {audio.audioPathName || `${lesson.lessonName} - Track ${index + 1}`}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="w-full sm:w-80">
                                                    <audio
                                                        ref={(el) => {
                                                            audioRefs.current[audio.id] = el;
                                                        }}
                                                        controls
                                                        preload="none"
                                                        onPlay={() => handleAudioPlay(audio.id)}
                                                        className="w-full h-10 accent-primary"
                                                        src={audio.audioPath}
                                                    >
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 text-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-2 text-slate-300 dark:text-slate-600">music_off</span>
                                <p className="text-sm font-medium">No audio files uploaded for this lesson yet.</p>
                            </div>
                        )}
                    </section>

                    {/* YouTube Video Demonstrations Section */}
                    {videosToDisplay.length > 0 && (
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-red-500 text-2xl">smart_display</span>
                                    Video Demonstrations ({videosToDisplay.length})
                                </h2>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    <span className="material-symbols-outlined text-xs">autorenew</span>
                                    Auto-Play Next
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {videosToDisplay.map((video, idx) => {
                                    const ytid = getYouTubeId(video.youtubevideoUrl);
                                    if (!ytid) {
                                        return (
                                            <div key={video.id || idx} className="p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40">
                                                <a
                                                    href={video.youtubevideoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline text-sm font-semibold flex items-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-red-500">play_circle</span>
                                                    Watch Video Demonstration #{idx + 1} on YouTube
                                                </a>
                                            </div>
                                        );
                                    }

                                    const pKey = `practice-lesson-${idx}`;
                                    const isPlaying = activePlayingKey === pKey;

                                    return (
                                        <div 
                                            key={video.id || idx} 
                                            className={`overflow-hidden rounded-3xl border shadow-lg bg-black transition-all duration-300 ${
                                                isPlaying 
                                                    ? 'border-primary ring-2 ring-primary/40 shadow-primary/20' 
                                                    : 'border-black/5 dark:border-white/10'
                                            }`}
                                        >
                                            <SequentialYouTubePlayer
                                                videoId={ytid}
                                                title={`Video Demonstration ${idx + 1}`}
                                                playerKey={pKey}
                                                seqIndex={idx}
                                                onPlayStateChange={(playing) => {
                                                    if (playing) setActivePlayingKey(pKey);
                                                    else if (activePlayingKey === pKey) setActivePlayingKey(null);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Previous / Next Lesson Navigation */}
                    <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {prevLesson ? (
                                <Link
                                    href={`/practice/${prevLesson.id}`}
                                    className="w-full sm:w-auto flex items-center gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/40 transition-all text-left group"
                                >
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                                        arrow_back
                                    </span>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                                            Previous Lesson
                                        </span>
                                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                            {prevLesson.lessonName}
                                        </span>
                                    </div>
                                </Link>
                            ) : (
                                <div className="hidden sm:block" />
                            )}

                            {nextLesson ? (
                                <Link
                                    href={`/practice/${nextLesson.id}`}
                                    className="w-full sm:w-auto flex items-center justify-end gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/40 transition-all text-right group ml-auto"
                                >
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                                            Next Lesson
                                        </span>
                                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                            {nextLesson.lessonName}
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                                        arrow_forward
                                    </span>
                                </Link>
                            ) : (
                                <div className="hidden sm:block" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
