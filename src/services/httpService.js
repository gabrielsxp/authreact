import axios from 'axios'
import { get } from './localStorageMethods'

const axiosInstance = axios.create({
  baseURL: 'http://ygo.kofastools.com'
})

axiosInstance.interceptors.response.use((response) => {
  switch (response.status) {
    case 201:
      switch (response.config.url) {
        case '/signup': {
          const { user, token } = response.data.data.data
          return { user, token }
        }
        default:
          return response.data.data
      }
    case 200:
      switch (response.config.url) {
        case '/signin': {
          const { user, token } = response.data.data.data
          return { user, token }
        }
        default:
          return response.data
      }
    default:
      return response.data.data
  }
})

axiosInstance.interceptors.request.use((config) => {
  const token = get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['Content-Type'] = 'application/json'

  return config
})

export default axiosInstance
