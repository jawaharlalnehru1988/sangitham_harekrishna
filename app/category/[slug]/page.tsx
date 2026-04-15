import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axios from 'axios';
import LessonsClient from '@/components/lessons/LessonsClient';

export const revalidate = 0;

import { API_BASE_URL } from '@/lib/constants';

interface Lesson {
    id: number;
    division: string;
    topic: string;
    lesson: string;
    audioPath: string | null;
    created_at: string;
    updated_at: string;
}

const getStyleForCategory = (title: string) => {
    const lowerTitle = (title || '').toLowerCase();
    if (lowerTitle.includes('foundational')) return {
        icon: "auto_stories",
        accentColor: "text-blue-600",
        darkAccentColor: "dark:text-blue-400",
        bgColor: "from-blue-500/10 to-indigo-600/10",
    };
    if (lowerTitle.includes('ragam') || lowerTitle.includes('ragalakshana')) return {
        icon: "music_note",
        accentColor: "text-emerald-600",
        darkAccentColor: "dark:text-emerald-400",
        bgColor: "from-emerald-500/10 to-teal-600/10",
    };
    if (lowerTitle.includes('kirtan')) return {
        icon: "temple_hindu",
        accentColor: "text-rose-600",
        darkAccentColor: "dark:text-rose-400",
        bgColor: "from-rose-500/10 to-red-600/10",
    };
    if (lowerTitle.includes('question')) return {
        icon: "quiz",
        accentColor: "text-amber-600",
        darkAccentColor: "dark:text-amber-400",
        bgColor: "from-amber-500/10 to-orange-600/10",
    };
    if (lowerTitle.includes('theory')) return {
        icon: "menu_book",
        accentColor: "text-purple-600",
        darkAccentColor: "dark:text-purple-400",
        bgColor: "from-purple-500/10 to-fuchsia-600/10",
    };
    if (lowerTitle.includes('advanced')) return {
        icon: "star",
        accentColor: "text-cyan-600",
        darkAccentColor: "dark:text-cyan-400",
        bgColor: "from-cyan-500/10 to-blue-600/10",
    };
    
    return {
        icon: "library_music",
        accentColor: "text-slate-600",
        darkAccentColor: "dark:text-slate-200",
        bgColor: "from-slate-500/10 to-slate-600/10",
    };
};

async function getLessons(slug: string): Promise<{ lessons: Lesson[], categoryName: string }> {
    try {
        // 1. Get categories to match slug back to division name
        const catRes = await axios.get(`${API_BASE_URL}/categories/`);
        const categories: string[] = catRes.data.categories || (Array.isArray(catRes.data) ? catRes.data : []);
        
        const categoryName = categories.find(cat => {
            const divSlug = cat.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return divSlug === slug;
        }) || slug;

        // 2. Fetch only lessons for this division
        const res = await axios.get(`${API_BASE_URL}/?division=${encodeURIComponent(categoryName)}&page_size=100`);
        const lessons: Lesson[] = res.data.results || (Array.isArray(res.data) ? res.data : []);
        
        return { 
            lessons, 
            categoryName 
        };
    } catch (error) {
        console.error('Error fetching lessons:', error);
        return { lessons: [], categoryName: slug };
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { lessons, categoryName } = await getLessons(slug);
    const style = getStyleForCategory(categoryName);

    return (
        <div className="min-h-screen">
            <Header />
            <div role="main" className="pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link href="/" className={`${style.accentColor} ${style.darkAccentColor} flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-4 hover:opacity-80 transition-opacity`}>
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Back to Home
                        </Link>
                        <h1 className={`text-3xl font-extrabold tracking-tight ${style.accentColor} ${style.darkAccentColor}`}>{categoryName}</h1>
                        <p className="text-slate-500 dark:text-slate-300 text-sm mt-2">Explore the rich world of {categoryName} in our musical journey.</p>
                    </div>

                    <LessonsClient
                        initialLessons={lessons}
                        basePath={`/category/${slug}`}
                        icon={style.icon}
                        accentColor={style.accentColor}
                        bgColor={style.bgColor}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
