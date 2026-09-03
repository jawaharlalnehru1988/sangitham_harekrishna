"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/constants';

interface CategoryItem {
    id: number;
    name: string;
    order: number;
    colorCode?: string;
}

const getIconForCategory = (title: string) => {
    const lowerTitle = (title || '').toLowerCase();
    if (lowerTitle.includes('foundational') || lowerTitle.includes('sound & pitch')) return "auto_stories";
    if (lowerTitle.includes('ragam') || lowerTitle.includes('ragalakshana') || lowerTitle.includes('melakarta')) return "music_note";
    if (lowerTitle.includes('kirtan')) return "temple_hindu";
    if (lowerTitle.includes('question')) return "quiz";
    if (lowerTitle.includes('theory') || lowerTitle.includes('musicology')) return "menu_book";
    if (lowerTitle.includes('advanced')) return "star";
    if (lowerTitle.includes('varisai') || lowerTitle.includes('swaravali')) return "queue_music";
    if (lowerTitle.includes('alankaram') || lowerTitle.includes('tala')) return "format_list_numbered";
    if (lowerTitle.includes('geetham') || lowerTitle.includes('kriti') || lowerTitle.includes('varnam')) return "library_music";
    return "library_music";
};

import { AuthModal } from '../auth/AuthModal';
import { SearchDropdown } from '../common/SearchDropdown';

const SUBSCRIBER_EMAIL_KEY = 'askharekrishna-subscriber-email';
const SUBSCRIBER_NAME_KEY = 'askharekrishna-subscriber-name';
const SUBSCRIBER_PICTURE_KEY = 'askharekrishna-subscriber-picture';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPicture, setUserPicture] = useState<string>('');
    const [userInitial, setUserInitial] = useState<string | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const userButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const syncUser = () => {
            const savedName = window.localStorage.getItem(SUBSCRIBER_NAME_KEY) || '';
            const savedEmail = window.localStorage.getItem(SUBSCRIBER_EMAIL_KEY) || '';
            const savedPic = window.localStorage.getItem(SUBSCRIBER_PICTURE_KEY) || '';
            const display = (savedName || savedEmail).trim();
            setUserName(savedName);
            setUserEmail(savedEmail);
            setUserPicture(savedPic);
            setUserInitial(display ? display.charAt(0).toUpperCase() : null);
        };

        syncUser();
        window.addEventListener('subscriber-updated', syncUser);
        window.addEventListener('storage', syncUser);
        return () => {
            window.removeEventListener('subscriber-updated', syncUser);
            window.removeEventListener('storage', syncUser);
        };
    }, []);

    const handleSignOut = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(SUBSCRIBER_NAME_KEY);
            window.localStorage.removeItem(SUBSCRIBER_EMAIL_KEY);
            window.localStorage.removeItem(SUBSCRIBER_PICTURE_KEY);
            window.dispatchEvent(new Event('subscriber-updated'));
        }
        setIsUserMenuOpen(false);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE_URL}/carnatic-categories/`);
                let data: CategoryItem[] = Array.isArray(res.data) ? res.data : (res.data.results || []);
                data = data.sort((a, b) => (a.order || 0) - (b.order || 0));
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories for menu:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Close dropdown on click outside or escape key
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node) &&
                userButtonRef.current &&
                !userButtonRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                setIsUserMenuOpen(false);
            }
        };

        if (isMenuOpen || isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen, isUserMenuOpen]);

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-primary/10 px-4 py-3 flex items-center justify-between relative gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
                <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        local_florist
                    </span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-primary hidden sm:block">Home</h1>
            </Link>

            {/* Top Navigation Fuzzy Search with Typo Tolerance */}
            <SearchDropdown />

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    aria-label="Toggle theme"
                >
                    <span className="material-symbols-outlined">
                        {theme === 'light' ? 'dark_mode' : 'light_mode'}
                    </span>
                </button>

                {/* User Auth Button */}
                <div className="relative">
                    {userInitial ? (
                        <button
                            ref={userButtonRef}
                            onClick={() => setIsUserMenuOpen(prev => !prev)}
                            className="size-10 rounded-full bg-primary text-slate-900 font-extrabold text-sm flex items-center justify-center border-2 border-primary/40 shadow-sm overflow-hidden hover:scale-105 transition-transform"
                            title={userName || userEmail || 'User Account'}
                            aria-label="User Account"
                        >
                            {userPicture ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={userPicture}
                                    alt={userName || 'User'}
                                    className="size-full object-cover"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                userInitial
                            )}
                        </button>
                    ) : (
                        <button
                            ref={userButtonRef}
                            onClick={() => setIsAuthOpen(true)}
                            className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                            title="Sign In with Google"
                            aria-label="Sign In with Google"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                person
                            </span>
                        </button>
                    )}

                    {/* User Profile Dropdown Menu */}
                    {isUserMenuOpen && (
                        <div
                            ref={userMenuRef}
                            className="absolute right-0 top-12 w-64 rounded-2xl border border-primary/20 bg-background-light/95 dark:bg-background-dark/95 shadow-2xl backdrop-blur-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
                        >
                            <div className="flex items-center gap-3 pb-3 mb-3 border-b border-primary/10">
                                {userPicture ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={userPicture}
                                        alt={userName || 'User'}
                                        className="size-10 rounded-full object-cover border border-primary/30"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="size-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center border border-primary/30">
                                        {userInitial}
                                    </div>
                                )}
                                <div className="overflow-hidden">
                                    <p className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                                        {userName || 'Devotee'}
                                    </p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                        {userEmail}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">logout</span>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

                {/* Menu Dropdown Toggle Button */}
                <button
                    ref={menuButtonRef}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className={`size-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                        isMenuOpen 
                            ? 'bg-primary text-slate-900 border-primary shadow-md shadow-primary/20 font-bold' 
                            : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                    }`}
                    title="Explore Categories Menu"
                    aria-label="Toggle categories menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="material-symbols-outlined">
                        {isMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            <AuthModal
                open={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSuccess={() => setIsAuthOpen(false)}
            />

            {/* Categories Dropdown Menu */}
            {isMenuOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-4 top-16 w-80 sm:w-96 max-h-[80vh] flex flex-col rounded-3xl border border-primary/20 bg-background-light/95 dark:bg-background-dark/95 shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                >
                    {/* Dropdown Header & Search */}
                    <div className="p-4 border-b border-primary/10 bg-primary/5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl">category</span>
                                <h3 className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white uppercase">
                                    Categories &amp; Syllabus
                                </h3>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                {categories.length} Available
                            </span>
                        </div>

                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search category (e.g. Sarali, Dhattu, Mridanga)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/70 dark:bg-black/30 border border-primary/20 focus:outline-none focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400"
                                autoFocus
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Featured Mridanga Quick Link */}
                    {(!searchTerm || 'mridanga tala percussion daspahira kaharba dadra lofa rupak'.includes(searchTerm.toLowerCase())) && (
                        <div className="p-2 border-b border-primary/10 bg-primary/5">
                            <Link
                                href="/mridanga"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all group"
                            >
                                <div className="size-9 rounded-xl flex items-center justify-center shrink-0 bg-primary text-slate-950 font-bold">
                                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        graphic_eq
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                            Mridanga Lessons Directory
                                        </h4>
                                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary text-slate-900">
                                            Talas &amp; Bols
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                        Daspahira, Kaharba, Dadra, Lofa &amp; more
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-sm text-primary group-hover:translate-x-0.5 transition-all">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    )}

                    {/* Dropdown Category List */}
                    <div className="flex-1 overflow-y-auto p-2 divide-y divide-black/5 dark:divide-white/5 no-scrollbar max-h-[50vh]">
                        {loading && (
                            <div className="p-6 text-center text-xs text-slate-400">
                                Loading categories...
                            </div>
                        )}

                        {!loading && filteredCategories.length === 0 && !('mridanga'.includes(searchTerm.toLowerCase())) && (
                            <div className="p-6 text-center text-xs text-slate-400">
                                No categories found matching &ldquo;{searchTerm}&rdquo;
                            </div>
                        )}

                        {!loading && filteredCategories.map((cat) => {
                            const slug = cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                            const icon = getIconForCategory(cat.name);
                            const itemColor = cat.colorCode && cat.colorCode !== '#000000' ? cat.colorCode : '#f3a735';

                            return (
                                <Link
                                    key={cat.id}
                                    href={`/category/${slug}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-primary/10 transition-colors group"
                                >
                                    <div 
                                        className="size-9 rounded-xl flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-105 transition-transform"
                                        style={{ backgroundColor: `${itemColor}20`, color: itemColor }}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            {icon}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate">
                                            {cat.name}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-400">
                                            Explore lessons
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                                        chevron_right
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Dropdown Footer */}
                    <div className="p-3 border-t border-primary/10 bg-primary/5 flex items-center justify-between text-[11px] font-bold text-primary">
                        <Link 
                            href="/" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-1 hover:underline"
                        >
                            <span className="material-symbols-outlined text-sm">home</span>
                            Home
                        </Link>
                        <span className="text-slate-400 font-normal">Carnatic Music Platform</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
