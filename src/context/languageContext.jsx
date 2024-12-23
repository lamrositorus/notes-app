// src/context/LanguageContext.js
import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Ambil nilai bahasa dari localStorage
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage ? savedLanguage : 'en' // Default ke 'en' jika tidak ada
  })

  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === 'en' ? 'id' : 'en'
      // Simpan bahasa baru ke localStorage
      localStorage.setItem('language', newLang)
      return newLang
    })
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  return useContext(LanguageContext)
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
