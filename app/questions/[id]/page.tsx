import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import axios from 'axios';

export const revalidate = 0;

interface Question {
    id: number;
    question: string;
    answer: string;
    audio: string | null;
    created_at: string;
    updated_at: string;
}

async function getQuestion(id: string): Promise<Question | null> {
    try {
        const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-questions/');
        const questions: Question[] = res.data;
        return questions.find(q => q.id.toString() === id) || null;
    } catch (error) {
        console.error('Error fetching question:', error);
        return null;
    }
}

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const question = await getQuestion(id);

    if (!question) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/questions" className="text-primary flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-6 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back to All Questions
                    </Link>

                    <header className="mb-8 p-6 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-3xl" />

                        <div className="relative z-10">
                            <span className="bg-spiritual-red text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-4 inline-block">
                                Carnatic Wisdom
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
                                {question.question}
                            </h1>

                            {question.audio && (
                                <div className="mt-6 p-4 rounded-2xl bg-background-dark/50 border border-white/5 flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark shadow-[0_0_15px_rgba(243,167,53,0.3)]">
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Listen to Answer</p>
                                        <audio controls className="w-full h-8 mt-1 opacity-80" src={question.audio} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </header>

                    <article
                        className="prose prose-invert prose-slate max-w-none 
              [&>div]:!bg-primary/5 [&>div]:!border-primary/10 [&>div]:!p-8 [&>div]:!rounded-3xl 
              [&>div>h2]:!text-primary [&>div>h2]:!text-2xl [&>div>h2]:!font-extrabold 
              [&>div>p]:!text-slate-300 [&>div>p]:!text-lg [&>div>p]:!leading-relaxed
              [&>div>ul>li]:!text-slate-300 [&>div>ul>li]:!mb-3
              [&>div>div]:!bg-emerald-500/10 [&>div>div]:!border-l-primary [&>div>div]:!border-l-4 [&>div>div]:!rounded-xl [&>div>div>p]:!text-primary [&>div>div>p]:!font-bold"
                        dangerouslySetInnerHTML={{ __html: question.answer }}
                    />

                    <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col items-center gap-4 text-center">
                        <span className="material-symbols-outlined text-primary/30 text-4xl">temple_hindu</span>
                        <p className="text-sm text-slate-500 font-medium">
                            Shared on {new Date(question.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    );
}
