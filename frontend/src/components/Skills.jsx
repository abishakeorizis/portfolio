import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

/* Skill groups with percentage proficiency */
const SKILL_GROUPS = [
    {
        category: 'Programming',
        skills: [
            { name: 'Python', level: 90, color: '#6366f1' },
            { name: 'MATLAB', level: 75, color: '#818cf8' },
        ],
    },
    {
        category: 'Analytics Tools',
        skills: [
            { name: 'Power BI', level: 85, color: '#8b5cf6' },
            { name: 'Tableau', level: 85, color: '#a78bfa' },
            { name: 'SPSS', level: 80, color: '#c084fc' },
            { name: 'Advanced Excel', level: 92, color: '#6366f1' },
        ],
    },
    {
        category: 'Other',
        skills: [
            { name: 'Unity', level: 70, color: '#818cf8' },
            { name: 'Data Visualization', level: 88, color: '#8b5cf6' },
            { name: 'Predictive Modeling', level: 82, color: '#a78bfa' },
            { name: 'Statistical Analysis', level: 85, color: '#c084fc' },
        ],
    },
];

/** Animated circular progress ring (SVG) */
function CircleProgress({ name, level, color, delay, isDark }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col items-center gap-2"
        >
            <div className="relative w-24 h-24 md:w-28 md:h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
                        strokeWidth="6"
                    />
                    {/* Animated progress arc */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={
                            inView
                                ? { strokeDashoffset: offset }
                                : { strokeDashoffset: circumference }
                        }
                        transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeOut' }}
                        style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
                    />
                </svg>
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className={`text-lg font-bold font-display ${isDark ? 'text-white' : 'text-gray-800'
                            }`}
                    >
                        {level}%
                    </span>
                </div>
            </div>
            <span
                className={`text-xs md:text-sm font-medium text-center ${isDark ? 'text-white/70' : 'text-gray-600'
                    }`}
            >
                {name}
            </span>
        </motion.div>
    );
}

/**
 * Skills – animated circular progress charts grouped by category.
 */
export default function Skills() {
    const { isDark } = useTheme();

    return (
        <section id="skills" className="section-padding relative">
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
                        My{' '}
                    </span>
                    <span className="gradient-text">Skills</span>
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
            </motion.div>

            {/* Skill groups */}
            <div className="space-y-16">
                {SKILL_GROUPS.map((group, gi) => (
                    <div key={group.category}>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`text-lg font-display font-semibold mb-8 text-center ${isDark ? 'text-white/80' : 'text-gray-700'
                                }`}
                        >
                            {group.category}
                        </motion.h3>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            {group.skills.map((skill, si) => (
                                <CircleProgress
                                    key={skill.name}
                                    {...skill}
                                    delay={si * 0.1}
                                    isDark={isDark}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
