"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';
import ShareButton from '@/components/common/ShareButton';

interface TalaCategoryInfo {
    id: string;
    name: string;
    bengaliName: string;
    matras: string;
    description: string;
    icon: string;
    badgeColor: string;
}

const TALA_CATEGORIES: TalaCategoryInfo[] = [
    {
        id: 'daspahira',
        name: 'Daspahira Tala',
        bengaliName: 'দাসপাহিরা তাল (Prabhupada Beat)',
        matras: '8, 16 & 32 Beats',
        description: 'The foundational heartbeat of Gaudiya kirtan, played during Mangala Arati, Tulsi Arati, Guru Vandana, and fast accelerando chanting.',
        icon: 'graphic_eq',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
        id: 'kaharba',
        name: 'Kaharba Tala',
        bengaliName: 'কাহারবা তাল',
        matras: '4 & 8 Beats',
        description: 'Versatile 8-matra rhythmic cycle widely utilized for medium and fast bhajan grooves, devotional melodies, and kirtan accompaniment.',
        icon: 'music_cast',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    },
    {
        id: 'dadra',
        name: 'Dadra Tala',
        bengaliName: 'দাদরা তাল',
        matras: '6 Beats (3+3)',
        description: 'Light classical syncopated 6-beat cycle commonly heard in sweet Bengali padavali kirtans, prayers, and melodious bhajans.',
        icon: 'music_note',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
        id: 'lofa',
        name: 'Lofa Tala',
        bengaliName: 'লোফা তাল',
        matras: '6 & 12 Beats',
        description: 'Traditional Gaudiya rhythm cycle spanning 6 and 12-beat variations, dedicated to meditative japa, soft kirtans, and devotional padavali songs.',
        icon: 'waves',
        badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    },
    {
        id: 'rupak',
        name: 'Rupak Tala',
        bengaliName: 'রূপক তাল',
        matras: '7 Beats (3+2+2)',
        description: 'Asymmetrical 7-beat rhythm commencing on Khali, featuring sophisticated syncopations for classical and dramatic kirtan phrasing.',
        icon: 'equalizer',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    },
    {
        id: 'jhap',
        name: 'Jhap Tala',
        bengaliName: 'ঝাঁপ তাল',
        matras: '10 Beats (2+3+2+3)',
        description: 'Majestic 10-beat classical rhythmic cycle used in classical dhrupad-style compositions and ancient Vaishnava verses.',
        icon: 'timeline',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    },
    {
        id: 'teen',
        name: 'Teen Tala',
        bengaliName: 'তিন তাল / ত্রিতাল',
        matras: '16 Beats (4+4+4+4)',
        description: 'The king of rhythmic cycles with 16 beats, 3 claps and 1 wave, foundational for virtuosic solo repertoire and grand tihais.',
        icon: 'album',
        badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    },
    {
        id: 'matan',
        name: 'Matan Tala',
        bengaliName: 'মাতান তাল (Fast Dancing Beat)',
        matras: 'Fast Climax Beats (1, 4, 8, 16 Matras)',
        description: 'The ecstatic, high-energy climax rhythm of ISKCON kirtans and street Harinam, played when chanting accelerates into joyful jumping and dancing.',
        icon: 'bolt',
        badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    },
    {
        id: 'rela',
        name: 'Rela Beat',
        bengaliName: 'রেলা বাজনা (Cascading Rolling Strokes)',
        matras: 'Flowing Rolling Cycles (8, 16 & 32 Beats)',
        description: 'Continuous, cascading double-stroke rolling compositions played at high velocity, showcasing exquisite wrist fluidity and sliding duggi resonance.',
        icon: 'speed',
        badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    },
    {
        id: 'duggi',
        name: 'Duggi Style',
        bengaliName: 'ডুগি স্টাইল (Sliding Bass Modulation)',
        matras: 'Bayan Glissandos & Bends (4, 8, 16 & 32 Beats)',
        description: 'The signature deep, vocal-like bending and palm sliding glissandos on the Bayan (bass head) that bring soulful depth and resonance to Gaudiya kirtans.',
        icon: 'surround_sound',
        badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    },
    {
        id: 'udaan',
        name: 'Udaan (Pickup Beats)',
        bengaliName: 'উড়ান বাজনা (Pickup & Lead-in Beats)',
        matras: 'Pickup Phrases & Transitions (4, 8, 16 & 32 Beats)',
        description: 'Dynamic pickup phrases and rhythmic takeoffs (উড়ান) used by mridanga players to initiate talas, catch the singer’s melody on the Samam, and seamlessly shift tempos during ecstatic kirtan.',
        icon: 'flight_takeoff',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
];

interface MridangaLessonCount {
    tala_category?: string;
}

const MridangaSection = () => {
    const [lessonCounts, setLessonCounts] = useState<{ [category: string]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-mridanga-lessons/?page_size=100`);
                const data: MridangaLessonCount[] = res.data.results || (Array.isArray(res.data) ? res.data : []);
                
                const counts: { [category: string]: number } = {};
                data.forEach((l) => {
                    const cat = (l.tala_category || 'daspahira').toLowerCase();
                    counts[cat] = (counts[cat] || 0) + 1;
                });
                setLessonCounts(counts);
            } catch (err) {
                console.error('Error fetching mridanga lesson counts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    return (
        <section id="mridanga" className="px-4 pt-10 scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                            Percussion
                        </span>
                        <span className="text-xs text-slate-400 font-medium">• Gaudiya Mridanga</span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
                        Mridanga Tala Categories
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Explore classical and traditional rhythmic cycles in Gaudiya Vaishnava kirtan
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/mridanga"
                        className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline"
                    >
                        View All Lessons
                    </Link>
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">
                        graphic_eq
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TALA_CATEGORIES.map((cat) => {
                    const count = lessonCounts[cat.id] || (cat.id === 'daspahira' ? 3 : 0);

                    return (
                        <Link
                            key={cat.id}
                            href={`/mridanga?category=${cat.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cat.badgeColor}`}>
                                            {cat.matras}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShareButton
                                            title={`${cat.name} - Mridanga Lessons`}
                                            category={cat.name}
                                            url={`/mridanga?category=${cat.id}`}
                                            text={cat.description}
                                            variant="icon"
                                        />
                                        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 mb-1.5">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        {cat.icon}
                                    </span>
                                    <h4 className="font-extrabold text-lg leading-snug tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h4>
                                </div>

                                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 block mb-3">
                                    {cat.bengaliName}
                                </span>

                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                    {cat.description}
                                </p>
                            </div>

                            <div className="relative z-10 mt-5 pt-3.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs text-primary">school</span>
                                    {count > 0 ? `${count} ${count === 1 ? 'Lesson Available' : 'Lessons Available'}` : 'Lessons Coming Soon'}
                                </span>
                                <span className="text-primary font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                                    Explore <span className="material-symbols-outlined text-xs">chevron_right</span>
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

export default MridangaSection;
