import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import FloatingBackground from './components/FloatingBackground';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * App – main application shell.
 * Renders the loader first, then the full portfolio page with 3D background,
 * cursor glow, navbar, all sections, and footer.
 */
export default function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* Loading screen */}
            <AnimatePresence>
                {loading && <Loader onFinish={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Cursor glow effect */}
            <CursorGlow />

            {/* 3D floating background */}
            <FloatingBackground />

            {/* Navigation */}
            <Navbar />

            {/* Page content */}
            <main className="relative z-10">
                <Hero />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
