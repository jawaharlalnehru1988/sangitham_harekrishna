import React from 'react';

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 inset-x-0 glass-effect border-t border-primary/10 pb-8 pt-3 px-6 z-[60]">
            <div className="flex items-center justify-between">
                <a className="flex flex-col items-center gap-1 group" href="#">
                    <div className="text-primary flex h-8 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            home
                        </span>
                    </div>
                    <p className="text-primary text-[10px] font-bold uppercase tracking-tighter">Home</p>
                </a>
                <a className="flex flex-col items-center gap-1 group opacity-50 hover:opacity-100 transition-opacity" href="#">
                    <div className="text-slate-100 flex h-8 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <p className="text-slate-100 text-[10px] font-bold uppercase tracking-tighter">Learn</p>
                </a>
                {/* Special Center Button */}
                <div className="relative -mt-12">
                    <button className="size-16 rounded-full bg-primary shadow-[0_0_20px_rgba(243,167,53,0.4)] flex items-center justify-center border-4 border-background-dark text-background-dark">
                        <span className="material-symbols-outlined text-3xl font-bold">music_video</span>
                    </button>
                </div>
                <a className="flex flex-col items-center gap-1 group opacity-50 hover:opacity-100 transition-opacity" href="#">
                    <div className="text-slate-100 flex h-8 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">groups</span>
                    </div>
                    <p className="text-slate-100 text-[10px] font-bold uppercase tracking-tighter">Sangha</p>
                </a>
                <a className="flex flex-col items-center gap-1 group opacity-50 hover:opacity-100 transition-opacity" href="#">
                    <div className="text-slate-100 flex h-8 items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">settings</span>
                    </div>
                    <p className="text-slate-100 text-[10px] font-bold uppercase tracking-tighter">Account</p>
                </a>
            </div>
        </nav>
    );
};

export default BottomNav;
