"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface Question {
    id: number;
    category_name: string;
    question: string;
    answer: string;
}

const QuestionsSection = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-questions/`);
                setQuestions(res.data.results || (Array.isArray(res.data) ? res.data : []));
            } catch (err) {
                console.error('Error fetching questions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const toggleOpen = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    if (loading) {
        return (
            <section className="px-4 pt-10 pb-20">
                <div className="h-7 w-48 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-6" />
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            </section>
        );
    }

    if (questions.length === 0) return null;

    return (
        <section className="px-4 pt-10 pb-20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold tracking-tight">Wisdom Corner (Q&A)</h3>
            </div>

            <div className="space-y-3">
                {questions.map((q) => (
                    <div
                        key={q.id}
                        className={`overflow-hidden rounded-2xl border transition-all duration-300 ${openId === q.id ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' : 'border-black/5 dark:border-white/10 bg-white dark:bg-background-dark/40 hover:border-primary/30'}`}
                    >
                        <button
                            onClick={() => toggleOpen(q.id)}
                            className="w-full flex items-center justify-between p-5 text-left"
                        >
                            <div className="flex-1 pr-4">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1 block">
                                    {q.category_name}
                                </span>
                                <h4 className={`font-bold text-sm leading-tight transition-colors ${openId === q.id ? 'text-primary' : 'text-slate-900 dark:text-slate-100'}`}>
                                    {q.question}
                                </h4>
                            </div>
                            <span className={`material-symbols-outlined transition-transform duration-300 ${openId === q.id ? 'rotate-180 text-primary' : 'text-slate-400'}`}>
                                expand_more
                            </span>
                        </button>
                        
                        <div
                            className={`grid transition-all duration-300 ease-in-out ${openId === q.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-5 pt-0 border-t border-primary/10 mt-0">
                                    <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                                        {q.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default QuestionsSection;
