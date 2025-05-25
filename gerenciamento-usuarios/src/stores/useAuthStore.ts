import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


interface AuthState {
  token: string | null

  logout: () => void
  temp: string | null 
  tempToken: string | null 
  setTempAuth: ( token: string) => void 
  clearTempAuth: () => void
  setAuth: (token:string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      temp: null,
      tempToken: null,

      setAuth: ( token: string) => set({ token }),


      logout: () => {
        set({
          token: null,
          temp: null,
          tempToken: null,
        })
        sessionStorage.clear()
      },

      setTempAuth: ( token: string) =>
        set({ tempToken: token }),

      clearTempAuth: () => set({ temp: null, tempToken: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)