import React from 'react';

const QuoteSection = () => {
    return (
        <section className="px-6 py-20 text-center max-w-5xl mx-auto mandala-bg relative">
            <div className="flex flex-col items-center mb-10">
                <span className="material-symbols-outlined text-primary/40 text-6xl mb-4 select-none">format_quote</span>
            </div>

            <div className="space-y-8">
                {/* Telugu Original */}
                <h2 className="text-2xl md:text-4xl font-semibold text-primary tracking-wide leading-loose">
                    సంగీత జ్ఞానము భక్తి వినా సన్మార్గము కలదే మనసా
                </h2>

                {/* Transliteration */}
                <p className="text-sm md:text-lg text-primary/60 italic font-medium tracking-wide">
                    Sangīta jñānamu bhakti vinā sanmārgamu galadē manasā
                </p>

                {/* English Meaning */}
                <div className="relative py-8 md:py-12 max-w-3xl mx-auto border-y border-primary/10">
                    <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                        &quot;Knowledge of music without devotion is not the right path, oh mind!&quot;
                    </p>
                </div>

                {/* Philosophical Analogy */}
                <div className="max-w-2xl mx-auto px-6 py-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-sm md:text-base text-foreground/70 leading-relaxed font-inter">
                        Saint Tyagaraja teaches that musical mastery without <span className="text-primary font-bold">Bhakti</span> is merely a material accomplishment — as hollow as decorating a corpse (<span className="italic font-semibold text-primary underline decoration-primary/20 underline-offset-4">shava shobhanaa mataah</span>).
                    </p>
                </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-3">
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold tracking-[0.4em] text-primary uppercase">Saint Tyagaraja</span>
                    <span className="text-[10px] text-primary/50 font-bold uppercase tracking-[0.2em] mt-1">Sangīta jñānamu • Dhanyasi Raga</span>
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;
