import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IAdminModel {
    token: string;
    set_token: (token:string) => void;
  }
  
  export const useAdminStore = create<IAdminModel>()(
    devtools(
      persist(
        (set) => ({
          token: '',
          set_token: (token:string) => set((state) => ({ token: token }), undefined, "set token"),
        }),
        {
          name: 'test-storage',
        }
      )
    )
  )