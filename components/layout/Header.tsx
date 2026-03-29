"use client";

import React from 'react';
import Link from 'next/link';
import { useTheme } from '../providers/ThemeProvider';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 glass-effect border-b border-primary/10 px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="bg-primary/20 p-2 rounded-full border border-primary/30">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        local_florist
                    </span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-primary">Home</h1>
            </Link>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    <span className="material-symbols-outlined">
                        {theme === 'light' ? 'dark_mode' : 'light_mode'}
                    </span>
                </button>
                <button className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary">notifications</span>
                </button>
                <div
                    className="size-10 rounded-full bg-cover bg-center border-2 border-primary"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBC_Y97XiN6-jmkNzegHYJGaASA2716DSb1WCaWdgEzhpEujyioqPwAkS6Qet2nuLuV7shYIPBTwbe_Zg6SltUGO6Efb2At-VM1ARHjVcowOaHsv8Zm8R1g5xyOfbmNuYeEpoGcbEDXpUFowDoKKiAnrSZeEkNaSW2Lydk6bFuaOf-kB1Q1RnSpG8UyXwr-XxaXxrYRQq6TQqVc-T2kmi9BGKrMRoV-D4tom1Uh2YPgSLXOPBQJgQ2FfWZ6YAs5QCsJdSzqoECQsbYZ')" }}
                />
            </div>
        </header>
    );
};

export default Header;
