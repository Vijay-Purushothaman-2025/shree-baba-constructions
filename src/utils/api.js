import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shree-baba-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const submitQuote       = (data)      => API.post('/quotes', data)
export const calculateEstimate = (data)      => API.post('/estimation/calculate', data)
export const loginAdmin        = (data)      => API.post('/admin/login', data)
export const getDashboard      = ()          => API.get('/admin/dashboard')
export const getQuotes         = ()          => API.get('/quotes')
export const updateQuote       = (id, data)  => API.put(`/quotes/${id}`, data)
export const deleteQuote       = (id)        => API.delete(`/quotes/${id}`)

export default API