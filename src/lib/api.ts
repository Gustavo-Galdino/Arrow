import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://arrow-iota.vercel.app',
})
