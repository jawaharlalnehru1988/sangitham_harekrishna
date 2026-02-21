import React from 'react';

const LearningPath = () => {
    return (
        <section className="px-4 pt-10">
            <h3 className="text-lg font-bold tracking-tight mb-4">Continue Learning</h3>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex gap-4 items-center">
                <div
                    className="size-20 bg-cover bg-center rounded-xl shrink-0"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgquJWZ-B3SfeozTzkTV74SRw0maiB-s_yZwISIGK4hYJIDTtC92WoVbuPX7GWAKv9XyV-EoCo6VBfEMOraoGJUBrf2cGy3ldjsrjYgxijsxtufK_CpHmODnaDDHcCpdKQg4viL3UZbOfM0K6KdkY7u16OIGSJguKKRxmnugQwmCZeeHhbvwYsT1V7qFIWAEIo7O0FOUXz_wimW5_lIwVqEJyvdoJNYmccvSPhG1H5ltpL5scEHQOzW5S4FhzV1JXDn8bhpJy1Xl3K')" }}
                />
                <div className="flex-1">
                    <h4 className="font-bold text-base leading-snug">Introduction to Mayamalavagowla</h4>
                    <p className="text-xs text-slate-400 mt-1">Lesson 4 of 12 • 15 mins</p>
                    <div className="w-full h-1.5 bg-primary/20 rounded-full mt-3 overflow-hidden">
                        <div className="w-[45%] h-full bg-primary" />
                    </div>
                </div>
                <button className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                    </span>
                </button>
            </div>
        </section>
    );
};

export default LearningPath;
