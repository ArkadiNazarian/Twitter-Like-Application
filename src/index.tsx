import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import setupAxios from './Axios/axios-config';
import { axios_config } from './Axios/setup-axions';
import { useAccessTokenStore } from './Zustand/access-token';
import { useRefreshTokenStore } from './Zustand/refresh-token';



// const access_token = JSON.parse(localStorage.getItem('arkadi-project-access-token')!);
// const refresh_token = JSON.parse(localStorage.getItem('arkadi-project-refresh-token')!);

const access_token = useAccessTokenStore.getState()
const refresh_token = useRefreshTokenStore.getState()
// console.log(token.token)


setupAxios(axios_config, access_token.token, refresh_token.refresh_token)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
