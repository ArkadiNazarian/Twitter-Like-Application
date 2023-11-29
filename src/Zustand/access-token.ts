import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IModel {
    token: string;
    set_token: (token:string) => void;
  }
  
  export const useAccessTokenStore = create<IModel>()(
    devtools(
      persist(
        (set) => ({
          token: '',
          set_token: (token:string) => set((state) => ({ token: token }), undefined, "set access token"),
        }),
        {
          name: 'arkadi-project-access-token',
        }
      )
    )
  )