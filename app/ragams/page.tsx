"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
}

interface RagamVideo {
    id: number;
    youtubevideoUrl: string;
    sort_order: number;
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

export default function AllRagamsPage() {
    const [ragams, setRagams] = useState<RagamLesson[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRagams = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-ragam-lessons/?page_size=100`);
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

    const isJanakaRaga = (raga: RagamLesson) => {
        const desc = (raga.description || '').toLowerCase();
        return desc.includes('janaka raga') || desc.includes('melakarta classification:** ') && !desc.includes('*janya raga*');
    };

    const filteredRagams = ragams.filter((ragam) => {
        // Melakarta filter
        if (filterType === 'Melakarta' && !isJanakaRaga(ragam)) {
            return false;
        }
        if (filterType === 'Janya' && isJanakaRaga(ragam)) {
            return false;
        }

        // Search query filter
        if (searchQuery.trim() === '') return true;
        const q = searchQuery.toLowerCase();
        return (
            ragam.raga_name.toLowerCase().includes(q) ||
            (ragam.swarasthanas && ragam.swarasthanas.toLowerCase().includes(q)) ||
            (ragam.arohanam_avarohanam && ragam.arohanam_avarohanam.toLowerCase().includes(q)) ||
            (ragam.famousCompositions && ragam.famousCompositions.toLowerCase().includes(q)) ||
            (ragam.melakarthaNumber && String(ragam.melakarthaNumber).includes(q))
        );
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <div className="max-w-7xl mx-auto">
                    {/* Top Navigation */}
                    <div className="mb-6">
                        <Link
                            href="/#ragams"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mb-4"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Home
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    Carnatic Raga Lessons
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Comprehensive guide to Ragas, Lakshanas, Arohanam & Avarohanam, Audio Demonstrations & Compositions
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                                <ShareButton
                                    title="Carnatic Raga Lessons Directory"
                                    category="Ragas"
                                    text="Comprehensive guide to Carnatic Ragas, Lakshanas, Arohanam & Avarohanam, and audio/video demonstrations."
                                    variant="pill"
                                    label="Share Ragas"
                                />
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl border border-black/5 dark:border-white/10">
                                    {filteredRagams.length} {filteredRagams.length === 1 ? 'Raga' : 'Ragas'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white dark:bg-background-dark/60 rounded-2xl border border-black/5 dark:border-white/10 p-4 mb-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            {/* Search Input */}
                            <div className="relative w-full sm:w-96">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                    search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search raga, swaras, compositions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                )}
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                                {['All', 'Melakarta', 'Janya'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                                            filterType === type
                                                ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                                : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        {type === 'All' ? 'All Ragas' : `${type} Ragas`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-56 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5"
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredRagams.length === 0 && (
                        <div className="text-center py-16 bg-white dark:bg-background-dark/40 rounded-2xl border border-black/5 dark:border-white/10">
                            <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">
                                music_off
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                                No Ragas Found
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                No raga lessons match your current search query or filter. Try a different search term.
                            </p>
                        </div>
                    )}

                    {/* Ragam Cards Grid */}
                    {!loading && filteredRagams.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRagams.map((ragam) => {
                                const audioCount = ragam.audios?.length || 0;
                                const videoCount = ragam.videos?.length || 0;

                                return (
                                    <Link
                                        key={ragam.id}
                                        href={`/ragams/${ragam.id}`}
                                        className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                                    {ragam.melakarthaNumber
                                                        ? `Mela #${ragam.melakarthaNumber}`
                                                        : 'Janya Raga'}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <ShareButton
                                                        title={ragam.raga_name}
                                                        category={ragam.melakarthaNumber ? `Melakarta #${ragam.melakarthaNumber}` : 'Carnatic Raga'}
                                                        url={`/ragams/${ragam.id}`}
                                                        text={`Explore ${ragam.raga_name} with arohanam-avarohanam, swarasthanas, and video tutorials.`}
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
                                                {ragam.raga_name}
                                            </h2>

                                            {ragam.swarasthanas && (
                                                <div className="mt-3">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                                                        Swarasthanas
                                                    </span>
                                                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
                                                        {ragam.swarasthanas}
                                                    </p>
                                                </div>
                                            )}

                                            {ragam.arohanam_avarohanam && (
                                                <div className="mt-3 bg-slate-50 dark:bg-black/30 p-2.5 rounded-xl border border-black/5 dark:border-white/5 font-mono text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">
                                                    {ragam.arohanam_avarohanam.split('\n')[0]}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-sm text-primary">
                                                    audio_file
                                                </span>
                                                {audioCount} {audioCount === 1 ? 'Audio' : 'Audios'}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-sm text-red-500">
                                                    play_circle
                                                </span>
                                                {videoCount} {videoCount === 1 ? 'Video' : 'Videos'}
                                            </span>
                                        </div>

                                        {/* Background Glow */}
                                        <div className="absolute -right-6 -bottom-6 size-28 rounded-full transition-all duration-500 blur-2xl bg-primary/5 group-hover:bg-primary/15" />
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
