export interface HindustaniVideo {
    id: string;
    title: string;
    tutor: string;
    description: string;
}

export interface HindustaniLesson {
    id: string;
    slug: string;
    stageNumber: number;
    title: string;
    subtitle: string;
    categoryName: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    scaleOrRaag: string;
    sargamNotes: string;
    vocalFocus: string;
    description: string;
    curriculumObjectives: string[];
    videos: HindustaniVideo[];
}

export interface HindustaniStage {
    id: string;
    stageNumber: number;
    name: string;
    icon: string;
    badge: string;
    description: string;
    lessons: HindustaniLesson[];
}

export interface HindustaniChannelRecommendation {
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

export const HINDUSTANI_STAGES: HindustaniStage[] = [
    {
        id: "stage-1-voice-culture",
        stageNumber: 1,
        name: "Stage 1: Voice Culture, Breath Control & Kharaj Ka Riyaz",
        icon: "record_voice_over",
        badge: "Foundation & Throat Culture",
        description: "Build vocal depth, chest resonance, morning throat flexibility, and steady diaphragmatic breath support through ancient Mandra Saptak and Omkar sadhana.",
        lessons: [
            {
                id: "hindustani-kharaj-riyaz",
                slug: "kharaj-ka-riyaz-mandra-saptak",
                stageNumber: 1,
                title: "Lesson 1: Mandra Saptak & Kharaj Ka Riyaz (Lower Octave Depth)",
                subtitle: "Lower octave voice culture, morning throat opening, and developing rich acoustic resonance",
                categoryName: "Voice Culture",
                level: "Beginner",
                scaleOrRaag: "Mandra Saptak (Sa, Ni, Dha, Pa, Ma in lower register)",
                sargamNotes: "Mandra Saptak: S .N .D .P .M .G .R .S \u2014 Slow sustaining on lower Sa and Pa",
                vocalFocus: "Relaxed vocal cords, diaphragmatic breath column, chest cavity resonance without throat strain",
                description: "Kharaj ka Riyaz is the ancient morning sadhana of Indian classical vocalists. Practiced at dawn in the lower octave (Mandra Saptak), it deepens the vocal cords, opens the throat naturally, cleanses morning breath friction, and establishes an unshakable pitch foundation (Sa) that makes upper notes effortless throughout the day.",
                curriculumObjectives: [
                    "Cultivate morning voice culture by vibrating the lower register gently and deeply.",
                    "Extend vocal range downwards from Madhya Sa into Mandra Pa and Mandra Ma without forced raspiness.",
                    "Stabilize pitch intonation on prolonged sustained lower notes aligned with the Tanpura drone.",
                    "Eliminate morning throat stiffness through relaxed diaphragmatic vocalization.",
                ],
                videos: [
                    {
                        id: "oBxFi3pPocI",
                        title: "\u0916\u0930\u091c \u0915\u093e \u0930\u093f\u092f\u093e\u095b \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902? \u0917\u0932\u0947 \u092e\u0947\u0902 Base \u0932\u093e\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u094d\u092f\u093e \u0930\u093f\u092f\u093e\u095b \u0915\u0930\u0947\u0902? Vocal Range \u0915\u0948\u0938\u0947 \u092c\u095d\u093e\u090f\u0901?",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "qdk7D4xlpyM",
                        title: "\u0906\u0935\u093e\u095b \u092e\u0947\u0902 \u092c\u0947\u0938 \u0932\u093e\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0915\u094d\u092f\u093e Low Scale \u0938\u0947 \u0930\u093f\u092f\u093e\u095b \u0915\u0930\u0947\u0902? Base \u0935\u093e\u0932\u0947 \u0917\u093e\u0928\u0947 \u0915\u0948\u0938\u0947 \u0917\u093e\u090f\u0901? Riyaz for Low Pitch",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "As6RWyTvKB8",
                        title: "8. Complete Morning Vocal Riyaz For Females & Children | G#/4th Black Scale | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "016NlyHrhrg",
                        title: "8. Complete Morning Vocal Riyaz Video | C# - 2:47 Hrs. | Master Nishad & Team | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "8M7kQTC64-w",
                        title: "kharaj ka riyaz | practice mandra saptak with me | mandra sadhna kaise karen | morning riyaz | music",
                        tutor: "Madhur sangeet Pravah ",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Madhur sangeet Pravah .",
                    },
                    {
                        id: "gJUerKU8M-4",
                        title: "Morning Vocal Riyaz on A# | \u0938\u0941\u092c\u0939 \u0915\u093e \u0905\u092d\u094d\u092f\u093e\u0938 | Sa \u0915\u093e \u0930\u093f\u092f\u093e\u091c\u093c | Kharaj \u0914\u0930 Om \u0915\u093e \u0930\u093f\u092f\u093e\u091c\u093c | Siddhant Pruthi",
                        tutor: "SIDDHANT PRUTHI",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by SIDDHANT PRUTHI.",
                    },
                    {
                        id: "0K9IhMMjOp4",
                        title: "Kharaj Practice | \u0916\u0930\u091c\u093c \u0930\u093f\u092f\u093e\u091c\u093c Beginners | Pt Kuldeep Sagar | Alaap Music Academy Chennai |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "KGxBxytyvH0",
                        title: "15 Tips Of Riyaz | \u0930\u093f\u092f\u093e\u091c\u093c | Tips | For Beginners | Pt.Kuldeep Sagar | Alaap Music Academy Chennai",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                ],
            },
            {
                id: "hindustani-omkar-aakar-sadhana",
                slug: "omkar-aakar-voice-stability",
                stageNumber: 1,
                title: "Lesson 2: Omkar Chanting, Breath Support & Sustained Swara Stability",
                subtitle: "Aakar voice riyaz, breath control techniques, and developing unwavering pitch stability",
                categoryName: "Voice Culture",
                level: "Beginner",
                scaleOrRaag: "Madhya Saptak Sa (Pitch Foundation)",
                sargamNotes: "Aakar (\u0906), Eekar (\u0908), Ookar (\u090a), Omkar (\u0950) centered on steady Madhya Sa",
                vocalFocus: "Steady continuous airflow column, belly expansion, soft palate elevation, pure acoustic projection",
                description: "A beautiful classical voice is built on unwavering pitch stability (*Sur Ka Lagao*). Singing in pure Aakar (\u0906) without vibrato or wobble teaches the singer to center their acoustic energy directly on the swara. Coupled with sacred Omkar chanting, this practice builds diaphragmatic breath capacity and pristine vocal projection.",
                curriculumObjectives: [
                    "Sustain Madhya Sa for 20 to 30 seconds with zero pitch fluctuation or wavering.",
                    "Transition smoothly from nasal humming (Mmm) to open resonant Aakar (Aaa).",
                    "Develop deep diaphragmatic breath retention for uninterrupted long musical phrases.",
                    "Align natural vocal overtone resonance precisely with the acoustic drone of Tanpura.",
                ],
                videos: [
                    {
                        id: "o9UUKJmgrek",
                        title: "SPW LIVE - 3 | Morning Vocal Riyaz - \u0950\u0915\u093e\u0930 \u092e\u0902\u0924\u094d\u0930, \u092c\u093e\u0930\u0939\u0916\u0921\u093c\u0940 \u0914\u0930 \u0905\u0932\u0902\u0915\u093e\u0930 | \u0917\u093e\u092f\u0928 \u0915\u0947 \u0932\u093f\u090f \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u093e \u0905\u092d\u094d\u092f\u093e\u0938",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "9Y3jaJsmrvg",
                        title: "SPW LIVE - 13 | Morning Vocal Riyaz - \u0950\u0915\u093e\u0930 \u092e\u0902\u0924\u094d\u0930 \u0935 \u0905\u0932\u0902\u0915\u093e\u0930 | \u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u0938\u0902\u0917\u0940\u0924 \u0935\u093f\u0926\u094d\u092f\u093e\u0932\u092f",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "016NlyHrhrg",
                        title: "8. Complete Morning Vocal Riyaz Video | C# - 2:47 Hrs. | Master Nishad & Team | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "4liv_NHPjfs",
                        title: "An\u0101hata Music Atelier - Awaaz & Omkar Sadhana (voice culture)",
                        tutor: "An\u0101hata Music Atelier",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by An\u0101hata Music Atelier.",
                    },
                    {
                        id: "CJFZXgBrOpU",
                        title: "Om Chanting| Omkar Sadhana| C# Scale Omkar Riyaz| Music for Meditation & Yoga| Om Meditation|OmRiyaz",
                        tutor: "Sarang Dev",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sarang Dev.",
                    },
                    {
                        id: "k9jtIBa6Pa4",
                        title: "'Om' ka Riyaaz | 5 Minute Vocal Warmup for Beginners | Morning Vocal Riyaaz",
                        tutor: "Abhishek Sonii Singer",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Abhishek Sonii Singer.",
                    },
                    {
                        id: "NkYh4pGK4lU",
                        title: "How to improve Aakaar Taan | \u0906\u0915\u093e\u0930 \u0924\u093e\u0928 \u0915\u0948\u0938\u0947 \u0938\u0941\u0927\u093e\u0930\u0947 | Pt. Kuldeep Sagar | aakar Technique for Singer |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "QxlcsAbr91g",
                        title: "\u0905\u0932\u0902\u0915\u093e\u0930 \u0967 \u0938\u0947 \u0967\u0967 \u0906\u0915\u093e\u0930 \u092e\u0947\u0902 - Alankar 1 to 11 in Aakaar- RiyazTV - Indian classical -Varsha Singh Dhanoa",
                        tutor: "RiyazTV",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by RiyazTV.",
                    },
                ],
            },
        ],
    },
    {
        id: "stage-2-swara-sadhana",
        stageNumber: 2,
        name: "Stage 2: Foundational Saptak Swara Sadhana & Alankar Riyaz",
        icon: "tune",
        badge: "Swaravistara & Speed Workouts",
        description: "Master the 10 Bhatkhande Thaats, Shuddha/Komal/Teevra note placement, and mathematical Palta patterns in Teental across single, double, and quadruple speeds.",
        lessons: [
            {
                id: "hindustani-10-thaats-swaravistara",
                slug: "10-bhatkhande-thaats-swaravistara",
                stageNumber: 2,
                title: "Lesson 3: 10 Bhatkhande Thaats Vocal Swaravistara",
                subtitle: "Intonation of Shuddha, Komal and Teevra notes across all 10 foundational parent scales",
                categoryName: "Swara Sadhana",
                level: "Beginner",
                scaleOrRaag: "10 Bhatkhande Thaats (Bilawal, Kalyan, Khamaj, Kafi, Asavari, Bhairav, Bhairavi, Todi, Poorvi, Marwa)",
                sargamNotes: "Shuddha (S R G M P D N), Komal (r g d n), Teevra (M')",
                vocalFocus: "Micro-pitch accuracy (Shruti), sharp ear calibration to Tanpura intervals, pure swara recognition",
                description: "Pandit Vishnu Narayan Bhatkhande classified Hindustani classical music into 10 parent scales (Thaats). Mastering the distinct note combinations\u2014such as the sharp Teevra Ma in Kalyan, the flat Komal Ga and Ni in Kafi, and the flat Re and Dha in Bhairav\u2014calibrates the ear and vocal cords to accurately produce all 12 semitones without hesitation.",
                curriculumObjectives: [
                    "Differentiate microtonal inflections between Shuddha and Komal Re, Ga, Dha, and Ni.",
                    "Master the sharp raised intonation of Teevra Ma (M') in Kalyan, Poorvi, Marwa, and Todi thaats.",
                    "Sing all 10 thaat scales sequentially ascending (Aroha) and descending (Avaroha).",
                    "Identify swara characteristics instantly by auditory ear-training with Tanpura.",
                ],
                videos: [
                    {
                        id: "_w4d6BWmVIM",
                        title: "10 \u0925\u093e\u091f \u0915\u093e \u0938\u0939\u0940 \u0930\u093f\u092f\u093e\u091c\u093c \ud83d\udd25 \u0936\u0941\u0926\u094d\u0927-\u0915\u094b\u092e\u0932-\u0924\u0940\u0935\u094d\u0930 \u0938\u094d\u0935\u0930\u094b\u0902 \u0915\u094b \u092a\u0915\u094d\u0915\u093e \u0915\u0930\u0928\u0947 \u0915\u093e \u0938\u0930\u0932 \u0905\u092d\u094d\u092f\u093e\u0938 \ud83d\ude0d #MasterNishad",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "ZVymNU2wkEQ",
                        title: "\u0930\u093e\u0917\u0947\u0902 \u0915\u0948\u0938\u0947 \u092c\u0928\u0924\u0940\u0902 \u0939\u0948\u0902? \ud83e\udd14 \u0925\u093e\u091f 10 \u0939\u0940 \u0915\u094d\u092f\u0942\u0901 \u0939\u094b\u0924\u0947 \u0939\u0948\u0902? \ud83d\ude0d 150 Raag & 10 Thaat \u092a\u0930 \u091a\u0930\u094d\u091a\u093e by #MasterNishad",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "OmPjckEQhH8",
                        title: "\u0905\u092d\u094d\u092f\u093e\u0938 \u0915\u0930\u0947\u0902 \u0938\u0902\u0917\u0940\u0924 \u0915\u0947 10 \u0925\u093e\u091f \u0914\u0930 12 Pitch \u0907\u0938 \u0935\u0940\u0921\u093f\u092f\u094b \u0938\u0947 | 10 Thaat-12 Pitches Harmonium Practice | SPW",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "5iPSzyAo3UI",
                        title: "10 Thaat Geet | By Jagmeet Kaur | Bawa Music Academy Amritsar",
                        tutor: "Bawa Music Academy ",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Bawa Music Academy .",
                    },
                    {
                        id: "ZFuDtHqvz1E",
                        title: "Kalyan Thaat | Janya Raag Parichay | For Beginners | Tutorial |Hindustani Music | Pt. Kuldeep Sagar",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "b68YokNoUm4",
                        title: "Tutorial 10 | Part 1 - Shuddha Swar, Komal Swar, Teevra Swar - How to sing | Riyaz Tutorial",
                        tutor: "Shubha Chaki",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Shubha Chaki.",
                    },
                    {
                        id: "x6OqfXcuHjc",
                        title: "\u0936\u0941\u0926\u094d\u0927, \u0915\u094b\u092e\u0932 \u0935 \u0924\u0940\u0935\u094d\u0930 \u0938\u094d\u0935\u0930\u094b\u0902 \u092e\u0947\u0902 \u092b\u093c\u0930\u094d\u0915\u093c \u0915\u0948\u0938\u0947 \u092a\u0924\u093e \u0915\u0930\u0947\u0902? 12 \u0938\u094d\u0935\u0930\u094b\u0902 \u0915\u094b \u0938\u092e\u091d\u0928\u0947 \u0915\u0940 \u0924\u0915\u0928\u0940\u0915 #MasterNishad",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "nXCirBvlzRc",
                        title: "Shuddha Swar, Komal Swar, Teevra Swar - how to sing | Riyaz Tutorial | Part-1 | Soma Parali  ",
                        tutor: "Music equals Honey",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Music equals Honey.",
                    },
                ],
            },
            {
                id: "hindustani-palta-alankar-teental",
                slug: "palta-alankar-riyaz-teental",
                stageNumber: 2,
                title: "Lesson 4: Palta & Alankar Riyaz in Teental (Laya & Speed Control)",
                subtitle: "Structured mathematical note combinations in Single (Thaah), Double (Dugun), and Quadruple (Chaugun) tempos",
                categoryName: "Swara Sadhana",
                level: "Beginner",
                scaleOrRaag: "Bilawal & Bhairav Thaat Alankars in Teental (16 Beats)",
                sargamNotes: "1-2-3, 2-3-4 (SRG, RGM, GMP, MPD, PDN, DNS') in 16-beat cycle",
                vocalFocus: "Rhythmic synchronization with Tabla / Metronome, tongue-throat agility, distinct note separation",
                description: "Alankars (musical ornaments) and Paltas (permutations) are the foundational gymnastics of Indian classical vocalists. Singing note permutations in strict synchronization with the 16 beats of Teental across single speed (Thaah), double speed (Dugun), and quadruple speed (Chaugun) instills rock-solid rhythm and effortless agility.",
                curriculumObjectives: [
                    "Execute 10 fundamental alankars in Vilambit (slow), Madhyalaya (medium), and Drut (fast) tempos.",
                    "Maintain impeccable rhythmic precision on the Sam (Beat 1) of Teental.",
                    "Articulate notes distinctly without slurring during speed doubling (Dugun & Chaugun).",
                    "Practice singing in both Sargam syllables and open Aakar vowel form.",
                ],
                videos: [
                    {
                        id: "IHgF_opES9E",
                        title: "9. External Exercise for Vocal Chords | Morning Vocal Riyaz | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "kquG0-SYmRk",
                        title: "4. Bhairav Thaat Alankars | B/7th White Scale | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "016NlyHrhrg",
                        title: "8. Complete Morning Vocal Riyaz Video | C# - 2:47 Hrs. | Master Nishad & Team | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "oM1HKRjr4yo",
                        title: "Alankar| Palta | \u0905\u0932\u0902\u0915\u093e\u0930 | \u092a\u0932\u094d\u091f\u093e | For Beginners | Pt. Kuldeep Sagar | Alaap Music Academy, Chennai",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "a2-WE2_tbXY",
                        title: "Raag Tilak Kamod | For beginners | By Pt. Kuldeep Sagar | Alaap Music Academy, Chennai.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "E32ys4MzTx0",
                        title: "Advance Alankar/Palta | Lesson #4 | Palta For Advance Student | Indian Classical Music | Riyaz Daily",
                        tutor: "Riyaz Daily",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Riyaz Daily.",
                    },
                    {
                        id: "OkFr1WQM9sI",
                        title: "1. Bilawal Thaat Alankars | C/1st White Scale | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "KVhL954VO5M",
                        title: "2. Bhairavi Thaat Alankars | C/1st White Scale | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                ],
            },
        ],
    },
    {
        id: "stage-3-embellishments",
        stageNumber: 3,
        name: "Stage 3: Meend, Gamak, Murki & Vocal Agility",
        icon: "waves",
        badge: "Classical Aesthetics",
        description: "Transform discrete notes into liquid curves with unbroken Meends, swift Kan swaras, ornamental Murkis, and effortless high-speed Taans in pure Aakar.",
        lessons: [
            {
                id: "hindustani-meend-murki-kan",
                slug: "meend-murki-kan-swaras-riyaz",
                stageNumber: 3,
                title: "Lesson 5: Meend Glides, Murki & Kan Swaras (Grace Notes & Embellishments)",
                subtitle: "Continuous melodic glides, micro-turns (harkats), and touch notes that define Indian classical aesthetics",
                categoryName: "Vocal Embellishments",
                level: "Intermediate",
                scaleOrRaag: "Kalyan, Kafi & Khamaj decorative phrases",
                sargamNotes: "Meend: S~P, P~G, G~R; Kan: (P)M, (D)P; Murki: (RSR)S, (NDN)P",
                vocalFocus: "Smooth continuous pitch sliding without discrete stair-steps; swift vocal throat reflexes",
                description: "Indian classical music does not jump mechanically from note to note; it flows in liquid curves. Meend represents the unbroken, continuous glide between two swaras. Kan swaras are microscopic touch notes that soften an approach, while Murkis and Khatkas are lightning-fast three- or four-note circular turns that bring life to every phrase.",
                curriculumObjectives: [
                    "Produce unbroken, connected sliding between notes (Meend) without sudden pitch breaks.",
                    "Apply Kan swaras (grace touch notes) to soften entry into focal notes (Vadi/Samvadi).",
                    "Execute agile 3-note and 4-note circular micro-embellishments (Murki and Khatka).",
                    "Avoid mechanical robotic steps in favor of fluid, expressive classical ornamentation.",
                ],
                videos: [
                    {
                        id: "p8PISbTAaF0",
                        title: "\u092e\u0940\u0902\u0921, \u0917\u092e\u0915, \u092e\u0941\u0930\u094d\u0915\u0940, \u0939\u0930\u0915\u0924\u0947\u0902, \u0916\u091f\u0915\u093e, \u0918\u0938\u0940\u091f, \u091d\u092e\u091d\u092e\u093e, \u0915\u0923 \u0938\u094d\u0935\u0930 \u0906\u0926\u093f \u0938\u0902\u0917\u0940\u0924 \u092e\u0947\u0902 \u0915\u093f\u0938\u0947 \u0915\u0939\u0924\u0947 \u0939\u0948\u0902?",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "2IYEZcLNouk",
                        title: "\u092e\u0947\u0930\u0941 \u0916\u0902\u0921 \u0915\u094d\u092f\u093e \u0939\u0948? \u0930\u093e\u0917 \u0915\u0947 \u0935\u093f\u0938\u094d\u0924\u093e\u0930, \u0938\u0930\u0917\u092e \u0928\u093f\u0930\u094d\u092e\u093e\u0923, \u0917\u0932\u0947 \u0915\u0947 \u0924\u0948\u092f\u093e\u0930\u0940 \u0906\u0926\u093f \u092e\u0947\u0902 \u092e\u0926\u0926 \u0915\u0930\u0928\u0947 \u0935\u093e\u0932\u093e \u0905\u0932\u0902\u0915\u093e\u0930 #SPW",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "OB5tPp4B9dU",
                        title: "\u0917\u0932\u0947 \u092e\u0947\u0902 \u0916\u091f\u0915\u0947-\u092e\u0941\u0930\u094d\u0915\u0940 \u0932\u093e\u0928\u0947 \u0915\u093e \u0930\u093f\u092f\u093e\u095b | \u0917\u093e\u090f\u0901 \u092f\u0947 \u0905\u0932\u0902\u0915\u093e\u0930 \u0914\u0930 \u0915\u0930\u093f\u090f \u0917\u093e\u092f\u0915\u0940 \u092e\u095b\u092c\u0942\u0924 #MasterNishad",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "SfOlp8PIm_k",
                        title: "class 12 | \u0905\u0932\u0902\u0915\u093e\u0930 | Alankar | by parveen antil | hindustani music vocal | ba music | easy notes",
                        tutor: "Alankar Music Academy ",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alankar Music Academy .",
                    },
                    {
                        id: "htUGaYk0Guk",
                        title: "class 12 | \u0915\u0923 \u0938\u094d\u0935\u0930 | kan swar | hindustani music vocal | by parveen antil | easy notes | ba music",
                        tutor: "Alankar Music Academy ",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alankar Music Academy .",
                    },
                    {
                        id: "QCeAk7j2VtA",
                        title: "How to Practice Harkat, Murki, Khatka, Meend & Andolan | Singing Masterclass ",
                        tutor: "Pinki Musicals",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Pinki Musicals.",
                    },
                    {
                        id: "oRfnBfRSAw0",
                        title: "What are Harkats in Indian Classical Vocals? | Kaushiki Chakraborty | LivDemy",
                        tutor: "LivDemy",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by LivDemy.",
                    },
                    {
                        id: "jL-b7c8umIQ",
                        title: "Meend Khatka Murki Gamak Andolan Nyas | \u091c\u093e\u0928\u093f\u092f\u0947 \u092e\u0940\u0902\u0921 \u0916\u091f\u0915\u093e \u092e\u0941\u0930\u0915\u0940 \u0917\u092e\u0915 \u0906\u0902\u0926\u094b\u0932\u0928 \u0928\u094d\u092f\u093e\u0938 | Siddhant Pruthi",
                        tutor: "SIDDHANT PRUTHI",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by SIDDHANT PRUTHI.",
                    },
                ],
            },
            {
                id: "hindustani-fast-taan-aakar",
                slug: "fast-taan-execution-aakar-riyaz",
                stageNumber: 3,
                title: "Lesson 6: Fast Taan Execution & Akaar Articulation",
                subtitle: "Building effortless high-speed melodic runs, bol-taans, and voice flexibility without throat strain",
                categoryName: "Vocal Agility",
                level: "Intermediate",
                scaleOrRaag: "Bilawal, Yaman & Bhairavi Drut Laya Formats",
                sargamNotes: "Fast 8-note and 16-note Aakar runs: SRGMPDNS' S'NDPMGRS at 120-180 BPM",
                vocalFocus: "Abdominal breath impulses, relaxed jaw, soft tongue base, preventing vocal cord strain",
                description: "Taans are rapid melodic figures sung in fast tempo (Drut Laya) that showcase a singer\u2019s technical mastery and throat preparation (*Gale Ki Taiyari*). In this lesson, learn how to sing crystal-clear Taans in pure Aakar (\u0906) using diaphragmatic impulses without tensing the larynx or losing pitch accuracy.",
                curriculumObjectives: [
                    "Sing rapid scalar and zig-zag taan patterns in open Aakar (\u0906) without throat tightness.",
                    "Coordinate abdominal pulse accents with speed subdivisions in Teental.",
                    "Preserve pitch intonation purity while singing at elevated tempos.",
                    "Master Bol-taans (weaving compositional lyrics into swift melodic runs).",
                ],
                videos: [
                    {
                        id: "NkYh4pGK4lU",
                        title: "How to improve Aakaar Taan | \u0906\u0915\u093e\u0930 \u0924\u093e\u0928 \u0915\u0948\u0938\u0947 \u0938\u0941\u0927\u093e\u0930\u0947 | Pt. Kuldeep Sagar | aakar Technique for Singer |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "snv4wQU3EvU",
                        title: "Raag Kedar | Soch Samajh Man Meet | Sing With Me | Pt. Kuldeep Sagar | Alaap Music Academy, Chennai.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "yqd-QO7srnE",
                        title: "How to Riyaz | \u0930\u093f\u092f\u093e\u091c\u093c \u0915\u0948\u0938\u0947 \u0915\u0930\u0947? | Harmonium or Tanpura | Pt.Kuldeep Sagar | Alaap Music Academy |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "vCcvE_oZEU4",
                        title: "2 Min Daily Singing Practice | \u0926\u094b \u092e\u093f\u0928\u093f\u091f \u0915\u093e \u0930\u093f\u092f\u093e\u091c\u093c| Warmup | For Beginners | Pt. Kuldeep Sagar |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "nnJCS6Eke2c",
                        title: "1. Morning Vocal Riyaz For Female & Child Singers with Master Nishad | G#/Fourth Black Scale",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "jhg-agyG8tc",
                        title: "2. Vocal Riyaz for Female & Child Singers | Do with this video in Morning | G#/4th Black Scale",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "8PNf0K2GnfE",
                        title: "\u0906\u0935\u093e\u091c\u093c \u0915\u094b \u0915\u0948\u0938\u0947 \u0916\u094b\u0932\u0947\u0902? \u092e\u0940\u0920\u0947 \u0938\u0941\u0930\u094b\u0902 \u092e\u0947\u0902 \u0915\u0948\u0938\u0947 \u0917\u093e\u090f\u0901? \u0917\u093e\u092f\u0915\u0940/\u0938\u093f\u0902\u0917\u093f\u0902\u0917 \u092e\u0947\u0902 \u0926\u0930\u094d\u0926 \u0915\u0948\u0938\u0947 \u0932\u093e\u090f\u0901? Singing Riyaz Tips",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "f1JJZbhLWHY",
                        title: "\u0917\u093e\u0924\u0947 \u0935\u0915\u093c\u094d\u0924 \u0906\u0935\u093e\u091c\u093c \u0915\u094d\u092f\u0942\u0901 \u092b\u091f\u0924\u0940 \u0939\u0948? \u090a\u0901\u091a\u0947 \u0938\u094d\u0935\u0930\u094b\u0902 \u092e\u0947\u0902 \u0906\u0935\u093e\u091c\u093c \u092b\u091f\u0928\u0947 \u0938\u0947 \u0915\u0948\u0938\u0947 \u0930\u094b\u0915\u0947\u0902 Voice Crack Reason+Solution",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                ],
            },
        ],
    },
    {
        id: "stage-4-classical-ragas",
        stageNumber: 4,
        name: "Stage 4: Classical Ragas Vocal Bandish & Chota Khayal",
        icon: "music_note",
        badge: "Raag Bandish & Khayal",
        description: "Sing traditional classical compositions (Chota Khayal) in Raag Yaman, Raag Bhairav, Raag Bhupali, Raag Bilawal, Raag Bhairavi, and Raag Kafi with full Alaap and Taans.",
        lessons: [
            {
                id: "hindustani-raag-yaman-bandish",
                slug: "raag-yaman-vocal-bandish-chota-khayal",
                stageNumber: 4,
                title: "Lesson 7: Raag Yaman Vocal Bandish & Chota Khayal",
                subtitle: "Aiman Kalyan evening contemplation, Tivra Ma dynamics, and traditional Bandish in Teental",
                categoryName: "Classical Ragas",
                level: "Intermediate",
                scaleOrRaag: "Raag Yaman (Kalyan Thaat): 'N R G M' D N S' | S' N D P M' G R S",
                sargamNotes: "Vadi: Gandhar (G), Samvadi: Nishad (N), Pakad: 'N R G, M' D N S'",
                vocalFocus: "Pious, meditative, romantic and devotional mood (Shringara & Shanta Rasa)",
                description: "Raag Yaman (also known as Aiman or Kalyan) is the queen of evening ragas. Its serene, majestic character arises from the sharp Teevra Madhyam (M') and the prominent role of Gandhar (G) and Nishad (N). Learn the immortal traditional Bandish 'Eri Aali Piya Bin' or 'Jiya Manat Nahi' with full Sthayi and Antara.",
                curriculumObjectives: [
                    "Master the pivotal vakra phrase 'N R G, M' D N S' without resting on Shuddha Madhyam.",
                    "Learn traditional Chota Khayal Bandish with Sthayi and Antara sections.",
                    "Improvise initial Alaap and Bol-Alaap within the boundaries of Raag Yaman.",
                    "Execute Drut Bandish with systematic sargam taans in Teental.",
                ],
                videos: [
                    {
                        id: "OhoCHiPYzdE",
                        title: "Yaman | Deepika Bhide Bhagwat | Drut bandish",
                        tutor: "Deepika Bhide Bhagwat",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Deepika Bhide Bhagwat.",
                    },
                    {
                        id: "XvMv80pE7Kk",
                        title: "Eri Aali Piya Bin | Raag Yaman Bandish With Notation | Indian Classical Music | Riyaz Daily",
                        tutor: "Riyaz Daily",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Riyaz Daily.",
                    },
                    {
                        id: "pJeEfzMt9-E",
                        title: "Raag Yaman Badakhayal......Mera man..",
                        tutor: "SWAR SADHNA SANGEET VIDYALAYA ",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by SWAR SADHNA SANGEET VIDYALAYA .",
                    },
                    {
                        id: "44DPID3qmmw",
                        title: "Raag Yaman - Bandish (Jiya manat nahi) - Apoorva Gokhale & Pallavi Joshi - Hamsadhwani's Baithak",
                        tutor: "Hamsadhwani",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Hamsadhwani.",
                    },
                    {
                        id: "HNSVe558EwY",
                        title: "Episode - 20 | Raag Yaman - Parichay, Sargam Geet, Lakshan Geet & Chota Khayal with Aalap-Taan",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "3X6VdR-_rzI",
                        title: "5 Bandish in Raag Yaman |\u092f\u092e\u0928 |  \u090f\u0915 \u0930\u093e\u0917 \u092e\u0947\u0902 \u092a\u093e\u0901\u091a \u092c\u0902\u0926\u093f\u0936 | Pt. Kuldeep Sagar | Alaap Music Academy.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "8LY9QId18sw",
                        title: "Raag Yaman Bandish With Aalap And Taan | Indian Classical Music | Riyaz Daily",
                        tutor: "Riyaz Daily",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Riyaz Daily.",
                    },
                    {
                        id: "QNF0MjkkUH4",
                        title: "Raag Yaman | Practice Session | Pt Kuldeep Sagar | Students | Alaap Music Academy, Chennai.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                ],
            },
            {
                id: "hindustani-raag-bhairav-bandish",
                slug: "raag-bhairav-morning-bandish",
                stageNumber: 4,
                title: "Lesson 8: Raag Bhairav Morning Bandish & Chota Khayal",
                subtitle: "Prabhati awakening, solemn Andolit Komal Re and Dha, and meditative devotional invocations",
                categoryName: "Classical Ragas",
                level: "Intermediate",
                scaleOrRaag: "Raag Bhairav: S r G M P d N S' | S' N d P M G r S",
                sargamNotes: "Vadi: Dhaivat (d), Samvadi: Rishabh (r), Andolan on r and d",
                vocalFocus: "Solemn, majestic, prayerful morning mood (Gambhir & Bhakti Rasa)",
                description: "Raag Bhairav is the supreme morning raga, evoking spiritual awakening and sacred gravity. The soul of Bhairav lies in its gentle, trembling oscillation (*Andolan*) on Komal Rishabh (r) and Komal Dhaivat (d). Learn the classic devotional bandishes 'Jaago Mohan Pyare' and 'Aavo Aavo Braj Raj Dulare'.",
                curriculumObjectives: [
                    "Cultivate the characteristic slow oscillation (Andolan) on Komal Rishabh (r) and Komal Dhaivat (d).",
                    "Sing the immortal morning bandishes 'Jaago Mohan Pyare' and 'Aavo Aavo Braj Raj Dulare'.",
                    "Differentiate Bhairav from Ahir Bhairav and Ramkali.",
                    "Execute pristine vilambit phrases capturing dawn-time transcendental awakening.",
                ],
                videos: [
                    {
                        id: "C4Ui9zpuyDE",
                        title: "Raag Bhairav | Sargam Geet & Chhota Khayal with Aalap-Taan | Anikait Dhakar - Vocal",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "FgdDeq3teLU",
                        title: "Raag Bhairav Bandish (O Re More Piya) by Harija Pandey - Vocal",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "NNdwknT-_6I",
                        title: "Episode - 21 | Raag Bhairav - Parichay, Sargam Geet, Lakshan Geet & Chota Khayal with Aalap-Taan",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "FUyPxThXtSA",
                        title: "\u0930\u093e\u0917 \u092d\u0948\u0930\u0935 \u0915\u093e \u0930\u093f\u092f\u093e\u091c\u093c \u0938\u0940\u0916\u0947\u0902 \u0907\u0938 \u0935\u0940\u0921\u093f\u0913 \u0938\u0947 | Learn Raag Bhairav, Ahir Bhairav & Vairagi Bhairav",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "uJGUefroHWo",
                        title: "Raag Bhairav | \u092d\u0948\u0930\u0935 | \u091c\u093e\u0917\u094b \u092e\u094b\u0939\u0928 \u092a\u094d\u092f\u093e\u0930\u0947 | For Beginners | Pt. Kuldeep Sagar | Alaap | Kuldeep Sagar",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "6ae2ntjzkuM",
                        title: "Raag Bhairav | \u092d\u0948\u0930\u0935 | \u0906\u0935\u094b \u0906\u0935\u094b \u092c\u094d\u0930\u091c \u0930\u093e\u091c \u0926\u0941\u0932\u093e\u0930\u0947 | Beginners | Pt. Kuldeep Sagar | Alaap Music Academy",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "ydSlRQs_6c0",
                        title: "Raga Bhairav ||'Jaago Mohana pyare' Bandish  with alaap || Gurudarshan Music Academy||Lesson video",
                        tutor: "Gurudarshan Music Academy",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Gurudarshan Music Academy.",
                    },
                    {
                        id: "r1XYLVsqBRs",
                        title: "Raag Bhairav | dhan dhan murat krishnamurari | chota khayal | vocal Tutorial#2 | with notation|",
                        tutor: "raag shikkha",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by raag shikkha.",
                    },
                ],
            },
            {
                id: "hindustani-raag-bhupali-bilawal",
                slug: "raag-bhupali-bilawal-vocal-bandish",
                stageNumber: 4,
                title: "Lesson 9: Raag Bhupali & Bilawal Vocal Bandish",
                subtitle: "Audava pentatonic luminosity, grand Shuddha swara architecture, and joyful devotional bandishes",
                categoryName: "Classical Ragas",
                level: "Intermediate",
                scaleOrRaag: "Raag Bhupali (S R G P D S' | S' D P G R S) & Raag Alhaiya Bilawal",
                sargamNotes: "Bhupali Vadi: Gandhar (G), Samvadi: Dhaivat (D) \u2014 Pentatonic omitting Ma and Ni",
                vocalFocus: "Bright, peaceful, luminous, soothing contemplation (Karuna & Shanta Rasa)",
                description: "Raag Bhupali is a majestic pentatonic (*Audava-Audava*) raga that omits Madhyam (Ma) and Nishad (Ni). Its bright, devotional melody creates instant tranquility and joy. This lesson also covers Raag Alhaiya Bilawal, expanding your Shuddha swara mastery into full 7-note classical compositions.",
                curriculumObjectives: [
                    "Maintain strict omission of Madhyam (M) and Nishad (N) in Bhupali improvisation.",
                    "Learn Chota Khayal bandish in Raag Bhupali with classical Alaap and Taans.",
                    "Transition to Raag Alhaiya Bilawal with its vakra Ni (D N D P) ornamentation.",
                    "Develop vocal clarity on major intervals across two octaves.",
                ],
                videos: [
                    {
                        id: "NrVOr_x6V-w",
                        title: "\u0930\u093e\u0917 \u092d\u0942\u092a\u093e\u0932\u0940 \u0915\u093e \u092a\u0930\u093f\u091a\u092f \u0914\u0930 \u0905\u0932\u0902\u0915\u093e\u0930-\u092a\u0932\u094d\u091f\u094b\u0902 \u0915\u093e \u0930\u093f\u092f\u093e\u091c\u093c | Alankar & Riyaz of Raag Bhupali by #MasterNishad",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "CwDltkdowjU",
                        title: "Raag Bhupali - Solo Harmonium By Master Nishad",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "5N7RsI9DZtk",
                        title: "\u0930\u093e\u0917 \u092d\u0942\u092a\u093e\u0932\u0940 - Raag Bhoopali / Bhupali - Scale A - Riyaz TV - \u0930\u093f\u092f\u093e\u091c\u093c \u091f\u0940\u0935\u0940 - Varsha Singh Dhanoa",
                        tutor: "RiyazTV",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by RiyazTV.",
                    },
                    {
                        id: "xmnqHdzZ1D0",
                        title: "Ja ja jare jare pathikva | raag bhupali| Chota khayal | vocal tutorial | Tutorial#3",
                        tutor: "raag shikkha",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by raag shikkha.",
                    },
                    {
                        id: "WfKpt-_kLdA",
                        title: "Kishori Amonkar - Raag Bhoop (1971)",
                        tutor: "Archisman Mozumder",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Archisman Mozumder.",
                    },
                    {
                        id: "M83R9Vqt6eE",
                        title: "Jabase Tumasana Laagali || Raag Bhupali",
                        tutor: "Archana Mule",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Archana Mule.",
                    },
                    {
                        id: "kmGBRserdFs",
                        title: "Raag Alhaiya Bilawal | For beginners | Pt. Kuldeep Sagar | Alaap Music Academy, Chennai.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "8uzar4sTzOI",
                        title: "RAAG ALHAIYA BILAWAL | \u0930\u093e\u0917 \u0905\u0932\u094d\u0939\u0948\u092f\u093e \u092c\u093f\u0932\u093e\u0935\u0932 | Tutorial | Pt Kuldeep Sagar |Alaap Music Academy Chennai",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                ],
            },
            {
                id: "hindustani-raag-bhairavi-kafi",
                slug: "raag-bhairavi-kafi-vocal-bandish",
                stageNumber: 4,
                title: "Lesson 10: Raag Bhairavi & Kafi Vocal Bandish",
                subtitle: "Universal devotional surrender, all four Komal swaras, and pastoral Braj melody traditions",
                categoryName: "Classical Ragas",
                level: "Advanced",
                scaleOrRaag: "Raag Bhairavi (S r g M P d n S' | S' n d P M g r S) & Raag Kafi",
                sargamNotes: "Bhairavi: all 4 notes Komal (r, g, d, n); Vadi: Madhyam (M), Samvadi: Shadja (S)",
                vocalFocus: "Supreme surrender, longing, concluding arati mood, emotional depth (Bhakti Rasa)",
                description: "Raag Bhairavi is hailed as the sovereign concluding raga of Indian classical music. Featuring all four flat notes (Komal Re, Ga, Dha, Ni), it evokes sweet longing, surrender, and deep devotion. This lesson also explores Raag Kafi, the pastoral raga celebrating Lord Krishna's pastimes in the forests of Vrindavan.",
                curriculumObjectives: [
                    "Sing Raag Bhairavi Chota Khayal in Teental with proper Komal swara placement.",
                    "Incorporate gentle Meends and Murkis characteristic of light classical Thumri and Bhajan.",
                    "Explore Raag Kafi pastoral themes celebrating Lord Krishna's pastimes in Vrindavan.",
                    "Master the traditional concluding raga of classical concerts.",
                ],
                videos: [
                    {
                        id: "E6OcSAhD_4I",
                        title: "Raag Bhairavi | \u092d\u0948\u0930\u0935\u0940 | \u0921\u093c\u0917\u0930 \u091a\u0932\u0924 \u091b\u0947\u0921\u093c\u0947 | Sing with me | Kuldeep Sagar@alaapmusicacademychennai",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "uJGUefroHWo",
                        title: "Raag Bhairav | \u092d\u0948\u0930\u0935 | \u091c\u093e\u0917\u094b \u092e\u094b\u0939\u0928 \u092a\u094d\u092f\u093e\u0930\u0947 | For Beginners | Pt. Kuldeep Sagar | Alaap | Kuldeep Sagar",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "6ae2ntjzkuM",
                        title: "Raag Bhairav | \u092d\u0948\u0930\u0935 | \u0906\u0935\u094b \u0906\u0935\u094b \u092c\u094d\u0930\u091c \u0930\u093e\u091c \u0926\u0941\u0932\u093e\u0930\u0947 | Beginners | Pt. Kuldeep Sagar | Alaap Music Academy",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "2Jg6-yFCBMY",
                        title: "Raag Ahir Bhairav | \u0905\u0939\u0940\u0930 \u092d\u0948\u0930\u0935 | Beginners | Pt.Kuldeep Sagar | albela sajan | Pt. Kuldeep Sagar |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "jlDaFOc7ipo",
                        title: "Raag Bhairavi by Pt. Kuldeep Sagar, Chota Khyal in Teen Taal and Ek Taal from Alaap Music Academy.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "r_xfFoel6zQ",
                        title: "Raag Bhairavi | Sargam Geet & Chhota Khayal with Aalap-Taan | Anikait Dhakar - Vocal",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "3YppJxxRf2E",
                        title: "Raag Bhairavi : LIVE Music Class Jamming on Harmonium by Master Nishad | SPW",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "P4H4LCZwvhk",
                        title: "Raag Bhairavi (Part - 1) | Solo Harmonium By Master Nishad | Sangeet Pravah World",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                ],
            },
        ],
    },
    {
        id: "stage-5-devotional-sangeet",
        stageNumber: 5,
        name: "Stage 5: Devotional Bhakti Vocal Compositions & Temple Kirtan",
        icon: "temple_hindu",
        badge: "Bhakti Padavali & Haveli Kirtan",
        description: "Apply classical vocal mastery to timeless Vaishnava bhajans, Keherwa and Dadra rhythms, and sacred Haveli Sangeet celebrating the pastimes of Sri Krishna.",
        lessons: [
            {
                id: "hindustani-classical-bhajan-taal",
                slug: "classical-bhajan-singing-taal-sync",
                stageNumber: 5,
                title: "Lesson 11: Classical Bhajan Singing & Taal Synchronization",
                subtitle: "Vaishnava padavali, saint-poet compositions (Surdas, Meera, Tulsidas), and Keherwa / Dadra synchronization",
                categoryName: "Devotional Sangeet",
                level: "Advanced",
                scaleOrRaag: "Bhairavi, Kedar, Yaman, Tilang & Khamaj adapted for devotional poetry",
                sargamNotes: "Sthayi & Antara phrasing synchronized to 8-beat Keherwa and 6-beat Dadra",
                vocalFocus: "Bhav-pradhan singing: balancing musical precision with pure loving devotion to Sri Krishna",
                description: "Classical Bhajan singing is the sweet confluence of rigorous classical training and transcendental devotion (*Bhav*). Learn how to sing timeless compositions of saint-poets like Mirabai, Surdas, and Tulsidas, set to authentic classical ragas and accompanied by Keherwa (8 beats) and Dadra (6 beats) rhythmic cycles.",
                curriculumObjectives: [
                    "Sing classic Vaishnava bhajans (e.g., 'Pag Ghoongaru Bandh Meera Nachi Re') with correct raga nuances.",
                    "Synchronize vocal phrases with the Khali (empty beat) and Tali (clap beat) of Keherwa and Dadra.",
                    "Transition seamlessly between solo verse elaboration and group chorus singing.",
                    "Incorporate improvised Bol-Alaap that accentuates the emotional meaning of the spiritual verses.",
                ],
                videos: [
                    {
                        id: "ME9JV-RZDbs",
                        title: "Pag Ghoongaru Bandh Meera Nachi Re | Meera Bhajan | Pt Kuldeep Sagar | Alaap Music | Alaap Music |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "gNwFdUF7_6I",
                        title: "How to Start Learning Music | \u0938\u0902\u0917\u0940\u0924 \u0938\u0940\u0916\u0928\u093e \u0915\u0948\u0938\u0947 \u092a\u094d\u0930\u093e\u0930\u0902\u092d \u0915\u0930\u0947\u0902 | By Pt. Kuldeep Sagar |",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "NEEUd7wCxJg",
                        title: "Raag Kedar | for beginners | Pt. Kuldeep Sagar | Alaap Music Academy, Chennai.",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "KGxBxytyvH0",
                        title: "15 Tips Of Riyaz | \u0930\u093f\u092f\u093e\u091c\u093c | Tips | For Beginners | Pt.Kuldeep Sagar | Alaap Music Academy Chennai",
                        tutor: "Alaap Music Academy, Chennai",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Alaap Music Academy, Chennai.",
                    },
                    {
                        id: "hEOvg5cyWrk",
                        title: "\u0938\u0902\u0917\u0940\u0924 \u092a\u094d\u0930\u0935\u093e\u0939 \u0935\u0930\u094d\u0932\u094d\u0921 \u0915\u0947 \u0935\u0940\u0921\u093f\u0913\u091c\u093c \u0915\u0947 \u0905\u0928\u0941\u0938\u093e\u0930 \u0915\u0948\u0938\u0947 \u0938\u0940\u0916\u0947\u0902 \u0918\u0930 \u092c\u0948\u0920\u0947 \u0938\u0902\u0917\u0940\u0924? \u0938\u0902\u0917\u0940\u0924 \u0938\u0940\u0916\u0928\u0947 \u0915\u0940 \u0936\u0941\u0930\u0942\u0906\u0924 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902?",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "C4kDz7LkzSQ",
                        title: "Episode - 01 First Basic Alankar in Thaat Bilawal from First Black (C#) & Fourth Black (G#) \u0964 SPW",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "82dIdseJVT0",
                        title: "Ek Tumhari Aas - A Divine Bhajan by Master Nishad at Shree Sangeet Bharti, Bikaner",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                    {
                        id: "rwIjuvM5ycc",
                        title: "Devine Krishna Bhajan in Small Master Nishad's Voice",
                        tutor: "Sangeet Pravah World",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Sangeet Pravah World.",
                    },
                ],
            },
            {
                id: "hindustani-haveli-braj-kirtan",
                slug: "haveli-sangeet-traditional-braj-kirtan",
                stageNumber: 5,
                title: "Lesson 12: Haveli Sangeet & Traditional Braj Classical Kirtan",
                subtitle: "Temple Dhrupad-Dhamar roots, Ashtachhap saint tradition, and Pushtimarg temple kirtan singing",
                categoryName: "Devotional Sangeet",
                level: "Advanced",
                scaleOrRaag: "Malkauns, Vrundavani Sarang, Kanhra, Bilawal & Dhanashri in Haveli tradition",
                sargamNotes: "Grounded rhythmic cycles (Chautaal, Dhamar, Deepchandi) with acoustic Tanpura and Pakhawaj",
                vocalFocus: "Reverential sanctum worship, seasonal raga offerings for Lord Krishna throughout the day",
                description: "Haveli Sangeet is the ancient devotional music preserved within sacred temple sanctums, directly descended from Dhrupad and the eight saint-poets (*Ashtachhap*). It offers specific ragas according to the eight watches of the day (*Ashtayama Seva*). Learn the noble vocal gravity, Pakhawaj rhythm gait, and devotional surrender of traditional Braj kirtan.",
                curriculumObjectives: [
                    "Understand the historical origin of Haveli Sangeet and its connection to Dhrupad.",
                    "Sing traditional Braj kirtan compositions celebrating the divine pastimes of Radha-Krishna.",
                    "Master classical rhythmic gait suitable for temple seva (Ashtayama seva ragas).",
                    "Perform complex devotional padavalis with deep spiritual gravity and acoustic purity.",
                ],
                videos: [
                    {
                        id: "JSP9PZRZnto",
                        title: "Pushtimargiye Sangeet - Raag Dhanashri",
                        tutor: "Amit Mathur (Sai)",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Amit Mathur (Sai).",
                    },
                    {
                        id: "sCXqXJXkU2A",
                        title: "Pushtimargiye Sangeet - Raag Nat",
                        tutor: "Amit Mathur (Sai)",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Amit Mathur (Sai).",
                    },
                    {
                        id: "C0DrNK5DKmM",
                        title: "Haveli Sangeet I Rattan Mohan Sharma I Aaj To Anand Anand",
                        tutor: "Dr. Saurabh Chokshi : Whispers of the Heart",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Dr. Saurabh Chokshi : Whispers of the Heart.",
                    },
                    {
                        id: "kXPSpKjaGvQ",
                        title: "Haveli Sangeet by Shri Sai Prasad Panchal & team | 24th December 2025",
                        tutor: "The Life Eternal Trust, Mumbai (First Sahaja Yoga Trust)",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by The Life Eternal Trust, Mumbai (First Sahaja Yoga Trust).",
                    },
                    {
                        id: "HDjeqe0bVmQ",
                        title: "Pushtimargiya Haveli Sangeet | Aao Kirtan Sikhe | S1E14 | Kapar Dhota Nayan | Raag : Kanharo",
                        tutor: "Pushtivrund",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Pushtivrund.",
                    },
                    {
                        id: "z_pC9zBWRgc",
                        title: "Pushtimargiya Haveli Sangeet | Aao Kirtan Sikhe | S1E13 | Chhoti Daanleela | Gadh Te Gwalin Utari",
                        tutor: "Pushtivrund",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Pushtivrund.",
                    },
                    {
                        id: "AY-Hse6ACGU",
                        title: "How to learn Haveli Sangeet | Raag : Vrundavani Sarang | First Year Course | S01E2",
                        tutor: "Pushtivrund",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Pushtivrund.",
                    },
                    {
                        id: "EsJape0g45A",
                        title: "How to learn Haveli Sangeet | Raag : Kanhro | First Year Course | S01E4",
                        tutor: "Pushtivrund",
                        description: "Comprehensive classical vocal instruction and step-by-step masterclass by Pushtivrund.",
                    },
                ],
            },
        ],
    },
];

export const ALL_HINDUSTANI_LESSONS: HindustaniLesson[] = HINDUSTANI_STAGES.flatMap((stg) => stg.lessons);

export function getHindustaniLessonById(id: string): HindustaniLesson | undefined {
    return ALL_HINDUSTANI_LESSONS.find((l) => l.id === id || l.slug === id);
}

export const RECOMMENDED_HINDUSTANI_CHANNELS: HindustaniChannelRecommendation[] = [
    {
        "channelName": "Sangeet Pravah World",
        "handle": "@sangeetpravahworld",
        "channelUrl": "https://www.youtube.com/@sangeetpravahworld",
        "seriesTitle": "Complete Morning Vocal Riyaz & Classical Thaat Series",
        "seriesUrl": "https://www.youtube.com/@sangeetpravahworld/playlists",
        "subscriberBadge": "2M+ Classical Learners",
        "specialty": "Kharaj Ka Riyaz, 10 Bhatkhande Thaats, Alankar Permutations & Voice Warmups",
        "description": "Premier Indian classical vocal institution led by Pandit Avadhkishor Pandey and Master Nishad, providing systematic morning vocal workouts, swara intonation drills, and ragas in authentic classical tradition.",
        "relevantStages": [
            1,
            2,
            3,
            4
        ]
    },
    {
        "channelName": "Alaap Music Academy, Chennai",
        "handle": "@AlaapMusicAcademy",
        "channelUrl": "https://www.youtube.com/@AlaapMusicAcademy",
        "seriesTitle": "Hindustani Vocal Classical Raga Bandishes with Swaralipi",
        "seriesUrl": "https://www.youtube.com/@AlaapMusicAcademy/playlists",
        "subscriberBadge": "Authentic Classical Academy",
        "specialty": "Chota Khayal Bandishes, Sthayi & Antara, Sargam Taans & Aakar",
        "description": "Prestigious classical vocal academy directed by Pt. Kuldeep Sagar, renowned for thorough vocal lessons, on-screen swaralipi charts, slow syllable articulation, and classical bandishes in major ragas.",
        "relevantStages": [
            1,
            2,
            3,
            4,
            5
        ]
    },
    {
        "channelName": "Riyaz Daily",
        "handle": "@RiyazDaily",
        "channelUrl": "https://www.youtube.com/@RiyazDaily",
        "seriesTitle": "Daily Classical Vocal Riyaz & Bandish Notations",
        "seriesUrl": "https://www.youtube.com/@RiyazDaily/playlists",
        "subscriberBadge": "Daily Vocal Training",
        "specialty": "Palta Speed Transitions, Vocal Flexibility & Notation Walkthroughs",
        "description": "Dedicated to daily classical vocal exercise routines, teaching advanced alankars, breath retention, and clear vocal bandish breakdowns with complete melodic notations.",
        "relevantStages": [
            2,
            3,
            4
        ]
    },
    {
        "channelName": "Pushtivrund",
        "handle": "@Pushtivrund",
        "channelUrl": "https://www.youtube.com/@Pushtivrund",
        "seriesTitle": "Haveli Sangeet & Traditional Braj Ashtachhap Kirtan",
        "seriesUrl": "https://www.youtube.com/@Pushtivrund/playlists",
        "subscriberBadge": "Authentic Haveli Sangeet",
        "specialty": "Temple Dhrupad-Dhamar Ragas, Brajwasis Padavali & Sacred Kirtan",
        "description": "The leading preservation channel for sacred Haveli Sangeet, teaching authentic temple kirtan melodies, seasonal ragas for Lord Krishna, and ancient Ashtachhap saint padavalis.",
        "relevantStages": [
            5
        ]
    },
    {
        "channelName": "LivDemy Classical",
        "handle": "@LivDemy",
        "channelUrl": "https://www.youtube.com/@LivDemy",
        "seriesTitle": "Harkats, Murkis & Voice Aesthetics Masterclass",
        "seriesUrl": "https://www.youtube.com/@LivDemy/playlists",
        "subscriberBadge": "Maestro Masterclasses",
        "specialty": "Meend Glides, Vocal Nuances, Throat Health & Breath Column",
        "description": "Featuring in-depth instructional masterclasses by legendary vocalists on Indian classical ornamentation, breath dynamics, and vocal fold ergonomics.",
        "relevantStages": [
            3,
            4
        ]
    },
    {
        "channelName": "Learn Hare Krishna Kirtan",
        "handle": "@LearnHareKrishnaKirtan",
        "channelUrl": "https://www.youtube.com/@LearnHareKrishnaKirtan",
        "seriesTitle": "Traditional Classical Raga Kirtans & Bhajans",
        "seriesUrl": "https://www.youtube.com/@LearnHareKrishnaKirtan/playlists",
        "subscriberBadge": "Traditional Kirtan Academy",
        "specialty": "Raag Yaman, Bhairavi, Kafi & Keherwa/Dadra Synchronization",
        "description": "Instructional guides on applying authentic classical ragas and voice modulation to Vaishnava temple kirtan and traditional bhajans.",
        "relevantStages": [
            4,
            5
        ]
    }
];

export function getRecommendedChannelsForHindustaniStage(stageNumber: number): HindustaniChannelRecommendation[] {
    const stageSpecific = RECOMMENDED_HINDUSTANI_CHANNELS.filter((c) => c.relevantStages.includes(stageNumber));
    if (stageSpecific.length >= 2) return stageSpecific;
    return RECOMMENDED_HINDUSTANI_CHANNELS.slice(0, 4);
}
