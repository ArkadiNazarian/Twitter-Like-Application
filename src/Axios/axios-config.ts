export default function setupAxios(axios: any, access_token: string, refresh_token: string) {
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
    // if (error.response.status === 401) {


    // }
    return error;
  })
}