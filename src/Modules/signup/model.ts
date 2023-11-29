import { FormikErrors } from "formik";

export interface IFormModel {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface IModel {
    action_submit: () => void;
    form_data: IFormModel;
    form_errors: FormikErrors<IFormModel>;
    handleChange: (e: any) => void;
    go_to_signin: () => void;
    inputRef: any;
    handleonChnageUploadFile: (e: any) => void;
    image_required?: string;
    image?: string;
}