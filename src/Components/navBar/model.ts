import { FormikErrors } from "formik";

export interface IModel {
    action_logout: () => void;
    user_full_name: {
        first_name: string;
        last_name: string;
    };
    handler_open_close_modal: () => void;
    open_add_post: boolean;
    set_open_add_post: (value: boolean) => void;
    action_submit: () => void;
    form_data: IFormModel;
    form_errors: FormikErrors<IFormModel>;
    handleChange: (e: any) => void;
    go_to_signin: () => void;
    inputRef: any;
    handleonChnageUploadFile: (e: any) => void;
    image?: string;
    image_required?: string;
}

export interface IFormModel {
    title: string;
    description: string;
    category: string;
}