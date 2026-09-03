"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { API_BASE_URL } from '@/lib/constants';

interface RagamAudio {
    id: number;
    songName: string;
    audioPath: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
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
                if (trimmed.startsWith('- ')) {
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

    // Extract composition names from famousCompositions markdown text
    const parsedCompositions: string[] = React.useMemo(() => {
        if (!ragam?.famousCompositions) return [];
        return ragam.famousCompositions
            .split('\n')
            .map((line) => {
                const match = line.match(/\*\*(.*?)\*\*/);
                return match ? match[1].trim() : null;
            })
            .filter((item): item is string => Boolean(item));
    }, [ragam?.famousCompositions]);

    // Parse video metadata (tag, clean title, and matched composition)
    const parsedVideos = React.useMemo(() => {
        if (!ragam?.videos) return [];

        return ragam.videos.map((video) => {
            const rawTitle = video.title || 'Demonstration';
            
            // Extract tag in brackets [Tag]
            const tagMatch = rawTitle.match(/\[(.*?)\]/);
            const tag = tagMatch ? tagMatch[1].trim() : null;
            const titleWithoutTag = tagMatch ? rawTitle.replace(/\[(.*?)\]/, '').trim() : rawTitle;

            // Match with known compositions
            let matchedComposition = 'General Demonstrations';
            for (const comp of parsedCompositions) {
                const compNormalized = comp.toLowerCase().replace(/[^a-z0-9]/g, '');
                const titleNormalized = titleWithoutTag.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (titleNormalized.includes(compNormalized) || compNormalized.includes(titleNormalized.slice(0, 10))) {
                    matchedComposition = comp;
                    break;
                }
            }

            return {
                ...video,
                tag,
                displayTitle: titleWithoutTag,
                matchedComposition,
            };
        });
    }, [ragam?.videos, parsedCompositions]);

    const [selectedComposition, setSelectedComposition] = useState<string>('all');

    // Group videos by composition
    const compositionGroups = React.useMemo(() => {
        const groups: { [compName: string]: typeof parsedVideos } = {};
        
        parsedCompositions.forEach((comp) => {
            groups[comp] = [];
        });

        parsedVideos.forEach((video) => {
            if (!groups[video.matchedComposition]) {
                groups[video.matchedComposition] = [];
            }
            groups[video.matchedComposition].push(video);
        });

        return Object.entries(groups).filter(([_, vList]) => vList.length > 0);
    }, [parsedCompositions, parsedVideos]);

    const filteredVideos = React.useMemo(() => {
        if (selectedComposition === 'all') return parsedVideos;
        return parsedVideos.filter((v) => v.matchedComposition === selectedComposition);
    }, [selectedComposition, parsedVideos]);

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

    const renderVideoCard = (video: typeof parsedVideos[0], index: number) => {
        const videoId = getYouTubeId(video.youtubevideoUrl);
        if (!videoId) return null;

        return (
            <div
                key={video.id || index}
                className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-black/20 p-4 flex flex-col justify-between hover:border-primary/30 transition-all group"
            >
                <div className="mb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500 font-bold text-xs">
                                {index + 1}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                                {video.matchedComposition}
                            </span>
                        </div>
                        {getTagBadge(video.tag)}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {video.displayTitle || `Demonstration ${index + 1}`}
                    </h4>
                </div>

                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 shadow-inner">
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                        title={video.displayTitle || `Video Demonstration ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                </div>
            </div>
        );
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
                            <div className="flex flex-wrap items-center gap-2.5 mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                    {ragam.melakarthaNumber ? `Melakarta #${ragam.melakarthaNumber}` : 'Janya Raga'}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">• Carnatic Sangeetam</span>
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

                    {/* Famous Compositions Card */}
                    {ragam.famousCompositions && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white mb-4">
                                <span className="material-symbols-outlined text-primary text-xl">library_music</span>
                                <h2>Famous Compositions in {ragam.raga_name}</h2>
                            </div>
                            {renderFormattedMarkdown(ragam.famousCompositions)}
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

                    {/* Video Lessons Section */}
                    {parsedVideos.length > 0 && (
                        <div className="bg-white dark:bg-background-dark/60 rounded-3xl border border-black/5 dark:border-white/10 p-6 md:p-8 mb-8 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="material-symbols-outlined text-red-500 text-2xl">smart_display</span>
                                    <div>
                                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                            Video Demonstrations ({parsedVideos.length})
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Vocal concerts, kutcheri renditions, and step-by-step song lessons
                                        </p>
                                    </div>
                                </div>
                                {compositionGroups.length > 1 && (
                                    <div className="text-xs font-bold text-slate-400">
                                        {compositionGroups.length} Compositions
                                    </div>
                                )}
                            </div>

                            {/* Composition Filter Tabs */}
                            {compositionGroups.length > 1 && (
                                <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-black/5 dark:border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedComposition('all')}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                            selectedComposition === 'all'
                                                ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        All Compositions ({parsedVideos.length})
                                    </button>
                                    {compositionGroups.map(([compName, vList]) => (
                                        <button
                                            type="button"
                                            key={compName}
                                            onClick={() => setSelectedComposition(compName)}
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                selectedComposition === compName
                                                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                                            }`}
                                        >
                                            {compName} ({vList.length})
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Grouped or Filtered Display */}
                            {selectedComposition === 'all' ? (
                                <div className="space-y-8">
                                    {compositionGroups.map(([compName, vList]) => (
                                        <div key={compName} className="space-y-4">
                                            <div className="flex items-center gap-2.5 pt-2">
                                                <span className="material-symbols-outlined text-primary text-base">music_note</span>
                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                                    {compName}
                                                </h3>
                                                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                                                    {vList.length} {vList.length === 1 ? 'Demo' : 'Demos'}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                {vList.map((video, idx) => renderVideoCard(video, idx))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {filteredVideos.map((video, idx) => renderVideoCard(video, idx))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Previous / Next Raga Navigation */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/5 dark:border-white/10">
                        {prevRagam ? (
                            <Link
                                href={`/ragams/${prevRagam.id}`}
                                className="group w-full sm:w-auto inline-flex items-center gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/40 transition-all text-left"
                            >
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:-translate-x-1 transition-all">
                                    arrow_back
                                </span>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        Previous Raga
                                    </span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {prevRagam.raga_name}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <div className="hidden sm:block" />
                        )}

                        {nextRagam && (
                            <Link
                                href={`/ragams/${nextRagam.id}`}
                                className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 p-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/40 transition-all text-right ml-auto"
                            >
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                        Next Raga
                                    </span>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {nextRagam.raga_name}
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
