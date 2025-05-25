import { useAuthStore } from "../../stores/useAuthStore"
import { api } from "../../lib/axios"


export interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
  profile: string
  tokenVersion: number
  companyId: number
  super: boolean
  online: boolean
  endWork: string
  startWork: string
  color: string
  farewellMessage: string
  whatsappId: number
  allTicket: string
  allowGroup: boolean
  defaultMenu: string
  defaultTheme: string
  profileImage: string
  wpp: string
}

export interface UsersList{
    users: User[]
}



export async function getUsers() {

    const {token} = useAuthStore.getState()

  const response = await api.get('/users', {
     headers:{
        Authorization: `Bearer ${token}`
    },
   })
  
   response.data
   console.log(response.data)
   
  return response.data

 }