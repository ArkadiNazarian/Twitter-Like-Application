import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './Modules/signup';
import { SignIn } from './Modules/signin';
import { Dashboard } from './Modules/dashboard';
import { routes } from './Routes/routes';
import { Routes as PublicRoutes, PrivateRoutes } from './Routes/custom-routes';

function App() {
  
  const app_routes = routes();
  
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
