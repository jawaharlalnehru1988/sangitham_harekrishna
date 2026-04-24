"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface Kacheri {
    id: number;
    title: string;
    singer: string;
    ragam: string;
    videoUrl: string;
    description: string;
}

const KacheriSection = () => {
    const [kacheris, setKacheris] = useState<Kacheri[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKacheris = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-kacheri/`);
                setKacheris(res.data.results || (Array.isArray(res.data) ? res.data : []));
            } catch (err) {
                console.error('Error fetching kacheris:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchKacheris();
    }, []);

    if (loading) {
        return (
            <section className="px-4 pt-10">
                <div className="h-7 w-48 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="min-w-[280px] h-48 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            </section>
        );
    }

    if (kacheris.length === 0) return null;

    return (
        <section className="px-4 pt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold tracking-tight">Spiritual Concerts (Kacheri)</h3>
                <span className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline">View All</span>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4">
                {kacheris.map((kacheri) => (
                    <a
                        key={kacheri.id}
                        href={kacheri.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-[300px] group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 p-5 transition-all hover:scale-[1.02] active:scale-95 shadow-sm snap-center"
                    >
                        {/* YouTube-like play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 z-20">
                            <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-spiritual-red/10 text-spiritual-red text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-spiritual-red/20">
                                    {kacheri.ragam}
                                </span>
                            </div>
                            <h4 className="font-bold text-base leading-tight tracking-tight mb-1 group-hover:text-primary transition-colors text-slate-900 dark:text-slate-100 line-clamp-2">
                                {kacheri.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-3 text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-sm">person</span>
                                <span className="text-[11px] font-bold uppercase tracking-widest">{kacheri.singer}</span>
                            </div>
                        </div>
                        
                        {/* Background subtle glow */}
                        <div className="absolute -right-4 -bottom-4 size-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default KacheriSection;
