import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';

export default function Loading() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto">
                    <div className="h-4 w-32 bg-blue-500/10 rounded mb-6 animate-pulse" />

                    <div className="mb-8 h-48 rounded-3xl bg-blue-500/5 border border-blue-500/10 animate-pulse flex flex-col justify-end p-6">
                        <div className="h-4 w-20 bg-blue-500/20 rounded mb-4" />
                        <div className="h-10 w-full bg-blue-500/20 rounded" />
                    </div>

                    <div className="space-y-4">
                        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                        <div className="h-4 w-[90%] bg-white/5 rounded animate-pulse" />
                        <div className="h-4 w-[95%] bg-white/5 rounded animate-pulse" />
                        <div className="h-4 w-[85%] bg-white/5 rounded animate-pulse" />
                        <div className="h-64 w-full bg-white/5 rounded-3xl animate-pulse mt-8" />
                    </div>
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
