import { FormikErrors, useFormik } from "formik";
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { route_names } from "../../Routes/route-names";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccessTokenStore } from "../../Zustand/access-token";
import { useUserDetailsStore } from "../../Zustand/user-details";

export const useContainer = (): IFormModel => {

    const navigator = useNavigate();
    const app_routes = route_names();
    const access_token_store = useAccessTokenStore();
    const user_details_store = useUserDetailsStore();

    const [loading, set_loading] = useState<boolean>(false);

    const initial_values: IModel = {
        email: "",
        password: "",

    };

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().min(6, "Too short").required("This field is required"),
    });

    const action_submit = (values: IModel) => {

        axios({
            method: "Post",
            url: `https://rn-api.codebnb.me/api/user/sign-in/`,
            responseType: "json",
            data: {
                email: 'example@gmail.com',
                password: 'Example11!',
            }
        }).then((result) => {
            access_token_store.set_token(result.data.token.access)
            user_details_store.set_user_details(result.data.user.email, result.data.user.id, result.data.user.image, result.data.user.first_name, result.data.user.last_name)
            navigator('/dashboard')
        }).catch(() => {
            toast.error('Wrong password or email', {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit
    });

    const form_errors: FormikErrors<IModel> = {
        email: formik.submitCount || formik.touched.email ? formik.errors.email : "",
        password: formik.submitCount || formik.touched.password ? formik.errors.password : "",
    };

    const go_to_signup = () => {
        navigator('/signup')
    }

    return {
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: form_errors,
        handleChange: formik.handleChange,
        sign_in: app_routes.signin_path,
        handleBlur: formik.handleBlur,
        loading,
        go_to_signup
    }
}