import React from 'react';

const HeroCarousel = () => {
    const slides = [
        {
            id: 1,
            image: '/music_for_krishna.png',
            tag: 'Divine Purpose',
            tagColor: 'bg-spiritual-red',
            title: 'Music is meant for Pleasing Lord Krishna, other motivations are simple Ahankara',
            subtitle: 'Spiritual sound for the pleasure of the Lord',
        }
    ];

    return (
        <section className="relative px-4 pt-6">
            <div className="overflow-x-auto flex gap-4 snap-x no-scrollbar pb-2">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative min-w-[100%] aspect-[16/10] rounded-xl overflow-hidden snap-center group">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${slide.image}')` }}
                        />
                        <div className="absolute inset-0 gradient-overlay" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className={`${slide.tagColor} text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full text-white mb-2 inline-block`}>
                                {slide.tag}
                            </span>
                            <h2 className="text-2xl font-bold leading-tight">{slide.title}</h2>
                            <p className="text-primary/90 text-sm mt-1">{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Indicators */}
            {slides.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full ${index === 0 ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroCarousel;
