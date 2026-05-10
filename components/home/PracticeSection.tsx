"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface PracticeLesson {
    id: number;
    PracticeCategory: string;
    lessonName: string;
    audioPath: string;
    created_at: string;
    updated_at: string;
}

const PracticeSection = () => {
    const [lessons, setLessons] = useState<PracticeLesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-lesson-practice/`);
                let data = res.data.results || (Array.isArray(res.data) ? res.data : []);
                // Ensure lessons are sorted by ID ascending (1, 2, 3...)
                const sortedData = [...data].sort((a: PracticeLesson, b: PracticeLesson) => {
                    return Number(a.id) - Number(b.id);
                });
                setLessons(sortedData);
            } catch (err) {
                console.error('Error fetching practice lessons:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    const togglePlay = (lesson: PracticeLesson) => {
        if (playingId === lesson.id) {
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) {
                audioRef.current.src = lesson.audioPath;
                audioRef.current.play();
                setPlayingId(lesson.id);
            }
        }
    };

    const handleEnded = () => {
        const currentIndex = lessons.findIndex(l => l.id === playingId);
        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
            const nextLesson = lessons[currentIndex + 1];
            if (audioRef.current) {
                audioRef.current.src = nextLesson.audioPath;
                audioRef.current.play();
                setPlayingId(nextLesson.id);
            }
        } else {
            setPlayingId(null);
        }
    };

    if (loading) {
        return (
            <section className="px-4 pt-10">
                <div className="h-7 w-64 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            </section>
        );
    }

    if (lessons.length === 0) return null;

    return (
        <section className="px-4 pt-10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-extrabold tracking-tight">Listening Focused Practice</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium uppercase tracking-wider">Perfect your pitch and rhythm</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline">View All</span>
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">headphones</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${playingId === lesson.id ? 'border-primary shadow-lg shadow-primary/10 bg-primary/5' : 'border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/30'} p-5`}
                    >
                        <div className="relative z-10 flex items-center gap-4">
                            {/* Play Button */}
                            <button
                                onClick={() => togglePlay(lesson)}
                                className={`flex size-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${playingId === lesson.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}
                            >
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: playingId === lesson.id ? "'FILL' 1" : "" }}>
                                    {playingId === lesson.id ? 'pause' : 'play_arrow'}
                                </span>
                            </button>

                            <div className="flex-grow">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block">
                                    {lesson.PracticeCategory}
                                </span>
                                <h4 className="font-bold text-base leading-tight tracking-tight text-slate-900 dark:text-white">
                                    {lesson.lessonName}
                                </h4>
                                
                                {playingId === lesson.id && (
                                    <div className="mt-2 flex gap-1 h-3 items-end">
                                        {[...Array(5)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className="w-1 bg-primary rounded-full animate-music-wave"
                                                style={{ animationDelay: `${i * 0.1}s`, height: `${20 + Math.random() * 80}%` }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Background subtle glow */}
                        <div className={`absolute -right-4 -bottom-4 size-24 rounded-full transition-all duration-500 blur-2xl ${playingId === lesson.id ? 'bg-primary/20 scale-150' : 'bg-primary/5 group-hover:bg-primary/10'}`} />
                    </div>
                ))}
            </div>

            <audio 
                ref={audioRef} 
                onEnded={handleEnded}
                className="hidden" 
            />
        </section>
    );
}
;

export default PracticeSection;
