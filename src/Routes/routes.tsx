import { Dashboard } from "../Modules/dashboard";
import { EditPost } from "../Modules/editPost";
import { SignIn } from "../Modules/signin";
import { Signup } from "../Modules/signup";
import { route_names } from "./route-names";


export const routes = () => {
    const app_routes = route_names();

    const public_routes = [
        {
            path: app_routes.signup_path,
            component: <Signup />
        },
        {
            path: app_routes.signin_path,
            component: <SignIn />
        }
    ];

    const private_routes = [
        {
            path: app_routes.dashboard,
            component: <Dashboard />
        },
        {
            path: app_routes.default_path,
            component: <Dashboard />
        },
        {
            path: app_routes.edit_post,
            component: <EditPost />
        }
    ];


    return {
        public_routes,
        private_routes
    }
}