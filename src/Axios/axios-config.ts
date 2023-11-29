export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {

      if (store) {
        config.headers.authorization = `JWT ${store}`;
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