import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axios from 'axios';
import LessonsClient from '@/components/lessons/LessonsClient';

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

async function getKirtanLessons(): Promise<Lesson[]> {
    try {
        const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-syllabus/');
        // Filter for Kirtan Lessons division
        return res.data.filter((lesson: Lesson) => lesson.division === 'Kirtan Lessons');
    } catch (error) {
        console.error('Error fetching kirtan lessons:', error);
        return [];
    }
}

export default async function KirtanLessonsPage() {
    const lessons = await getKirtanLessons();

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link href="/" className="text-rose-400 flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-4 hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Back to Home
                        </Link>
                        <h1 className="text-3xl font-extrabold tracking-tight text-rose-400">Kirtan Lessons</h1>
                        <p className="text-slate-400 text-sm mt-2">Soulful devotional melodies and kirtans for spiritual elevation.</p>
                    </div>

                    <LessonsClient
                        initialLessons={lessons}
                        basePath="/kirtan-lessons"
                        icon="temple_hindu"
                        accentColor="text-rose-400"
                        bgColor="from-rose-500/10 to-red-600/10"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
