import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        console.error('Error fetching ragam lesson:', error);
        return null;
    }
}

export default async function RagamLessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lesson = await getLesson(id);

    if (!lesson) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/ragam-lessons" className="text-emerald-400 flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-6 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to All Ragam Lessons
                    </Link>

                    <header className="mb-8 p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-emerald-400/10 blur-3xl" />

                        <div className="relative z-10">
                            <span className="bg-emerald-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4 inline-block">
                                {lesson.division}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
                                {lesson.topic}
                            </h1>

                            {lesson.audioPath && (
                                <div className="mt-6 p-4 rounded-2xl bg-background-dark/50 border border-white/5 flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Listen to Lesson</p>
                                        <audio controls className="w-full h-8 mt-1 opacity-80" src={lesson.audioPath} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <article className="prose prose-invert prose-slate max-w-none 
                        prose-headings:text-emerald-400 prose-headings:font-extrabold
                        prose-p:text-slate-300 prose-p:leading-relaxed
                        prose-strong:text-white prose-strong:font-bold
                        prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
                        prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-td:border-t prose-td:border-white/5
                        prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:mx-auto
                        prose-code:text-emerald-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {lesson.lesson}
                        </ReactMarkdown>
                    </article>

                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-center">
                        <span className="material-symbols-outlined text-emerald-500/30 text-4xl">music_note</span>
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
