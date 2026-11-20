"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
    created_at: string;
    updated_at: string;
}

interface MridangaVideo {
    id: number;
    title: string;
    youtubevideoUrl: string;
    mantras_and_notes?: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface MridangaKirtanDemo {
    id: number;
    title: string;
    youtubevideoUrl: string;
    mantras_and_notes?: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
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

const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

import SequentialYouTubePlayer from '@/components/common/SequentialYouTubePlayer';

export default function MridangaLessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [lesson, setLesson] = useState<MridangaLesson | null>(null);
    const [prevLesson, setPrevLesson] = useState<MridangaLesson | null>(null);
    const [nextLesson, setNextLesson] = useState<MridangaLesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
    const [activePlayingKey, setActivePlayingKey] = useState<string | null>(null);
    const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

    useEffect(() => {
        const loadLesson = async () => {
            try {
                const resolvedParams = await params;
                const { id } = resolvedParams;

                const res = await axios.get(`${API_BASE_URL}/carnatic-mridanga-lessons/${id}/`);
                setLesson(res.data);

                // Fetch list for previous/next navigation
                const allRes = await axios.get(`${API_BASE_URL}/carnatic-mridanga-lessons/?page_size=100`);
                const rawList: MridangaLesson[] = allRes.data.results || (Array.isArray(allRes.data) ? allRes.data : []);

                const currentIdx = rawList.findIndex((l) => Number(l.id) === Number(id));
                if (currentIdx !== -1) {
                    setPrevLesson(currentIdx > 0 ? rawList[currentIdx - 1] : null);
                    setNextLesson(currentIdx < rawList.length - 1 ? rawList[currentIdx + 1] : null);
                }
            } catch (err) {
                console.error('Error loading mridanga lesson:', err);
            } finally {
                setLoading(false);
            }
        };

        loadLesson();
    }, [params]);

    const handlePlayAudio = (audioId: number) => {
        Object.entries(audioRefs.current).forEach(([key, audioEl]) => {
            if (Number(key) !== audioId && audioEl && !audioEl.paused) {
                audioEl.pause();
            }
        });
        setActiveAudioId(audioId);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center p-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="size-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Mridanga Lesson...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!lesson) {
        return notFound();
    }

    const getLevelBadge = (level: string) => {
        switch (level) {
            case 'beginner':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Beginner Level
                    </span>
                );
            case 'medium':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        Medium Level
                    </span>
                );
            case 'advanced':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        Advanced Level
                    </span>
                );
            default:
                return null;
        }
    };

    const videos = lesson.videos || [];
    const audios = lesson.audios || [];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/mridanga"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mb-6"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to All Mridanga Lessons
                    </Link>

                    {/* Lesson Header Card */}
                    <div className="bg-white dark:bg-background-dark/80 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    {getLevelBadge(lesson.level)}
                                    {lesson.matras && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                                            {lesson.matras} Matras (Beats)
                                        </span>
                                    )}
                                    <span className="text-xs text-slate-400 font-medium">• Gaudiya Percussion</span>
                                </div>
                                <ShareButton
                                    title={lesson.tala_name}
                                    category={lesson.tala_category}
                                    text={lesson.description || `Learn ${lesson.tala_name} with bols, audio, and video tutorials on Carnatic Music Platform.`}
                                    variant="pill"
                                    label="Share Lesson"
                                />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                                {lesson.tala_name}
                            </h1>

                            {lesson.description && (
                                <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                                    {lesson.description}
                                </p>
                            )}
                        </div>

                        {/* Background subtle radial glow */}
                        <div className="absolute -right-16 -top-16 size-64 rounded-full transition-all duration-500 blur-3xl bg-primary/10" />
                    </div>

                    {/* General Mantras & Bols (if provided at Tala level) */}
                    {lesson.mantras_and_notes && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-primary text-xl">music_note</span>
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                        Tala Overview &amp; Notation
                                    </h2>
                                </div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    General Theka
                                </span>
                            </div>

                            <div className="bg-slate-50 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-2xl p-5 overflow-x-auto">
                                <pre className="font-mono text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
                                    {lesson.mantras_and_notes}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Audio Demonstrations */}
                    {audios.length > 0 && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-primary text-xl">audiotrack</span>
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                        Audio Demonstrations ({audios.length})
                                    </h2>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    High Quality Audio
                                </span>
                            </div>

                            <div className="space-y-5">
                                {audios.map((audio, index) => (
                                    <div
                                        key={audio.id}
                                        className={`rounded-2xl border p-5 transition-all duration-300 ${
                                            activeAudioId === audio.id
                                                ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                                                : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-black/20 hover:border-primary/30'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                                    {audio.songName || `Audio Demonstration ${index + 1}`}
                                                </h4>
                                                <span className="text-[11px] text-slate-400">Audio Track</span>
                                            </div>
                                        </div>

                                        <audio
                                            ref={(el) => {
                                                audioRefs.current[audio.id] = el;
                                            }}
                                            controls
                                            className="w-full h-10 rounded-xl mb-3"
                                            onPlay={() => handlePlayAudio(audio.id)}
                                        >
                                            <source src={audio.audioPath} />
                                            Your browser does not support the audio element.
                                        </audio>

                                        {audio.mantras_and_notes && (
                                            <div className="bg-white dark:bg-black/40 rounded-xl p-3 border border-black/5 dark:border-white/5">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                                                    <span className="material-symbols-outlined text-xs">edit_note</span>
                                                    Notes &amp; Bols
                                                </div>
                                                <pre className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                                                    {audio.mantras_and_notes}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tutorial Video Lessons Section */}
                    {videos.length > 0 && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-red-500 text-2xl">school</span>
                                    <div>
                                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                            Step-by-Step Video Tutorials ({videos.length})
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Hand placement, speed variations, and rhythmic phrasing for each tutorial
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
                                    <span className="material-symbols-outlined text-xs">autorenew</span>
                                    Auto-Play Next Video
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {videos.map((video, idx) => {
                                    const videoId = getYouTubeId(video.youtubevideoUrl);
                                    if (!videoId) return null;
                                    const pKey = `mridanga-tutorial-${idx}`;
                                    const isPlaying = activePlayingKey === pKey;

                                    return (
                                        <div
                                            key={video.id || idx}
                                            className={`overflow-hidden rounded-2xl border bg-slate-50 dark:bg-black/20 p-4 flex flex-col justify-between transition-all duration-300 group ${
                                                isPlaying
                                                    ? 'border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30'
                                                    : 'border-black/5 dark:border-white/10 hover:border-primary/30'
                                            }`}
                                        >
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`flex size-6 shrink-0 items-center justify-center rounded-lg font-bold text-xs ${isPlaying ? 'bg-primary text-slate-950' : 'bg-red-500/10 text-red-500'}`}>
                                                            {idx + 1}
                                                        </div>
                                                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                                            Tutorial Lesson
                                                        </span>
                                                    </div>
                                                    {isPlaying && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-slate-950 animate-pulse">
                                                            <span className="material-symbols-outlined text-xs">play_arrow</span>
                                                            Playing
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug mb-3">
                                                    {video.title || `Tutorial Video ${idx + 1}`}
                                                </h4>

                                                <SequentialYouTubePlayer
                                                    videoId={videoId}
                                                    title={video.title || `Video Tutorial ${idx + 1}`}
                                                    playerKey={pKey}
                                                    seqIndex={idx}
                                                    onPlayStateChange={(playing) => {
                                                        if (playing) setActivePlayingKey(pKey);
                                                        else if (activePlayingKey === pKey) setActivePlayingKey(null);
                                                    }}
                                                />

                                                {/* Individual Video Mantras & Notes Box */}
                                                {video.mantras_and_notes && (
                                                    <div className="mt-2 bg-white dark:bg-black/40 rounded-xl p-3 border border-black/5 dark:border-white/5">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                                                            <span className="material-symbols-outlined text-xs">edit_note</span>
                                                            Lesson Mantras &amp; Notes
                                                        </div>
                                                        <pre className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                                                            {video.mantras_and_notes}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}



                    {/* Previous / Next Lesson Navigation */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/5 dark:border-white/10">
                        {prevLesson ? (
                            <Link
                                href={`/mridanga/${prevLesson.id}`}
                                className="group w-full sm:w-auto inline-flex items-center gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/40 transition-all text-left"
                            >
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:-translate-x-1 transition-all">
                                    arrow_back
                                </span>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        Previous Lesson
                                    </span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {prevLesson.tala_name}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <div className="hidden sm:block" />
                        )}

                        {nextLesson && (
                            <Link
                                href={`/mridanga/${nextLesson.id}`}
                                className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/40 transition-all text-right ml-auto"
                            >
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        Next Lesson
                                    </span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {nextLesson.tala_name}
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                    arrow_forward
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
