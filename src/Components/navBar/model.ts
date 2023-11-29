import { FormikErrors } from "formik";

export interface IModel {
    action_logout: () => void;
    user_full_name: {
        first_name: string;
        last_name: string;
        image: string;
    };
}
