import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
})

const useAxios = () => {
  const { token } = useContext(AuthContext)

  instance.interceptors.request.use(
    config => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  return instance
}

export default useAxios
