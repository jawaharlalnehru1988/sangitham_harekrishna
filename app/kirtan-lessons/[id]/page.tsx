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
        console.error('Error fetching kirtan lesson:', error);
        return null;
    }
}

async function getLessons(division?: string): Promise<Lesson[]> {
    try {
        const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-syllabus/');
        if (division) {
            return res.data.filter((l: Lesson) => l.division === division);
        }
        return res.data;
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return [];
    }
}

export default async function KirtanLessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lesson = await getLesson(id);
    const allLessons = await getLessons('Kirtan Lessons');

    if (!lesson) {
        notFound();
    }

    const currentIdx = allLessons.findIndex((l: Lesson) => l.id === lesson.id);
    const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
    const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/kirtan-lessons" className="text-rose-400 flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-6 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to All Kirtans
                    </Link>

                    <header className="mb-8 p-6 rounded-3xl bg-rose-500/5 border border-rose-500/10 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-rose-400/10 blur-3xl" />

                        <div className="relative z-10">
                            <span className="bg-rose-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4 inline-block">
                                {lesson.division}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
                                {lesson.topic}
                            </h1>

                            {lesson.audioPath && (
                                <div className="mt-6 p-4 rounded-2xl bg-background-dark/50 border border-white/5 flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-rose-400">Listen to Kirtan</p>
                                        <audio controls className="w-full h-8 mt-1 opacity-80" src={lesson.audioPath} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <article className="prose prose-invert prose-slate max-w-none 
                        prose-headings:text-rose-400 prose-headings:font-extrabold
                        prose-p:text-slate-300 prose-p:leading-relaxed
                        prose-strong:text-white prose-strong:font-bold
                        prose-blockquote:border-l-rose-500 prose-blockquote:bg-rose-500/5 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
                        prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-td:border-t prose-td:border-white/5
                        prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:mx-auto
                        prose-code:text-rose-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {lesson.lesson}
                        </ReactMarkdown>
                    </article>

                    <LessonNavigation
                        prevLesson={prevLesson}
                        nextLesson={nextLesson}
                        basePath="/kirtan-lessons"
                        accentColor="text-rose-400"
                    />

                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-center">
                        <span className="material-symbols-outlined text-rose-500/30 text-4xl">temple_hindu</span>
                        <p className="text-sm text-slate-500 font-medium">
                            Last updated on {new Date(lesson.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
