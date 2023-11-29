import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './Modules/signup';
import { SignIn } from './Modules/signin';
import { Dashboard } from './Modules/dashboard';
import { routes } from './Routes/routes';
import { Routes as PublicRoutes, PrivateRoutes } from './Routes/custom-routes';
import { useUserDetailsStore } from './Zustand/user-details';
import { useAccessTokenStore } from './Zustand/access-token';
import { useEffect } from 'react';
import { axios_config } from './Axios/setup-axions';

function App() {

  const app_routes = routes();
  const access_token_store = useAccessTokenStore();
  const user_details_store = useUserDetailsStore();

  useEffect(() => {
    if (access_token_store.token) {
      console.log(access_token_store)
      axios_config.get('/api/user/me/').then((result) => {
        user_details_store.set_user_details(result.data.email, result.data.id, result.data.image, result.data.first_name, result.data.last_name)
      }).catch((error) => {
        // error handle
        console.log(error)
      })
    }
  }, [access_token_store.token])

  return (
    <BrowserRouter>
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
        {/* <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/signin"} element={<SignIn/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
