// src/App.js
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import {
  Register,
  Login,
  GetUserLogged,
  GetNotes,
  GetDetailNotes,
  GetArchivedNotes,
} from './components'
import { Navbar } from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from './context/ThemeContext'
import { useState } from 'react'
import ProtectedRoute from './utils/ProtectedRoute'
import { useLanguage } from './context/languageContext'
const App = () => {
  const { isDarkMode, toggleDarkMode } = useTheme() // Ambil dari context
  const { language, toggleLanguage } = useLanguage() // Ambil dari context
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Ambil status autentikasi dari localStorage
    return !!localStorage.getItem('access_token') // Konversi ke boolean
  })

  // Simpan tema ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode])

  return (
    <div
      className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />

      {/* Main Content */}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                isDarkMode={isDarkMode}
                language={language}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="register"
            element={<Register isDarkMode={isDarkMode} language={language} />}
          />
          <Route
            path="login"
            element={
              <Login
                isDarkMode={isDarkMode}
                language={language}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />

          {/* Protected Routes */}
          <Route
            path="users/me"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <GetUserLogged isDarkMode={isDarkMode} language={language} />
              </ProtectedRoute>
            }
          />
          <Route
            path="notes"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <GetNotes isDarkMode={isDarkMode} language={language} />
              </ProtectedRoute>
            }
          />
          <Route
            path="notes/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <GetDetailNotes isDarkMode={isDarkMode} language={language} />
              </ProtectedRoute>
            }
          />
          <Route
            path="notes/archived"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <GetArchivedNotes isDarkMode={isDarkMode} language={language} />
              </ProtectedRoute>
            }
          />

          {/* Rute fallback untuk halaman tidak ditemukan */}
          <Route
            path="*"
            element={<h2 className="text-center">404 - Page Not Found</h2>}
          />
        </Routes>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  )
}

export default App
