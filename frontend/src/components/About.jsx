import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

/* Skill bars data */
const SKILLS = [
    { name: 'Python', level: 90 },
    { name: 'Power BI', level: 85 },
    { name: 'Tableau', level: 85 },
    { name: 'SPSS', level: 80 },
    { name: 'Advanced Excel', level: 92 },
    { name: 'MATLAB', level: 75 },
    { name: 'Unity', level: 70 },
];

/* Profile images */
const PHOTOS = [
    '/IMG_SEGMENT_20250810_113052.png',
    '/IMG_SEGMENT_20260206_210514.png',
    '/IMG_SEGMENT_20260209_043945.png',
];

/** Animated counter that counts up from 0 to `end` */
function Counter({ end, duration = 2, label, isDark }) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = end / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [inView, end, duration]);

    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold gradient-text">
                {count}+
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                {label}
            </p>
        </div>
    );
}

/**
 * ProfilePhoto – single photo with gradient ring and hover effect
 */
function ProfilePhoto({ src, alt, className = '', ringFrom = '#6366f1', ringTo = '#c084fc' }) {
    const { isDark } = useTheme();

    return (
        <motion.div
            className={`rounded-2xl p-[3px] ${className}`}
            style={{
                background: `linear-gradient(135deg, ${ringFrom}, ${ringTo})`,
            }}
            whileHover={{ scale: 1.04, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        >
            <div
                className={`rounded-2xl overflow-hidden w-full h-full ${isDark ? 'bg-gray-900' : 'bg-white'
                    }`}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                />
            </div>
        </motion.div>
    );
}

/**
 * About – professional bio, photo gallery, animated skill bars, and counters.
 */
export default function About() {
    const { isDark } = useTheme();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section id="about" className="section-padding relative">
            {/* Section heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        About{' '}
                    </span>
                    <span className="gradient-text">Me</span>
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
            </motion.div>

            {/* ─── Photo Gallery + Bio Row ─── */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Photo layout – left side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center"
                >
                    <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                        {/* Main large photo – spans 2 rows */}
                        <div className="row-span-2">
                            <ProfilePhoto
                                src={PHOTOS[0]}
                                alt="Abishake A - Professional"
                                className="w-full aspect-[3/4]"
                                ringFrom="#6366f1"
                                ringTo="#a855f7"
                            />
                        </div>

                        {/* Top-right photo */}
                        <div>
                            <ProfilePhoto
                                src={PHOTOS[1]}
                                alt="Abishake A"
                                className="w-full aspect-square"
                                ringFrom="#8b5cf6"
                                ringTo="#ec4899"
                            />
                        </div>

                        {/* Bottom-right photo */}
                        <div>
                            <ProfilePhoto
                                src={PHOTOS[2]}
                                alt="Abishake A"
                                className="w-full aspect-square"
                                ringFrom="#a855f7"
                                ringTo="#6366f1"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Bio text – right side */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <p
                        className={`text-base md:text-lg leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'
                            }`}
                    >
                        Dynamic Data Analyst currently working at{' '}
                        <span className="gradient-text font-semibold">
                            Orizis Tech Solutions Pvt. Ltd.
                        </span>{' '}
                        Skilled in Python, MATLAB, SPSS, Tableau, Power BI, Advanced Excel, and
                        Unity. Experienced in statistical analysis, predictive modeling, and
                        business intelligence reporting.
                    </p>
                    <p
                        className={`text-base md:text-lg leading-relaxed mb-8 ${isDark ? 'text-white/70' : 'text-gray-600'
                            }`}
                    >
                        Passionate about transforming raw data into actionable insights that
                        drive business growth. I combine strong analytical skills with a
                        creative approach to data visualization, ensuring decision-makers get
                        clear, compelling stories from their data.
                    </p>

                    {/* Counters */}
                    <div className="grid grid-cols-3 gap-4">
                        <Counter end={4} label="Years Experience" isDark={isDark} />
                        <Counter end={15} label="Projects Done" isDark={isDark} />
                        <Counter end={6} label="Tools Mastered" isDark={isDark} />
                    </div>
                </motion.div>
            </div>

            {/* ─── Skill Bars ─── */}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl mx-auto"
            >
                <h3
                    className={`text-xl font-display font-semibold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-800'
                        }`}
                >
                    Technical Proficiency
                </h3>
                <div className="space-y-5">
                    {SKILLS.map((skill, i) => (
                        <div key={skill.name}>
                            <div className="flex justify-between mb-1.5">
                                <span
                                    className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'
                                        }`}
                                >
                                    {skill.name}
                                </span>
                                <span className="text-sm text-primary-400">{skill.level}%</span>
                            </div>
                            <div
                                className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'
                                    }`}
                            >
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc)',
                                    }}
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                    transition={{
                                        duration: 1.2,
                                        delay: i * 0.1,
                                        ease: 'easeOut',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
