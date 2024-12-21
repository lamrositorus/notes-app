import { useEffect, useState } from 'react'
import { API_Source } from '../data/API-Source' // Adjust the import path as needed
import { FaStickyNote, FaArchive, FaCalendarAlt } from 'react-icons/fa' // Pastikan untuk mengimpor ikon yang diperlukan
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
export const GetNotes = ({ isDarkMode, language }) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newNote, setNewNote] = useState({ title: '', body: '' })
  const [addingNote, setAddingNote] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await API_Source.getNotes(language)
        if (result.status === 'success') {
          setNotes(result.data)
        } else {
          setError(result.message || 'Failed to retrieve notes.')
        }
      } catch {
        setError('An error occurred while fetching notes.')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [language])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }))
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    setAddingNote(true)
    try {
      const result = await API_Source.addNotes(newNote.title, newNote.body)
      if (result.status === 'success') {
        setNotes((prevNotes) => [...prevNotes, result.data])
        setNewNote({ title: '', body: '' })
        toast.success('Note added successfully')
      } else {
        toast.error(result.message || 'Failed to add note.')
      }
    } catch {
      toast.error('An error occurred while adding the note.')
    } finally {
      setAddingNote(false)
    }
  }

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'en' ? 'Loading notes...' : 'Memuat catatan...'}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <p className={`text-lg text-red-500`}>{error}</p>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <div
        className={`p-6 flex flex-col w-full max-w-3xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md transition-all duration-300`}
      >
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <FaStickyNote className="mr-2 text-blue-500" />
          {language === 'en' ? 'Notes' : 'Catatan'}
        </h1>

        {/* Add Note Form */}
        <form
          onSubmit={handleAddNote}
          className={`mb-6 p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
        >
          <h2 className="text-xl font-semibold mb-2">
            {language === 'en' ? 'Add a New Note' : 'Tambah Catatan Baru'}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Note Title' : 'Judul Catatan'}
              required
              className={`p-3 border rounded-lg ${isDarkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-black border-gray-300'} w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <textarea
              name="body"
              value={newNote.body}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Note Body' : 'Isi Catatan'}
              required
              className={`p-3 border rounded-lg ${isDarkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-black border-gray-300'} w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            type="submit"
            disabled={addingNote}
            className={`mt-2 p-3 bg-blue-600 text-white rounded-lg w-full transition duration-200 hover:bg-blue-500 ${addingNote ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {addingNote
              ? language === 'en'
                ? 'Adding...'
                : 'Menambahkan...'
              : language === 'en'
                ? 'Add Note'
                : 'Tambah Catatan'}
          </button>
        </form>

        {/* Archived Notes Button */}
        <div className="mb-4">
          <Link
            to="/notes/archived"
            className={`flex items-center p-3 rounded-lg transition duration-300 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            aria-label={
              language === 'en' ? 'Go to Archived Notes' : 'Ke Catatan Arsip'
            }
          >
            <FaArchive className="mr-2 text-purple-500" />
            <span>
              {language === 'en' ? 'Archived Notes' : 'Catatan Arsip'}
            </span>
          </Link>
        </div>

        {notes.length === 0 ? (
          <p className="text-lg text-center">
            {language === 'en'
              ? 'No notes available.'
              : 'Tidak ada catatan yang tersedia.'}
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
            {notes.map((note) => (
              <li
                key={note.id}
                className={`p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'}`}
              >
                <Link
                  to={`/notes/${note.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {note.title}
                </Link>
                <p className="mt-2">{note.body}</p>
                <small className="flex items-center text-gray-500 mt-2">
                  <FaCalendarAlt className="mr-1" />
                  {language === 'en' ? 'Created at:' : 'Dibuat pada:'}{' '}
                  {new Date(note.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

GetNotes.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
}
