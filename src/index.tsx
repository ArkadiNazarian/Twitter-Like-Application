import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import setupAxios from './Axios/axios-config';
import { axios_config } from './Axios/setup-axions';


const access_token = JSON.parse(localStorage.getItem('arkadi-project-access-token')!);
const refresh_token = JSON.parse(localStorage.getItem('arkadi-project-refresh-token')!);

setupAxios(axios_config, access_token.state.token, refresh_token.state.token)

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
