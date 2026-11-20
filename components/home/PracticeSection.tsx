"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';
import ShareButton from '@/components/common/ShareButton';

interface PracticeAudio {
    id: number;
    audioPathName: string;
    audioPath: string;
    sort_order: number;
}

interface PracticeVideo {
    id: number;
    youtubevideoUrl: string;
    sort_order: number;
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

interface PracticeCategoryGroup {
    name: string;
    practiceCount: number;
    audioCount: number;
    videoCount: number;
    firstLessonId?: number;
    description: string;
    icon: string;
}

const getCategoryMeta = (catName: string): { icon: string; description: string } => {
    const lower = (catName || '').toLowerCase();
    if (lower.includes('sarali') || lower.includes('swaravali')) {
        return {
            icon: 'graphic_eq',
            description: 'Foundational step-by-step swara sequences in three speeds for pitch stability',
        };
    }
    if (lower.includes('jantai')) {
        return {
            icon: 'queue_music',
            description: 'Double-note phrasing exercises for building vocal power and syllable clarity',
        };
    }
    if (lower.includes('dhattu') || lower.includes('thattu')) {
        return {
            icon: 'swap_vert',
            description: 'Zig-zag swara skipping patterns for agile finger movement and vocal flexibility',
        };
    }
    if (lower.includes('upper') || lower.includes('mel sthayi')) {
        return {
            icon: 'arrow_upward',
            description: 'High octave reach and upper register vocal flexibility exercises',
        };
    }
    if (lower.includes('lower') || lower.includes('keel sthayi') || lower.includes('keezh')) {
        return {
            icon: 'arrow_downward',
            description: 'Mandra sthayi depth and lower register tone stabilization practice',
        };
    }
    if (lower.includes('alankaram') || lower.includes('tala')) {
        return {
            icon: 'timer',
            description: 'Mastering the 7 primary rhythmic tala cycles with swara progressions',
        };
    }
    if (lower.includes('geetham') || lower.includes('githam')) {
        return {
            icon: 'library_music',
            description: 'Simple melodic compositions combining swara and sahitya in praise of the Divine',
        };
    }
    if (lower.includes('swarajati') || lower.includes('swarajathi')) {
        return {
            icon: 'queue_music',
            description: 'Melodic compositions combining swaram and sahityam that bridge the gap between geethams and varnams',
        };
    }
    if (lower.includes('jatiswaram') || lower.includes('jathiswaram')) {
        return {
            icon: 'music_note',
            description: 'Melodic swara compositions set to intricate rhythmic jatis without sahityam, developing swarasthana precision and laya control before varnams',
        };
    }
    if (lower.includes('varnam')) {
        return {
            icon: 'stars',
            description: 'Master pedagogical compositions encompassing raga swarupa, intricate gamakas, and speed transitions in Adi and Ata talams',
        };
    }
    if (lower.includes('kriti') || lower.includes('krithi')) {
        return {
            icon: 'library_music',
            description: 'Major devotional compositions embodying raga bhava, sahitya aesthetics, sangathis, and chittaswarams composed by the Carnatic Trinity',
        };
    }
    if (lower.includes('kirtan') || lower.includes('keerthan')) {
        return {
            icon: 'temple_hindu',
            description: 'Soul-stirring devotional compositions steeped in divine bhakti, nama mahima, and bhava composed by revered saint-singers',
        };
    }
    return {
        icon: 'library_music',
        description: 'Structured melodic and rhythmic listening practice exercises',
    };
};

const PracticeSection = () => {
    const [categories, setCategories] = useState<PracticeCategoryGroup[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-lesson-practice/`);
                let data = res.data.results || (Array.isArray(res.data) ? res.data : []);
                
                // Group lessons by PracticeCategory
                const catMap = new Map<string, PracticeCategoryGroup>();
                const catOrder: string[] = [];

                data.forEach((lesson: PracticeLesson) => {
                    const catName = (lesson.PracticeCategory || 'General Practice').trim();
                    if (!catMap.has(catName)) {
                        const meta = getCategoryMeta(catName);
                        catMap.set(catName, {
                            name: catName,
                            practiceCount: 0,
                            audioCount: 0,
                            videoCount: 0,
                            firstLessonId: lesson.id,
                            description: meta.description,
                            icon: meta.icon,
                        });
                        catOrder.push(catName);
                    }

                    const group = catMap.get(catName)!;
                    group.practiceCount += 1;
                    group.audioCount += lesson.audios?.length || (lesson.audioPath ? 1 : 0);
                    group.videoCount += lesson.videos?.length || 0;
                });

                const groupList = catOrder.map(name => catMap.get(name)!);
                setCategories(groupList);
            } catch (err) {
                console.error('Error fetching practice categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    if (loading) {
        return (
            <section className="px-4 pt-10">
                <div className="h-7 w-64 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-44 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            </section>
        );
    }

    if (categories.length === 0) return null;

    return (
        <section id="practice" className="px-4 pt-10 scroll-mt-20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Listening Focused Practice
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium uppercase tracking-wider">
                        Perfect your pitch and rhythm across all fundamental series
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/practice" className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline">
                        View All
                    </Link>
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">headphones</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((category) => {
                    return (
                        <Link
                            key={category.name}
                            href={`/practice?category=${encodeURIComponent(category.name)}`}
                            className="group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer"
                        >
                            <div className="relative z-10">
                                {/* Top row: Icon & Practice Count Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {category.icon}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ShareButton
                                            title={`${category.name} - Carnatic Music Syllabus`}
                                            category={category.name}
                                            url={`/practice?category=${encodeURIComponent(category.name)}`}
                                            text={category.description}
                                            variant="icon"
                                        />
                                        <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wide bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                                            {category.practiceCount} {category.practiceCount === 1 ? 'Practice' : 'Practices'}
                                        </span>
                                    </div>
                                </div>

                                {/* Category Title */}
                                <h4 className="font-extrabold text-lg sm:text-xl leading-snug tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                    {category.name}
                                </h4>

                                {/* Category Description */}
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                                    {category.description}
                                </p>
                            </div>

                            {/* Bottom row: Audio/Video stats & Enter link */}
                            <div className="relative z-10 mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">audio_file</span>
                                        {category.audioCount} {category.audioCount === 1 ? 'Track' : 'Tracks'}
                                    </span>
                                    {category.videoCount > 0 && (
                                        <span className="flex items-center gap-1 text-red-500/90 font-semibold">
                                            <span>•</span>
                                            <span className="material-symbols-outlined text-xs">play_circle</span>
                                            {category.videoCount} {category.videoCount === 1 ? 'Video' : 'Videos'}
                                        </span>
                                    )}
                                </div>

                                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
                                    <span>Explore</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>

                            {/* Subtle Ambient Glow */}
                            <div className="absolute -right-6 -bottom-6 size-28 rounded-full transition-all duration-500 blur-2xl bg-primary/5 group-hover:bg-primary/20" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default PracticeSection;

