import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Loading() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-32 px-4 pt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse mb-8">
                        <div className="h-4 w-24 bg-blue-500/10 rounded mb-4" />
                        <div className="h-8 w-64 bg-blue-500/10 rounded mb-2" />
                        <div className="h-4 w-full bg-blue-500/10 rounded max-w-md" />
                    </div>

                    {/* View Controls Placeholder */}
                    <div className="h-14 w-full bg-blue-500/5 border border-blue-500/10 rounded-2xl mb-8 animate-pulse" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-48 rounded-2xl bg-blue-500/5 border border-blue-500/10 animate-pulse" />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
