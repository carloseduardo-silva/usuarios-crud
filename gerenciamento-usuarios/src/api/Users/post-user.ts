import { useAuthStore } from "../../stores/useAuthStore";
import { api } from "../../lib/axios"

export interface newUserInterface {
  id: number
  name: string
  email: string
  password:string,
  createdAt: string
  companyId: number
  updatedAt?: string
  profile?: string
  tokenVersion?: number
  super?: boolean
  online?: boolean
  endWork?: string
  startWork?: string
  color?: string
  farewellMessage?: string
  whatsappId?: number
  allTicket?: string
  allowGroup?: boolean
  defaultMenu?: string
  defaultTheme?: string
  profileImage?: string
  wpp?: string
}




export async function createUser(newUser: newUserInterface) {

  const {token} = useAuthStore.getState()

  const response = await api.post('/users', newUser, {
     headers:{
        Authorization: `Bearer ${token}`
    },
   })
  
  return response.data

 }