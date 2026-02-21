import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

/**
 * Navbar – fixed glassmorphism navigation bar.
 * Includes smooth-scroll links, dark/light toggle, and mobile hamburger menu.
 */
export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'glass' : 'glass-light'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => handleClick(e, '#hero')}
                    className="text-xl font-display font-bold gradient-text"
                >
                    Abishake.A
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className={`text-sm font-medium transition-colors duration-200 ${isDark
                                ? 'text-white/70 hover:text-white'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${isDark
                            ? 'text-yellow-300 hover:bg-white/10'
                            : 'text-indigo-600 hover:bg-indigo-50'
                            }`}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <BsSun size={18} /> : <BsMoonStars size={18} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-yellow-300 hover:bg-white/10"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <BsSun size={18} /> : <BsMoonStars size={18} />}
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`p-2 rounded-lg ${isDark ? 'text-white' : 'text-gray-800'}`}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className={`md:hidden ${isDark ? 'glass' : 'glass-light'} border-t ${isDark ? 'border-white/10' : 'border-gray-200'
                            }`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-4 py-4 flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className={`text-base font-medium py-2 ${isDark
                                        ? 'text-white/80 hover:text-white'
                                        : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
