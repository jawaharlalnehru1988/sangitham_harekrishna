import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LessonNavigation from '@/components/lessons/LessonNavigation';

export const revalidate = 0;

interface Lesson {
    id: number;
    division: string;
    topic: string;
    lesson: string;
    audioPath: string | null;
    created_at: string;
    updated_at: string;
}

async function getLesson(id: string): Promise<Lesson | null> {
    try {
        const res = await axios.get(`https://api.askharekrishna.com/api/v1/carnatic-syllabus/${id}/`);
        return res.data;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return null;
    }
}

async function getLessons(division: string): Promise<Lesson[]> {
    try {
        const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-syllabus/');
        return res.data.filter((l: Lesson) => l.division === division);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return [];
    }
}

const getStyleForCategory = (title: string) => {
    const lowerTitle = (title || '').toLowerCase();
    if (lowerTitle.includes('foundational')) return { accentColor: "text-blue-600", darkAccentColor: "dark:text-blue-400", bgColor: "bg-blue-500/5", borderColor: "border-blue-500/10", glowColor: "bg-blue-400/10", playColor: "bg-blue-500", darkPlayColor: "dark:bg-blue-400" };
    if (lowerTitle.includes('ragam') || lowerTitle.includes('ragalakshana')) return { accentColor: "text-emerald-600", darkAccentColor: "dark:text-emerald-400", bgColor: "bg-emerald-500/5", borderColor: "border-emerald-500/10", glowColor: "bg-emerald-400/10", playColor: "bg-emerald-500", darkPlayColor: "dark:bg-emerald-400" };
    if (lowerTitle.includes('kirtan')) return { accentColor: "text-rose-600", darkAccentColor: "dark:text-rose-400", bgColor: "bg-rose-500/5", borderColor: "border-rose-500/10", glowColor: "bg-rose-400/10", playColor: "bg-rose-500", darkPlayColor: "dark:bg-rose-400" };
    if (lowerTitle.includes('question')) return { accentColor: "text-amber-600", darkAccentColor: "dark:text-amber-400", bgColor: "bg-amber-500/5", borderColor: "border-amber-500/10", glowColor: "bg-amber-400/10", playColor: "bg-amber-500", darkPlayColor: "dark:bg-amber-400" };
    if (lowerTitle.includes('theory')) return { accentColor: "text-purple-600", darkAccentColor: "dark:text-purple-400", bgColor: "bg-purple-500/5", borderColor: "border-purple-500/10", glowColor: "bg-purple-400/10", playColor: "bg-purple-500", darkPlayColor: "dark:bg-purple-400" };
    if (lowerTitle.includes('advanced')) return { accentColor: "text-cyan-600", darkAccentColor: "dark:text-cyan-400", bgColor: "bg-cyan-500/5", borderColor: "border-cyan-500/10", glowColor: "bg-cyan-400/10", playColor: "bg-cyan-500", darkPlayColor: "dark:bg-cyan-400" };
    return { accentColor: "text-slate-600", darkAccentColor: "dark:text-slate-200", bgColor: "bg-slate-500/5", borderColor: "border-slate-500/10", glowColor: "bg-slate-400/10", playColor: "bg-slate-500", darkPlayColor: "dark:bg-slate-400" };
};

export default async function LessonDetailPage({ params }: { params: Promise<{ slug: string, id: string }> }) {
    const { slug, id } = await params;
    const lesson = await getLesson(id);

    if (!lesson) {
        notFound();
    }

    const allLessons = await getLessons(lesson.division);
    const style = getStyleForCategory(lesson.division);

    const currentIdx = allLessons.findIndex(l => l.id === lesson.id);
    const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
    const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

    return (
        <div className="min-h-screen">
            <Header />
            <div role="main" className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto">
                    <Link href={`/category/${slug}`} className={`${style.accentColor} ${style.darkAccentColor} flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-6 hover:opacity-80 transition-opacity`}>
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to All {lesson.division}
                    </Link>

                    <header className={`mb-8 p-6 rounded-3xl ${style.bgColor} border ${style.borderColor.replace('border-', 'border-black/5 dark:border-')} relative overflow-hidden shadow-sm dark:shadow-none`}>
                        <div className={`absolute -right-8 -top-8 size-32 rounded-full ${style.glowColor} blur-3xl opacity-50 dark:opacity-100`} />

                        <div className="relative z-10">
                            <span className={`${style.playColor} ${style.darkPlayColor} text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4 inline-block`}>
                                {lesson.division}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                                {lesson.topic}
                            </h1>

                            {lesson.audioPath && (
                                <div className="mt-6 p-4 rounded-2xl bg-black/5 dark:bg-background-dark/50 border border-black/5 dark:border-white/10 flex items-center gap-4">
                                    <div className={`size-10 rounded-full ${style.playColor} ${style.darkPlayColor} flex items-center justify-center text-white shadow-lg`}>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-xs font-bold uppercase tracking-widest ${style.accentColor} ${style.darkAccentColor}`}>Listen to Lesson</p>
                                        <audio controls className="w-full h-8 mt-1 opacity-80" src={lesson.audioPath} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <article className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {lesson.lesson}
                        </ReactMarkdown>
                    </article>

                    <LessonNavigation
                        prevLesson={prevLesson}
                        nextLesson={nextLesson}
                        basePath={`/category/${slug}`}
                        accentColor={style.accentColor}
                        darkAccentColor={style.darkAccentColor}
                    />

                    <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col items-center gap-4 text-center">
                        <span className="material-symbols-outlined text-primary/30 text-4xl">auto_stories</span>
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
