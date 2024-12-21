import { useState } from 'react'
import { API_Source } from '../data/API-Source'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from 'react-icons/fa' // Import ikon
import PropTypes from 'prop-types'
import useInput from '../utils/useInput'

export const Login = ({ isDarkMode, language, setIsAuthenticated }) => {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const [showPassword, setShowPassword] = useState(false) // State untuk menampilkan kata sandi
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const result = await API_Source.login(email, password)
      if (result.status === 'success') {
        setSuccess(language === 'en' ? 'Login successful!' : 'Login berhasil!')
        setIsAuthenticated(true)
        navigate('/notes')
        toast.success(
          language === 'en' ? 'Login successful!' : 'Login berhasil!',
        )
      } else {
        result.message ||
          (language === 'en' ? 'Registration failed.' : 'Pendaftaran gagal.')
      }
    } catch {
      toast.error(
        language === 'en'
          ? 'An error occurred. Please try again.'
          : 'Terjadi kesalahan. Silakan coba lagi.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <div
        className={`rounded-lg shadow-lg p-8 w-full max-w-md transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          {language === 'en' ? 'Login' : 'Masuk'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              <span>{language === 'en' ? 'Email:' : 'Email:'}</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={onEmailChange}
              required
              placeholder="example@example.com"
              className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <FaLock className="mr-2 text-blue-500" />
              <span>{language === 'en' ? 'Password:' : 'Kata Sandi:'}</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type
                value={password}
                onChange={onPasswordChange}
                required
                placeholder="********"
                className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-lg flex items-center justify-center ${loading ? 'bg-gray-400' : 'bg -blue-500'} text-white bg-blue-600 font-semibold hover:bg-blue-600 transition duration-200 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {loading
              ? language === 'en'
                ? 'Loading...'
                : 'Memuat...'
              : language === 'en'
                ? 'Login'
                : 'Masuk'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-500 text-center">{success}</p>
        )}
        <p className="mt-6 text-center text-sm">
          {language === 'en' ? "Don't have an account?" : 'Belum punya akun?'}
          <Link to="/register" className="text-blue-500 hover:underline">
            {language === 'en' ? ' Register' : ' Daftar'}
          </Link>
        </p>
      </div>
    </div>
  )
}

Login.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  language: PropTypes.oneOf(['en', 'id']).isRequired, // Validate language prop
  setIsAuthenticated: PropTypes.func.isRequired,
}
