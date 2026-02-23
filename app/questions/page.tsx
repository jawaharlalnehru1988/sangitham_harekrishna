import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
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

async function getQuestions(): Promise<Question[]> {
    try {
        const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-questions/');
        return res.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw new Error('Failed to fetch questions');
    }
}

export default async function QuestionsPage() {
    const questions = await getQuestions();

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                    <div className="mb-2">
                        <Link href="/" className="text-primary flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-4 hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-extrabold tracking-tight text-primary">Question's Answered</h1>
                        <p className="text-slate-400 text-sm mt-2">Explore common questions about Carnatic music and their spiritual significance.</p>
                    </div>

                    <div className="grid gap-4">
                        {questions.map((q) => (
                            <Link
                                key={q.id}
                                href={`/questions/${q.id}`}
                                className="group p-5 rounded-2xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all active:scale-[0.98]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                            {q.question}
                                        </h2>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 bg-primary/10 px-2 py-0.5 rounded-full">
                                                Article
                                            </span>
                                            {q.audio && (
                                                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                                    <span className="material-symbols-outlined text-xs">volume_up</span>
                                                    Audio Available
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <Footer />
            </main>
            <BottomNav />
        </div>
    );
}
