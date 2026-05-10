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
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
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
        if (activeId === lesson.id) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.src = lesson.audioPath;
                audioRef.current.play();
                setActiveId(lesson.id);
                setIsPlaying(true);
                setCurrentTime(0);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleEnded = () => {
        const currentIndex = lessons.findIndex(l => l.id === activeId);
        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
            const nextLesson = lessons[currentIndex + 1];
            if (audioRef.current) {
                audioRef.current.src = nextLesson.audioPath;
                audioRef.current.play();
                setActiveId(nextLesson.id);
                setIsPlaying(true);
                setCurrentTime(0);
            }
        } else {
            setIsPlaying(false);
            setCurrentTime(0);
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
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${activeId === lesson.id ? 'border-primary shadow-lg shadow-primary/10 bg-primary/5' : 'border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/30'} p-5`}
                    >
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                {/* Play Button */}
                                <button
                                    onClick={() => togglePlay(lesson)}
                                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${activeId === lesson.id && isPlaying ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'}`}
                                >
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: activeId === lesson.id && isPlaying ? "'FILL' 1" : "" }}>
                                        {activeId === lesson.id && isPlaying ? 'pause' : 'play_arrow'}
                                    </span>
                                </button>

                                <div className="flex-grow min-w-0">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block truncate">
                                        {lesson.PracticeCategory}
                                    </span>
                                    <h4 className="font-bold text-base leading-tight tracking-tight text-slate-900 dark:text-white truncate">
                                        {lesson.lessonName}
                                    </h4>
                                    
                                    {activeId === lesson.id && isPlaying && (
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

                            {/* Audio Track / Progress Bar */}
                            {activeId === lesson.id && (
                                <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold tabular-nums text-primary">
                                            {formatTime(currentTime)}
                                        </span>
                                        <div className="relative flex-grow h-1.5 group/slider">
                                            <input 
                                                type="range"
                                                min="0"
                                                max={duration || 0}
                                                value={currentTime}
                                                onChange={handleSeek}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="absolute inset-0 bg-primary/20 rounded-full" />
                                            <div 
                                                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-100"
                                                style={{ width: `${(currentTime / duration) * 100}%` }}
                                            />
                                            <div 
                                                className="absolute top-1/2 -translate-y-1/2 size-3 bg-primary rounded-full border-2 border-white dark:border-background-dark shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
                                                style={{ left: `${(currentTime / duration) * 100}%`, transform: `translate(-50%, -50%)` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold tabular-nums text-slate-400">
                                            {formatTime(duration)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Background subtle glow */}
                        <div className={`absolute -right-4 -bottom-4 size-24 rounded-full transition-all duration-500 blur-2xl ${activeId === lesson.id ? 'bg-primary/20 scale-150' : 'bg-primary/5 group-hover:bg-primary/10'}`} />
                    </div>
                ))}
            </div>

            <audio 
                ref={audioRef} 
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                className="hidden" 
            />
        </section>
    );
}
;

export default PracticeSection;
