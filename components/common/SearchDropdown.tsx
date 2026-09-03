"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Fuse from 'fuse.js';
import { API_BASE_URL } from '@/lib/constants';

export interface SearchIndexItem {
    id: string;
    type: 'category' | 'syllabus' | 'practice' | 'ragam' | 'mridanga';
    title: string;
    subtitle: string;
    category: string;
    url: string;
    color?: string;
    icon?: string;
    badge?: string;
}

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    category: { bg: 'bg-amber-500/15', text: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/30' },
    syllabus: { bg: 'bg-cyan-500/15', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/30' },
    practice: { bg: 'bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/30' },
    ragam: { bg: 'bg-pink-500/15', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-500/30' },
    mridanga: { bg: 'bg-purple-500/15', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/30' },
};

export const SearchDropdown: React.FC = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [indexItems, setIndexItems] = useState<SearchIndexItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const mobileInputRef = useRef<HTMLInputElement>(null);
    const resultsContainerRef = useRef<HTMLDivElement>(null);

    // Fetch search index on first load
    useEffect(() => {
        let isMounted = true;
        const loadSearchIndex = async () => {
            try {
                setLoading(true);
                const res = await axios.get<SearchIndexItem[]>(`${API_BASE_URL}/carnatic-search-index/`);
                if (isMounted && Array.isArray(res.data)) {
                    setIndexItems(res.data);
                }
            } catch (err) {
                console.error('Failed to load carnatic search index:', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadSearchIndex();
        return () => {
            isMounted = false;
        };
    }, []);

    // Fuse.js fuzzy search configuration
    const fuse = useMemo(() => {
        return new Fuse(indexItems, {
            keys: [
                { name: 'title', weight: 0.55 },
                { name: 'category', weight: 0.30 },
                { name: 'subtitle', weight: 0.15 },
            ],
            threshold: 0.38, // Balance between typo tolerance and accuracy
            distance: 100,
            minMatchCharLength: 2,
            ignoreLocation: true,
            shouldSort: true,
        });
    }, [indexItems]);

    // Compute search results
    const results = useMemo(() => {
        const trimmed = query.trim();
        if (!trimmed) {
            return [];
        }
        return fuse.search(trimmed, { limit: 12 }).map(res => res.item);
    }, [fuse, query]);

    // Popular / Suggested items when search box is empty
    const suggestions = useMemo(() => {
        if (!indexItems.length) return [];
        // Hand-pick or filter popular foundational categories and talas
        return indexItems
            .filter(item => 
                item.title.toLowerCase().includes('sarali') ||
                item.title.toLowerCase().includes('foundational') ||
                item.title.toLowerCase().includes('alankaram') ||
                item.title.toLowerCase().includes('mayamalavagowla') ||
                item.title.toLowerCase().includes('daspahira')
            )
            .slice(0, 5);
    }, [indexItems]);

    const activeList = query.trim() ? results : suggestions;

    // Reset selected index when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Global shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen(true);
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Auto-focus mobile input when mobile modal opens
    useEffect(() => {
        if (isMobileOpen) {
            setTimeout(() => {
                mobileInputRef.current?.focus();
            }, 100);
        }
    }, [isMobileOpen]);

    const handleSelect = (item: SearchIndexItem) => {
        setIsOpen(false);
        setIsMobileOpen(false);
        setQuery('');
        router.push(item.url);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (activeList.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % activeList.length);
            scrollSelectedIntoView((selectedIndex + 1) % activeList.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + activeList.length) % activeList.length);
            scrollSelectedIntoView((selectedIndex - 1 + activeList.length) % activeList.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeList[selectedIndex]) {
                handleSelect(activeList[selectedIndex]);
            }
        }
    };

    const scrollSelectedIntoView = (index: number) => {
        if (!resultsContainerRef.current) return;
        const element = resultsContainerRef.current.children[index] as HTMLElement;
        if (element) {
            element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Desktop Search Bar */}
            <div ref={containerRef} className="hidden md:flex flex-1 max-w-md mx-4 relative">
                <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 text-lg pointer-events-none">
                        search
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search lessons, categories, ragams, talas..."
                        className="w-full pl-10 pr-20 py-2 text-xs rounded-full bg-white/70 dark:bg-black/40 border border-primary/25 hover:border-primary/50 focus:border-primary focus:bg-white dark:focus:bg-black/70 focus:outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm backdrop-blur-sm"
                        aria-label="Search lessons and categories"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {query ? (
                            <button
                                onClick={() => {
                                    setQuery('');
                                    inputRef.current?.focus();
                                }}
                                className="size-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                                title="Clear search"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        ) : (
                            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-black/5 dark:bg-white/10 rounded border border-black/10 dark:border-white/10">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        )}
                    </div>
                </div>

                {/* Floating Results Dropdown (Desktop) */}
                {isOpen && (
                    <div className="absolute left-0 right-0 top-12 rounded-2xl border border-primary/20 bg-background-light/95 dark:bg-background-dark/95 shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {/* Header status */}
                        <div className="px-4 py-2.5 border-b border-primary/10 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-primary/5">
                            <span>
                                {query.trim() 
                                    ? `Matches for "${query}" (${results.length})` 
                                    : 'Suggested / Quick Access'}
                            </span>
                            <span className="text-[10px] opacity-75">
                                Use ↑↓ to navigate • ↵ to select
                            </span>
                        </div>

                        {/* Results List */}
                        <div 
                            ref={resultsContainerRef}
                            className="max-h-[380px] overflow-y-auto p-1.5 divide-y divide-black/5 dark:divide-white/5 no-scrollbar"
                        >
                            {loading && (
                                <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                                    <span className="material-symbols-outlined animate-spin text-xl text-primary">progress_activity</span>
                                    Loading lessons index...
                                </div>
                            )}

                            {!loading && query.trim() && results.length === 0 && (
                                <div className="p-8 text-center">
                                    <span className="material-symbols-outlined text-3xl text-slate-400 mb-1">search_off</span>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                        No exact or fuzzy matches found
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Try searching for &ldquo;sarali&rdquo;, &ldquo;alankaram&rdquo;, &ldquo;mridanga&rdquo;, or &ldquo;bhairavi&rdquo;
                                    </p>
                                </div>
                            )}

                            {!loading && activeList.map((item, idx) => {
                                const badgeStyle = BADGE_STYLES[item.type] || BADGE_STYLES.category;
                                const isSelected = idx === selectedIndex;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                                            isSelected 
                                                ? 'bg-primary/15 border-primary/30 text-slate-900 dark:text-white' 
                                                : 'hover:bg-primary/10 text-slate-700 dark:text-slate-200'
                                        }`}
                                    >
                                        <div 
                                            className="size-8 rounded-lg flex items-center justify-center shrink-0 border border-primary/20"
                                            style={{ backgroundColor: `${item.color || '#f59e0b'}20`, color: item.color || '#f59e0b' }}
                                        >
                                            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                {item.icon || 'music_note'}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-xs font-bold truncate">
                                                    {item.title}
                                                </h4>
                                                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full border shrink-0 ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                                                    {item.badge || item.type}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-400 truncate">
                                                {item.subtitle}
                                            </p>
                                        </div>

                                        <span className="material-symbols-outlined text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            chevron_right
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Search Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                title="Search lessons and categories"
                aria-label="Open search dialog"
            >
                <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Mobile Search Modal / Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col p-4 animate-in fade-in duration-150">
                    <div className="w-full max-w-lg mx-auto bg-background-light dark:bg-background-dark border border-primary/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                        {/* Search Input Bar */}
                        <div className="p-3 border-b border-primary/10 flex items-center gap-2 bg-primary/5">
                            <span className="material-symbols-outlined text-primary text-xl">search</span>
                            <input
                                ref={mobileInputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search lesson or category (with typo tolerance)..."
                                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                >
                                    <span className="material-symbols-outlined text-base">close</span>
                                </button>
                            )}
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-primary/15 text-primary hover:bg-primary/25"
                            >
                                Done
                            </button>
                        </div>

                        {/* Mobile Results List */}
                        <div className="flex-1 overflow-y-auto p-2 divide-y divide-black/5 dark:divide-white/5 no-scrollbar">
                            {query.trim() && results.length === 0 && (
                                <div className="p-8 text-center text-xs text-slate-400">
                                    No matches found for &ldquo;{query}&rdquo;
                                </div>
                            )}

                            {activeList.map((item) => {
                                const badgeStyle = BADGE_STYLES[item.type] || BADGE_STYLES.category;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/10 active:bg-primary/20 transition-colors cursor-pointer"
                                    >
                                        <div 
                                            className="size-9 rounded-xl flex items-center justify-center shrink-0 border border-primary/20"
                                            style={{ backgroundColor: `${item.color || '#f59e0b'}20`, color: item.color || '#f59e0b' }}
                                        >
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                {item.icon || 'music_note'}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-xs font-bold truncate text-slate-900 dark:text-white">
                                                    {item.title}
                                                </h4>
                                                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full border shrink-0 ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                                                    {item.badge || item.type}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 truncate">
                                                {item.subtitle}
                                            </p>
                                        </div>

                                        <span className="material-symbols-outlined text-sm text-slate-400">
                                            chevron_right
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchDropdown;
