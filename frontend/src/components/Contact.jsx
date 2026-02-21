import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { HiMail, HiUser, HiChatAlt2, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Contact – glassmorphism form that submits to the backend API.
 * Shows success/error animations on submission.
 */
export default function Contact() {
    const { isDark } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await axios.post(`${BACKEND_URL}/api/contact`, form);
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        } catch (err) {
            setErrorMsg(
                err.response?.data?.error || 'Something went wrong. Please try again.'
            );
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section id="contact" className="section-padding relative">
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
                        Get In{' '}
                    </span>
                    <span className="gradient-text">Touch</span>
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-purple-500" />
                <p
                    className={`mt-4 max-w-lg mx-auto text-sm ${isDark ? 'text-white/50' : 'text-gray-500'
                        }`}
                >
                    Have a project in mind or want to collaborate? Drop me a message!
                </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-10 max-w-4xl mx-auto">
                {/* Contact info sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="md:col-span-2 space-y-6"
                >
                    <div
                        className={`p-6 rounded-2xl ${isDark ? 'glass' : 'glass-light'}`}
                    >
                        <h3
                            className={`text-lg font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                                }`}
                        >
                            Contact Info
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <HiMail className="text-primary-400 text-xl mt-0.5" />
                                <div>
                                    <p
                                        className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'
                                            }`}
                                    >
                                        Email
                                    </p>
                                    <a
                                        href="mailto:abishakeorizistech@gmail.com"
                                        className="text-sm text-primary-300 hover:text-primary-200 transition-colors"
                                    >
                                        abishakeorizistech@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <HiUser className="text-primary-400 text-xl mt-0.5" />
                                <div>
                                    <p
                                        className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'
                                            }`}
                                    >
                                        Location
                                    </p>
                                    <p
                                        className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'
                                            }`}
                                    >
                                        Chennai, Tamil Nadu, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact form */}
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    onSubmit={handleSubmit}
                    className={`md:col-span-3 p-6 md:p-8 rounded-2xl ${isDark ? 'glass' : 'glass-light'
                        }`}
                >
                    {/* Name */}
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className={`block text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'
                                }`}
                        >
                            Name
                        </label>
                        <div className="relative">
                            <HiUser
                                className={`absolute top-3.5 left-3 ${isDark ? 'text-white/30' : 'text-gray-400'
                                    }`}
                            />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border ${isDark
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500/50'
                                        : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-primary-400'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className={`block text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'
                                }`}
                        >
                            Email
                        </label>
                        <div className="relative">
                            <HiMail
                                className={`absolute top-3.5 left-3 ${isDark ? 'text-white/30' : 'text-gray-400'
                                    }`}
                            />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border ${isDark
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500/50'
                                        : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-primary-400'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className={`block text-xs uppercase tracking-wider mb-2 ${isDark ? 'text-white/50' : 'text-gray-500'
                                }`}
                        >
                            Message
                        </label>
                        <div className="relative">
                            <HiChatAlt2
                                className={`absolute top-3.5 left-3 ${isDark ? 'text-white/30' : 'text-gray-400'
                                    }`}
                            />
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border resize-none ${isDark
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary-500/50'
                                        : 'bg-white border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-primary-400'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-glow w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            'Send Message'
                        )}
                    </button>

                    {/* Status feedback */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 flex items-center gap-2 text-emerald-400 text-sm"
                            >
                                <HiCheckCircle className="text-lg" />
                                Message sent successfully! I&apos;ll get back to you soon.
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 flex items-center gap-2 text-red-400 text-sm"
                            >
                                <HiXCircle className="text-lg" />
                                {errorMsg}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>
        </section>
    );
}
