import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";

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
        const { access, resfresh } = tokenRefreshResponse?.data;

        const new_access_token = {
          state: {
            token:access
          }
        }

        const new_refresh_token = {
          state: {
            refresh_token:resfresh
          }
        }

        localStorage.setItem("arkadi-project-refresh-token", JSON.stringify(new_refresh_token));
        localStorage.setItem("arkadi-project-access-token", JSON.stringify(new_access_token));
        // access_token_store.set_token(accessToken)
        // refresh_token_store.set_refresh_token(refreshToken)
        failedRequest.response.config.headers["authorization"] =
          "JWT" + access.token;
        return Promise.resolve();
      })
      .catch(() => {

        return Promise.reject();
      });
  };

  createAuthRefreshInterceptor(axios, refreshAuthLogic);

}


