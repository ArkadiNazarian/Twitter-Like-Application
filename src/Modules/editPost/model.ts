import { FormikErrors } from "formik";

export interface IPostModel {
    id: number;
    description: string;
    title: string;
    image: string;
    category: {
        id: number;
        name: string;
        slug: string
    }
}

export interface IFormModel {
    title: string;
    description: string;
    category: string;
}

export interface IModel {
    post_details?: IPostModel;
    action_submit: () => void;
    form_data: IFormModel;
    form_errors: FormikErrors<IFormModel>;
    handleChange: (e: any) => void;
    inputRef: any;
    handleonChnageUploadFile: (e: any) => void;
    image?: string;
    categories?: Array<{ id: number; name: string; slug: string; }>;
    go_to_dashboard: () => void;
}