import { useEffect, useState } from 'react'
import { API_Source } from '../data/API-Source'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import PropTypes from 'prop-types'

export const GetUserLogged = ({ isDarkMode, language }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await API_Source.getUserLogged()
        if (result.status === 'success') {
          setUser(result.data)
        } else {
          setError(result.message || 'Failed to retrieve user.')
        }
      } catch {
        setError('An error occurred while fetching user data.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        <p className="text-lg font-semibold">
          {language === 'en' ? 'Loading...' : 'Memuat...'}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div
      className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <h1 className="text-3xl font-bold mb-4">
        {user
          ? language === 'en'
            ? 'User  Information'
            : 'Informasi Pengguna'
          : language === 'en'
            ? 'No User Logged In'
            : 'Tidak Ada Pengguna yang Masuk'}
      </h1>
      {user && (
        <div
          className={`p-4 border rounded-lg shadow-md transition duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
        >
          <p className="text-xl flex items-center">
            <FaUser className="mr-2" />
            <strong>{language === 'en' ? 'Name:' : 'Nama:'}</strong> {user.name}
          </p>
          <p className="text-xl flex items-center">
            <FaEnvelope className="mr-2" />
            <strong>{language === 'en' ? 'Email:' : 'Email:'}</strong>{' '}
            {user.email}
          </p>
        </div>
      )}
    </div>
  )
}

GetUserLogged.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
}
