export interface HarmoniumVideo {
    id: string;
    title: string;
    tutor: string;
    description: string;
}

export interface HarmoniumLesson {
    id: string;
    slug: string;
    stageNumber: number;
    title: string;
    subtitle: string;
    categoryName: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    scaleOrRaag: string;
    sargamNotes: string;
    fingerPattern: string;
    description: string;
    curriculumObjectives: string[];
    videos: HarmoniumVideo[];
}

export interface HarmoniumStage {
    id: string;
    stageNumber: number;
    name: string;
    icon: string;
    badge: string;
    description: string;
    lessons: HarmoniumLesson[];
}

export const HARMONIUM_STAGES: HarmoniumStage[] = [
    {
        id: 'stage-1-foundations',
        stageNumber: 1,
        name: 'Stage 1: Anatomy, Bellows, Keys & The 10 Thaats',
        icon: 'tune',
        badge: 'Absolute Beginners',
        description: 'Understand the construction of the harmonium, smooth continuous bellows pumping, keyboard layout (white and black keys), the three octaves (Mandra, Madhya, Taar Saptak), and Bhatkhande 10 foundational Thaats.',
        lessons: [
            {
                id: 'harmonium-intro-anatomy',
                slug: 'anatomy-bellows-pumping-posture',
                stageNumber: 1,
                title: 'Lesson 1: Harmonium Anatomy & Smooth Bellows Pumping',
                subtitle: 'Instrument mechanics, air compression, sitting posture, and steady tone sustainability',
                categoryName: 'Foundations',
                level: 'Beginner',
                scaleOrRaag: 'General Instrument Mechanics',
                sargamNotes: "Continuous drone: Sa - Pa sustained without air dips",
                fingerPattern: 'Left hand handles bellows; right hand remains arched over keys',
                description: 'The foundation of expressive harmonium playing is smooth bellows control. Pumping too abruptly creates jarring swells, while pumping too gently starves the brass reeds of air. Learn the relaxed breathing pumping method while keeping the spine erect.',
                curriculumObjectives: [
                    'Master one-hand bellows pumping with steady inward-outward air resistance.',
                    'Prevent air gasps and volume drops when changing bellows direction.',
                    'Adopt proper sitting ergonomics to avoid lumbar and wrist strain.',
                    'Learn stop-knob adjustments (air stops vs. drone stops).',
                ],
                videos: [
                    {
                        id: '2xtDFynxxbA',
                        title: 'Lesson 1: Introduction to Harmonium Full Course',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Detailed beginner guide to buying, posture, and initial sound production.',
                    },
                    {
                        id: 'nfju0uiRlu8',
                        title: 'Types of Harmonium & Harmonium Buying Tips (Lesson 2)',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Understanding scale changer vs. standard, 2-line vs. 3-line reeds, and bellows styles.',
                    },
                    {
                        id: '1bFRGnXVrGI',
                        title: 'Harmonium Lesson 1 for Beginners in Full: Notes & Touch',
                        tutor: 'Tabla Works',
                        description: 'Foundational introduction to key action and relaxed hand arching.',
                    },
                    {
                        id: 'e2XbEj5RqvE',
                        title: 'Harmonium Lesson 1: Basic To Advanced Course',
                        tutor: 'SUR SANGEET BHAWANIGARH',
                        description: 'Complete hands-on beginner overview for key touch and sound emission.',
                    },
                    {
                        id: '-JrQ7CWBUTU',
                        title: 'Understanding Harmonium Bellows, Air Stops & Drone Stops',
                        tutor: 'Indian Music ART',
                        description: 'Comprehensive guide to air valve stops, internal bellows pressure, and reed chamber maintenance.',
                    },
                    {
                        id: 'vH2TStf7nlw',
                        title: 'Foundational Posture and Bellows Discipline (Introductory Lesson)',
                        tutor: 'Sangeet Pravah World',
                        description: 'How to sit erect, control wrist pressure, and establish smooth continuous airflow without fatigue.',
                    },
                ],
            },
            {
                id: 'harmonium-keyboard-octaves',
                slug: 'keyboard-octaves-white-black-keys',
                stageNumber: 1,
                title: 'Lesson 2: Keyboard Layout & The Three Saptaks',
                subtitle: 'Identifying white and black keys, C# / Safed-1 reference, and navigating Mandra, Madhya & Taar Saptaks',
                categoryName: 'Foundations',
                level: 'Beginner',
                scaleOrRaag: 'Standard Keyboard Map (3.25 Octaves)',
                sargamNotes: "Mandra (Lower .S) | Madhya (Middle S) | Taar (Upper S')",
                fingerPattern: 'Thumb = 1, Index = 2, Middle = 3, Ring = 4, Little = 5',
                description: 'A standard harmonium comprises 39 keys spanning over three octaves. Learn to recognize the recurring 2-black and 3-black key clusters, locate C# (Kali Ek) and C natural (Safed Ek), and effortlessly navigate between the lower, middle, and upper saptaks.',
                curriculumObjectives: [
                    'Identify the 12 chromatic semitones (7 Shuddha, 4 Komal, 1 Teevra).',
                    'Differentiate between Mandra Saptak (dot below), Madhya (middle), and Taar (dot above).',
                    'Number fingers from 1 (Thumb) to 5 (Pinky) for consistent fingering fingermarks.',
                    'Play your first clean single-finger octave scale without looking down.',
                ],
                videos: [
                    {
                        id: 'oxxYf9n-02E',
                        title: 'Complete Harmonium Lesson 1 for Beginners: Keys & Saptak',
                        tutor: 'Harmonium Guru',
                        description: 'Comprehensive breakdown of white keys, black keys, and octave classification.',
                    },
                    {
                        id: 'AJ7Db4X8EIA',
                        title: 'Harmonium Lesson 2: Scale Navigation & Note Placement',
                        tutor: 'Harmonium Guru',
                        description: 'Finger positioning and smooth transitions across key groups.',
                    },
                    {
                        id: 'ywEaz4hdfH0',
                        title: 'Harmonium Lesson 2: Finger Exercises & Touch',
                        tutor: 'SUR SANGEET BHAWANIGARH',
                        description: 'Finger positioning and smooth transitions across key groups.',
                    },
                    {
                        id: 'dS62BFegwZA',
                        title: 'Harmonium Basics: Swara & Saptak (Naming Keys & Octaves)',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Detailed breakdown of keys nomenclature across Mandra, Madhya, and Taar Saptak.',
                    },
                    {
                        id: 'O7Pahja9IGk',
                        title: 'Sargam Morning Riyaz in Middle Octave (Madhya Saptak)',
                        tutor: 'Swaralipi Guru',
                        description: 'Detailed morning vocal and harmonium riyaz across the natural middle octave register.',
                    },
                    {
                        id: 'BZD09VIFqOM',
                        title: 'Learn Harmonium Step by Step: Saptak and Keyboard Mastery',
                        tutor: 'SUR SANGAM',
                        description: 'Overcoming initial hesitation: hands-on navigation of Mandra, Madhya, and Taar keys.',
                    },
                ],
            },
            {
                id: 'harmonium-10-thaats',
                slug: 'the-ten-thaats-of-hindustani-classical-music',
                stageNumber: 1,
                title: 'Lesson 3: The 10 Thaats of Hindustani Classical Music',
                subtitle: 'Bhatkhande parent scale system: Bilawal, Kalyan, Khamaj, Kafi, Asavari, Bhairav, Bhairavi, Todi, Poorvi, Marwa',
                categoryName: 'Foundations',
                level: 'Beginner',
                scaleOrRaag: '10 Parent Thaats (Hindustani Modal Framework)',
                sargamNotes: "Bilawal (all Shuddha) | Kalyan (M#) | Khamaj (n) | Kafi (g, n) | Asavari (g, d, n) | Bhairav (r, d) | Bhairavi (r, g, d, n) | Todi (r, g, M#, d) | Poorvi (r, M#, d) | Marwa (r, M#)",
                fingerPattern: 'Universal scale fingering across all 10 modal parent scales',
                description: 'Pandit Vishnu Narayan Bhatkhande classified all North Indian ragas under 10 foundational parent scales (Thaats). Mastering the note permutations of these 10 thaats on the harmonium unlocks the tonal map for thousands of classical ragas and devotional songs.',
                curriculumObjectives: [
                    'Understand how changing just 1 or 2 komal/teevra notes alters the entire musical scale.',
                    'Play all 10 thaats consecutively from the universal C# (Kali Ek) root note.',
                    'Recognize the distinct emotional rasa produced by each parent scale.',
                ],
                videos: [
                    {
                        id: 'HRXXVa2H58w',
                        title: 'Play All 10 Thaats on Harmonium (Complete Guide)',
                        tutor: 'Indian Music ART',
                        description: 'Comprehensive step-by-step tutorial demonstrating all 10 Thaats with clear finger guidance.',
                    },
                    {
                        id: 'dTo_DxgHlt4',
                        title: 'How To Play 10 Thaat On Harmonium',
                        tutor: 'Harmonium Guru',
                        description: 'Clear sargam notation and hand positions for each parent scale.',
                    },
                    {
                        id: 'rCmuI4gBcw4',
                        title: '10 Thaat on Harmonium: Easily Learn All 10 Thaats',
                        tutor: 'Sikho Saral Harmonium',
                        description: 'Mnemonics and formula tricks to memorize the 10 Thaats easily.',
                    },
                    {
                        id: 'CfK4i1-fZG8',
                        title: '10 Thaats of Indian Classical Music (C# & A Scale)',
                        tutor: 'RiyazTV',
                        description: 'Harmonium demonstration across multiple root pitches.',
                    },
                    {
                        id: 'OmPjckEQhH8',
                        title: '10 Thaat & 12 Pitches Harmonium Practice Masterclass',
                        tutor: 'Sangeet Pravah World',
                        description: 'Step-by-step guidance on practicing Bhatkhande 10 Thaats from all 12 root scale keys.',
                    },
                    {
                        id: '_w4d6BWmVIM',
                        title: '10 Thaats Riyaz: Shuddha, Komal & Teevra Swara Mastery',
                        tutor: 'Sangeet Pravah World',
                        description: 'Systematic finger drills to establish absolute clarity on all 12 musical swaras.',
                    },
                ],
            },
        ],
    },
    {
        id: 'stage-2-alankars',
        stageNumber: 2,
        name: 'Stage 2: Foundational Alankars & Finger Agility',
        icon: 'format_list_numbered',
        badge: 'Swara & Muscle Memory',
        description: 'Systematic scalar exercises (Paltas / Alankars) to develop finger independence, speed transitions, pitch recognition, and singing synchronization (Swara Sadhana).',
        lessons: [
            {
                id: 'harmonium-basic-alankars',
                slug: 'basic-alankar-1-to-5-shuddha-swaras',
                stageNumber: 2,
                title: 'Lesson 4: Basic Alankars 1 to 5 (Shuddha Swaras)',
                subtitle: 'Straight scalar steps, double-note repetitions, and three-note triplets in Bilawal Thaat',
                categoryName: 'Alankars',
                level: 'Beginner',
                scaleOrRaag: 'Bilawal Thaat (Natural Major Scale)',
                sargamNotes: "Aroh: S R G M P D N S' | Avroh: S' N D P M G R S",
                fingerPattern: '1 2 3 1 2 3 4 5 | 5 4 3 2 1 3 2 1',
                description: 'Alankars (ornaments / exercises) train muscle memory and finger dexterity. Alankar 1 establishes clean single swaras; Alankar 2 doubles each swara (SS RR GG MM); Alankar 3 groups triplets (SRG RGM GMP). Practicing these daily with a metronome builds unshakable rhythmic timing.',
                curriculumObjectives: [
                    'Master standard fingering for Bilawal Thaat scale from C / C#.',
                    'Play Alankar 1, 2, and 3 at 60, 80, and 100 BPM without fumbling.',
                    'Coordinate left-hand air flow with right-hand finger releases to avoid choppy notes.',
                    'Sing aloud each swara name simultaneously to tune your vocal pitch to the harmonium.',
                ],
                videos: [
                    {
                        id: 'x3-L91DbWZY',
                        title: 'Sa Re Ga Ma Lesson 1: Basic Alankar & Daily Riyaz',
                        tutor: 'Riyaz Daily',
                        description: 'Foundational single-note and double-note riyaz drills with vocal guidance.',
                    },
                    {
                        id: 'B4HUZdXVgzk',
                        title: 'Sa Re Ga Ma Lesson 2: Two-Note Combination Alankars',
                        tutor: 'Riyaz Daily',
                        description: 'Smooth pairings (SS RR GG, SR RG GM) for finger fluency.',
                    },
                    {
                        id: 'dvBAdW-RFbU',
                        title: '7 Essential Daily Alankars for Swar Gyan & Finger Speed',
                        tutor: 'Harmonium Guru',
                        description: 'Systematic daily practice routine to lock swara recognition and rapid finger movements.',
                    },
                    {
                        id: 'KQhCfCtrAGo',
                        title: 'Complete Harmonium Course For Beginners: Foundation Alankars (Lesson 1)',
                        tutor: 'Harmonium Guru',
                        description: 'Foundational step-by-step masterclass covering finger numbering, key strikes, and basic alankars.',
                    },
                    {
                        id: 'C4kDz7LkzSQ',
                        title: 'First Basic Alankar in Thaat Bilawal from C# & G#',
                        tutor: 'Sangeet Pravah World',
                        description: 'Foundation alankar sequence practicing ascending and descending patterns with clean meter.',
                    },
                    {
                        id: 'zzyjz67pP_s',
                        title: 'Easy Way to Learn Vocal & Sargam Riyaz on Harmonium',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Combining bellows pressure, vocal pitch matching, and single-note alankar precision.',
                    },
                ],
            },
            {
                id: 'harmonium-advanced-paltas',
                slug: 'zig-zag-paltas-and-swara-sadhana',
                stageNumber: 2,
                title: 'Lesson 5: Zig-Zag Paltas & Vocal Swara Sadhana',
                subtitle: 'Skip-note patterns (SG RM GP), reverse folds, and developing absolute pitch alignment',
                categoryName: 'Alankars',
                level: 'Intermediate',
                scaleOrRaag: 'Bilawal / Kalyan Base',
                sargamNotes: "Aroh: S G R M G P M D P N D S' | Avroh: S' D N P D M P G M R G S",
                fingerPattern: 'Cross-finger skipping: 1 3 2 4 1 3 2 4 1 3 2 4',
                description: 'Zig-zag paltas train mental agility and prevent your fingers from relying solely on linear scalar steps. This exercise prepares your ears and hands for real ragas, which frequently employ leaping swara combinations (Vakra and Audava phrasing).',
                curriculumObjectives: [
                    'Execute skip-interval leaps cleanly across all octaves.',
                    'Develop instant swarasthana recognition without second-guessing finger placement.',
                    'Sustain long vowel tones (Aakar Riyaz) matching the harmonium reed harmonics.',
                ],
                videos: [
                    {
                        id: 'QDBDj4Bo0-g',
                        title: 'Sa Re Ga Ma Lesson 3: Three-Note Zig-Zag Alankars',
                        tutor: 'Riyaz Daily',
                        description: 'Triplets and skipping patterns to unlock finger flexibility.',
                    },
                    {
                        id: 'R5Bw3Ua_HFA',
                        title: 'Essential Palta Riyaz Exercise for Building Fast Harmonium Fingers',
                        tutor: 'Harmonium Guru',
                        description: 'Focused workout on 3-finger leaps and cross-octave palta transitions.',
                    },
                    {
                        id: 'zk-l5XqSCz0',
                        title: 'How To Play Fast Harmonium: Daily Fingers Exercise Routine',
                        tutor: 'Harmonium Guru',
                        description: 'Progressive finger drills for rapid kirtan accompaniment and palta agility.',
                    },
                    {
                        id: 'eyfTq3cYDgQ',
                        title: 'Teental Alankar & Palta: How to Build Fast Fingers on Harmonium',
                        tutor: 'Harmonium Guru',
                        description: 'High-tempo finger workout using 4-note permutation combinations in Teental.',
                    },
                    {
                        id: 'eJ_lWqS7PX4',
                        title: 'Fast Hand Direction & Finger Position Secrets on Harmonium',
                        tutor: 'Sur Lahar',
                        description: 'Thumb pivoting and wrist relaxation techniques for effortless speed.',
                    },
                    {
                        id: 'jH6JOowRmBg',
                        title: 'Essential Riyaz Exercise for Building Fast Harmonium Fingers',
                        tutor: 'Harmonium Guru',
                        description: 'Proven daily drill to eliminate finger sluggishness across black and white keys.',
                    },
                ],
            },
        ],
    },
    {
        id: 'stage-3-ragas',
        stageNumber: 3,
        name: 'Stage 3: Classical Ragas on Harmonium (12 Core Ragas)',
        icon: 'music_note',
        badge: 'Hindustani Classical Ragas',
        description: 'Deep dive into 12 major Hindustani classical ragas on the harmonium: Yaman, Bhairav, Bhupali, Bhairavi, Bilawal, Kafi, Khamaj, Bageshri, Darbari Kanada, Asavari, Todi, and Vrindavani Sarang.',
        lessons: [
            {
                id: 'harmonium-raag-yaman',
                slug: 'raag-yaman-evening-devotion-pradosha',
                stageNumber: 3,
                title: 'Lesson 6: Raag Yaman (Kalyan Thaat) - Evening Devotion',
                subtitle: 'Teevra Madhyama (M#), characteristic N-dot R G phrase, and foundational bandish',
                categoryName: 'Classical Ragas',
                level: 'Intermediate',
                scaleOrRaag: 'Raag Yaman / Kalyan Thaat (Sampurna-Sampurna)',
                sargamNotes: "Aroh: Ṇ R G M# D N S' | Avroh: S' N D P M# G R S | Pakad: Ṇ R G , R S , P M# G R S",
                fingerPattern: 'Starting from Mandra Nishi (Ṇ) using finger 2, sliding to R (1) and G (2)',
                description: 'Raag Yaman is revered as the king of evening ragas in Hindustani music and is the foundation for traditional evening melodies and devotional kirtan. It employs Teevra Madhyama (M#) while all other notes remain Shuddha.',
                curriculumObjectives: [
                    'Distinguish Shuddha Madhyama from Teevra Madhyama (M#).',
                    'Master the signature vakra entry: Ṇ R G instead of direct S R G.',
                    'Accompany evening kirtan tunes set in Raag Yaman with proper raga mood (Shanta & Bhakti Rasa).',
                ],
                videos: [
                    {
                        id: 'zz1BmECOoCk',
                        title: 'Raag Yaman (Ai Ri Ali Piya Bin) Beginners Tutorial with Harmonium Notation',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Complete breakdown of aroha, avaroha, pakad, and traditional bandish with written swaralipi.',
                    },
                    {
                        id: '5oMduRreakU',
                        title: 'Raag Yaman Notation, Alaap & Taan Harmonium Guide',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Detailed finger placements, Teevra Ma movements, and classical ornamentation on harmonium.',
                    },
                    {
                        id: '_i5TyP94g00',
                        title: 'Hare Krishna in Raag Yaman: Classical Evening Melodic Flow',
                        tutor: 'Learn Hare Krishna Kirtan',
                        description: 'Step-by-step tutorial applying Raag Yaman to the Hare Krishna Mahamantra.',
                    },
                    {
                        id: 'QNF0MjkkUH4',
                        title: 'Raag Yaman Practice Session with Harmonium Bandish',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Pt. Kuldeep Sagar guides students through aroha, avaroha, pakad, and Chota Khayal bandish.',
                    },
                    {
                        id: '3X6VdR-_rzI',
                        title: '5 Classical Bandishes in Raag Yaman: Complete Harmonium Notation',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Exploring different classical compositions set in Raag Yaman with written sargam.',
                    },
                    {
                        id: 'rw7JiQ1lFh4',
                        title: 'Kalyan Thaat / Major Scale Theory & Swara Mechanics',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Understanding how Teevra Ma alters the acoustic color of the foundational Kalyan scale.',
                    },
                ],
            },
            {
                id: 'harmonium-raag-bhairav',
                slug: 'raag-bhairav-morning-awakening-mangal-arati',
                stageNumber: 3,
                title: 'Lesson 7: Raag Bhairav & Ahir Bhairav - Morning Awakening',
                subtitle: 'Komal Rishabh (r) and Komal Dhaivath (d) with meditative micro-gamakas and Ahir Bhairav folk touches',
                categoryName: 'Classical Ragas',
                level: 'Intermediate',
                scaleOrRaag: 'Raag Bhairav / Bhairav Thaat (Sampurna-Sampurna)',
                sargamNotes: "Aroh: S r G M P d N S' | Avroh: S' N d P M G r S | Pakad: G M d P , G M r S",
                fingerPattern: 'Flattened black-key movements for Komal r (Re flat) and Komal d (Dha flat)',
                description: 'Raag Bhairav is the majestic morning raga of deep sobriety and spiritual awakening. Sung before dawn (Brahma Muhurta / Mangala Arati), its solemn oscillations on Komal Re and Komal Dha invoke profound reverence and humility.',
                curriculumObjectives: [
                    'Accurately locate and articulate Komal Re (r) and Komal Dha (d).',
                    'Practice steady vibrato and finger weight on komal notes to mirror vocal andolita gamakas.',
                    'Play the iconic Mangala Arati morning phrase progression with ease.',
                ],
                videos: [
                    {
                        id: 'YS05jZ5pd0k',
                        title: 'Learn Raag Bhairav: Introduction & Swaravistara',
                        tutor: 'Indian Music ART',
                        description: 'Full demonstration of Bhairav characteristics and swara sancharas.',
                    },
                    {
                        id: 'bJp_8Rktoi8',
                        title: 'Raag Nat Bhairav Tutorial for Beginners with Swaralipi',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Pt. Kuldeep Sagar guides learners through Nat Bhairav swaras, pakad, and Chota Khayal bandish.',
                    },
                    {
                        id: 'Zz1Wq3T5QmM',
                        title: 'Raag Ahir Bhairav on Harmonium (Aroh, Avroh & Songs)',
                        tutor: 'Harmonium Guru',
                        description: 'Mastering the popular Ahir Bhairav morning scale.',
                    },
                    {
                        id: 'uJGUefroHWo',
                        title: 'Raag Bhairav: Jago Mohan Pyare (Beginners Bandish Tutorial)',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Classic morning composition broken down note by note with micro-gamakas on Komal Re and Dha.',
                    },
                    {
                        id: '6ae2ntjzkuM',
                        title: 'Raag Bhairav: Aavo Aavo Braj Raj Dulare (Harmonium Breakdown)',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Devotional morning bandish emphasizing the solemn oscillating andolan on Dhaivat.',
                    },
                    {
                        id: 'smjH9Yl4a_E',
                        title: 'Raag Bhairav Harmonium Tutorial with Notation in Tintal',
                        tutor: 'Moumita Mitra',
                        description: 'Step-by-step sargam guide for aroha, avaroha, and bandish performance in 16-beat Tintal.',
                    },
                ],
            },
            {
                id: 'harmonium-raag-bhupali-bilawal',
                slug: 'raag-bhupali-and-bilawal-foundations',
                stageNumber: 3,
                title: 'Lesson 8: Raag Bhupali & Raag Bilawal - Joyful Luminosity',
                subtitle: 'Pentatonic Audava majesty (Bhoop: S R G P D) and the pristine Shuddha scale of Bilawal',
                categoryName: 'Classical Ragas',
                level: 'Intermediate',
                scaleOrRaag: 'Raag Bhupali (Audava-Audava) & Raag Bilawal (Sampurna)',
                sargamNotes: "Bhupali: S R G P D S' | Avroh: S' D P G R S | Bilawal: S R G M P D N S'",
                fingerPattern: 'Bhupali omits Ma and Ni; clean thumb tucks under middle finger on G',
                description: 'Raag Bhupali creates an uplifting, divine mood of peace and clarity. Because it omits Ma and Ni, every swara rings out cleanly. Paired with Raag Bilawal, these two ragas represent the bright, daylight majesty of pure notes.',
                curriculumObjectives: [
                    'Master pentatonic skipping across all 3 octaves without brushing silent keys.',
                    'Understand Vadi Gandhar (G) and Samvadi Dhaivath (D) in Bhupali.',
                    'Play pure Bilawal bandish and joyful devotional melodies.',
                ],
                videos: [
                    {
                        id: '8cqKqRiR32s',
                        title: 'Raag Bhoopali Chords & Melodic Progression Tutorial',
                        tutor: 'Harmonium Guru',
                        description: 'Detailed lesson on Raag Bhoopali chord voicings and melodic phrase structures.',
                    },
                    {
                        id: 'bpqjwUXtI3M',
                        title: 'Raag Bilawal Introduction & Swaramalika on Harmonium',
                        tutor: 'Soulfull Sangeet',
                        description: 'Mastering the natural shuddha scale and traditional swaramalika.',
                    },
                    {
                        id: 'PTZAy33Wj88',
                        title: 'Raag Bhopali for Beginners of Hindustani Music',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Pentatonic Audava-Audava scale (S R G P D) structure, rules, and fundamental sancharas.',
                    },
                    {
                        id: 'xJ5ym5-y4Hc',
                        title: 'Raag Bhopali Practice Session & Bandish with Students',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Chota Khayal composition in Teental demonstrated with vocal and harmonium accompaniment.',
                    },
                    {
                        id: 'nSTGdwjZWIw',
                        title: 'Raag Bhupali: Aaroh, Avroh, Pakad & Chhota Khayal in Teental',
                        tutor: 'BMD Music Academy',
                        description: 'Classic phrase transitions avoiding Ma and Ni, cultivating the joyful, bright Bhupali mood.',
                    },
                    {
                        id: 'Ku99rdSS8vg',
                        title: 'Bilawal Thaat & White/Black Scale Transposition on Harmonium',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Mastering the all-Shuddha Bilawal scale across multiple root positions.',
                    },
                ],
            },
            {
                id: 'harmonium-raag-kafi-khamaj-desh',
                slug: 'raag-kafi-khamaj-and-desh-sweet-pastoral',
                stageNumber: 3,
                title: 'Lesson 9: Raag Kafi, Khamaj & Desh - Sweet Pastoral Melodies',
                subtitle: 'Komal Ga and Ni (Kafi), Shuddha/Komal Ni duality (Khamaj), and monsoon longing (Desh)',
                categoryName: 'Classical Ragas',
                level: 'Intermediate',
                scaleOrRaag: 'Kafi Thaat & Khamaj Thaat Janyams',
                sargamNotes: "Kafi: S R g M P D n S' | Khamaj: S G M P D N S' (Avroh: S' n D P M G R S) | Desh: R M P N S' (Avroh: S' n D P M G R S)",
                fingerPattern: 'Fluid black-key toggling between Komal n (flat) and Shuddha N (natural)',
                description: 'Kafi, Khamaj, and Desh are the sweet pastoral ragas of Braj and Vrindavan, depicting Sri Krishna playing his flute amongst the cows and gopis. Their characteristic shifts between flat and natural notes produce touching madhurya rasa.',
                curriculumObjectives: [
                    'Articulate the difference between Komal n in descent and Shuddha N in ascent (Khamaj & Desh).',
                    'Accompany traditional Holi, Jhulan, and Vrindavan pastoral kirtan melodies.',
                    'Play sweet meend glides using smooth key finger releases.',
                ],
                videos: [
                    {
                        id: 'cKUh5IOwG_k',
                        title: 'Raag Kafi Details: Aroh, Avroh & Pakad with Sargam',
                        tutor: 'CHAUDHARY BROTHERS',
                        description: 'Detailed analysis of Kafi phrases and devotional applications.',
                    },
                    {
                        id: 'NfAOTvIxxi8',
                        title: 'Raag Khamaj Details: Aroh, Avroh, Pakad with Sargam',
                        tutor: 'CHAUDHARY BROTHERS',
                        description: 'Handling the dual Nishads (Komal and Shuddha) effortlessly.',
                    },
                    {
                        id: 'Nzw5yKswi0g',
                        title: 'Raag Desh Hindustani Classical Harmonium Lesson',
                        tutor: 'The Harmonium Guru Sharma',
                        description: 'Romantic and devotional monsoon phrases on harmonium.',
                    },
                    {
                        id: 'bx26VR1Sklw',
                        title: 'Raag Vrindavani Sarang Harmonium Tutorial',
                        tutor: 'Make Gujarati Musician',
                        description: 'Iconic noon raga of Vrindavan with double Nishads.',
                    },
                    {
                        id: 'eqxCsXdx94k',
                        title: 'Raag Khamaj for Beginners with Full Harmonium Sargam',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Mastering the dual Nishad usage: Shuddha Ni in aroha and Komal ni in avaroha.',
                    },
                    {
                        id: 'gOailB9_vEw',
                        title: 'Raag Khamaj Devotional Bandish: Naman Karoon Main',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Sweet Thumri-ang melodic flow and graceful finger glides characteristic of Raag Khamaj.',
                    },
                ],
            },
            {
                id: 'harmonium-raag-bhairavi-bageshri-asavari',
                slug: 'raag-bhairavi-bageshri-asavari-deep-devotion',
                stageNumber: 3,
                title: 'Lesson 10: Raag Bhairavi, Bageshri & Asavari - Deep Bhakti',
                subtitle: 'Universal surrender (Bhairavi: all Komal), midnight yearning (Bageshri), and solemn pathos (Asavari)',
                categoryName: 'Classical Ragas',
                level: 'Advanced',
                scaleOrRaag: 'Komal Scale Super-Group (Bhairavi, Kafi, Asavari Thaats)',
                sargamNotes: "Bhairavi: S r g M P d n S' | Bageshri: S g M D n S' | Asavari: S R M P d S' (Avroh: S' n d P M g R S)",
                fingerPattern: 'Mastery over all 4 flat keys (r, g, d, n) in fast runs and meditative meends',
                description: 'Raag Bhairavi is universally sung at the conclusion of every Indian classical and devotional concert to signify total surrender (Sharanagati). Combined with the meditative midnight romance of Raag Bageshri and the renounced pathos of Raag Asavari, this represents high classical maturity.',
                curriculumObjectives: [
                    'Execute rapid runs across all four komal keys simultaneously in Bhairavi.',
                    'Master the vakra jumping phrase of Bageshri (M D n D, M g R S).',
                    'Accompany concluding temple aratis with deep humility and devotion.',
                ],
                videos: [
                    {
                        id: 'g1l_QbHu1fA',
                        title: 'Raag Bhairavi Complete Harmonium Lesson with Notation',
                        tutor: 'Harmonium Guru',
                        description: 'Detailed explanation of all 4 Komal swaras, aroha-avaroha, and classical bandish.',
                    },
                    {
                        id: 'vizT71zmDJc',
                        title: 'Raag Bageshri on Harmonium (Full Lesson with Notes)',
                        tutor: 'Radhika Musician',
                        description: 'Midnight raga of profound yearning with detailed sargam.',
                    },
                    {
                        id: 'DWhQsGgM_NY',
                        title: 'Raag Asavari Detailed Harmonium Lesson',
                        tutor: 'Raag Rang Harmonium',
                        description: 'Solemn and renounced morning raga sancharas on harmonium.',
                    },
                    {
                        id: 'KT_MKZntFrw',
                        title: 'Raag Kedar Harmonium Lesson: Classical Kalyan-Ang Kirtan Melody',
                        tutor: 'ISKCON Bloomington',
                        description: 'Majestic Kalyan-ang raga with both Shuddha and Teevra Ma.',
                    },
                    {
                        id: 'E6OcSAhD_4I',
                        title: 'Raag Bhairavi: Dagar Chalat Chhede (Harmonium Bandish)',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'The queen of concluding ragas: all four komal notes (r, g, d, n) explained in depth.',
                    },
                    {
                        id: 'oZvr3BCF4Ig',
                        title: 'Raag Bhairavi Classical Sargam & Bandish Performance',
                        tutor: 'Harmonium Guru',
                        description: 'Step-by-step guidance on playing traditional Bhairavi sargam patterns and bandishes.',
                    },
                ],
            },
            {
                id: 'harmonium-raag-darbari-todi-malkauns',
                slug: 'raag-darbari-todi-malkauns-grand-mastery',
                stageNumber: 3,
                title: 'Lesson 11: Raag Darbari, Todi & Malkauns - Majestic Classical Mastery',
                subtitle: 'Royal resonance (Darbari Kanada), sovereign morning meditation (Todi), and midnight power (Malkauns)',
                categoryName: 'Classical Ragas',
                level: 'Advanced',
                scaleOrRaag: 'Asavari, Todi, and Bhairavi Thaat Masterworks',
                sargamNotes: "Darbari: S R g M P d n S' (Mandra depth) | Todi: S r g M# d N S' | Malkauns: S g M d n S' (Audava without R and P)",
                fingerPattern: 'Deep bass octave (Mandra Saptak) resonance and microtone trembling',
                description: 'Darbari Kanada (composed by Mian Tansen for Emperor Akbar), Todi (supreme morning depth with r, g, M#, d), and Malkauns (ancient Shaivite/Vaishnava midnight trance) are among the most serious and awe-inspiring ragas in Indian music.',
                curriculumObjectives: [
                    'Cultivate heavy, majestic touch on low Mandra keys for Darbari Kanada.',
                    'Differentiate the singular scale of Todi with Komal Re/Ga and Teevra Ma.',
                    'Play the powerful 5-note pentatonic scale of Malkauns without grazing R or P.',
                ],
                videos: [
                    {
                        id: '4gs2ogefbyY',
                        title: 'Raag Darbari Kanada Tutorial for Beginners with Notation',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Majestic royal phrases and slow vilambit movements on harmonium.',
                    },
                    {
                        id: 'FqaNDXrukkg',
                        title: 'Raag Todi Beginners Tutorial with Notation (Ab Mori Naiyya Paar)',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Unraveling the unique Komal Re/Ga, Teevra Ma, and Komal Dha combinations of Todi with full notation.',
                    },
                    {
                        id: 'mSF3mo5YHPQ',
                        title: 'Raag Malkauns Aroh Avroh & Swara Patterns',
                        tutor: 'I Love Kirtan',
                        description: 'Midnight pentatonic scale analysis and devotional sargams.',
                    },
                    {
                        id: 'No37oa3_YcA',
                        title: 'Raag Marwa Tutorial for Beginners with Full Sargam',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Pt. Kuldeep Sagar explains dusk raga Marwa with Komal Re and Teevra Ma omitting Pa.',
                    },
                    {
                        id: 'XkDFxSiyda0',
                        title: 'Raag Poorvi with Notation for Beginners',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Twilight raga using both Shuddha and Teevra Madhyama with Komal Re and Dha.',
                    },
                    {
                        id: 'sxcBsvRsOwo',
                        title: 'Raag Malkauns: Chota Khayal, Alaap & Taan Harmonium Tutorial',
                        tutor: 'Alaap Music Academy, Chennai',
                        description: 'Ancient Audava midnight raga omitting R and P; heavy low-register gamakas and rapid taan patterns.',
                    },
                ],
            },
        ],
    },
    {
        id: 'stage-4-bhajans',
        stageNumber: 4,
        name: 'Stage 4: Devotional Vaishnava Prayers & Bhajans',
        icon: 'temple_hindu',
        badge: 'Authentic Temple Prayers',
        description: 'Learn the exact note-by-note harmonium accompaniments for canonical Gaudiya Vaishnava prayers: Jaya Radha Madhava, Damodarashtakam, Sri Gurvastakam, Gaura Arati, Narasimha Prayers, Gopinath, and Radha Kripa Kataksha.',
        lessons: [
            {
                id: 'harmonium-jaya-radha-madhava',
                slug: 'jaya-radha-madhava-notes-and-accompaniment',
                stageNumber: 4,
                title: 'Lesson 12: Jaya Radha Madhava - Complete Harmonium Notes',
                subtitle: 'Traditional sacred invocation: note-by-note sargam and gentle accompaniment',
                categoryName: 'Vaishnava Bhajans',
                level: 'Intermediate',
                scaleOrRaag: 'Kafi / Bilawal Mix (Sung traditionally from C# or D)',
                sargamNotes: "S S R G , - R G R S | S R G M P , - P D P M G R",
                fingerPattern: 'Arched thumb and middle finger pivots for smooth syllable delivery',
                description: 'Composed by Srila Bhaktivinoda Thakura, this immortal prayer is traditionally sung in Mishra Kafi and Bilawal scales. Learn to play both the single-note melody and the soft accompanying drone pads.',
                curriculumObjectives: [
                    'Play the complete Pallavi and Anupallavi of Jaya Radha Madhava flawlessly.',
                    'Coordinate singing the sacred lyrics simultaneously while sustaining the bellows.',
                    'Switch between slow meditative tempo and celebratory double speed.',
                ],
                videos: [
                    {
                        id: 'T6BOIVHU_J8',
                        title: 'Harmonium Notation for Jaya Radha Madhav (Lesson 12)',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Note-by-note tutorial with onscreen notation graphics.',
                    },
                    {
                        id: '0CtnQ-JU8yQ',
                        title: 'Jai Radha Madhav Jai Kunj Bihari Easy Tutorial',
                        tutor: 'Sharma Sargam',
                        description: 'Slow-motion key demonstration with syllable-by-syllable breakdown.',
                    },
                    {
                        id: '-8bTohzA5uc',
                        title: 'Jai Radha Madhava / Chords Simple',
                        tutor: 'Gaura Vani Music',
                        description: 'Harmonium chord voicing and vocal accompaniment technique.',
                    },
                    {
                        id: 'P0MnVLF1bHI',
                        title: 'Harmonium Tutorials on Sacred Bhajans: Jaya Radha Madhav',
                        tutor: 'Hare Krsna TV',
                        description: 'Clear finger movements, sargam guide, and lyric synchronization for the famous prayer.',
                    },
                    {
                        id: '_pNfLI5dl_U',
                        title: 'Jaya Radha Madhava on Harmonium: 3-Chord Voicings & Pads',
                        tutor: 'Citralekha Dasi',
                        description: 'How to support this immortal prayer with lush sustained triads and smooth bellows transitions.',
                    },
                    {
                        id: 'lH-OeRdO3Yo',
                        title: 'Traditional Melodic Variations of Jaya Radha Madhava on Harmonium',
                        tutor: 'Learn Hare Krishna Kirtan',
                        description: 'Both slow meditative sthayi phrases and joyous doubled-tempo celebratory rhythms.',
                    },
                ],
            },
            {
                id: 'harmonium-damodarashtakam',
                slug: 'damodarashtakam-kartik-prayers-notes',
                stageNumber: 4,
                title: 'Lesson 13: Sri Damodarashtakam - Kartik Month Prayers',
                subtitle: 'Namamishvaram Sach-chid-ananda-rupam: complete harmonium sargam notation',
                categoryName: 'Vaishnava Bhajans',
                level: 'Intermediate',
                scaleOrRaag: 'Mishra Khamaj / Bilawal (Mandra-Madhya flow)',
                sargamNotes: "S R G G M P | P D P M G R | G M P D P M | G R S , , ,",
                fingerPattern: 'Gentle downward glides capturing the tender lila of mother Yashoda',
                description: 'Spoken by Satyavrata Muni in the Padma Purana, Sri Damodarashtakam is sung daily across all ISKCON temples throughout the holy month of Kartik (Damodara). Master this sweet melody to offer heartfelt deepa-dana prayers.',
                curriculumObjectives: [
                    'Learn the traditional melody for all 8 verses.',
                    'Maintain steady slow rhythm (Vilambit Dadra / Kaharba) while pumping.',
                    'Differentiate the upper register reach in verse 4 and 7.',
                ],
                videos: [
                    {
                        id: '29sESugzzvo',
                        title: 'Damodarastakam Harmonium Lesson: Complete Tutorial',
                        tutor: 'Manjari Manjariml',
                        description: 'Full verse-by-verse breakdown with swara guidance.',
                    },
                    {
                        id: 'GMZIK9zqz1o',
                        title: 'Damodar Ashtakam Part 1 Harmonium Tutorial with Notes',
                        tutor: 'Learn Music with Subhajit',
                        description: 'Crisp keyboard fingering and clear vocal demonstration.',
                    },
                    {
                        id: 'idx_FMmYSxU',
                        title: 'Damodarashtakam Kirtan Training on Harmonium',
                        tutor: 'Jagannatheshwari DD',
                        description: 'Temple standard harmonium notes and accompaniment drill.',
                    },
                    {
                        id: 'EmBYZ0-vnU4',
                        title: 'Sri Damodarashtaka Harmonium Tutorial with Traditional Lofa Taal',
                        tutor: 'PLAY KIRTAN',
                        description: 'Note-by-note tutorial for the canonical Kartika month prayer with on-screen keys and lofa rhythm.',
                    },
                    {
                        id: 'lSGL9Av3f5s',
                        title: 'Sri Damodarashtakam Harmonium Chords & Voice Accompaniment',
                        tutor: 'Citralekha Dasi',
                        description: 'Rich chord inversions and voice-leading techniques for singing along smoothly while playing.',
                    },
                    {
                        id: 'sFyi3rpASo8',
                        title: 'Damodarashtakam Melodic Swaras Tutorial on Harmonium',
                        tutor: 'Learn Music with Subhajit',
                        description: 'Slow-motion finger placement for each line of the eight verses of Sri Damodarashtakam.',
                    },
                ],
            },
            {
                id: 'harmonium-gurvastakam-gaura-arati',
                slug: 'sri-gurvastakam-and-gaura-arati-aratis',
                stageNumber: 4,
                title: 'Lesson 14: Sri Gurvastakam & Gaura Arati Melodies',
                subtitle: 'Samsara-davanala morning prayer and Jaya Jaya Gaurachander evening arati kirtan',
                categoryName: 'Vaishnava Bhajans',
                level: 'Intermediate',
                scaleOrRaag: 'Bhairavi / Kafi Devotional Scales',
                sargamNotes: "Gurvastakam: S R g M P d P M | Gaura Arati: P P D N S' S' N D P",
                fingerPattern: 'Active wrist pivots for responsive temple accompaniment',
                description: 'Sri Gurvastakam (composed by Srila Visvanatha Cakravarti Thakura) and Gaura Arati (composed by Srila Bhaktivinoda Thakura) are the daily pillars of temple worship. Mastering these two compositions equips any devotee to lead temple morning and evening aratis.',
                curriculumObjectives: [
                    'Play the traditional morning Gurvastakam tune with solemn bhakti.',
                    'Play the spirited, dance-inspiring Gaura Arati melody in Kaharba tala.',
                    'Transition smoothly from slow arati tempo into the climactic final chorus.',
                ],
                videos: [
                    {
                        id: 'UThuK5DXZe4',
                        title: 'Learn Gaura Arati on Harmonium (Lesson 28)',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Complete Gaura Arati step-by-step tutorial with notation.',
                    },
                    {
                        id: '-4p9r7nT9jg',
                        title: 'Harmonium Tutorial: Samsara Dava (Sri Gurvastakam Chords & Notes)',
                        tutor: 'Citralekha Dasi',
                        description: 'Easy chord voicing and clear fingering for morning arati.',
                    },
                    {
                        id: 'oXTQI5YiDNs',
                        title: 'Sansara Davanala Lidha Loka Harmonium Tutorial',
                        tutor: 'Learn Music with Subhajit',
                        description: 'Traditional Indian classical notation and tempo control.',
                    },
                    {
                        id: '2o3dit6HsyM',
                        title: 'Gaur Aarti Harmonium Notes (Low Pitch & High Pitch)',
                        tutor: 'Tarun Gauranga Das',
                        description: 'Pitch adjustments for male and female lead singers.',
                    },
                    {
                        id: 'HEUTo5YUDEU',
                        title: 'Gaur Aarti Jaya Jaya Gaurachander Harmonium Lesson',
                        tutor: 'Jagannatheshwari DD',
                        description: 'Full kirtan training on harmonium keys.',
                    },
                    {
                        id: 'eM7wKiuvplw',
                        title: 'Gaura Arati Harmonium Tutorial (Jaya Jaya Goracander Aratiko with Chords)',
                        tutor: 'Citralekha Dasi',
                        description: 'Complete accompaniment guide with rhythmic acceleration from slow dadra to ecstatic fast kirtan.',
                    },
                ],
            },
            {
                id: 'harmonium-narasimha-gopinath-radha-kripa',
                slug: 'narasimha-prayers-gopinath-and-radha-kripa',
                stageNumber: 4,
                title: 'Lesson 15: Sri Narasimha Prayers, Gopinath & Radha Kripa Kataksha',
                subtitle: 'Namaste Narasimhaya, Bhaktivinoda Thakura Gopinath, and the lyrical Radha Kripa Kataksha Stotra',
                categoryName: 'Vaishnava Bhajans',
                level: 'Intermediate',
                scaleOrRaag: 'Khamaj / Bilawal / Bhairavi Devotional Framework',
                sargamNotes: "Narasimha: S R G M P , - P D P M G R | Gopinath: S S R G , - R G R S",
                fingerPattern: 'Rapid protective rhythmic pulsations and tender devotional phrasing',
                description: 'Sri Narasimha Pranama protects the devotee from all inner and outer obstacles, Gopinath captures the mood of desperate self-surrender, and Radha Kripa Kataksha invokes the merciful sidelong glance of Srimati Radharani. These compositions form the core devotional repertoire of every Gaudiya harmonium player.',
                curriculumObjectives: [
                    'Play the iconic Namaste Narasimhaya arati tune and Tava Kara Kamala Vare.',
                    'Accompany the heartfelt, weeping cadence of Srila Bhaktivinoda Thakura Gopinath.',
                    'Master the flowing rhythm of Sri Radha Kripa Kataksha Stotra.',
                ],
                videos: [
                    {
                        id: 'TWJ88YIieLw',
                        title: 'How to Play Narasimha Kirtan on Harmonium (Lesson 19)',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Detailed step-by-step notes for daily Narasimha prayers.',
                    },
                    {
                        id: 'WkRxcvFF1ZA',
                        title: 'How to Play Narasimha Arati on Harmonium',
                        tutor: 'Vrinda & Mukunda',
                        description: 'Authentic temple arati accompaniment breakdown.',
                    },
                    {
                        id: 'uA6adU3US4U',
                        title: 'Namaste Narasimhaya ISKCON Aarti Harmonium Tutorial',
                        tutor: 'Learn Music with Subhajit',
                        description: 'Clear note display and finger transitions.',
                    },
                    {
                        id: 'nvTgel00rX4',
                        title: 'Hey Gopinath Mama Nivedana Suno Harmonium Tutorial',
                        tutor: 'Harmonium didi',
                        description: 'Soulful surrender prayer with complete sargam.',
                    },
                    {
                        id: 'GM93tNSdYc4',
                        title: 'Gopinath Mama Nibedana Krishna Kirtan with Notes',
                        tutor: 'Harmonium Tutorial by Paromita',
                        description: 'Beautiful traditional padavali melody on harmonium.',
                    },
                    {
                        id: '99BZsT8TQG4',
                        title: 'Shri Radha Kripa Kataksh Stotra Harmonium Notes',
                        tutor: 'Nitika Chawla',
                        description: 'Easy tutorial with onscreen sargam notation.',
                    },
                    {
                        id: 'stiX9c6LvJI',
                        title: 'Radha Kripa Kataksha Stotram on Harmonium',
                        tutor: 'Learn Hare Krishna Kirtan',
                        description: 'Melodious Vrindavan mood accompaniment tutorial.',
                    },
                    {
                        id: 'uiA6xSHhH4U',
                        title: 'How to Play Hey Govinda on Harmonium',
                        tutor: 'The Harmonium Course',
                        description: 'Tender prayer accompaniment for evening bhajans.',
                    },
                    {
                        id: 'fMQXKZ9xbhg',
                        title: 'Shri Narsimha Pranam - Traditional Temple Harmonium Tutorial',
                        tutor: 'Learn Hare Krishna Kirtan',
                        description: 'Note-by-note tutorial for Namaste Narasimhaya and Tavakara Kamala Vare with full chords.',
                    },
                ],
            },
        ],
    },
    {
        id: 'stage-5-chords-kirtan',
        stageNumber: 5,
        name: 'Stage 5: Mahamantra Tunes, Chords & Dynamic Kirtan',
        icon: 'celebration',
        badge: 'Ecstatic Kirtan & Chords',
        description: 'Take your playing to the next level: multi-finger chord inversions, drone harmonies, accelerating tempo transitions, and mastering classical Hare Krishna raga melodies.',
        lessons: [
            {
                id: 'harmonium-chords-accompaniment',
                slug: 'harmonium-chords-and-drone-harmonies',
                stageNumber: 5,
                title: 'Lesson 16: Harmonium Chords & Drone Voicings',
                subtitle: 'Major and minor triads, smooth chord inversions, and sustaining lush acoustic beds',
                categoryName: 'Chords & Kirtan',
                level: 'Advanced',
                scaleOrRaag: 'Triad Harmony System (Root, Third, Fifth)',
                sargamNotes: 'Sa-Ga-Pa (Major) | Sa-ga-Pa (Minor) | Pa-Re-Dha',
                fingerPattern: 'Fingers 1, 2, 4 or 1, 3, 5 for ergonomic chord grip',
                description: 'Instead of playing only single-note melody lines, modern kirtan masters use 3-finger chord beds to support the lead singer. Learn how to invert chords so your hand glides smoothly between chords without jumping across the keyboard.',
                curriculumObjectives: [
                    'Construct Major (Sa-Ga-Pa) and Minor (Sa-ga-Pa) chords on any root key.',
                    'Master root, 1st inversion, and 2nd inversion chord voicings.',
                    'Stop jumping your hand: transition smoothly between adjacent chords with minimal finger motion.',
                ],
                videos: [
                    {
                        id: 'NV4huEK2XDg',
                        title: 'Harmonium Tutorial: Hare Krishna Tune (Using 3 Chords Only)',
                        tutor: 'Citralekha Dasi',
                        description: 'Beautiful modern kirtan chord progression with minimal movement.',
                    },
                    {
                        id: 'NkFKDz6I6DU',
                        title: 'Stop Jumping Between Chords: Smooth Harmonium Transitions',
                        tutor: 'The Harmonium Evolution',
                        description: 'Pro secret for voice leading and inversion ergonomics on harmonium.',
                    },
                    {
                        id: 'KxVCNvbLKeg',
                        title: 'Harmonium Tutorial: Hare Krishna Mahamantra (Chords Only)',
                        tutor: 'Citralekha Dasi',
                        description: 'Lush chord beds that make kirtan singing effortless and rich.',
                    },
                    {
                        id: 'sCPTe4wmaaU',
                        title: 'Harmonium Chords: Major Chords Full Course (Lesson 17)',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Complete in-depth masterclass on major chord construction and finger placement.',
                    },
                    {
                        id: 'lkq5sk4IetA',
                        title: 'Harmonium Tutorial Hare Krishna: Classic Melodic Chords Lesson',
                        tutor: 'Citralekha Dasi',
                        description: 'Detailed tutorial on applying 3-chord voicings to traditional devotional kirtan melodies.',
                    },
                    {
                        id: 'K5-vbuXeVgg',
                        title: 'Major and Minor Chords Formula on Harmonium',
                        tutor: 'Siddhant Pruthi',
                        description: 'Theoretical and practical formula to identify all chords on harmonium keys.',
                    },
                    {
                        id: 'S3aii1tDlCM',
                        title: 'Harmonium Chords Practice & Smooth Voice Leading Method',
                        tutor: 'Harmonium Guru',
                        description: 'Practical exercise routines and finger patterns to play and transition chords effortlessly.',
                    },
                ],
            },
            {
                id: 'harmonium-iconic-mahamantra-tunes',
                slug: 'iconic-hare-krishna-mahamantra-tunes',
                stageNumber: 5,
                title: 'Lesson 17: Iconic Hare Krishna Mahamantra Tunes',
                subtitle: 'Classic descending tune, traditional Vrindavan melodies, and accelerating climaxes',
                categoryName: 'Chords & Kirtan',
                level: 'Advanced',
                scaleOrRaag: 'Mishra Kafi / Yaman / Pahadi',
                sargamNotes: "Descending Classic: P M G R S | P D S' N D P",
                fingerPattern: 'Fast wrist pivoting and rapid rhythmic pulsation during accelerando',
                description: 'The pinnacle of harmonium devotion is accompanying Harinam Sankirtan with clean classical raga progressions in Raag Kafi, Raag Yaman, and Raag Vrindavani Sarang.',
                curriculumObjectives: [
                    'Play the iconic classical descending Hare Krishna melody.',
                    'Learn the soulful Raag Kafi afternoon and Raag Yaman evening Mahamantra tunes.',
                    'Follow the mridanga acceleration smoothly without falling behind the beat.',
                    'Lead the final high-energy kirtan climax and resolve cleanly on the Samam.',
                ],
                videos: [
                    {
                        id: 'Ygd3dc0amrA',
                        title: 'Gaura Teaches Harmonium: Classic Descending Hare Krishna Tune',
                        tutor: 'Gaura Vani Music',
                        description: 'Step-by-step masterclass on the most famous Hare Krishna melody.',
                    },
                    {
                        id: 'YQ8UiUzbUDU',
                        title: 'Learn Beautiful Hare Krishna Mahamantra (Raag Kafi Melody)',
                        tutor: 'Subhajit Harmonium Classes',
                        description: 'Melodious Vrindavan kirtan tune with complete notation.',
                    },
                    {
                        id: 'Qesip4pejbI',
                        title: 'Learn Kirtan on Harmonium with Rhythm (Madhavas Rock Band)',
                        tutor: 'Madhavas Rock Band',
                        description: 'Energetic full-kirtan accompaniment with dynamic tempo shifts.',
                    },
                    {
                        id: 's2HnqsZgeow',
                        title: 'Soulful Devotional Hare Krishna Mahamantra Melody (Raag Desh/Bhairavi)',
                        tutor: 'Subhajit Harmonium Classes',
                        description: 'Soul-stirring devotional melody with detailed finger placement and swara nuances.',
                    },
                    {
                        id: 't48JXotES-k',
                        title: 'Traditional Heart-Touching Hare Krishna Mahamantra Melody',
                        tutor: 'Subhajit Harmonium Classes',
                        description: 'Detailed swara breakdown and rhythm coordination for traditional congregational kirtan.',
                    },
                    {
                        id: 'ejF8wuPYo0g',
                        title: 'Afternoon Devotional Melody in Raag Vrindavani Sarang',
                        tutor: 'Learn Hare Krishna Kirtan',
                        description: 'Devotional midday melody breakdown and chord pads in Raag Vrindavani Sarang.',
                    },
                ],
            },
        ],
    },
];

export const ALL_HARMONIUM_LESSONS: HarmoniumLesson[] = HARMONIUM_STAGES.flatMap((s) => s.lessons);

export function getHarmoniumLessonById(id: string): HarmoniumLesson | undefined {
    return ALL_HARMONIUM_LESSONS.find((l) => l.id === id || l.slug === id);
}

export interface HarmoniumChannelRecommendation {
    channelName: string;
    handle: string;
    channelUrl: string;
    seriesTitle: string;
    seriesUrl: string;
    subscriberBadge: string;
    specialty: string;
    description: string;
    relevantStages: number[];
}

export const RECOMMENDED_HARMONIUM_CHANNELS: HarmoniumChannelRecommendation[] = [
    {
        channelName: 'Harmonium Guru',
        handle: '@HarmoniumGuru',
        channelUrl: 'https://www.youtube.com/@HarmoniumGuru',
        seriesTitle: 'Harmonium Lessons for Beginners (Full Step-by-Step Series)',
        seriesUrl: 'https://www.youtube.com/@HarmoniumGuru/playlists',
        subscriberBadge: '1.8M+ Learners',
        specialty: '10 Bhatkhande Thaats, 32 Alankars, Riyaz & Scale Change',
        description: "India's premier online harmonium learning channel with comprehensive step-by-step video courses covering foundational fingering, sargam drills, scale transposition, and classical raga bandishes.",
        relevantStages: [1, 2, 3],
    },
    {
        channelName: 'Sangeet Pravah World',
        handle: '@sangeetpravahworld',
        channelUrl: 'https://www.youtube.com/@sangeetpravahworld',
        seriesTitle: '10 Thaats & Advanced Alankar Riyaz on Harmonium',
        seriesUrl: 'https://www.youtube.com/@sangeetpravahworld/playlists',
        subscriberBadge: '2M+ Classical Learners',
        specialty: '10 Classical Thaats across 12 Keys, Speed Drills & Swara Sadhana',
        description: 'Prestigious Indian classical music institution led by Pandit Avadhkishor Pandey, providing masterclasses on foundational sargam, thaat mastery across all 12 scales, and rigorous alankar finger speed workouts.',
        relevantStages: [1, 2, 3],
    },
    {
        channelName: 'Alaap Music Academy, Chennai',
        handle: '@AlaapMusicAcademy',
        channelUrl: 'https://www.youtube.com/@AlaapMusicAcademy',
        seriesTitle: 'Classical Ragas on Harmonium with Complete Swaralipi',
        seriesUrl: 'https://www.youtube.com/@AlaapMusicAcademy/playlists',
        subscriberBadge: 'Authentic Classical Academy',
        specialty: 'Raag Darbari, Poorvi, Bhairav & Yaman with Full Sargam Charts',
        description: 'Renowned for systematic academic lessons in Hindustani classical and devotional ragas, featuring on-screen swaralipi notation, aroha-avaroha breakdowns, and pakad sancharas.',
        relevantStages: [3],
    },
    {
        channelName: 'The Harmonium Evolution',
        handle: '@TheHarmoniumEvolution',
        channelUrl: 'https://www.youtube.com/@TheHarmoniumEvolution',
        seriesTitle: 'Harmonium Chord Mastery, Voice Leading & Smooth Inversions',
        seriesUrl: 'https://www.youtube.com/@TheHarmoniumEvolution/playlists',
        subscriberBadge: 'Harmony Specialist',
        specialty: 'Triads, Smooth Inversions & Eliminating Hand-Jumping',
        description: 'The definitive channel for learning how to transition from single-key melodies to rich chord voicings, teaching ergonomic hand movement and lush drone beds for kirtan accompaniment.',
        relevantStages: [5],
    },
    {
        channelName: 'Citralekha Dasi',
        handle: '@CitralekhaDasi',
        channelUrl: 'https://www.youtube.com/@CitralekhaDasi',
        seriesTitle: 'Harmonium Chords & Sacred Devotional Prayers Series',
        seriesUrl: 'https://www.youtube.com/@CitralekhaDasi/playlists',
        subscriberBadge: 'Devotional Kirtan Academy',
        specialty: '3-Chord Voicings, Smooth Inversions & Sacred Temple Prayers',
        description: 'Gentle, structured guides for accompanied kirtan singing, 3-finger chord inversions, and step-by-step tutorials for iconic temple prayers like Jaya Radha Madhava and Gaura Arati.',
        relevantStages: [4, 5],
    },
    {
        channelName: 'Learn Hare Krishna Kirtan',
        handle: '@LearnHareKrishnaKirtan',
        channelUrl: 'https://www.youtube.com/@LearnHareKrishnaKirtan',
        seriesTitle: 'Traditional Raga Kirtans & Bellows Control Series',
        seriesUrl: 'https://www.youtube.com/@LearnHareKrishnaKirtan/playlists',
        subscriberBadge: 'Traditional Kirtan Accompaniment',
        specialty: 'Raag Yaman, Kafi, Vrindavani Sarang & Accelerating Tempos',
        description: 'Dedicated to authentic traditional devotional melodies, teaching both single-note raga embellishments and chord pads with mridanga rhythm synchronization.',
        relevantStages: [4, 5],
    },
    {
        channelName: 'Hare Krishna Sanga',
        handle: '@HareKrishnaSanga',
        channelUrl: 'https://www.youtube.com/@HareKrishnaSanga',
        seriesTitle: 'Complete Harmonium Course: Foundations to Advanced Chords',
        seriesUrl: 'https://www.youtube.com/@HareKrishnaSanga/playlists',
        subscriberBadge: 'Comprehensive Curriculum',
        specialty: 'Numbered Lesson Sequence, Graphic Notations & Chord Formula',
        description: 'A comprehensive multi-part harmonium course featuring numbered lesson sequences, detailed graphic notation cards, major/minor chords formulas, and bhajan accompaniments.',
        relevantStages: [1, 2, 4, 5],
    },
    {
        channelName: 'Sharma Sargam',
        handle: '@SharmaSargam',
        channelUrl: 'https://www.youtube.com/@SharmaSargam',
        seriesTitle: 'Easy Harmonium Tutorials & Devotional Songs with Key Indicators',
        seriesUrl: 'https://www.youtube.com/@SharmaSargam/playlists',
        subscriberBadge: 'Simplified Step-by-Step Learning',
        specialty: 'Slow-Motion Key Breakdown, Syllable-by-Syllable Sargam',
        description: 'Ideal for learners who want slow-motion key demonstrations, color-coded notes, and clear vocal-harmonium synchronization for popular bhajans and prayers.',
        relevantStages: [4],
    },
];

export function getRecommendedChannelsForStage(stageNumber: number): HarmoniumChannelRecommendation[] {
    const stageSpecific = RECOMMENDED_HARMONIUM_CHANNELS.filter((c) => c.relevantStages.includes(stageNumber));
    if (stageSpecific.length >= 2) return stageSpecific;
    return RECOMMENDED_HARMONIUM_CHANNELS.slice(0, 4);
}

