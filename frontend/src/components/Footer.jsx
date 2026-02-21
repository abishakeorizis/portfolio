import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaHeart, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

/**
 * Footer – social links and copyright notice.
 */
export default function Footer() {
    const { isDark } = useTheme();

    const links = [
        {
            icon: <FaLinkedinIn />,
            href: 'https://www.linkedin.com/in/abishake-a-97a857382',
            label: 'LinkedIn',
        },
        {
            icon: <FaFacebookF />,
            href: 'https://www.facebook.com/abishekabi123/',
            label: 'Facebook',
        },
        {
            icon: <FaInstagram />,
            href: 'https://www.instagram.com/shake_pachan/',
            label: 'Instagram',
        },
        {
            icon: <FaWhatsapp />,
            href: 'https://wa.me/qr/ADZPS6DWHACJN1',
            label: 'WhatsApp',
        },
        {
            icon: <FaEnvelope />,
            href: 'mailto:abishakeorizistech@gmail.com',
            label: 'Email',
        },
    ];

    return (
        <footer
            className={`relative py-10 border-t ${isDark ? 'border-white/10' : 'border-gray-200'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Brand */}
                <motion.a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xl font-display font-bold gradient-text"
                    whileHover={{ scale: 1.05 }}
                >
                    Abishake.A
                </motion.a>

                {/* Social icons */}
                <div className="flex items-center gap-4">
                    {links.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark
                                ? 'bg-white/10 text-white/70 hover:bg-primary-500 hover:text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-primary-500 hover:text-white'
                                }`}
                            whileHover={{ y: -3 }}
                            aria-label={link.label}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </div>

                {/* Copyright */}
                <p
                    className={`text-xs flex items-center gap-1 ${isDark ? 'text-white/40' : 'text-gray-400'
                        }`}
                >
                    © 2026 Abishake A. Made with{' '}
                    <FaHeart className="text-red-400 text-[10px]" /> All rights reserved.
                </p>
            </div>
        </footer>
    );
}
