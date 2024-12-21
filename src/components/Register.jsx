import { useState } from 'react'
import { API_Source } from '../data/API-Source'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from 'react-icons/fa' // Import ikon
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useInput from '../utils/useInput'
import { toast } from 'react-toastify'

export const Register = ({ isDarkMode, language }) => {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const [confirmPassword, onConfirmPasswordChange] = useInput('') // New state for password confirmation
  const [showPassword, setShowPassword] = useState(false) // State untuk menampilkan kata sandi
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // State untuk menampilkan konfirmasi kata sandi
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    // Validate that password and confirm password match
    if (password !== confirmPassword) {
      setError(
        language === 'en'
          ? 'Passwords do not match.'
          : 'Kata sandi tidak cocok.',
      )
      setLoading(false)
      return
    }

    try {
      const result = await API_Source.register(name, email, password)
      if (result.success) {
        setSuccess(
          language === 'en'
            ? 'Registration successful!'
            : 'Pendaftaran berhasil!',
        )
        navigate('/login') // Redirect to login page
        toast.success(
          language === 'en'
            ? 'Registration successful!'
            : 'Pendaftaran berhasil!',
        )
      } else {
        toast.error(
          result.message ||
            (language === 'en' ? 'Registration failed.' : 'Pendaftaran gagal.'),
        )
      }
    } catch {
      setError(
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
          {language === 'en' ? 'Create an Account' : 'Buat Akun'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              <span>{language === 'en' ? 'Name:' : 'Nama:'}</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              required
              placeholder={
                language === 'en' ? 'Enter your name' : 'Masukkan nama Anda'
              }
              className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              <span>{language === 'en' ? 'Email:' : 'Email:'}</span>
            </label>
            <input
              type="email"
              value={email}
              placeholder="example@example.com"
              onChange={onEmailChange}
              required
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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onPasswordChange}
                required
                placeholder="********"
                className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
          <div className="mb-4">
            <label className="flex items-center">
              <FaLock className="mr-2 text-blue-500" />
              <span>
                {language === 'en'
                  ? 'Confirm Password:'
                  : 'Konfirmasi Kata Sandi:'}
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                required
                placeholder="********"
                className={`mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            disabled={loading} // Disable button when loading
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            {loading
              ? language === 'en'
                ? 'Loading...'
                : 'Memuat...'
              : language === 'en'
                ? 'Register'
                : 'Daftar'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && (
          <p className="mt-4 text-green-500 text-center">{success}</p>
        )}
        <p className="mt-6 text-center text-sm">
          {language === 'en' ? 'Already have an account?' : 'Sudah punya akun?'}
          <Link to="/login" className="text-blue-500 hover:underline">
            {language === 'en' ? 'Login here' : 'Masuk di sini'}
          </Link>
        </p>
      </div>
    </div>
  )
}

Register.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
}
