import { useAuthStore } from "../../stores/useAuthStore"
import { api } from "../../lib/axios"



export interface loginBody {
  email: string
  password: string
}



export async function login(credentials: loginBody) {

  const response = await api.post('/login', credentials, {
     headers:{'Content-Type': 'application/json'},
   })
  
   const userData = response.data
   const { setAuth } = useAuthStore.getState()
   setAuth(userData.token)
  return response.data

 }