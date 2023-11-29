import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useAccessTokenStore } from "../Zustand/access-token";
import { useRefreshTokenStore } from "../Zustand/refresh-token";

export default function setupAxios(axios: any, access_token: string, refresh_token: string) {

  // const access_token_store = useAccessTokenStore();
  // const refresh_token_store = useRefreshTokenStore();



  axios.interceptors.request.use(
    (config: any) => {

      if (access_token) {
        config.headers.authorization = `JWT ${access_token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );

  axios.interceptors.response.use((response: any) => {
    return response;
  }, (error: any) => {
    if (error.response.status === 401) {
      // refreshAuthLogic(error.config)
    }
    return error;
  })


  // const refreshAuthLogic = (failedRequest: any) => {
  //   return axios({
  //     method: "Post",
  //     url: `https://rn-api.codebnb.me/api/user/refresh/`,
  //     responseType: "json",
  //     data: {
  //       refresh: refresh_token
  //     }
  //   })

  //     .then((tokenRefreshResponse: any) => {
  //       const { accessToken, refreshToken } = tokenRefreshResponse?.data;

  //       localStorage.setItem("arkadi-project-refresh-token", refreshToken);
  //       localStorage.setItem("arkadi-project-access-token", accessToken);
  //       // access_token_store.set_token(accessToken)
  //       // refresh_token_store.set_refresh_token(refreshToken)
  //       failedRequest.response.config.headers["authorization"] =
  //         "JWT" + accessToken.token;
  //       return Promise.resolve();
  //     })
  //     .catch(() => {

  //       return Promise.reject();
  //     });
  // };

  // createAuthRefreshInterceptor(axios, refreshAuthLogic);

}


