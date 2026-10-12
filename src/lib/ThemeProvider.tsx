import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
} | null>(null);

/** Thème réellement demandé (localStorage, sinon préférence système). Client uniquement. */
const readPreferredTheme = (): Theme => {
    try {
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
        return 'dark';
    }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Premier rendu identique au HTML pré-rendu (SSG) : pas de localStorage ici, sinon
    // erreur d'hydratation React #418/#423. La classe .dark est déjà posée avant le paint
    // par le script inline de index.html ; on synchronise l'état juste après le montage.
    const [theme, setTheme] = useState<Theme>('dark');
    const synced = useRef(false);

    useEffect(() => {
        setTheme(readPreferredTheme());
    }, []);

    useEffect(() => {
        // Ne pas écraser la préférence stockée avec la valeur par défaut du premier rendu
        if (!synced.current) {
            synced.current = true;
            return;
        }
        try {
            localStorage.setItem('theme', theme);
        } catch { /* stockage indisponible */ }
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};

export default ThemeProvider;
