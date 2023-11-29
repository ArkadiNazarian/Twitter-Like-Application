import { useNavigate } from "react-router-dom";
import { axios_config } from "../../Axios/setup-axions"
import { useAccessTokenStore } from "../../Zustand/access-token";
import { useRefreshTokenStore } from "../../Zustand/refresh-token";
import { useUserDetailsStore } from "../../Zustand/user-details";
import { IModel } from "./model";

export const useContainer = (): IModel => {

    const navigator = useNavigate();
    const user_details_store = useUserDetailsStore();
    const refresh_token_store = useRefreshTokenStore();
    const access_token_store = useAccessTokenStore();


    const action_logout = () => {
        axios_config.post('/api/user/logout/', {
            refresh: refresh_token_store.refresh_token
        }).then(() => {
            access_token_store.set_token('')
            refresh_token_store.set_refresh_token('')
            user_details_store.set_user_details('', 0, '', '', '')
            navigator('/signin')
        }).catch((error) => {
            // handle error
            console.log(error)
        })
    }

    return {
        action_logout,
        user_full_name: {
            first_name: user_details_store.first_name,
            last_name: user_details_store.last_name,
            image:user_details_store.image
        }
    }
}