import React from 'react';
import Link from 'next/link';
import axios from 'axios';

interface CategoryData {
    title: string;
    description: string;
    icon: string;
    color: string;
    accent: string;
    borderColor: string;
    href: string;
}

const getStyleForCategory = (title: string) => {
    const lowerTitle = (title || '').toLowerCase();
    if (lowerTitle.includes('foundational')) return {
        icon: "auto_stories",
        color: "from-blue-500/20 to-indigo-600/20",
        accent: "text-blue-600 dark:text-blue-400",
        borderColor: "border-blue-500/20",
    };
    if (lowerTitle.includes('ragam') || lowerTitle.includes('ragalakshana')) return {
        icon: "music_note",
        color: "from-emerald-500/20 to-teal-600/20",
        accent: "text-emerald-600 dark:text-emerald-400",
        borderColor: "border-emerald-500/20",
    };
    if (lowerTitle.includes('kirtan')) return {
        icon: "temple_hindu",
        color: "from-rose-500/20 to-red-600/20",
        accent: "text-rose-600 dark:text-rose-400",
        borderColor: "border-rose-500/20",
    };
    if (lowerTitle.includes('question')) return {
        icon: "quiz",
        color: "from-amber-500/20 to-orange-600/20",
        accent: "text-amber-600 dark:text-amber-400",
        borderColor: "border-amber-500/20",
    };
    if (lowerTitle.includes('theory')) return {
        icon: "menu_book",
        color: "from-purple-500/20 to-fuchsia-600/20",
        accent: "text-purple-600 dark:text-purple-400",
        borderColor: "border-purple-500/20",
    };
    if (lowerTitle.includes('advanced')) return {
        icon: "star",
        color: "from-cyan-500/20 to-blue-600/20",
        accent: "text-cyan-600 dark:text-cyan-400",
        borderColor: "border-cyan-500/20",
    };
    
    // Default style for unknown categories
    return {
        icon: "library_music",
        color: "from-slate-500/20 to-slate-600/20",
        accent: "text-slate-600 dark:text-slate-200",
        borderColor: "border-slate-500/20",
    };
};

async function getCategories(): Promise<CategoryData[]> {
    let apiCategories: string[] = [];
    
    try {
        const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-syllabus/categories/');
        apiCategories = res.data;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Categories endpoint failed, trying to extract from full syllabus...', errorMessage);
        
        try {
            const res = await axios.get('https://api.askharekrishna.com/api/v1/carnatic-syllabus/');
            const lessons: { division: string }[] = res.data;
            apiCategories = Array.from(new Set(lessons.map(l => l.division).filter(Boolean)));
        } catch (fallbackError) {
            console.error('All category fetching strategies failed:', fallbackError);
        }
    }

    if (apiCategories.length > 0) {
        return apiCategories.map(cat => {
            const style = getStyleForCategory(cat);
            // Robust slugify
            const slug = cat.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            
            return {
                title: cat,
                description: `Explore ${cat} in our musical journey`,
                icon: style.icon,
                color: style.color,
                accent: style.accent,
                borderColor: style.borderColor,
                href: `/category/${slug}`
            };
        });
    }

    return [];
}

const FeatureGrid = async () => {
    const categories = await getCategories();

    return (
        <section className="px-4 pt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold tracking-tight">Explore Categories</h3>
                <span className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline">View All</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.href}
                        className={`group relative overflow-hidden rounded-2xl border ${cat.borderColor} bg-gradient-to-br ${cat.color} p-5 transition-all hover:scale-[1.02] active:scale-95 shadow-sm dark:shadow-none`}
                    >
                        {/* Background Pattern/Glow */}
                        <div className={`absolute -right-4 -top-4 size-24 rounded-full bg-current opacity-5 blur-2xl ${cat.accent}`} />

                        <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                            <div className={`flex size-12 items-center justify-center rounded-xl bg-black/5 dark:bg-background-dark/40 border border-black/5 dark:border-white/5 shadow-inner ${cat.accent}`}>
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {cat.icon}
                                </span>
                            </div>

                            <div>
                                <h4 className="font-bold text-base leading-tight tracking-tight mb-1 group-hover:text-primary transition-colors text-slate-900 dark:text-slate-100">
                                    {cat.title}
                                </h4>
                                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-300 leading-relaxed">
                                    {cat.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${cat.accent}`}>
                                    Explore
                                </span>
                                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
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
