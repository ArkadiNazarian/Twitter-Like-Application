import { FormikErrors } from "formik";

export interface IModel {
    user_full_name: {
        first_name: string;
        last_name: string;
    };
    action_logout: () => void;
    categories?: Array<{ id: number; name: string; slug: string; }>;
    select_category?: number;
    handler_select_category: (id: number) => void;
    posts?: Array<IPostModel>;
    onChangePagination: (page: number) => void;
    posts_count?: number;
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
    go_to_edit_post: (id: number) => void;
    action_delete_post: (id: number) => void;
}

export interface IPostModel {
    id: number;
    image: string;
    title: string;
    description: string;
    author: {
        id: number;
        full_name: string;
    }
    category: {
        id: number;
        name: string;
        slug: string;
    }

}

export interface IFormModel {
    title: string;
    description: string;
    category: string;
}