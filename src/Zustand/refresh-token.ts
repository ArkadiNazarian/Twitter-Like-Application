import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IModel {
    refresh_token: string;
    set_refresh_token: (refresh_token:string) => void;
  }
  
  export const useRefreshTokenStore = create<IModel>()(
    devtools(
      persist(
        (set) => ({
            refresh_token: '',
          set_refresh_token: (refresh_token:string) => set((state) => ({ refresh_token: refresh_token }), undefined, "set refresh token"),
        }),
        {
          name: 'arkadi-project-refresh-token',
        }
      )
    )
  )