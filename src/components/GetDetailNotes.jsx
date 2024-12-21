import { useEffect, useState } from 'react'
import { API_Source } from '../data/API-Source'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FaArchive,
  FaUndo,
  FaCalendarAlt,
  FaUser,
  FaTrash,
} from 'react-icons/fa'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2' // Import SweetAlert2

export const GetDetailNotes = ({ isDarkMode, language }) => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const result = await API_Source.detailNotes(id)
        if (result.status === 'success') {
          setNote(result.data)
        } else {
          setError(result.message)
        }
      } catch {
        setError('Failed to fetch note details')
      } finally {
        setLoading(false)
      }
    }

    fetchNoteDetails()
  }, [id])

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: language === 'en' ? 'Are you sure?' : 'Apakah Anda yakin?',
      text:
        language === 'en'
          ? "You won't be able to revert this!"
          : 'Anda tidak akan dapat mengembalikannya!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: language === 'en' ? 'Yes, delete it!' : 'Ya, hapus!',
      cancelButtonText: language === 'en' ? 'Cancel' : 'Batal',
    })

    if (result.isConfirmed) {
      try {
        const deleteResult = await API_Source.deleteNotes(id)
        if (deleteResult.status === 'success') {
          toast.success(
            language === 'en'
              ? 'Note deleted successfully'
              : 'Catatan berhasil dihapus',
          )
          navigate('/notes')
        } else {
          toast.error(deleteResult.message)
          setError(deleteResult.message)
        }
      } catch {
        toast.error(
          language === 'en'
            ? 'Failed to delete note'
            : 'Gagal menghapus catatan',
        )
        setError('Failed to delete note')
      }
    }
  }

  const handleArchive = async () => {
    try {
      const result = await API_Source.archivedNotes(id)
      if (result.status === 'success') {
        setNote((prevNote) => ({ ...prevNote, archived: true }))
        toast.success(
          language === 'en'
            ? 'Note archived successfully'
            : 'Catatan berhasil diarsipkan',
        )
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('Failed to archive note')
    }
  }

  const handleUnarchive = async () => {
    try {
      const result = await API_Source.unarchivedNotes(id)
      if (result.status === 'success') {
        setNote((prevNote) => ({ ...prevNote, archived: false }))
        toast.success(
          language === 'en'
            ? 'Note unarchived successfully'
            : 'Catatan berhasil dibatalkan arsip',
        )
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error('Failed to unarchive note')
    }
  }

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <div className="text-lg font-semibold">
          {language === 'en' ? 'Loading...' : 'Memuat...'}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-transparent'}`}
    >
      <div
        className={`max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-10 transition duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
        <h1
          className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          {language === 'en' ? 'Title: ' : 'Judul: '} {note.title}
        </h1>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {language === 'en' ? 'Body: ' : 'Bodi: '}
          {note.body}
        </p>
        <div
          className={`grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <div className="flex items-center">
            <FaCalendarAlt
              className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
            <p>
              <strong>
                {language === 'en' ? 'Created At:' : 'Dibuat Pada:'}
              </strong>{' '}
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center">
            <FaArchive
              className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
            <p>
              <strong>{language === 'en' ? 'Archived:' : 'Diarsipkan:'}</strong>{' '}
              {note.archived ? 'Yes' : 'No'}
            </p>
          </div>
          <div className="flex items-center">
            <FaUser
              className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            />
            <p>
              <strong>{language === 'en' ? 'Owner:' : 'Pemilik:'}</strong>{' '}
              {note.owner}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleDelete}
            className={`px-4 py-2 rounded transition duration-300 ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            aria-label={language === 'en' ? 'Delete note' : 'Hapus catatan'}
          >
            <FaTrash />
          </button>
          {!note.archived && (
            <button
              onClick={handleArchive}
              className={`px-4 py-2 rounded transition duration-300 ${isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
              aria-label={
                language === 'en' ? 'Archive note' : 'Arsipkan catatan'
              }
            >
              <FaArchive />
            </button>
          )}
          {note.archived && (
            <button
              onClick={handleUnarchive}
              className={`px-4 py-2 rounded transition duration-300 ${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
              aria-label={
                language === 'en' ? 'Unarchive note' : 'Batal arsip catatan'
              }
            >
              <FaUndo />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

GetDetailNotes.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
}
