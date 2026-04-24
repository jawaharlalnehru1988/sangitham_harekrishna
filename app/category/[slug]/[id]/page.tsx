"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LessonNavigation from '@/components/lessons/LessonNavigation';
import { API_BASE_URL } from '@/lib/constants';

interface VideoSample {
    id: number;
    url: string;
    sort_order: number;
}

interface Lesson {
    id: number;
    division: string;
    category_name?: string;
    topic: string;
    lesson: string;
    audioPath: string | null;
    videoSamples: VideoSample[];
    created_at: string;
    updated_at: string;
}

const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default function LessonDetailPage({ params }: { params: Promise<{ slug: string, id: string }> }) {
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);
    const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
    const [colorCode, setColorCode] = useState<string>('#6366f1');
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const resolvedParams = await params;
                const { id, slug: currentSlug } = resolvedParams;
                setSlug(currentSlug);

                // 1. Fetch lesson
                const res = await axios.get(`${API_BASE_URL}/carnatic-syllabus/${id}/`);
                const currentLesson = res.data;
                setLesson(currentLesson);

                // 2. Fetch category to get colorCode
                const division = currentLesson.division || currentLesson.category_name;
                const catRes = await axios.get(`${API_BASE_URL}/carnatic-categories/`);
                const categories: any[] = Array.isArray(catRes.data) ? catRes.data : (catRes.data.results || []);
                const matchedCategory = categories.find(cat => cat.name === division || cat.id === currentLesson.category);
                if (matchedCategory) {
                    setColorCode(matchedCategory.colorCode || '#6366f1');
                }

                // 3. Fetch neighbors for navigation
                const listRes = await axios.get(`${API_BASE_URL}/carnatic-syllabus/?category=${division}&page_size=100`);
                const allLessons: Lesson[] = listRes.data.results || [];
                
                const currentIdx = allLessons.findIndex(l => l.id === currentLesson.id);
                setPrevLesson(currentIdx > 0 ? allLessons[currentIdx - 1] : null);
                setNextLesson(currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null);
            } catch (error) {
                console.error('Error fetching lesson:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="max-w-3xl mx-auto px-4 pt-16">
                    <div className="h-4 w-32 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                    <div className="h-48 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse mb-8" />
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-black/5 dark:bg-white/5 rounded-lg animate-pulse" />
                        <div className="h-4 w-5/6 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse" />
                        <div className="h-4 w-4/6 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!lesson) {
        return notFound();
    }

    const categoryLabel = lesson.category_name || lesson.division || '';

    return (
        <div className="min-h-screen">
            <Header />
            <div role="main" className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto">
                    <Link 
                        href={`/category/${slug}`} 
                        className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-6 hover:opacity-80 transition-opacity"
                        style={{ color: colorCode }}
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to All {categoryLabel}
                    </Link>

                    <header 
                        className="mb-8 p-6 rounded-3xl border relative overflow-hidden shadow-sm dark:shadow-none"
                        style={{ 
                            backgroundColor: hexToRgba(colorCode, 0.05),
                            borderColor: hexToRgba(colorCode, 0.1),
                        }}
                    >
                        <div 
                            className="absolute -right-8 -top-8 size-32 rounded-full blur-3xl opacity-50 dark:opacity-100"
                            style={{ backgroundColor: hexToRgba(colorCode, 0.1) }}
                        />

                        <div className="relative z-10">
                            <span 
                                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4 inline-block"
                                style={{ backgroundColor: colorCode }}
                            >
                                {categoryLabel}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                                {lesson.topic}
                            </h1>

                            {lesson.audioPath && (
                                <div className="mt-6 p-4 rounded-2xl bg-black/5 dark:bg-background-dark/50 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <div 
                                        className="size-10 rounded-full flex items-center justify-center text-white shadow-lg"
                                        style={{ backgroundColor: colorCode }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div className="flex-1">
                                        <p 
                                            className="text-xs font-bold uppercase tracking-widest"
                                            style={{ color: colorCode }}
                                        >
                                            Listen to Lesson
                                        </p>
                                        <audio controls className="w-full h-8 mt-1 opacity-80" src={lesson.audioPath} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Multi-Video Section */}
                    {lesson.videoSamples && lesson.videoSamples.length > 0 && (
                        <div className="mt-8 space-y-6">
                            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                <span className="material-symbols-outlined" style={{ color: colorCode }}>video_library</span>
                                Practice Videos
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {lesson.videoSamples.sort((a, b) => a.sort_order - b.sort_order).map((video, idx) => {
                                    const ytid = getYouTubeId(video.url);
                                    if (!ytid) return null;
                                    return (
                                        <div key={video.id} className="overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 shadow-lg">
                                            <div className="aspect-video w-full">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${ytid}`}
                                                    title={`Practice Video ${idx + 1}`}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <article className="prose dark:prose-invert max-w-none mt-12 mb-12">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {lesson.lesson}
                        </ReactMarkdown>
                    </article>

                    <div className="mt-12">
                        <LessonNavigation
                            prevLesson={prevLesson}
                            nextLesson={nextLesson}
                            basePath={`/category/${slug}`}
                            accentColor="" 
                            darkAccentColor=""
                            customColor={colorCode}
                        />
                    </div>

                    <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col items-center gap-4 text-center">
                        <span 
                            className="material-symbols-outlined text-4xl opacity-30"
                            style={{ color: colorCode }}
                        >
                            auto_stories
                        </span>
                        <p className="text-sm text-slate-500 font-medium">
                            Last updated on {new Date(lesson.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
