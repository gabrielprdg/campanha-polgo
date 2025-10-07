import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_ADMIN_TOKEN

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
