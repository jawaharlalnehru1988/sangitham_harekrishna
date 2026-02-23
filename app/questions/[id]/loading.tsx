import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';

export default function Loading() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-3xl mx-auto animate-pulse">
                    <div className="h-4 w-32 bg-primary/10 rounded mb-6" />

                    <div className="h-48 rounded-3xl bg-primary/5 border border-primary/10 mb-8" />

                    <div className="space-y-4">
                        <div className="h-4 w-full bg-primary/10 rounded" />
                        <div className="h-4 w-5/6 bg-primary/10 rounded" />
                        <div className="h-4 w-4/6 bg-primary/10 rounded" />
                        <div className="h-32 w-full bg-primary/5 rounded-3xl mt-8" />
                    </div>
                </div>
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}
