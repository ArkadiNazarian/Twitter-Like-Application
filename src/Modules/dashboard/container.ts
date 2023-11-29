import { useAccessTokenStore } from "../../Zustand/access-token";
import { useUserDetailsStore } from "../../Zustand/user-details";
import axios from "axios";

export const useContainer = () => {
    const user_details_store = useUserDetailsStore();
    const access_token=useAccessTokenStore()

    axios.get('https://rn-api.codebnb.me/api/user/me/', {
        headers: {
          Authorization: `JWT ${access_token.token}`
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    return {
        user_details_store
    }
}