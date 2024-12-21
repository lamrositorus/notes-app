import { CONFIG } from './Config'
export const Endpoint = {
  //user
  register: `${CONFIG.BASE_URL}/register`,
  login: `${CONFIG.BASE_URL}/login`,
  getUserLogged: `${CONFIG.BASE_URL}/users/me`,

  //notes
  getNotes: `${CONFIG.BASE_URL}/notes`,
  addNotes: `${CONFIG.BASE_URL}/notes`,
  detailNotes: (id) => `${CONFIG.BASE_URL}/notes/${id}`,
  deleteNotes: (id) => `${CONFIG.BASE_URL}/notes/${id}`,
  getArchivedNotes: `${CONFIG.BASE_URL}/notes/archived`,
  archivedNotes: (id) => `${CONFIG.BASE_URL}/notes/${id}/archive`,
  unarchivedNotes: (id) => `${CONFIG.BASE_URL}/notes/${id}/unarchive`,
}
