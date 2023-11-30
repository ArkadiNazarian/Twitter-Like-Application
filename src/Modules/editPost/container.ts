import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axios_config } from "../../Axios/setup-axions";
import { IFormModel, IModel, IPostModel } from "./model";
import *as yup from 'yup';
import { FormikErrors, useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";

export const useContainer = (): IModel => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [post_details, set_post_details] = useState<IPostModel>()
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploaded_file, set_uploaded_file] = useState<any>();
    const [image, set_image] = useState<string>();
    const [categories, set_categories] = useState<Array<{ id: number; name: string; slug: string; }>>();

    const handleonChnageUploadFile = (e: any) => {
        set_uploaded_file(e.target.files[0])
        set_image(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        if (id) {
            axios_config.get(`/api/post/crud/${id}/`).then((result) => {
                console.log(result)
                set_post_details(result.data)

            }).catch((error) => {
                console.log(error)
            })
        }

    }, [id])

    const initial_values: IFormModel = {
        title: "",
        description: "",
        category: "",
    };

    const validation_schema = yup.object().shape({
        title: yup.string().required("This field is required"),
        description: yup.string().required("This field is required"),
        category: yup.string().required("This field is required"),
    });

    const action_submit = (values: IFormModel) => {
        if (uploaded_file) {
            toast.info('Updating...', {
                position: toast.POSITION.TOP_RIGHT
            })
            const formData = new FormData()
            const imageFile = new File([uploaded_file], '01.png');
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('category', values.category)
            formData.append('image', imageFile);

            axios_config.put(`/api/post/crud/${id}/`, formData).then((result) => {
                toast.success('Post is updated successfully', {
                    position: toast.POSITION.TOP_RIGHT
                })
                navigate('/dashboard')
            }).catch((error) => {
                toast.error('Please try again', {
                    position: toast.POSITION.TOP_RIGHT
                })
            })
        } else {
            toast.info('Updating...', {
                position: toast.POSITION.TOP_RIGHT
            })
            fetch(post_details?.image!).then(async (response) => {
                const image_blob = await response.blob();
                const file = new File([image_blob], "01.jpg", { type: 'image/jpeg' })
                const formData = new FormData()
                formData.append('title', values.title)
                formData.append('description', values.description)
                formData.append('category', values.category)
                formData.append('image', file);

                axios_config.put(`/api/post/crud/${id}/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((result) => {
                    toast.success('Post is updated successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate('/dashboard')
                }).catch((error) => {
                    toast.error('Please try again', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                })
            })

        }
    }

    const formik = useFormik({
        initialValues: initial_values,
        validationSchema: validation_schema,
        onSubmit: action_submit
    });

    const form_errors: FormikErrors<IFormModel> = {
        title: formik.submitCount || formik.touched.title ? formik.errors.title : "",
        description: formik.submitCount || formik.touched.description ? formik.errors.description : "",
        category: formik.submitCount || formik.touched.category ? formik.errors.category : "",
    };

    useEffect(() => {
        if (post_details) {
            formik.setFieldValue('title', post_details.title)
            formik.setFieldValue('description', post_details.description)
            formik.setFieldValue('category', post_details.category.id)
        }
    }, [post_details])

    useEffect(() => {
        axios_config.get('/api/category/').then((result) => {
            set_categories(result.data)
        }).catch((error) => {
            // handle error
            console.log(error)
        })
    }, [])

    const go_to_dashboard = () => {
        navigate('/dashboard')
    }

    return {
        action_submit: formik.handleSubmit,
        form_data: formik.values,
        form_errors: form_errors,
        handleChange: formik.handleChange,
        inputRef,
        handleonChnageUploadFile,
        image,
        categories,
        post_details,
        go_to_dashboard
    }
}