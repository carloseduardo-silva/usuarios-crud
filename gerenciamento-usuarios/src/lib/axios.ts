import axios from 'axios'

export const api = axios.create({
    baseURL: "http://177.136.250.30:3000/",
    withCredentials: false,
})