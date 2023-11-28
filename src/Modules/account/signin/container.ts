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

    const initial_values:IModel = {
        email: "",
        password: "",
        
    };

    const validation_schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().min(4, "Too short").required("This field is required"),
    });

    const action_submit = (values: IModel) => {
        console.log(values)
        
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