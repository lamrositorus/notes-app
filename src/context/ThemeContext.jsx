// src/ThemeContext.js
import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Ambil nilai tema dari localStorage
    const savedTheme = localStorage.getItem('isDarkMode')
    return savedTheme === 'true' // Konversi string ke boolean
  })

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      // Simpan tema baru ke localStorage
      localStorage.setItem('isDarkMode', newMode)
      return newMode
    })
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
