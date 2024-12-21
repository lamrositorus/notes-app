import { useState, useEffect } from 'react'
import { API_Source } from '../data/API-Source'
import { Link } from 'react-router-dom'
import { FaArchive, FaCalendarAlt } from 'react-icons/fa' // Pastikan untuk mengimpor ikon yang diperlukan
import PropTypes from 'prop-types'
export const GetArchivedNotes = ({ isDarkMode, language }) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await API_Source.getArchivedNotes()
      console.log('archived: ', result)
      if (result.status === 'success') {
        setNotes(result.data)
      }
      setLoading(false)
    }

    fetchNotes()
  }, []) // Dependensi kosong, hanya berjalan saat pertama kali komponen dimuat

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        <h1 className="text-lg font-semibold">Loading...</h1>
      </div>
    )
  }

  return (
    <div
      className={`p-4 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <FaArchive className="inline-block mr-2 text-blue-500" />
        {language === 'en' ? 'Archived Notes' : 'Catatan Arsip'}
      </h1>
      {notes.length === 0 ? (
        <p className="text-lg text-center">
          {language === 'en'
            ? 'No archived notes available.'
            : 'Tidak ada catatan arsip yang tersedia.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 border rounded-lg shadow-md transition duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
            >
              <Link
                to={`/notes/${note.id}`}
                className="text-xl font-semibold hover:underline flex items-center"
              >
                <FaArchive className="inline-block mr-2" />
                {note.title}
              </Link>
              <p className="mt-2">{note.body}</p>
              <small className="flex items-center text-gray-500 mt-2">
                <FaCalendarAlt className="mr-1" />
                {language === 'en' ? 'Created at:' : 'Dibuat pada:'}{' '}
                {new Date(note.createdAt).toLocaleString()}
              </small>
              <div className="mt-4 flex justify-end">
                <button
                  className={`text-red-500 hover:text-red-700 transition duration-300`}
                  aria-label={
                    language === 'en' ? 'Delete note' : 'Hapus catatan'
                  }
                ></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

GetArchivedNotes.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
}
