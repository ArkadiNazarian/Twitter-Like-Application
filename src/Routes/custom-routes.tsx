import { Outlet, Navigate } from 'react-router-dom';
import { route_names } from './route-names';
import { useAccessTokenStore } from '../Zustand/access-token';

export const PrivateRoutes = () => {

    const access_token_store = useAccessTokenStore();
    const route = route_names();

    return access_token_store.token ? <Outlet /> : <Navigate to={route.signin_path} />
}

export const Routes = () => {
    const access_token_store = useAccessTokenStore();
    const route = route_names();

    return access_token_store.token ? <Navigate to={route.dashboard} /> : <Outlet />
}