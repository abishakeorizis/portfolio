import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiBriefcase } from 'react-icons/hi';

/* Experience entries */
const EXPERIENCES = [
    {
        title: 'Data Analyst',
        company: 'Orizis Tech Solutions Pvt. Ltd.',
        period: 'June 2025 – Present',
        description:
            'Performing statistical analysis, predictive modeling, and business intelligence reporting using Python, Power BI, and Tableau. Building dashboards and automating data pipelines for client projects.',
        tags: ['Python', 'Power BI', 'Tableau', 'Excel'],
    },
    {
        title: 'Technical Assistant',
        company: 'Government of Tamil Nadu',
        period: '2021 – 2025',
        description:
            'Provided technical support and data management services. Handled data entry, report generation, and statistical analysis using Excel, SPSS, and MATLAB for government departments.',
        tags: ['Excel', 'SPSS', 'MATLAB', 'Data Management'],
    },
    {
        title: 'Graphic Designer',
        company: 'Altra Graphix',
        period: '2016 – 2019',
        description:
            'Created compelling visual designs for branding, marketing, and digital media. Developed proficiency in visual storytelling and data visualization principles.',
        tags: ['Design', 'Branding', 'Visualization'],
    },
];

/**
 * Experience – vertical timeline with scroll-triggered card animations.
 */
export default function Experience() {
    const { isDark } = useTheme();

    return (
        <section id="experience" className="section-padding relative">
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
                        Work{' '}
                    </span>
                    <span className="gradient-text">Experience</span>
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */}
                <div
                    className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 ${isDark ? 'bg-white/10' : 'bg-gray-200'
                        }`}
                />

                {EXPERIENCES.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className={`relative mb-12 pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0
                                ? 'md:pr-12 md:ml-0'
                                : 'md:pl-12 md:ml-auto'
                            }`}
                    >
                        {/* Timeline dot */}
                        <div
                            className={`absolute left-4 md:left-auto ${i % 2 === 0 ? 'md:right-[-9px]' : 'md:left-[-9px]'
                                } top-6 w-4 h-4 rounded-full border-2 border-primary-500 ${isDark ? 'bg-surface-dark' : 'bg-white'
                                }`}
                        />

                        {/* Card */}
                        <div
                            className={`p-6 rounded-2xl ${isDark ? 'glass glass-hover' : 'glass-light'
                                } transition-all`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <HiBriefcase className="text-primary-400 text-lg" />
                                <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">
                                    {exp.period}
                                </span>
                            </div>
                            <h3
                                className={`text-xl font-display font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}
                            >
                                {exp.title}
                            </h3>
                            <p className="text-sm text-primary-300 font-medium mb-3">
                                {exp.company}
                            </p>
                            <p
                                className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'
                                    }`}
                            >
                                {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {exp.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`text-xs px-3 py-1 rounded-full ${isDark
                                                ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                                                : 'bg-primary-100 text-primary-700'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
