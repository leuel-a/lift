import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// TODO: maybe doing this for every request is not needed
apiClient.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    if (refreshToken) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
