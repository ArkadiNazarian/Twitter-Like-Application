import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { routes } from './Routes/routes';
import { Routes as PublicRoutes, PrivateRoutes } from './Routes/custom-routes';
import { useUserDetailsStore } from './Zustand/user-details';
import { useAccessTokenStore } from './Zustand/access-token';
import { useEffect } from 'react';
import { axios_config } from './Axios/setup-axions';
import { NavBar } from './Components/navBar/index';

function App() {

  const app_routes = routes();
  const access_token_store = useAccessTokenStore();
  const user_details_store = useUserDetailsStore();

  useEffect(() => {
    if (access_token_store.token) {
      axios_config.get('/api/user/me/').then((result) => {
        user_details_store.set_user_details(result.data.email, result.data.id, result.data.image, result.data.first_name, result.data.last_name)
      }).catch((error) => {
        // error handle
        console.log(error)
      })
    }
  }, [access_token_store.token, user_details_store])

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
