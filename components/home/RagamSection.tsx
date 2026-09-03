"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

export interface RagamAudio {
    id: number;
    songName: string;
    audioPath: string;
    sort_order: number;
}

export interface RagamVideo {
    id: number;
    youtubevideoUrl: string;
    sort_order: number;
}

export interface RagamLesson {
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

const RagamSection = () => {
    const [ragams, setRagams] = useState<RagamLesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRagams = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-ragam-lessons/`);
                const data = res.data.results || (Array.isArray(res.data) ? res.data : []);
                setRagams(data);
            } catch (err) {
                console.error('Error fetching ragam lessons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRagams();
    }, []);

    if (loading) {
        return (
            <section className="px-4 pt-10">
                <div className="h-7 w-64 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-32 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            </section>
        );
    }

    if (ragams.length === 0) return null;

    // Display up to 6 ragams on the home page
    const displayedRagams = ragams.slice(0, 6);

    return (
        <section id="ragams" className="px-4 pt-10 scroll-mt-20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-extrabold tracking-tight">Raga Lessons</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium uppercase tracking-wider">
                        Explore classical scales, Lakshanas & Compositions
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/ragams"
                        className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline"
                    >
                        View All
                    </Link>
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">
                        queue_music
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedRagams.map((ragam) => {
                    const audioCount = ragam.audios?.length || 0;
                    const videoCount = ragam.videos?.length || 0;

                    return (
                        <Link
                            key={ragam.id}
                            href={`/ragams/${ragam.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                        {ragam.melakarthaNumber ? `Mela #${ragam.melakarthaNumber}` : 'Janya Raga'}
                                    </span>
                                    <div className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </div>
                                </div>

                                <h4 className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    {ragam.raga_name}
                                </h4>

                                {ragam.swarasthanas && (
                                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">Swarasthanas:</span>{' '}
                                        {ragam.swarasthanas}
                                    </p>
                                )}
                            </div>

                            <div className="relative z-10 mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs text-primary">audio_file</span>
                                    {audioCount} {audioCount === 1 ? 'Audio' : 'Audios'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs text-red-500">play_circle</span>
                                    {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                </span>
                            </div>

                            {/* Background glow */}
                            <div className="absolute -right-4 -bottom-4 size-24 rounded-full transition-all duration-500 blur-2xl bg-primary/5 group-hover:bg-primary/15" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default RagamSection;
