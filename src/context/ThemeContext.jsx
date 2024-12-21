// src/ThemeContext.js
import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
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
