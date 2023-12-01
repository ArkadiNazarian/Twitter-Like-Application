import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";
import { useAccessTokenStore } from "../Zustand/access-token";
import { useRefreshTokenStore } from "../Zustand/refresh-token";

export default function setupAxios(axios_config: any, access_token: string, refresh_token: string) {
  axios_config.interceptors.request.use(
    (config: any) => {

      if (access_token) {
        config.headers.authorization = `JWT ${access_token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    return axios({
      method: "Post",
      url: `https://rn-api.codebnb.me/api/user/refresh/`,
      responseType: "json",
      data: {
        refresh: refresh_token
      }
    })

      .then((tokenRefreshResponse: any) => {
        const { access, refresh } = tokenRefreshResponse?.data;

        const new_access_token = {
          state: {
            token: access
          }
        }

        const new_refresh_token = {
          state: {
            refresh_token: refresh
          }
        }

        localStorage.setItem("arkadi-project-refresh-token", JSON.stringify(new_refresh_token));
        localStorage.setItem("arkadi-project-access-token", JSON.stringify(new_access_token));

        failedRequest.response.config.headers["authorization"] =
          `JWT ${access}`;
        return Promise.resolve();
      })
      .catch(() => {
        // log out
        useAccessTokenStore.setState({ token: '' })
        useRefreshTokenStore.setState({ refresh_token: '' })
        return Promise.reject();
      });
  };

  createAuthRefreshInterceptor(axios, refreshAuthLogic);

}


