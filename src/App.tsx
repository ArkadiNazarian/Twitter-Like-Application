import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { routes } from './Routes/routes';
import { Routes as PublicRoutes, PrivateRoutes } from './Routes/custom-routes';
import { useAccessTokenStore } from './Zustand/access-token';
import { NavBar } from './Components/navBar/index';
import { useEffect } from 'react';
import setupAxios from './Axios/axios-config';
import { axios_config } from './Axios/setup-axions';
import { useRefreshTokenStore } from './Zustand/refresh-token';

function App() {

  const app_routes = routes();
  const access_token_store = useAccessTokenStore();

  useEffect(() => {
    setupAxios(axios_config, useRefreshTokenStore.getState().refresh_token)
  }, [localStorage.getItem("arkadi-project-access-token")])

  return (
    <BrowserRouter>
      {
        access_token_store.token && <NavBar />
      }
      <Routes>
        <Route element={<PrivateRoutes />}>

          {
            app_routes.private_routes.map((value, index) => (
              <Route path={value.path} element={value.component} key={index} />
            ))
          }
        </Route>
        <Route element={<PublicRoutes />}>
          {
            app_routes.public_routes.map((value, index) => (
              <Route path={value.path} element={value.component} key={index} />
            ))
          }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
