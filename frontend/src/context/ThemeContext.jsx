import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/** Custom hook to access theme state */
export const useTheme = () => useContext(ThemeContext);

/**
 * ThemeProvider – wraps the app to provide dark/light mode toggling.
 * Persists user preference to localStorage.
 */
export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true; // default to dark
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
