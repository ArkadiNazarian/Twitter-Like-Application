import { useLocation, useNavigate } from "react-router-dom";
import { axios_config } from "../../Axios/setup-axions"
import { useAccessTokenStore } from "../../Zustand/access-token";
import { useRefreshTokenStore } from "../../Zustand/refresh-token";
import { useUserDetailsStore } from "../../Zustand/user-details";
import { IModel } from "./model";
import { useEffect, useState } from "react";
import axios from "axios";

export const useContainer = (): IModel => {

    const navigate = useNavigate();
    const location = useLocation();
    const user_details_store = useUserDetailsStore();
    const refresh_token_store = useRefreshTokenStore();
    const access_token_store = useAccessTokenStore();
    const [post_active, set_post_active] = useState<boolean>();

    useEffect(() => {

        axios({
            method: "GET",
            url: "https://rn-api.codebnb.me/api/user/me/",
            headers: {
                Authorization: `JWT ${access_token_store.token}`
            }
        }).then((result) => {
            user_details_store.set_user_details(result.data.email, result.data.id, result.data.image, result.data.first_name, result.data.last_name)
        }).catch((error) => {
            console.log(error)
        })

    }, [])

    useEffect(() => {
        if (location.pathname === "/dashboard" || location.pathname === "/") {
            set_post_active(true)
        } else {
            set_post_active(false)
        }
    }, [location])

    const action_logout = () => {
        axios_config.post('/api/user/logout/', {
            refresh: refresh_token_store.refresh_token
        }).then(() => {
            access_token_store.set_token('')
            refresh_token_store.set_refresh_token('')
            user_details_store.set_user_details('', 0, '', '', '')
            navigate('/signin')
        }).catch((error) => {
            // handle error
            console.log(error)
        })
    }

    const onClick_post=()=>{
        navigate('/dashboard')
    }

    return {
        action_logout,
        onClick_post,
        post_active,
        user_profile_detials: {
            first_name: user_details_store.first_name,
            last_name: user_details_store.last_name,
            image: user_details_store.image
        }
    }
}