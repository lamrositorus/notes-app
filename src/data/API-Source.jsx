import { Endpoint } from './Endpoint'

export class API_Source {
  /* users */
  static async register(name, email, password) {
    const response = await fetch(Endpoint.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    return response.json()
  }
  static async login(email, password) {
    const response = await fetch(Endpoint.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    // Parse the response as JSON
    const result = await response.json()

    // Check if the login was successful
    if (result.status === 'success') {
      // Store the access token in localStorage
      const accessToken = result.data.accessToken
      localStorage.setItem('access_token', accessToken)
      console.log('Access token: ', accessToken)
    }

    return result // Return the result for further handling in the Login component
  }
  static async getUserLogged() {
    const response = await fetch(Endpoint.getUserLogged, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }

  /* notes */
  static async getNotes() {
    const response = await fetch(Endpoint.getNotes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }
  static async addNotes(title, body) {
    const response = await fetch(Endpoint.addNotes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    })
    return response.json()
  }
  static async detailNotes(id) {
    const response = await fetch(Endpoint.detailNotes(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }
  static async deleteNotes(id) {
    const response = await fetch(Endpoint.deleteNotes(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }
  static async getArchivedNotes() {
    const response = await fetch(Endpoint.getArchivedNotes, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }
  static async archivedNotes(id) {
    const response = await fetch(Endpoint.archivedNotes(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }
  static async unarchivedNotes(id) {
    const response = await fetch(Endpoint.unarchivedNotes(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    return response.json()
  }
}
