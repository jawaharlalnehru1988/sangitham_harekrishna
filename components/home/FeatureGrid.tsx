import React from 'react';
import Link from 'next/link';

const FeatureGrid = () => {
    const categories = [
        {
            title: "Question's Answered",
            description: "Find clarity in your musical journey",
            icon: "quiz",
            color: "from-amber-500/20 to-orange-600/20",
            accent: "text-amber-500",
            borderColor: "border-amber-500/20",
            href: "/questions"
        },
        {
            title: "Foundational Lessons",
            description: "Master the basics of Carnatic music",
            icon: "auto_stories",
            color: "from-blue-500/20 to-indigo-600/20",
            accent: "text-blue-400",
            borderColor: "border-blue-500/20",
            href: "#"
        },
        {
            title: "Ragam Lessons",
            description: "Deep dive into melodic structures",
            icon: "music_note",
            color: "from-emerald-500/20 to-teal-600/20",
            accent: "text-emerald-400",
            borderColor: "border-emerald-500/20",
            href: "#"
        },
        {
            title: "Kirtan Lessons",
            description: "Soulful devotional melodies",
            icon: "temple_hindu",
            color: "from-rose-500/20 to-red-600/20",
            accent: "text-rose-400",
            borderColor: "border-rose-500/20",
            href: "#"
        }
    ];

    return (
        <section className="px-4 pt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold tracking-tight">Explore Categories</h3>
                <span className="text-primary text-sm font-bold uppercase tracking-widest cursor-pointer hover:underline">View All</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.href}
                        className={`group relative overflow-hidden rounded-2xl border ${cat.borderColor} bg-gradient-to-br ${cat.color} p-5 transition-all hover:scale-[1.02] active:scale-95`}
                    >
                        {/* Background Pattern/Glow */}
                        <div className={`absolute -right-4 -top-4 size-24 rounded-full bg-current opacity-5 blur-2xl ${cat.accent}`} />

                        <div className="relative z-10 flex h-full flex-col justify-between gap-4">
                            <div className={`flex size-12 items-center justify-center rounded-xl bg-background-dark/40 border border-white/5 shadow-inner ${cat.accent}`}>
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {cat.icon}
                                </span>
                            </div>

                            <div>
                                <h4 className="font-bold text-base leading-tight tracking-tight mb-1 group-hover:text-primary transition-colors">
                                    {cat.title}
                                </h4>
                                <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
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
