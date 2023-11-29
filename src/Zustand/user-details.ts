import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IModel {
    email: string;
    id: number;
    image: string;
    first_name: string;
    last_name: string;
    set_user_details: (email: string, id: number, image: string, first_name: string, last_name: string) => void;
}

export const useUserDetailsStore = create<IModel>()(
    devtools(
        (set) => ({
            email: "",
            id: 0,
            image: "",
            first_name: "",
            last_name: "",
            set_user_details: (email: string, id: number, image: string, first_name: string, last_name: string) => set((state) => ({ email:email,id: id, image: image, first_name: first_name, last_name: last_name }), undefined, "set user details"),
        })
    )
)