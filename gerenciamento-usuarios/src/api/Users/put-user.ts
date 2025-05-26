import { useAuthStore } from "../../stores/useAuthStore";
import type { UserInterface } from "./get-users";
import { api } from "../../lib/axios"



export async function editUser(editedUser: UserInterface) {

  const {token} = useAuthStore.getState()

  const response = await api.put(`/users/${editedUser.id}`, editedUser, {
     headers:{
        Authorization: `Bearer ${token}`
    },
   })
  
  return response.data

 }