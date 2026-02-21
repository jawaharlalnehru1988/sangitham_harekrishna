import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-8 px-6 pb-12 border-t border-primary/10 pt-8 flex flex-col items-center gap-6">
            <div className="flex gap-8">
                <a className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#">About Us</a>
                <a className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#">Contact</a>
                <a className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#">Community</a>
            </div>
            <div className="flex gap-4">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary/60 border border-primary/10">
                    <span className="material-symbols-outlined text-lg">share</span>
                </div>
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary/60 border border-primary/10">
                    <span className="material-symbols-outlined text-lg">mail</span>
                </div>
            </div>
            <p className="text-[10px] text-slate-600 font-medium text-center leading-loose">
                © 2024 Haribol Carnatic Academy.<br />Spread Devotion through Melodies.
            </p>
        </footer>
    );
};

export default Footer;
