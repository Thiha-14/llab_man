'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export type LanguageCode = 'en' | 'ar' | 'fr' | 'zh';

interface Language {
    code: LanguageCode;
    name: string;
    native: string;
    flag: string;
    rtl: boolean;
}

interface LanguageContextType {
    currentLanguage: Language;
    setLanguage: (code: LanguageCode) => void;
    languages: Language[];
}

const languages: Language[] = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', rtl: false },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', rtl: true },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', rtl: false },
    { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳', rtl: false },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('sl_language') as LanguageCode | null;
            if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
                const lang = languages.find(l => l.code === savedLanguage);
                if (lang) {
                    setCurrentLanguage(lang);
                    document.documentElement.lang = lang.code;
                    document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
                }
            }
            setMounted(true);
        }
    }, []);

    const handleSetLanguage = useCallback((code: LanguageCode) => {
        const lang = languages.find(l => l.code === code);
        if (lang) {
            setCurrentLanguage(lang);
            localStorage.setItem('sl_language', code);
            document.documentElement.lang = code;
            document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
        }
    }, []);

    const value = useMemo(() => ({
        currentLanguage,
        setLanguage: handleSetLanguage,
        languages
    }), [currentLanguage, handleSetLanguage]);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
