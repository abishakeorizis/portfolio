import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loader – full-screen loading animation that plays on initial page load.
 * Displays animated bars and the portfolio owner's initials before fading out.
 */
export default function Loader({ onFinish }) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-dark"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            onAnimationComplete={onFinish}
        >
            {/* Animated initials */}
            <motion.h1
                className="text-5xl md:text-7xl font-display font-bold gradient-text mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                A.A
            </motion.h1>

            {/* Loading bar container */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc)',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                />
            </div>

            {/* Subtitle */}
            <motion.p
                className="mt-4 text-sm text-white/40 tracking-widest uppercase font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Loading Portfolio
            </motion.p>

            {/* Floating dots decoration */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary-400/30"
                    style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 18}%`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                    }}
                />
            ))}
        </motion.div>
    );
}
