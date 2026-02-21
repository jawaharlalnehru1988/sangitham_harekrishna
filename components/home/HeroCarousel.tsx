import React from 'react';

const HeroCarousel = () => {
    const slides = [
        {
            id: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKzTel1IjWfa8nr40AIyBPse1D_PP2S16Ze4C0fVuyRwpZ5ec3hkZCmVpm1s1-3LPINxLVK86HtkbRHpA90v-mhNnymg49sQgeDRUxJIKjS05xoIIfS2VfYPYMeSqK5eufywDgGESPp-DtxDfnNeW9oVuAqva9n98296nQ0807wdTBherDngtzmVxsb47QdRqJ_mtdQV1q-qyGZaVTMj4naNL0iCqKRP3633cQBqaaxVHQGZ_p7Ht02oIHYhniFX2xi_C25T-onafg',
            tag: 'Featured Lesson',
            tagColor: 'bg-spiritual-red',
            title: 'Master the Mridangam',
            subtitle: 'Foundational Tala & Rhythm',
        },
        {
            id: 2,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADnaUVeIFzS6Jp6IX7WpLiVSkWyec5y1ZhIOhesdUmTpm5zJ8jst1I7Q_tP9cahniQl7vx70LT5pYg3pRfPMcWrgQoVX1i9wA4Q1oP4SrOPnCRJQSYUOEj37gULCAUZYfXxtXJb5KVWPLfUKk4iNzF6NbHT7kzAZJRZfdAU_xwWmZkJwKHRsRHKdL560sW3tMsmOV2zte5Uqe6tjRuszdyVcz-WwZUHHnZt6qRxdJSPMBqgvLQzuHHsT7KXagSsuP84FufAULVutm3',
            tag: 'Daily Devotion',
            tagColor: 'bg-primary',
            title: 'Soulful Bhajans',
            subtitle: 'Deepen your connection',
        }
    ];

    return (
        <section className="relative px-4 pt-6">
            <div className="overflow-x-auto flex gap-4 snap-x no-scrollbar pb-2">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative min-w-[85%] aspect-[16/10] rounded-xl overflow-hidden snap-center group">
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
            <div className="flex justify-center gap-1.5 mt-4">
                <div className="w-6 h-1.5 rounded-full bg-primary" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
            </div>
        </section>
    );
};

export default HeroCarousel;
