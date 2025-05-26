import { useAuthStore } from "../../stores/useAuthStore";
import { api } from "../../lib/axios"



export async function excludeUser(id: number ) {

  const {token} = useAuthStore.getState()

  const response = await api.delete(`/users/${id}`, {
     headers:{
        Authorization: `Bearer ${token}`
    },
   })
  

  return response.data

 }