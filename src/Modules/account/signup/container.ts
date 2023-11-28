import { FormikErrors, useFormik } from "formik";
import { IFormModel, IModel } from "./model";
import *as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { route_names } from "../../../Routes/route-names";
import { useState } from "react";

export const useContainer = (): IFormModel => {

    const navigator = useNavigate();
    const app_routes = route_names();

    const [loading, set_loading] = useState<boolean>(false);

    const initial_values: IModel = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: ""
    };

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().min(4, "Too short").required("This field is required"),
        first_name: yup.string().required("This field is required"),
        last_name: yup.string().required("This field is required"),
        confirm_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("This field is required"),
    });

    const action_submit = (values: IModel) => {
        console.log(values)
        axios({
            method: "Post",
            url: `https://rn-api.codebnb.me/api/user/sign-up`,
            responseType: "json",
            data: {
                first_name: 'Example',
                last_name: 'last_name',
                email: 'example@gmail.com',
                password: 'Example11!',
                confirm_password: 'Example11!',
                src: '/home/stdev/Pictures/01.png'
            } as IModel
        }).then((result) => {
            console.log(result)
        })
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit
    });

    const form_errors: FormikErrors<IModel> = {
        email: formik.submitCount || formik.touched.email ? formik.errors.email : "",
        first_name: formik.submitCount || formik.touched.first_name ? formik.errors.first_name : "",
        last_name: formik.submitCount || formik.touched.last_name ? formik.errors.last_name : "",
        password: formik.submitCount || formik.touched.password ? formik.errors.password : "",
        confirm_password: formik.submitCount || formik.touched.confirm_password ? formik.errors.confirm_password : ""
    };

    const go_to_signin = () => {
        navigator('/signin')
    }

    return {
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: form_errors,
        handleChange: formik.handleChange,
        sign_in: app_routes.signin_path,
        handleBlur: formik.handleBlur,
        loading,
        go_to_signin
    }
}