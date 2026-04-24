import React from 'react';
import Link from 'next/link';

interface Lesson {
    id: number;
    topic: string;
}

interface LessonNavigationProps {
    prevLesson: Lesson | null;
    nextLesson: Lesson | null;
    basePath: string;
    accentColor?: string;
    darkAccentColor?: string;
    customColor?: string;
}

const hexToRgba = (hex: string, opacity: number) => {
    if (!hex || !hex.startsWith('#')) return `rgba(99, 102, 241, ${opacity})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function LessonNavigation({
    prevLesson,
    nextLesson,
    basePath,
    accentColor = "text-blue-600",
    darkAccentColor = "dark:text-blue-300",
    customColor
}: LessonNavigationProps) {
    if (!prevLesson && !nextLesson) return null;

    const accentBorder = accentColor.replace('text-', 'border-').replace('400', '500/20');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-black/5 dark:border-white/10">
            {prevLesson ? (
                <Link
                    href={`${basePath}/${prevLesson.id}`}
                    className={`group p-6 rounded-3xl border ${!customColor ? accentBorder : ''} bg-black/5 dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/[0.12] transition-all text-left block shadow-sm dark:shadow-none relative overflow-hidden`}
                    style={customColor ? { borderColor: hexToRgba(customColor, 0.2) } : {}}
                >
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Previous Lesson
                    </div>
                    <div 
                        className={`font-bold text-slate-900 dark:!text-white transition-colors line-clamp-1 text-lg ${!customColor ? `group-hover:!${accentColor.replace('text-', 'text-')} dark:group-hover:!${darkAccentColor.replace('dark:text-', 'text-')}` : ''}`}
                        style={customColor ? { '--hover-color': customColor } as React.CSSProperties : {}}
                    >
                        {prevLesson.topic}
                    </div>
                    <style jsx>{`
                        .group:hover div {
                            color: var(--hover-color) !important;
                        }
                    `}</style>
                </Link>
            ) : <div />}

            {nextLesson ? (
                <Link
                    href={`${basePath}/${nextLesson.id}`}
                    className={`group p-6 rounded-3xl border ${!customColor ? accentBorder : ''} bg-black/5 dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/[0.12] transition-all text-right block shadow-sm dark:shadow-none relative overflow-hidden`}
                    style={customColor ? { borderColor: hexToRgba(customColor, 0.2) } : {}}
                >
                    <div className="flex items-center justify-end gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-300">
                        Next Lesson
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                    <div 
                        className={`font-bold text-slate-900 dark:!text-white transition-colors line-clamp-1 text-lg ${!customColor ? `group-hover:!${accentColor.replace('text-', 'text-')} dark:group-hover:!${darkAccentColor.replace('dark:text-', 'text-')}` : ''}`}
                        style={customColor ? { '--hover-color': customColor } as React.CSSProperties : {}}
                    >
                        {nextLesson.topic}
                    </div>
                </Link>
            ) : <div />}
        </div>
    );
}
