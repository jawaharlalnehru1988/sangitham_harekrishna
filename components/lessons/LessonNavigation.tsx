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
}

export default function LessonNavigation({
    prevLesson,
    nextLesson,
    basePath,
    accentColor = "text-blue-400"
}: LessonNavigationProps) {
    if (!prevLesson && !nextLesson) return null;

    const accentBorder = accentColor.replace('text-', 'border-').replace('400', '500/20');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-white/10">
            {prevLesson ? (
                <Link
                    href={`${basePath}/${prevLesson.id}`}
                    className={`group p-4 rounded-2xl border ${accentBorder} bg-white/5 hover:bg-white/10 transition-all text-left block`}
                >
                    <div className="flex items-center gap-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Previous Lesson
                    </div>
                    <div className="font-bold text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                        {prevLesson.topic}
                    </div>
                </Link>
            ) : <div />}

            {nextLesson ? (
                <Link
                    href={`${basePath}/${nextLesson.id}`}
                    className={`group p-4 rounded-2xl border ${accentBorder} bg-white/5 hover:bg-white/10 transition-all text-right block`}
                >
                    <div className="flex items-center justify-end gap-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Next Lesson
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                    <div className="font-bold text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                        {nextLesson.topic}
                    </div>
                </Link>
            ) : <div />}
        </div>
    );
}
