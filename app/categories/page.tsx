"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { API_BASE_URL } from '@/lib/constants';
import ShareButton from '@/components/common/ShareButton';

interface CategoryData {
    id: number;
    name: string;
    description?: string;
    colorCode: string;
    order: number;
    href: string;
    icon: string;
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
    if (lowerTitle.includes('nottu') || lowerTitle.includes('nottuswaram')) return "music_note";
    if (lowerTitle.includes('swarajati') || lowerTitle.includes('swarajathi') || lowerTitle.includes('jatiswaram') || lowerTitle.includes('jathiswaram')) return "queue_music";
    if (lowerTitle.includes('varnam')) return "stars";
    return "library_music";
};

export default function AllCategoriesPage() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/carnatic-categories/`);
                let data = Array.isArray(res.data) ? res.data : (res.data.results || []);

                // Sort by the 'order' field from backend
                data = data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

                const formattedCategories = data.map((cat: any) => {
                    const slug = cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                    return {
                        id: cat.id,
                        name: cat.name,
                        description: `Explore all lessons and syllabus topics in ${cat.name}`,
                        colorCode: cat.colorCode || '#6366f1',
                        order: cat.order || 0,
                        icon: getIconForCategory(cat.name),
                        href: `/practice?category=${encodeURIComponent(cat.name)}`
                    };
                });

                setCategories(formattedCategories);
            } catch (err) {
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((cat) => {
        if (searchQuery.trim() === '') return true;
        const q = searchQuery.toLowerCase();
        return cat.name.toLowerCase().includes(q) || (cat.description && cat.description.toLowerCase().includes(q));
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div role="main" className="flex-grow pb-32 px-4 pt-8">
                <div className="max-w-7xl mx-auto">
                    {/* Top Navigation */}
                    <div className="mb-6">
                        <Link
                            href="/#categories"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity mb-4"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Home
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    All Syllabus Categories
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Explore foundational exercises, varisais, geethams, varnams, kritis, and musicology
                                </p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                                <ShareButton
                                    title="All Syllabus Categories - Carnatic Music Platform"
                                    text="Explore foundational exercises, varisais, geethams, varnams, kritis, and musicology."
                                    variant="pill"
                                    label="Share Syllabus"
                                />
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-xl border border-black/5 dark:border-white/10">
                                    {filteredCategories.length} {filteredCategories.length === 1 ? 'Category' : 'Categories'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white dark:bg-background-dark/60 rounded-2xl border border-black/5 dark:border-white/10 p-4 mb-8 shadow-sm">
                        <div className="relative w-full sm:w-96">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-slate-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-48 rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5"
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredCategories.length === 0 && (
                        <div className="text-center py-16 bg-white dark:bg-background-dark/40 rounded-2xl border border-black/5 dark:border-white/10">
                            <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">
                                search_off
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                                No Categories Found
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                No categories matched your search term. Try searching for something else.
                            </p>
                        </div>
                    )}

                    {/* Categories Grid */}
                    {!loading && filteredCategories.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredCategories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={cat.href}
                                    className="group relative overflow-hidden rounded-3xl border transition-all hover:scale-[1.02] active:scale-95 shadow-sm dark:shadow-none p-6 flex flex-col justify-between"
                                    style={{
                                        backgroundColor: hexToRgba(cat.colorCode, 0.12),
                                        borderColor: hexToRgba(cat.colorCode, 0.25),
                                    }}
                                >
                                    {/* Background Glow */}
                                    <div
                                        className="absolute -right-4 -top-4 size-28 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
                                        style={{ backgroundColor: cat.colorCode }}
                                    />

                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div
                                            className="flex size-14 items-center justify-center rounded-2xl bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 shadow-inner backdrop-blur-sm transition-transform group-hover:scale-110"
                                            style={{ color: cat.colorCode }}
                                        >
                                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                {cat.icon}
                                            </span>
                                        </div>

                                        <div>
                                            <h2 className="font-extrabold text-lg leading-tight tracking-tight mb-2 transition-colors text-slate-900 dark:text-slate-100">
                                                {cat.name}
                                            </h2>
                                            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                                {cat.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-black/5 dark:border-white/5">
                                        <span
                                            className="text-xs font-bold uppercase tracking-widest"
                                            style={{ color: cat.colorCode }}
                                        >
                                            Explore Lessons
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <ShareButton
                                                title={`${cat.name} - Carnatic Music Syllabus`}
                                                category={cat.name}
                                                url={cat.href}
                                                text={`Explore all lessons and syllabus topics in ${cat.name}.`}
                                                variant="icon"
                                            />
                                            <div
                                                className="flex size-7 items-center justify-center rounded-lg transition-transform group-hover:translate-x-1"
                                                style={{ backgroundColor: hexToRgba(cat.colorCode, 0.18), color: cat.colorCode }}
                                            >
                                                <span className="material-symbols-outlined text-sm">
                                                    arrow_forward
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
