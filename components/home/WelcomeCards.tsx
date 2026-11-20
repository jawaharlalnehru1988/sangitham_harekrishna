"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface WelcomeCardItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    href: string;
    secondaryHref?: string;
    secondaryLabel?: string;
    badge: string;
    isAvailable: boolean;
    badgeStyle: string;
    accentColor: string;
    icon: string;
}

const WELCOME_CARDS: WelcomeCardItem[] = [
    {
        id: 'carnatic',
        title: 'Welcome to Carnatic Music',
        subtitle: 'Classical South Indian Devotional Tradition',
        description: 'Foundational swara sequences, Sarali, Jantai, Dhattu Varisai, Geethams, Nottuswarams, Ragas, and soul-stirring devotional kirtans.',
        image: '/carnatic_music.jpg',
        href: '/practice',
        badge: 'Available • 50+ Lessons',
        isAvailable: true,
        badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentColor: 'from-amber-500/20 to-orange-500/10',
        icon: 'queue_music',
    },
    {
        id: 'hindustani',
        title: 'Hindustani Classical Vocal',
        subtitle: 'North Indian Classical Devotional Tradition',
        description: 'Vocal culture, Kharaj ka Riyaz, 10 Bhatkhande Thaats, Alankars, Raga Bandishes (Yaman, Bhairav, Bhupali), and sacred Haveli kirtan.',
        image: '/hindustani_sangeet.jpg',
        href: '/hindustani',
        badge: 'Available • 12 Vocal Lessons',
        isAvailable: true,
        badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentColor: 'from-purple-500/20 to-indigo-500/10',
        icon: 'record_voice_over',
    },
    {
        id: 'mridanga',
        title: 'Welcome to Khol Mritanga',
        subtitle: 'Sacred Gaudiya Percussion System',
        description: 'Authentic Sri Khol rhythmic cycles, Daspahira (Prabhupada beat), Kaharba, Dadra, bols, and step-by-step kirtan accompaniment.',
        image: '/khol_mridanga.jpg',
        href: '/mridanga',
        badge: 'Available • Gaudiya Talas',
        isAvailable: true,
        badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentColor: 'from-amber-500/20 to-emerald-500/10',
        icon: 'graphic_eq',
    },
    {
        id: 'kartal',
        title: 'Welcome to Kartal Music',
        subtitle: 'Devotional Karatalas & Hand Cymbals',
        description: 'Traditional bell-metal karatalas, open and closed sound techniques, 1-2-3-4 kirtan rhythm, and accelerando kirtan accompaniment.',
        image: '/kartal_music.jpg',
        href: '/kartal',
        badge: 'Available • All Kirtan Taals',
        isAvailable: true,
        badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentColor: 'from-amber-500/20 to-orange-500/10',
        icon: 'timelapse',
    },
    {
        id: 'harmonium',
        title: 'Welcome to Harmonium Music',
        subtitle: 'Sacred Bellows & Devotional Keys',
        description: 'Step-by-step chronological harmonium mastery: bellows control, 10 thaats, alankars, classical ragas, Vaishnava prayers, and kirtan chords.',
        image: '/harmonium_music.jpg',
        href: '/harmonium',
        badge: 'Available • 12 Chronological Lessons',
        isAvailable: true,
        badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        accentColor: 'from-amber-500/20 to-yellow-500/10',
        icon: 'piano',
    },
];

export default function WelcomeCards() {
    return (
        <section className="px-4 pt-10 sm:pt-14 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="material-symbols-outlined text-sm">temple_hindu</span>
                    <span>Common Devotional Music Platform</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Sacred Musical Traditions &amp; Instruments
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Choose a discipline to master authentic devotional melodies, classical ragas, and sacred Vaishnava percussion dedicated to the pleasure of Lord Krishna.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {WELCOME_CARDS.map((card) => {
                    return (
                        <div
                            key={card.id}
                            className="group relative flex flex-col rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-background-dark/50 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                        >
                            {/* Card Image Banner */}
                            <Link href={card.href} className="relative aspect-[16/10] w-full overflow-hidden block cursor-pointer">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                                
                                {/* Badge Over Image */}
                                <div className="absolute top-3 left-3">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border ${card.badgeStyle}`}>
                                        <span className={`size-1.5 rounded-full ${card.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                                        {card.badge}
                                    </span>
                                </div>

                                {/* Icon on Image */}
                                <div className="absolute top-3 right-3 size-9 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {card.icon}
                                    </span>
                                </div>

                                {/* Subtitle at bottom of image */}
                                <div className="absolute bottom-3 left-3 right-3">
                                    <p className="text-[11px] font-medium text-amber-200/90 tracking-wide">
                                        {card.subtitle}
                                    </p>
                                </div>
                            </Link>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <Link href={card.href} className="block group-hover:text-primary transition-colors">
                                        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                                            {card.title}
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-normal">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center">
                                    <Link
                                        href={card.href}
                                        className={`w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                                            card.isAvailable
                                                ? 'bg-primary text-slate-950 hover:bg-primary-hover shadow-sm shadow-primary/20'
                                                : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20'
                                        }`}
                                    >
                                        <span>{card.isAvailable ? 'Explore Lessons' : 'View Syllabus'}</span>
                                        <span className="material-symbols-outlined text-sm">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
