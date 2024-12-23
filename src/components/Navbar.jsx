import { FaSun, FaMoon, FaGlobe, FaSignOutAlt, FaUser } from 'react-icons/fa' // Importing icons from react-icons
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Navbar = ({
  isDarkMode,
  toggleDarkMode,
  language,
  toggleLanguage,
}) => {
  const navigate = useNavigate() // Hook to programmatically navigate
  const [isLoading, setIsLoading] = useState(false) // Local loading state

  const handleLogout = () => {
    setIsLoading(true)
    localStorage.removeItem('access_token')
    localStorage.removeItem('isDarkMode')
    localStorage.removeItem('language')

    // Simulate a loading delay
    setTimeout(() => {
      navigate('/login') // Redirect to login page
      setIsLoading(false)
    }, 1000) // Adjust the delay as needed (1000 ms = 1 second)
  }

  return (
    <nav
      className={`flex justify-between items-center p-4 transition-all duration-300 backdrop-blur-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <Link to={'/notes'} className={`text-xl font-bold`}>
        My App
      </Link>
      <div className="flex items-center">
        <button
          onClick={toggleDarkMode}
          className="flex items-center mr-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-300 transition duration-300"
          aria-label={
            isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
          }
          disabled={isLoading} // Disable button while loading
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>
        <Link
          to={'/users/me'}
          className="flex items-center mr-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-300 transition duration-300"
          aria-label={language === 'en' ? 'Go to Profile' : 'Ke Profil'}
        >
          <FaUser className="text-gray-800" />
          <span className="ml-2">
            {language === 'en' ? 'Profile' : 'Profil'}
          </span>
        </Link>
        <button
          onClick={toggleLanguage}
          className="flex items-center mr-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-300 transition duration-300"
          aria-label={
            language === 'en' ? 'Switch to Indonesian' : 'Switch to English'
          }
          disabled={isLoading} // Disable button while loading
        >
          <FaGlobe className="text-blue-500" />
          <span className="ml-2">{language === 'en' ? 'ID' : 'EN'}</span>
        </button>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={`flex items-center px-5 py-2 font-medium rounded-lg transition-all ${
            isLoading
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-red-600 hover:text-white'
          }`}
          aria-label={language === 'en' ? 'Logout' : 'Keluar'}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div
                className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                  isDarkMode ? 'border-gray-300' : 'border-white'
                } mr-2`}
              ></div>
              {language === 'en' ? 'Logging out...' : 'Keluar...'}
            </div>
          ) : (
            <div className="flex items-center">
              <FaSignOutAlt className="mr-2" />
              {language === 'en' ? 'Logout' : 'Keluar'}
            </div>
          )}
        </button>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
}
