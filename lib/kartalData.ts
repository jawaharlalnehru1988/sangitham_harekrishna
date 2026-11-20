export interface KartalVideo {
    id: string;
    title: string;
    tutor: string;
    description: string;
}

export interface KartalLesson {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    taal: string;
    matras: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    rhythmStructure: string;
    bols: string;
    description: string;
    keyPoints: string[];
    videos: KartalVideo[];
}

export interface KartalCategory {
    id: string;
    name: string;
    icon: string;
    badge: string;
    description: string;
    lessons: KartalLesson[];
}

export const KARTAL_CATEGORIES: KartalCategory[] = [
    {
        id: 'foundations',
        name: 'Grip & Acoustic Techniques',
        icon: 'pan_tool',
        badge: 'Fundamental Sound Production',
        description: 'Learn authentic bell-metal karatala finger loops, cord tension adjustments, wrist mechanics, and the two cardinal acoustic sounds: open ringing (Khuli) and muted slap (Bandha).',
        lessons: [
            {
                id: 'kartal-holding-grip',
                slug: 'holding-grip-and-posture',
                title: 'How to Hold Kartals & Hand Mechanics',
                subtitle: 'Finger loops, cord tension, relaxed wrist motion, and sitting/standing postures',
                taal: 'Foundational Mechanics',
                matras: 0,
                level: 'Beginner',
                rhythmStructure: 'Balance between holding hand (left) and striking hand (right)',
                bols: 'Open Ring (Khuli) & Closed Mute (Bandha)',
                description: 'Proper holding technique prevents hand fatigue and allows bell-metal karatalas to chime with full acoustic brilliance. The dominant hand controls the dynamic striking strike, while the non-dominant hand stabilizes the secondary cymbal.',
                keyPoints: [
                    'Secure cord loops firmly around middle fingers without cutting blood circulation.',
                    'Keep wrists loose and flexible; avoid rigid elbow or shoulder tension.',
                    'Hold cymbals at slight angles to prevent harsh air-pocket clashing.',
                    'Dampen immediately with fingers for muted bandha beats.',
                ],
                videos: [
                    {
                        id: 'ySzHNnBhm7o',
                        title: 'Easy Kartal Lesson (English) Lesson 1: How to Hold Kartal',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Systematic breakdown of stringing, finger placement, and wrist posture.',
                    },
                    {
                        id: 'D716mELZ7VQ',
                        title: 'How to Hold Kartals? | Lesson 2',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Practical guide to loop adjustment, balancing, and wrist fluidity.',
                    },
                    {
                        id: 'Ut-pWtvaCdE',
                        title: 'Kartal Lesson 1: How to Hold & Play Basic Beats',
                        tutor: 'Murari Hari Dasa (Bhakti Beats)',
                        description: 'Step-by-step introduction to holding and relaxed rhythmic striking.',
                    },
                    {
                        id: 'O6_ZRSoeZ80',
                        title: 'Easy Kartal Learning 1: How To Hold Kartal',
                        tutor: 'ISKCON Varanasi',
                        description: 'Temple standard tutorial on holding and posture.',
                    },
                ],
            },
            {
                id: 'kartal-open-closed-sounds',
                slug: 'open-khuli-and-closed-bandha-sounds',
                title: 'Open Sound (Khuli) vs. Closed Sound (Bandha)',
                subtitle: 'Mastering the two fundamental acoustic tones of sacred bell-metal karatalas',
                taal: 'Acoustic Tone Production',
                matras: 0,
                level: 'Beginner',
                rhythmStructure: 'Khuli (Open chiming rim strike) vs. Bandha (Flat muted rim dampen)',
                bols: 'Ta (Khuli / Open) - Dhi / Ka (Bandha / Closed)',
                description: 'The soul of karatala playing lies in dynamic contrast between resonant high-frequency chimes (Khuli) and dry, punchy muted taps (Bandha). In Gaudiya Vaishnava sankirtan, this produces the signature rhythmic heartbeat.',
                keyPoints: [
                    'Khuli (Open): Strike rim-to-rim at a 45-degree angle and let both cymbals ring freely.',
                    'Bandha (Closed): Strike flatly while pressing fingertips to immediately choke vibration.',
                    'Practice alternating: Open - Closed - Closed / Open - Closed - Closed.',
                    'Maintain consistent volume without clashing or bending rims.',
                ],
                videos: [
                    {
                        id: 'g4m5BOas4tk',
                        title: 'Easy Kartal Lesson 2: Types of Sound (Khuli & Bandha)',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Clear demonstration of open chiming and closed damping methods.',
                    },
                    {
                        id: '159NsltEMXQ',
                        title: 'Introduction to Kartal Learning & Tone Production',
                        tutor: 'Hare Krishna Sanga',
                        description: 'Foundational exercises for distinct sound clarity and rim dynamics.',
                    },
                ],
            },
        ],
    },
    {
        id: 'daspahira',
        name: 'Daspahira & Prabhupada 1-2-3 Beat',
        icon: 'favorite',
        badge: 'Prabhupada Standard Kirtan Beat',
        description: 'The world-famous Gaudiya Vaishnava kirtan rhythm introduced globally by HDG A.C. Bhaktivedanta Swami Prabhupada. Consists of 1 Open strike followed by 2 or 3 Muted strikes.',
        lessons: [
            {
                id: 'kartal-prabhupada-beat-slow',
                slug: 'prabhupada-beat-slow-vilambit',
                title: 'Slow Prabhupada Beat (1 Open + 2 Closed)',
                subtitle: 'Foundational 3-stroke and 4-beat pattern for morning prayers and meditative bhajans',
                taal: 'Daspahira / 4 Matras (Vilambit Laya)',
                matras: 4,
                level: 'Beginner',
                rhythmStructure: 'Beat 1: Khuli (Open) | Beat 2: Bandha (Closed) | Beat 3: Bandha (Closed) | Beat 4: Rest / Pause',
                bols: '1 (Open) - 2 (Closed) - 3 (Closed) - [Rest]',
                description: 'This is the universal rhythm taught by Srila Prabhupada for all slow bhajans and prayers (Mangala Arati, Samsara-dava, Sri Gurvastakam, Damodarashtakam). Keeping the rest beat steady ensures perfect synchronization with the mridanga.',
                keyPoints: [
                    'Beat 1 is the accent: bright resonant open chime on the Samam.',
                    'Beats 2 and 3 are soft muted strikes damping the chime.',
                    'Count in your mind: 1 (Chime) - 2 (Tap) - 3 (Tap) - 4 (Breathe).',
                    'Practice along with metronome at 60-80 BPM.',
                ],
                videos: [
                    {
                        id: '40bljZEZpWk',
                        title: 'Easy Kartal Lesson 3b: Three Beat Application in Kirtan',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Step-by-step application of 3-beat rhythm in slow bhajans.',
                    },
                    {
                        id: 'G_4WJzZLyX4',
                        title: 'Kartal Very Slow Beat Tutorial (Vilambit Bhajan Beat)',
                        tutor: 'Vaishnava Vibes',
                        description: 'Gentle slow cadence for Sri Damodarashtakam and Gaura Arati.',
                    },
                    {
                        id: 'Dmn2LUvMs5U',
                        title: 'Kartal Lesson 2: Learn 3-Tal & Practice with Kirtan',
                        tutor: 'Murari Hari Dasa (Bhakti Beats)',
                        description: 'Practical song accompaniment for 3-beat cycle.',
                    },
                ],
            },
            {
                id: 'kartal-prabhupada-beat-fast',
                slug: 'prabhupada-beat-fast-druta',
                title: 'Fast Prabhupada Beat (Medium & Up-Tempo Kirtan)',
                subtitle: 'Transitioning the 1-2-3 stroke pattern into brisk, joyful Harinam sankirtan tempo',
                taal: 'Daspahira / Madhyam & Druta Laya',
                matras: 4,
                level: 'Intermediate',
                rhythmStructure: 'Fast syncopated stroke: Open - Closed - Closed in quick triplets or continuous 4s',
                bols: 'TIN - ka - te / KHI - ki - ti',
                description: 'When the kirtan accelerates, the hand motion shifts from forearm movement to wrist flicking. This enables high tempo without loss of precision, driving the ecstatic dancing in temple kirtans.',
                keyPoints: [
                    'Minimize hand travel distance; let fingers bounce naturally.',
                    'Ensure Beat 1 chime remains ringing cleanly despite high speed.',
                    'Do not rush ahead of the lead mridanga player; lock tightly into the groove.',
                    'Maintain breath control and relaxed shoulders.',
                ],
                videos: [
                    {
                        id: 'LtZBe7PmYt0',
                        title: 'How To Play The Fast Beat On Kartals (Watch & Learn)',
                        tutor: 'Kirtan Studios Official',
                        description: 'Master fast tempo wrist flicks and clean rhythmic accents.',
                    },
                    {
                        id: 'FqdSx-nL62I',
                        title: 'How to Play 3-Beat Fast Kartal for Kirtan',
                        tutor: 'Jagannatheshwari DD',
                        description: 'Fast beat mechanics and finger placement drills.',
                    },
                    {
                        id: 'cTLruqONV6c',
                        title: 'Kartal Fast Beat Tutorial (Part 3)',
                        tutor: 'Vaishnava Vibes',
                        description: 'Crisp rhythm transitions from medium to fast kirtans.',
                    },
                    {
                        id: 'UAP5hCwwCcc',
                        title: 'Kartal Lesson 4: 3-Tal Fast Beat & Practice Drills',
                        tutor: 'Murari Hari Dasa (Bhakti Beats)',
                        description: 'Endurance and speed building exercises for temple kirtans.',
                    },
                ],
            },
        ],
    },
    {
        id: 'kaharba',
        name: 'Kaharba Tala (8 Beats & 4 Beats)',
        icon: 'graphic_eq',
        badge: 'Classic 8-Beat Kirtan Rhythm',
        description: 'The versatile 8-matra cycle divided into 4+4, widely utilized across bhajans, Bengali padavali kirtan, and high-energy ecstatic Mahamantra melodies.',
        lessons: [
            {
                id: 'kartal-kaharba-basic-8beat',
                slug: 'kaharba-tala-basic-8-beat',
                title: 'Kaharba Tala - Basic 8-Beat Flow',
                subtitle: 'Classic 8-matra division (4 + 4) for sweet bhajans and Vrindavan melodies',
                taal: 'Kaharba (8 Matras)',
                matras: 8,
                level: 'Beginner',
                rhythmStructure: 'Dha Ge Na Ti | Na Ke Dhi Na -> Kartal: 1 2 3 4 | 5 6 7 8',
                bols: 'Open - Closed - Open - Closed | Open - Closed - Open - Closed',
                description: 'Kaharba is ubiquitous in North Indian and Vaishnava devotional music. On karatalas, the 8-beat cycle allows dynamic accentuation on beats 1 and 5, matching the tabla or mridanga theka.',
                keyPoints: [
                    'Division: 4 beats (Bhari) followed by 4 beats (Khali).',
                    'Accents land on beat 1 (Samam) and beat 5.',
                    'Keep alternating wrist stroke even and melodic.',
                    'Perfect for songs like Radhe Jaya Jaya Madhava Dayite and Jaya Radha Madhava.',
                ],
                videos: [
                    {
                        id: '-_s21i8_jlE',
                        title: 'Kartal Lesson 32: Kaherava Tal Mantra 2 (4-Beat / 8-Beat)',
                        tutor: 'MM',
                        description: 'Systematic traditional breakdown of Kaherava tal strokes.',
                    },
                    {
                        id: 'U38oQg1CT_k',
                        title: 'Kartal Lesson 33: Kaherava Tal Mantra 3',
                        tutor: 'MM',
                        description: 'Intermediate rhythmic subdivisions in Kaharba cycle.',
                    },
                    {
                        id: 'Jzu0x_XHNxk',
                        title: 'Kartal Lesson in Taal Kaharwa (Step-by-Step)',
                        tutor: 'Crazy Haridas',
                        description: 'Traditional Bengali devotional Kaharba playing technique.',
                    },
                ],
            },
            {
                id: 'kartal-kaharba-fast-variations',
                slug: 'kaharba-fast-variations-do-taal',
                title: 'Fast Kaharba & Do-Taal Double Speed Variations',
                subtitle: 'High-speed syncopations, rolling double-beat (Do-Taal), and driving accents',
                taal: 'Kaharba / Do-Taal (Fast)',
                matras: 8,
                level: 'Intermediate',
                rhythmStructure: 'Fast 2-beat/4-beat cyclic pulse with rolling finger damping',
                bols: 'Ta-Ki-Ta-Ki | Dhi-Ki-Ta-Ki',
                description: 'In fast ecstatic bhajans, karatalas shift into Do-Taal (two-beat compressed) or rolling Kaharba pulses. This produces intense rhythmic momentum without drowning the singers.',
                keyPoints: [
                    'Use micro-finger taps for high speed.',
                    'Accentuate every odd beat (1, 3, 5, 7) or the downbeat of each bar.',
                    'Keep cymbals close together for rapid rebounds.',
                ],
                videos: [
                    {
                        id: 'qalrV-oPJ8I',
                        title: '2-Taal Fast Beat Kartal Lesson',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Essential Do-Taal fast strokes for temple kirtan climaxes.',
                    },
                    {
                        id: 'q5uJRPnvCIU',
                        title: 'Kartal Lesson 42: Kaherava Tal Mantra 12 (Fast 4 Beat)',
                        tutor: 'MM',
                        description: 'Fast tempo coordination drills for energetic accompaniment.',
                    },
                    {
                        id: 'yLFY-EvYW5A',
                        title: 'Fast Unique Beat for Kartal Do-Taal Tutorial',
                        tutor: 'Vaishnava Vibes',
                        description: 'Clean variations and wrist speed enhancements.',
                    },
                    {
                        id: 'NKY8gzfhcgA',
                        title: 'Kartal Lesson 41: Kaherava Tal Mantra 11 (Fast Speed)',
                        tutor: 'MM',
                        description: 'Advanced fast variations with crisp accents.',
                    },
                ],
            },
        ],
    },
    {
        id: 'dadra',
        name: 'Dadra Tala & Khemta (6 Beats)',
        icon: 'timer',
        badge: 'Lively 6-Beat Swing & Waltz Rhythm',
        description: 'The rhythmic 6-matra cycle divided into 3+3. Imparts a flowing waltz-like gait to classical Vaishnava bhajans and traditional Bengali padavali kirtan.',
        lessons: [
            {
                id: 'kartal-dadra-6beat',
                slug: 'dadra-tala-6-beat-foundations',
                title: 'Dadra Tala - 6-Beat Rhythm (3 + 3 Division)',
                subtitle: 'Waltz-like devotional cycle for meditative bhajans and lilting prayers',
                taal: 'Dadra (6 Matras)',
                matras: 6,
                level: 'Intermediate',
                rhythmStructure: '1 - 2 - 3 | 4 - 5 - 6 (Dha Dhi Na | Dha Ti Na)',
                bols: 'Khuli - Bandha - Bandha | Khuli - Bandha - Bandha',
                description: 'Dadra has two distinct vibhags of 3 beats each. On karatalas, beat 1 is a strong open chime, beats 2 and 3 are soft muted taps; beat 4 is a secondary open or semi-open chime, followed by muted 5 and 6.',
                keyPoints: [
                    'Structure: 3 beats (Bhari) + 3 beats (Khali).',
                    'Accents land gracefully on Beat 1 and Beat 4.',
                    'Cultivate a smooth lilting sway; avoid rigid robotic counting.',
                    'Ideal for bhajans like Sri Rupa Manjari Pada and Nitai Pada Kamala.',
                ],
                videos: [
                    {
                        id: 'AigjA1w-GxI',
                        title: 'Kartal Lesson 43: Dadra Tal Mantra 1 (6 Beat)',
                        tutor: 'MM',
                        description: 'Foundation course for 6-beat Dadra cycle on karatalas.',
                    },
                    {
                        id: 'aqErZUpjEvo',
                        title: 'Kartal Lesson 44: Dadra Tal Mantra 2 (6 Beat)',
                        tutor: 'MM',
                        description: 'Second variation with swing dynamics and muted accents.',
                    },
                    {
                        id: '62dqpbxMVOk',
                        title: 'Kartal Lesson 45: Dadra Tal Mantra 3 (6 Beat)',
                        tutor: 'MM',
                        description: 'Advanced ornamental strokes in Dadra rhythm.',
                    },
                    {
                        id: 'W4H_yR7OrLM',
                        title: 'Kartal Lesson 47: Dadra Tal Mantra 5 (6 Beat)',
                        tutor: 'MM',
                        description: 'Up-tempo Dadra transitions and kirtan accompaniment.',
                    },
                ],
            },
            {
                id: 'kartal-khemta-6beat',
                slug: 'khemta-taal-bengali-kirtan-swing',
                title: 'Khemta Taal - 6-Beat Syncopated Swing',
                subtitle: 'Traditional Gaudiya padavali swing rhythm for Radha-Krishna pastimes',
                taal: 'Khemta / Chhanda (6 Matras)',
                matras: 6,
                level: 'Intermediate',
                rhythmStructure: 'Syncopated 6-beat gait (Dha-Ge-Na | Ti-Na-Ka)',
                bols: 'Ta - Ki - Ta | Dhi - Ki - Ta',
                description: 'Khemta is the vibrant syncopated 6-beat cycle native to Bengal and Navadvipa dham. It has a joyous bounce that beautifully frames Radha-Krishna lila songs and celebratory sankirtan.',
                keyPoints: [
                    'Distinct syncopation: the downbeat leads directly into a quick double strike.',
                    'Combines light rim skimming with immediate muted stops.',
                    'Keep the tempo steady without rushing the swing feel.',
                ],
                videos: [
                    {
                        id: '9uaHvYBO55I',
                        title: 'Kartal Lesson For Khemta Taal (Easy Lesson for Beginners)',
                        tutor: 'Go Mayapur',
                        description: 'Authentic Mayapur style Khemta beat step-by-step tutorial.',
                    },
                    {
                        id: 'JsAONJuWYN8',
                        title: 'Khemta Taal on Kartal by Guruji',
                        tutor: 'The Mayapur Mridanga',
                        description: 'Traditional masterclass on Khemta syncopations.',
                    },
                    {
                        id: 'IoGsVmHaSu8',
                        title: 'How to Learn Kartal Khemta Taal (Step-by-Step)',
                        tutor: 'Crazy Haridas',
                        description: 'Detailed hand positions and counting for Khemta rhythm.',
                    },
                ],
            },
        ],
    },
    {
        id: 'lofa-and-special',
        name: 'Lofa, Ektaal & Teental Cycles',
        icon: 'sync_alt',
        badge: 'Classic 12-Beat & 16-Beat Cycles',
        description: 'Traditional classical tala systems including Lofa (2 or 12 beats), Ektaal (12 beats), and classical Teental (16 beats) adapted for devotional sankirtan.',
        lessons: [
            {
                id: 'kartal-lofa-taal',
                slug: 'lofa-taal-2-and-12-beat-cycle',
                title: 'Lofa Taal - 2-Beat Pulse & 12-Beat Cycle',
                subtitle: 'Deeply expressive Gaudiya cycle for traditional Bengali kirtans and aratis',
                taal: 'Lofa (2 Beats / 12 Matras)',
                matras: 12,
                level: 'Intermediate',
                rhythmStructure: '6 + 6 or 2 broad pulses: Dha - - | Dhi - -',
                bols: 'Khuli (Ring) - - | Bandha (Mute) - -',
                description: 'Lofa is a foundational Gaudiya tala played during the afternoon and evening aratis in Mayapur and Vrindavan. The 2-beat pulse provides a dignified, royal cadence for singing Mahamantra and Vaishnava compositions.',
                keyPoints: [
                    'Two broad foundational beats per cycle with spacious resonance.',
                    'Allow the bell-metal to sustain its ring on beat 1 before closing on beat 2.',
                    'Synchronize closely with the deep bass banya strokes of the Sri Khol.',
                ],
                videos: [
                    {
                        id: 'rjwOJRn5lXA',
                        title: 'Kartals for Lofa Taal (2 beats)',
                        tutor: 'Kirtan Studios Official',
                        description: 'Clean demonstration of 2-beat Lofa pulse for Harinam.',
                    },
                    {
                        id: 'nUR7TvyZFuU',
                        title: 'Easy Kartal Lesson 7b: Two Taal (Lofa Pulse)',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Two-beat counting and hand technique in devotional context.',
                    },
                    {
                        id: 'MtM66Rc4dNg',
                        title: 'Easy Kartal Lesson 6: Laya & Speed Transitions',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Mastering smooth transitions between slow and fast tempos.',
                    },
                ],
            },
            {
                id: 'kartal-ektaal-teental',
                slug: 'ektaal-and-teental-classical-cycles',
                title: 'Ektaal & Teental - Classical Devotional Cycles',
                subtitle: '12-matra Ektaal and 16-matra Teen Taal adapted for classical padavalis',
                taal: 'Ektaal (12 Beats) & Teental (16 Beats)',
                matras: 16,
                level: 'Advanced',
                rhythmStructure: 'Teental: 4 + 4 + 4 + 4 | Ektaal: 2 + 2 + 2 + 2 + 2 + 2',
                bols: 'Dha Dha Dhin Dhin | Dha Dha Tin Tin',
                description: 'For classical ragas, Jayadeva Goswami Ashtapadis (Gita Govinda), and classical Dhrupad/Khyal devotional compositions, karatalas provide precision timekeeping following the 16-beat Teen Taal or 12-beat Ektaal.',
                keyPoints: [
                    'Teental features 3 claps (Tali) on beats 1, 5, 13 and 1 wave (Khali) on beat 9.',
                    'Keep sound controlled and subtle so vocal raga aesthetics shine.',
                    'Learn the distinct open/closed markers for the khali section.',
                ],
                videos: [
                    {
                        id: 'aJX679ICiyo',
                        title: 'Master Teen Taal (4-Beat / 16-Matra Cycle) Lesson 1',
                        tutor: 'Yadava Sakha',
                        description: 'Comprehensive guide to 4-beat bars and 16-matra Teental.',
                    },
                    {
                        id: 'mJ4wVy8qeao',
                        title: 'Introduction to EKTAAL - Kartal Beats Training',
                        tutor: 'Jagannatheshwari DD',
                        description: 'Detailed explanation of Ektaal matras and kartal strokes.',
                    },
                    {
                        id: '3ZPu71ZHveM',
                        title: 'Practice for Teen Taal Fast Kartal',
                        tutor: 'Skill Learning',
                        description: 'Fast speed drills for Teental kirtan accompaniment.',
                    },
                ],
            },
        ],
    },
    {
        id: 'tihais-and-climax',
        name: 'Tihais, Pickups & Climax (Samam)',
        icon: 'celebration',
        badge: 'Ecstatic Rhythmic Flourishes',
        description: 'How to play 3-fold rhythmic resolutions (Tihais), pickups (Udaan), transition smoothly across tempo accelerandos, and execute dramatic unison stops on the Samam.',
        lessons: [
            {
                id: 'kartal-tihais-and-cadences',
                slug: 'tihais-and-rhythmic-cadences',
                title: 'Kirtan Tihais (3-Fold Rhythmic Resolutions)',
                subtitle: 'Mastering 3-stroke cadences that conclude kirtan sections or signal tempo shifts',
                taal: 'Tihai (Universal 3-Fold Cadence)',
                matras: 0,
                level: 'Intermediate',
                rhythmStructure: 'Phrase 1 - [Pause] - Phrase 2 - [Pause] - Phrase 3 -> Lands on SAMAM',
                bols: 'Dha Ti-Te / Ta-Ki-Ta (played 3 times in exact cadence)',
                description: 'A Tihai is a rhythmic phrase repeated three times that lands precisely on beat 1 (Samam) of the new cycle. In Gaudiya kirtans, kartal players play tihais in unison with the mridanga to signal a change of melody, tempo, or final conclusion.',
                keyPoints: [
                    'Listen to the lead mridanga player for the tihai cue.',
                    'The spacing between repetitions must be mathematically exact.',
                    'Land with maximum conviction on the final Samam strike.',
                    'Practice 4-beat, 8-beat, and 16-beat tihai lengths.',
                ],
                videos: [
                    {
                        id: 'w9FW3FYQcmE',
                        title: 'Easy Kartal Lesson 4c: Tihai Practice',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Detailed step-by-step tutorial on standard kirtan tihais.',
                    },
                    {
                        id: 'Xs6c6NeOWcI',
                        title: 'Easy Kartal Lesson 3: How to Play Tihai on Kartal',
                        tutor: 'ISKCON Varanasi',
                        description: 'Crisp demonstration of 3-fold resolutions for temple kirtan.',
                    },
                    {
                        id: 'G6WskPOv29c',
                        title: 'Tihai - Easy Kartal Tutorial (Part 2)',
                        tutor: 'Vaishnava Vibes',
                        description: 'Clean hand gestures and counting for kirtan tihais.',
                    },
                    {
                        id: 'jXLM48rPV0o',
                        title: 'Kartal Lesson 3: Tehai Demonstration',
                        tutor: 'Kirtan Bliss',
                        description: 'Practical temple examples of tihais during ecstatic kirtan.',
                    },
                    {
                        id: 'zghMEwX1fNM',
                        title: 'Easy Kartal Lesson 9b: Two-Taal Tihai 2',
                        tutor: 'Ajay Gauranga Das',
                        description: 'Advanced fast-speed tihai variations.',
                    },
                ],
            },
            {
                id: 'kartal-accelerando-and-etiquette',
                slug: 'accelerando-climax-and-temple-etiquette',
                title: 'Accelerando, Matan Climax & Kirtan Etiquette',
                subtitle: 'Seamless tempo accelerations, peak energy control, and devotional mood',
                taal: 'Druta & Ati-Druta Laya (Climax)',
                matras: 4,
                level: 'Advanced',
                rhythmStructure: 'Continuous double-time pulse driving the peak Harinam dancing',
                bols: 'Continuous rapid shimmering chiming',
                description: 'During the climax of a kirtan (Matan), the rhythm reaches hyper-speed. A seasoned karatala player knows how to keep the timekeeper beat rock-solid, accelerate smoothly with the lead kirtaniya, and halt cleanly without chaotic clashing.',
                keyPoints: [
                    'Keep your eyes on the lead singer and head mridanga player at all times.',
                    'Do not overplay or clash loudly right next to the microphone.',
                    'Serve the holy name in a humble, selfless mood (Trinad api sunicena).',
                    'When the lead singer pauses for solo chanting, immediately mute to a whisper.',
                ],
                videos: [
                    {
                        id: 'Oum7BLkEHtY',
                        title: 'Long Tehai & Climax Cadence for Kartal',
                        tutor: 'Kirtan Bliss',
                        description: 'Managing high-energy climax resolutions and transitions.',
                    },
                    {
                        id: '32DkFBYxrSI',
                        title: '16-Matra Tihai Mridanga & Kartal Tutorial',
                        tutor: 'MRIDANGA EASY',
                        description: 'Locking kartals with mridanga during tempo shifts and climaxes.',
                    },
                ],
            },
        ],
    },
];

export const ALL_KARTAL_LESSONS: KartalLesson[] = KARTAL_CATEGORIES.flatMap((c) => c.lessons);

export function getKartalLessonById(id: string): KartalLesson | undefined {
    return ALL_KARTAL_LESSONS.find((l) => l.id === id || l.slug === id);
}
