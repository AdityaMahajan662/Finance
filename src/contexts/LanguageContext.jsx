'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import en from '../locales/en'
import hi from '../locales/hi'
import mr from '../locales/mr'

const dictionaries = { en, hi, mr }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState(en)

  useEffect(() => {
    // Load language initially from localStorage if present
    const savedLocale = localStorage.getItem('jiju-lang')
    if (savedLocale && ['en', 'hi', 'mr'].includes(savedLocale)) {
      setLocale(savedLocale)
      setTranslations(dictionaries[savedLocale])
    }
  }, [])

  useEffect(() => {
    setTranslations(dictionaries[locale])
    localStorage.setItem('jiju-lang', locale)
  }, [locale])

  const t = (key, fallback) => {
    if (!translations) return fallback || key
    
    if (translations[key] !== undefined) {
      return translations[key]
    }
    
    return fallback || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
