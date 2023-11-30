export const route_names = () => {
    const signin_path = "/signin";
    const signup_path = "/signup";
    const edit_post = "/post/:id"
    const default_path = "*";
    const dashboard = "/dashboard";

    return {
        signin_path,
        signup_path,
        default_path,
        dashboard,
        edit_post
    }
};