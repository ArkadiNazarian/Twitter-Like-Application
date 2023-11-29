import { FormikErrors } from "formik";

export interface IModel {
    action_logout: () => void;
    user_profile_detials: {
        first_name: string;
        last_name: string;
        image: string;
    };
}
