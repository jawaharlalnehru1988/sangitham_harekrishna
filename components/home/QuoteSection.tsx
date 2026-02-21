import React from 'react';

const QuoteSection = () => {
    return (
        <section className="px-6 pt-12 pb-6 text-center">
            <span className="material-symbols-outlined text-primary/40 text-4xl">format_quote</span>
            <p className="italic text-lg text-primary/80 font-medium leading-relaxed">
                &quot;Music that is not dedicated to the Divine is just a noise in the material world.&quot;
            </p>
            <div className="mt-4 flex flex-col items-center gap-1">
                <div className="w-8 h-0.5 bg-primary/30" />
                <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Ancient Wisdom</span>
            </div>
        </section>
    );
};

export default QuoteSection;
