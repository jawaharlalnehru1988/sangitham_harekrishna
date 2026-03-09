import React from 'react';

interface OtherSite {
    id: number;
    webUrl: string;
    purpose: string;
    featuresAvailable: string;
}

const getSiteTitle = (url: string) => {
    if (url === 'https://askharekrishna.com') return 'Ask Hare Krishna';
    const domain = url.replace('https://', '').split('.')[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
};

const getSiteIcon = (url: string) => {
    const domain = url.replace('https://', '').split('.')[0];
    switch (domain) {
        case 'ebooks': return 'library_books';
        case 'pancharatra': return 'temple_hindu';
        case 'brahmacharya': return 'self_improvement';
        case 'images': return 'image';
        case 'tamil': return 'translate';
        case 'carnatic': return 'music_note';
        case 'kirtan': return 'queue_music';
        default: return 'public';
    }
};

const getSiteColor = (url: string) => {
    const domain = url.replace('https://', '').split('.')[0];
    switch (domain) {
        case 'ebooks': return 'from-emerald-500/10 to-teal-600/10 border-emerald-500/20';
        case 'pancharatra': return 'from-orange-500/10 to-amber-600/10 border-orange-500/20';
        case 'brahmacharya': return 'from-blue-500/10 to-indigo-600/10 border-blue-500/20';
        case 'images': return 'from-purple-500/10 to-pink-600/10 border-purple-500/20';
        case 'tamil': return 'from-red-500/10 to-orange-600/10 border-red-500/20';
        case 'carnatic': return 'from-yellow-500/10 to-amber-600/10 border-yellow-500/20';
        case 'kirtan': return 'from-rose-500/10 to-red-600/10 border-rose-500/20';
        default: return 'from-slate-500/10 to-slate-600/10 border-slate-500/20';
    }
};

const getIconColor = (url: string) => {
    const domain = url.replace('https://', '').split('.')[0];
    switch (domain) {
        case 'ebooks': return 'text-emerald-500';
        case 'pancharatra': return 'text-orange-500';
        case 'brahmacharya': return 'text-blue-500';
        case 'images': return 'text-purple-500';
        case 'tamil': return 'text-red-500';
        case 'carnatic': return 'text-yellow-600';
        case 'kirtan': return 'text-rose-500';
        default: return 'text-primary';
    }
};

export default async function OtherWebsites() {
    try {
        const res = await fetch('https://api.askharekrishna.com/api/ourOtherSites/', {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            return null; // Don't show anything if API fails
        }

        const sites: OtherSite[] = await res.json();

        return (
            <section className="px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-extrabold tracking-tight">Our Spiritual Network</h3>
                </div>

                <div className="flex flex-col gap-4">
                    {sites.map((site) => (
                        <a
                            key={site.id}
                            href={site.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative overflow-hidden rounded-2xl border ${getSiteColor(site.webUrl)} bg-gradient-to-br p-5 transition-all hover:scale-[1.01] active:scale-[0.99]`}
                        >
                            {/* Subtle background glow */}
                            <div className={`absolute -right-8 -top-8 size-32 rounded-full bg-current opacity-[0.03] blur-3xl ${getIconColor(site.webUrl)}`} />

                            <div className="relative z-10 flex gap-4">
                                <div className={`flex size-14 shrink-0 items-center justify-center rounded-xl bg-background-light dark:bg-background-dark/50 shadow-sm border border-white/10 ${getIconColor(site.webUrl)}`}>
                                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {getSiteIcon(site.webUrl)}
                                    </span>
                                </div>

                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-base leading-tight tracking-tight group-hover:text-primary transition-colors">
                                            {getSiteTitle(site.webUrl)}
                                        </h4>
                                        <span className="material-symbols-outlined text-[14px] opacity-30">open_in_new</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                        {site.purpose}
                                    </p>
                                </div>
                            </div>

                            {/* Feature Tags */}
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {site.featuresAvailable.split(';').map((feature, idx) => (
                                    <span key={idx} className="px-2 py-0.5 rounded-full bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                        {feature.trim()}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('Error fetching ourOtherSites:', error);
        return null; // Don't crash the page if API fails
    }
}
