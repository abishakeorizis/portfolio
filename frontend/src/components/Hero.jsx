import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown, HiDownload, HiMail } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import generateResume from '../utils/generateResume';

/* Titles to cycle through with a typewriter feel */
const TITLES = [
    'Data Analyst',
    'Python Developer',
    'Power BI Expert',
    'Tableau Specialist',
    'SPSS Analyst',
    'Excel Power User',
];

/**
 * Hero – landing section with animated name reveal, role typewriter,
 * floating particles, and three CTA buttons.
 */
export default function Hero() {
    const { isDark } = useTheme();
    const [titleIndex, setTitleIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setTitleIndex((prev) => (prev + 1) % TITLES.length),
            2500
        );
        return () => clearInterval(id);
    }, []);

    /* stagger animation variants */
    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.15, delayChildren: 2.6 } },
    };
    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Gradient overlay blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                className="relative z-10 text-center px-4 max-w-4xl"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* Greeting chip */}
                <motion.div variants={item} className="mb-6">
                    <span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase ${isDark
                            ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                            : 'bg-primary-100 text-primary-700 border border-primary-200'
                            }`}
                    >
                        👋 Welcome to my portfolio
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    variants={item}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-4"
                >
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        Abishake{' '}
                    </span>
                    <span className="gradient-text">A</span>
                </motion.h1>

                {/* Animated title */}
                <motion.div variants={item} className="h-10 mb-4 overflow-hidden">
                    <motion.p
                        key={titleIndex}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg md:text-2xl font-medium gradient-text"
                    >
                        {TITLES[titleIndex]}
                    </motion.p>
                </motion.div>

                {/* Static subtitle */}
                <motion.p
                    variants={item}
                    className={`text-base md:text-lg max-w-2xl mx-auto mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'
                        }`}
                >
                    Data Analyst | Python | Power BI | Tableau | SPSS | Excel
                </motion.p>

                <motion.p
                    variants={item}
                    className={`text-sm md:text-base max-w-xl mx-auto mb-10 ${isDark ? 'text-white/40' : 'text-gray-400'
                        }`}
                >
                    Delivering Data-Driven Insights for Business Growth
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    variants={item}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-glow px-8 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2"
                    >
                        View Projects <HiArrowDown className="animate-bounce" />
                    </a>

                    <button
                        onClick={generateResume}
                        className={`px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border cursor-pointer ${isDark
                            ? 'border-white/20 text-white hover:bg-white/10'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <HiDownload /> Download Resume
                    </button>

                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all border ${isDark
                            ? 'border-white/20 text-white hover:bg-white/10'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <HiMail /> Contact Me
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${isDark ? 'border-white/20' : 'border-gray-400'
                        }`}
                >
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                </motion.div>
            </motion.div>
        </section>
    );
}
