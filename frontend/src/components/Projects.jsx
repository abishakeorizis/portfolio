import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

/* Sample project data */
const PROJECTS = [
    {
        title: 'Tourism Data Analysis',
        description:
            'Comprehensive analysis of tourism trends and patterns using statistical methods. Identified key growth areas and seasonal patterns to help stakeholders make informed decisions.',
        tools: ['SPSS', 'Excel', 'Data Visualization'],
        github: 'https://github.com',
        demo: '#',
        gradient: 'from-blue-500 to-indigo-500',
    },
    {
        title: 'Netflix Data Analysis',
        description:
            'Explored the Netflix content library using Python and Pandas. Performed EDA on genres, release trends, and viewer rating patterns to uncover content strategy insights.',
        tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
        github: 'https://github.com',
        demo: '#',
        gradient: 'from-red-500 to-pink-500',
    },
    {
        title: 'Supply Chain Optimization',
        description:
            'Built a predictive model for optimizing supply chain logistics. Reduced forecasted delivery delays by 18% using regression analysis and time-series forecasting methods.',
        tools: ['Python', 'Scikit-learn', 'Excel', 'Power BI'],
        github: 'https://github.com',
        demo: '#',
        gradient: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'Business Intelligence Dashboard',
        description:
            'Designed an interactive Power BI dashboard for real-time sales monitoring. Integrated multiple data sources and created automated refresh schedules for stakeholder reporting.',
        tools: ['Power BI', 'SQL', 'DAX', 'Excel'],
        github: 'https://github.com',
        demo: '#',
        gradient: 'from-amber-500 to-orange-500',
    },
];

/** Single project card with 3D tilt hover & glow border */
function ProjectCard({ project, index, isDark }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        setTilt({ x, y });
    };

    const handleReset = () => {
        setTilt({ x: 0, y: 0 });
        setHovering(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleReset}
            style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <div
                className={`relative p-6 rounded-2xl h-full transition-all duration-300 ${isDark ? 'glass' : 'glass-light'
                    } ${hovering
                        ? 'shadow-2xl shadow-primary-500/20 border-primary-500/30'
                        : ''
                    }`}
                style={{
                    borderColor: hovering
                        ? 'rgba(99,102,241,0.3)'
                        : isDark
                            ? 'rgba(255,255,255,0.08)'
                            : 'rgba(255,255,255,0.3)',
                }}
            >
                {/* Gradient header bar */}
                <div
                    className={`h-1.5 w-16 rounded-full mb-5 bg-gradient-to-r ${project.gradient}`}
                />

                <h3
                    className={`text-xl font-display font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}
                >
                    {project.title}
                </h3>
                <p
                    className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/60' : 'text-gray-600'
                        }`}
                >
                    {project.description}
                </p>

                {/* Tools tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tools.map((tool) => (
                        <span
                            key={tool}
                            className={`text-xs px-3 py-1 rounded-full ${isDark
                                    ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                                    : 'bg-primary-100 text-primary-700'
                                }`}
                        >
                            {tool}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 mt-auto">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isDark
                                ? 'text-white/60 hover:text-white'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <FaGithub /> GitHub
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        <HiExternalLink /> Live Demo
                    </a>
                </div>

                {/* Hover glow blob */}
                {hovering && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                        <div
                            className="absolute -inset-1 opacity-20 blur-xl rounded-2xl"
                            style={{
                                background:
                                    'linear-gradient(135deg, #6366f1, transparent, #c084fc)',
                            }}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/**
 * Projects – grid of glassmorphism project cards with 3D tilt hover & glow.
 */
export default function Projects() {
    const { isDark } = useTheme();

    return (
        <section id="projects" className="section-padding relative">
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
                    <span className="gradient-text">Projects</span>
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
                <p
                    className={`mt-4 max-w-lg mx-auto text-sm ${isDark ? 'text-white/50' : 'text-gray-500'
                        }`}
                >
                    A selection of data analysis and business intelligence projects
                    I&apos;ve worked on.
                </p>
            </motion.div>

            {/* Project cards grid */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {PROJECTS.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={i}
                        isDark={isDark}
                    />
                ))}
            </div>
        </section>
    );
}
