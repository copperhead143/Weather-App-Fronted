import React, {createContext, useContext, useState} from 'react'
import {translations} from '../i18n/translations'
import type {Translation} from '../i18n/translations'

type Language = 'en' | 'pl'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if(context ===undefined) {
        throw new Error('useLanguage must be used with a language provider')
    }
    return context
}

interface LanguageProviderProps {
    children: React.ReactNode
}

export const LanguageProvider : React.FC<LanguageProviderProps> = ({children}) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLang = localStorage.getItem('language') as Language
        if(savedLang && (savedLang === 'en' || savedLang === 'pl')){
            return savedLang
        }

        const browserLang = navigator.language.toLowerCase()
        return browserLang.startsWith('pl') ? 'pl' : 'en'
    })

    const handleSetLanguage = (lang:Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }
    

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage: handleSetLanguage,
            t: translations[language]
        }}>
            {children}
        </LanguageContext.Provider>
    )
}