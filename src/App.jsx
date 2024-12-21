import { Route, Routes } from 'react-router-dom'
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
import { useState } from 'react'
import ProtectedRoute from './utils/ProtectedRoute'
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState('en') // 'en' for English, 'id' for Indonesian
  const [isAuthenticated, setIsAuthenticated] = useState(false) // State untuk autentikasi

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'id' : 'en'))
  }

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
            element={<Register isDarkMode={isDarkMode} language={language} />}
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
