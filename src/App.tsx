import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Signup } from './Modules/account/signup';
import { SignIn } from './Modules/account/signin';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<PrivateRoutes />}>
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
        </Route> */}
        <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/signin"} element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
