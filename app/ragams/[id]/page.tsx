"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { API_BASE_URL } from '@/lib/constants';
import ShareButton from '@/components/common/ShareButton';

interface RagamAudio {
    id: number;
    songName: string;
    audioPath: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface RagamCompositionVideo {
    id?: number;
    title?: string;
    youtubevideoUrl: string;
    sort_order?: number;
    created_at?: string;
    updated_at?: string;
}

interface RagamFamousComposition {
    id: number;
    title: string;
    composer?: string;
    talam?: string;
    lyrics?: string;
    meaning?: string;
    sort_order: number;
    videos: RagamCompositionVideo[];
    created_at?: string;
    updated_at?: string;
}

interface RagamVideo {
    id: number;
    title?: string;
    youtubevideoUrl: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface RagamLesson {
    id: number;
    raga_name: string;
    swarasthanas: string;
    arohanam_avarohanam: string;
    description: string;
    famousCompositions: string;
    famous_compositions?: RagamFamousComposition[];
    melakarthaNumber?: number | null;
    audios: RagamAudio[];
    videos: RagamVideo[];
    created_at: string;
    updated_at: string;
}

const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to format basic Markdown lines into clean JSX
const renderFormattedMarkdown = (content: string) => {
    if (!content) return null;

    const lines = content.split('\n');
    return (
        <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {lines.map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={idx} className="h-1.5" />;

                if (trimmed.startsWith('### ')) {
                    return (
                        <h3 key={idx} className="text-lg font-bold text-slate-900 dark:text-white pt-2 pb-1 border-b border-black/5 dark:border-white/5">
                            {trimmed.replace('### ', '')}
                        </h3>
                    );
                }
                if (trimmed.startsWith('## ')) {
                    return (
                        <h2 key={idx} className="text-xl font-extrabold text-slate-900 dark:text-white pt-3 pb-1 border-b border-black/5 dark:border-white/5">
                            {trimmed.replace('## ', '')}
                        </h2>
                    );
                }
                if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
                    const itemContent = trimmed.substring(2);
                    return (
                        <div key={idx} className="flex items-start gap-2.5 ml-1">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span
                                className="flex-1"
                                dangerouslySetInnerHTML={{
                                    __html: itemContent
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
                                        .replace(/\*(.*?)\*/g, '<em class="italic text-primary">$1</em>')
                                }}
                            />
                        </div>
                    );
                }

                return (
                    <p
                        key={idx}
                        dangerouslySetInnerHTML={{
                            __html: trimmed
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white font-bold">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="italic text-primary">$1</em>')
                        }}
                    />
                );
            })}
        </div>
    );
};

const getTagBadge = (tag: string | null) => {
    if (!tag) return null;
    const lower = tag.toLowerCase();
    if (lower.includes('concert') || lower.includes('kutcheri') || lower.includes('rendition')) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <span className="material-symbols-outlined text-[12px]">mic</span>
                {tag}
            </span>
        );
    }
    if (lower.includes('lesson') || lower.includes('tutorial') || lower.includes('class')) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="material-symbols-outlined text-[12px]">school</span>
                {tag}
            </span>
        );
    }
    if (lower.includes('notation') || lower.includes('practice') || lower.includes('masterclass')) {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <span className="material-symbols-outlined text-[12px]">menu_book</span>
                {tag}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[12px]">play_circle</span>
            {tag}
        </span>
    );
};

const VideoCard: React.FC<{
    video: { id?: number; title?: string; youtubevideoUrl: string };
    index: number;
    parentTitle?: string;
}> = ({ video, index, parentTitle }) => {
    const videoId = getYouTubeId(video.youtubevideoUrl);
    if (!videoId) return null;

    const rawTitle = video.title || `Demonstration ${index + 1}`;
    const tagMatch = rawTitle.match(/\[(.*?)\]/);
    const tag = tagMatch ? tagMatch[1].trim() : null;
    const cleanTitle = tagMatch ? rawTitle.replace(/\[(.*?)\]/, '').trim() : rawTitle;

    return (
        <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-black/20 p-4 flex flex-col justify-between hover:border-primary/30 transition-all group">
            <div className="mb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500 font-bold text-xs">
                            {index + 1}
                        </div>
                        {parentTitle && (
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                                {parentTitle}
                            </span>
                        )}
                    </div>
                    {getTagBadge(tag)}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {cleanTitle}
                </h4>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 shadow-inner">
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                    title={cleanTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                />
            </div>
        </div>
    );
};

const CompositionCard: React.FC<{
    comp: RagamFamousComposition;
    index: number;
}> = ({ comp, index }) => {
    const hasLyrics = Boolean(comp.lyrics?.trim());
    const hasMeaning = Boolean(comp.meaning?.trim());
    const [activeTab, setActiveTab] = useState<'lyrics' | 'meaning'>(hasLyrics ? 'lyrics' : 'meaning');
    const videos = comp.videos || [];

    return (
        <div className="bg-white dark:bg-background-dark/80 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 shadow-sm transition-all hover:border-primary/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-black/5 dark:border-white/10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center size-6 rounded-lg bg-primary/10 text-primary font-bold text-xs">
                            {index + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Famous Composition #{index + 1}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {comp.title}
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {comp.talam && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <span className="material-symbols-outlined text-[14px]">timer</span>
                            Tala: {comp.talam}
                        </span>
                    )}
                    {comp.composer && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                            <span className="material-symbols-outlined text-[14px]">person</span>
                            Composer: {comp.composer}
                        </span>
                    )}
                    {videos.length > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <span className="material-symbols-outlined text-[14px]">smart_display</span>
                            {videos.length} {videos.length === 1 ? 'Demo' : 'Demos'}
                        </span>
                    )}
                </div>
            </div>

            {/* Sahityam & Meaning Section */}
            {(hasLyrics || hasMeaning) && (
                <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-black/30 border border-black/5 dark:border-white/5 p-5">
                    {/* Switcher tabs */}
                    <div className="flex items-center gap-2 mb-4 border-b border-black/5 dark:border-white/5 pb-3">
                        {hasLyrics && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('lyrics')}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                    activeTab === 'lyrics'
                                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[15px]">lyrics</span>
                                Sahityam (Lyrics)
                            </button>
                        )}
                        {hasMeaning && (
                            <button
                                type="button"
                                onClick={() => setActiveTab('meaning')}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                    activeTab === 'meaning'
                                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[15px]">translate</span>
                                Meaning & Translation
                            </button>
                        )}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'lyrics' && hasLyrics && (
                        <div className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 text-sm md:text-base whitespace-pre-wrap pl-1">
                            {comp.lyrics}
                        </div>
                    )}
                    {activeTab === 'meaning' && hasMeaning && (
                        <div className="leading-relaxed text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap pl-1">
                            {renderFormattedMarkdown(comp.meaning || '')}
                        </div>
                    )}
                </div>
            )}

            {/* Mapped Videos */}
            {videos.length > 0 && (
                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500 text-xl">smart_display</span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                Video Demonstrations ({videos.length})
                            </h4>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Concerts, Kutcheris & Tutorials
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {videos.map((vid, vidIdx) => (
                            <VideoCard
                                key={vid.id || vidIdx}
                                video={vid}
                                index={vidIdx}
                                parentTitle={comp.title}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function RagamDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [ragam, setRagam] = useState<RagamLesson | null>(null);
    const [allRagams, setAllRagams] = useState<RagamLesson[]>([]);
    const [prevRagam, setPrevRagam] = useState<RagamLesson | null>(null);
    const [nextRagam, setNextRagam] = useState<RagamLesson | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeAudioId, setActiveAudioId] = useState<number | null>(null);
    const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});

    useEffect(() => {
        const loadRagam = async () => {
            try {
                const resolvedParams = await params;
                const { id } = resolvedParams;

                // 1. Fetch single ragam
                const res = await axios.get(`${API_BASE_URL}/carnatic-ragam-lessons/${id}/`);
                setRagam(res.data);

                // 2. Fetch all ragams for navigation
                const allRes = await axios.get(`${API_BASE_URL}/carnatic-ragam-lessons/?page_size=100`);
                const rawList: RagamLesson[] = allRes.data.results || (Array.isArray(allRes.data) ? allRes.data : []);
                setAllRagams(rawList);

                const currentIdx = rawList.findIndex((r) => Number(r.id) === Number(id));
                if (currentIdx !== -1) {
                    setPrevRagam(currentIdx > 0 ? rawList[currentIdx - 1] : null);
                    setNextRagam(currentIdx < rawList.length - 1 ? rawList[currentIdx + 1] : null);
                }
            } catch (err) {
                console.error('Error loading ragam details:', err);
            } finally {
                setLoading(false);
            }
        };

        loadRagam();
    }, [params]);

    const handlePlayAudio = (audioId: number) => {
        // Pause all other audios when one is started
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
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Raga Lesson...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!ragam) {
        return notFound();
    }

    const audiosToDisplay = ragam.audios || [];
    const famousComps = ragam.famous_compositions || [];
    const hasStructuredCompositions = famousComps.length > 0;

    // Collect IDs of videos already displayed inside structured famous compositions
    const mappedVideoUrls = new Set(
        famousComps.flatMap((c) => (c.videos || []).map((v) => v.youtubevideoUrl))
    );

    // Remaining general videos (if any) that are not linked to a specific composition
    const generalVideos = (ragam.videos || []).filter(
        (v) => !mappedVideoUrls.has(v.youtubevideoUrl)
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/ragams"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mb-6"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to All Ragas
                    </Link>

                    {/* Raga Header Banner */}
                    <div className="bg-white dark:bg-background-dark/80 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                        {ragam.melakarthaNumber ? `Melakarta #${ragam.melakarthaNumber}` : 'Janya Raga'}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium">• Carnatic Sangeetam</span>
                                </div>
                                <ShareButton
                                    title={ragam.raga_name}
                                    category={ragam.melakarthaNumber ? `Melakarta #${ragam.melakarthaNumber}` : 'Carnatic Raga'}
                                    text={ragam.description || `Explore ${ragam.raga_name} with arohanam-avarohanam, swarasthanas, famous compositions, and video demonstrations.`}
                                    variant="pill"
                                    label="Share Raga"
                                />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                                {ragam.raga_name}
                            </h1>

                            {/* Arohanam / Avarohanam Box */}
                            {ragam.arohanam_avarohanam && (
                                <div className="mt-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-4 md:p-5">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
                                        <span className="material-symbols-outlined text-base">music_note</span>
                                        Scale (Arohanam & Avarohanam)
                                    </div>
                                    <pre className="font-mono text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
                                        {ragam.arohanam_avarohanam}
                                    </pre>
                                </div>
                            )}

                            {/* Swarasthanas Box */}
                            {ragam.swarasthanas && (
                                <div className="mt-4 bg-slate-50 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-2xl p-4 md:p-5">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
                                        <span className="material-symbols-outlined text-base">tune</span>
                                        Swarasthanas
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {ragam.swarasthanas}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Background subtle radial gradient */}
                        <div className="absolute -right-16 -top-16 size-64 rounded-full transition-all duration-500 blur-3xl bg-primary/10" />
                    </div>

                    {/* Raga Lakshana & Description Card */}
                    {ragam.description && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white mb-4">
                                <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                                <h2>Raga Lakshanam & Characteristics</h2>
                            </div>
                            {renderFormattedMarkdown(ragam.description)}
                        </div>
                    )}

                    {/* Audio Demonstrations Section */}
                    {audiosToDisplay.length > 0 && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-primary text-xl">audiotrack</span>
                                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                        Audio Demonstrations ({audiosToDisplay.length})
                                    </h2>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    High Quality Audio
                                </span>
                            </div>

                            <div className="space-y-4">
                                {audiosToDisplay.map((audio, index) => (
                                    <div
                                        key={audio.id}
                                        className={`rounded-2xl border p-4 transition-all duration-300 ${
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
                                            className="w-full h-10 rounded-xl"
                                            onPlay={() => handlePlayAudio(audio.id)}
                                        >
                                            <source src={audio.audioPath} />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Structured Famous Compositions Section */}
                    {hasStructuredCompositions ? (
                        <div className="space-y-8 mb-8">
                            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-primary text-2xl">library_music</span>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                                            Famous Compositions in {ragam.raga_name} ({famousComps.length})
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Master compositions with Sahityam, Meaning, and Video Demonstrations
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {famousComps.map((comp, idx) => (
                                <CompositionCard
                                    key={comp.id || idx}
                                    comp={comp}
                                    index={idx}
                                />
                            ))}
                        </div>
                    ) : ragam.famousCompositions ? (
                        /* Fallback to legacy markdown text if structured records are not yet present */
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white mb-4">
                                <span className="material-symbols-outlined text-primary text-xl">library_music</span>
                                <h2>Famous Compositions in {ragam.raga_name}</h2>
                            </div>
                            {renderFormattedMarkdown(ragam.famousCompositions)}
                        </div>
                    ) : null}

                    {/* General / Additional Video Demonstrations (if any unmapped remain) */}
                    {generalVideos.length > 0 && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-red-500 text-2xl">smart_display</span>
                                    <div>
                                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                            Additional Video Lessons & Alapanas ({generalVideos.length})
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Raga Lakshana classes, Alapanas, and foundational tutorials
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {generalVideos.map((video, idx) => (
                                    <VideoCard
                                        key={video.id || idx}
                                        video={video}
                                        index={idx}
                                        parentTitle={ragam.raga_name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Previous / Next Raga Navigation */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/5 dark:border-white/10">
                        {prevRagam ? (
                            <Link
                                href={`/ragams/${prevRagam.id}`}
                                className="flex items-center gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/60 hover:border-primary/40 transition-all w-full sm:w-1/2 group"
                            >
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                                    arrow_back
                                </span>
                                <div className="text-left min-w-0">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        Previous Raga
                                    </div>
                                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                                        {prevRagam.raga_name}
                                    </div>
                                </div>
                            </Link>
                        ) : <div className="w-full sm:w-1/2" />}

                        {nextRagam ? (
                            <Link
                                href={`/ragams/${nextRagam.id}`}
                                className="flex items-center justify-end text-right gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/60 hover:border-primary/40 transition-all w-full sm:w-1/2 group"
                            >
                                <div className="text-right min-w-0">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        Next Raga
                                    </div>
                                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                                        {nextRagam.raga_name}
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                                    arrow_forward
                                </span>
                            </Link>
                        ) : <div className="w-full sm:w-1/2" />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
