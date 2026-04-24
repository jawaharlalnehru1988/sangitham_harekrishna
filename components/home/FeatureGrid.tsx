"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface CategoryData {
    id: number;
    name: string;
    description?: string;
    colorCode: string;
    order: number;
    href: string;
    icon: string;
}

// Helper to convert hex to rgba for subtle backgrounds
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

const FeatureGrid = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                        description: `Explore ${cat.name} in our musical journey`,
                        colorCode: cat.colorCode || '#6366f1', // Default indigo if missing
                        order: cat.order || 0,
                        icon: getIconForCategory(cat.name),
                        href: `/category/${slug}`
                    };
                });
                
                setCategories(formattedCategories);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <section className="px-4 pt-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-7 w-48 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-44 rounded-2xl bg-black/5 dark:bg-white/5 animate-pulse border border-black/5 dark:border-white/5" />
                    ))}
                </div>
            </section>
        );
    }

    if (error || categories.length === 0) {
        return null;
    }

    return (
        <section className="px-4 pt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold tracking-tight">Explore Categories</h3>
                <span className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline">View All</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className="group relative overflow-hidden rounded-3xl border transition-all hover:scale-[1.02] active:scale-95 shadow-sm dark:shadow-none p-5"
                        style={{ 
                            backgroundColor: hexToRgba(cat.colorCode, 0.12),
                            borderColor: hexToRgba(cat.colorCode, 0.25),
                        }}
                    >
                        {/* Background Glow */}
                        <div 
                            className="absolute -right-4 -top-4 size-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
                            style={{ backgroundColor: cat.colorCode }}
                        />

                        <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                            <div 
                                className="flex size-12 items-center justify-center rounded-2xl bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 shadow-inner backdrop-blur-sm transition-transform group-hover:scale-110"
                                style={{ color: cat.colorCode }}
                            >
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {cat.icon}
                                </span>
                            </div>

                            <div>
                                <h4 className="font-bold text-base leading-tight tracking-tight mb-1 transition-colors text-slate-900 dark:text-slate-100">
                                    {cat.name}
                                </h4>
                                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-300 leading-relaxed">
                                    {cat.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span 
                                    className="text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: cat.colorCode }}
                                >
                                    Explore
                                </span>
                                <span 
                                    className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                    style={{ color: cat.colorCode }}
                                >
                                    arrow_forward
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeatureGrid;
