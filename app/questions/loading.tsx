import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';

export default function Loading() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-4 w-24 bg-primary/10 rounded mb-4" />
                        <div className="h-8 w-64 bg-primary/10 rounded mb-2" />
                        <div className="h-4 w-full bg-primary/10 rounded" />
                    </div>

                    <div className="grid gap-4 mt-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 rounded-2xl bg-primary/5 border border-primary/10 animate-pulse" />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
