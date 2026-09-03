"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import axios from 'axios';
import LessonsClient from '@/components/lessons/LessonsClient';
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

const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const getIconForCategory = (title: string) => {
    const lowerTitle = (title || '').toLowerCase();
    if (lowerTitle.includes('foundational')) return "auto_stories";
    if (lowerTitle.includes('ragam') || lowerTitle.includes('ragalakshana')) return "music_note";
    if (lowerTitle.includes('kirtan')) return "temple_hindu";
    if (lowerTitle.includes('question')) return "quiz";
    if (lowerTitle.includes('theory')) return "menu_book";
    if (lowerTitle.includes('advanced')) return "star";
    return "library_music";
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string>('');
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const [colorCode, setColorCode] = useState<string>('#6366f1');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const resolvedParams = await params;
                const currentSlug = resolvedParams.slug;
                setSlug(currentSlug);

                // 1. Get categories to match slug back to division name
                const catRes = await axios.get(`${API_BASE_URL}/carnatic-categories/`);
                const categories: any[] = Array.isArray(catRes.data) ? catRes.data : (catRes.data.results || []);
                
                const matchedCategory = categories.find(cat => {
                    const divSlug = cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    return divSlug === currentSlug;
                });

                if (matchedCategory) {
                    setCategoryName(matchedCategory.name);
                    setColorCode(matchedCategory.colorCode || '#6366f1');
                } else {
                    setCategoryName(currentSlug);
                }

                // 2. Fetch lessons for this category
                const res = await axios.get(`${API_BASE_URL}/carnatic-syllabus/?category=${matchedCategory ? matchedCategory.id : currentSlug}&page_size=100`);
                setLessons(res.data.results || (Array.isArray(res.data) ? res.data : []));
            } catch (error) {
                console.error('Error fetching data:', error);
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
                <div className="max-w-4xl mx-auto px-4 pt-16">
                    <div className="h-8 w-64 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-4" />
                    <div className="h-4 w-96 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-12" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-40 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header />
            <div role="main" className="pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link 
                            href="/#categories" 
                            className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider mb-4 hover:opacity-80 transition-opacity"
                            style={{ color: colorCode }}
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Back to Home
                        </Link>
                        <h1 
                            className="text-3xl font-extrabold tracking-tight"
                            style={{ color: colorCode }}
                        >
                            {categoryName}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-300 text-sm mt-2">Explore the rich world of {categoryName} in our musical journey.</p>
                    </div>

                    <LessonsClient
                        initialLessons={lessons}
                        basePath={`/category/${slug}`}
                        icon={getIconForCategory(categoryName)}
                        accentColor="" // Resetting to handle internally or via colorCode
                        bgColor="" 
                        customColor={colorCode}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}
