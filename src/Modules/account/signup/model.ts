import { FormikErrors } from "formik";

export interface IModel {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface IFormModel {
    action_submit: () => void;
    form_data: IModel;
    form_errors: FormikErrors<IModel>;
    handleChange: (e: any) => void;
    go_to_signin: () => void;
    inputRef: any;
    handleonChnageUploadFile: (e: any) => void;
}