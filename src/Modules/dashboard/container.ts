import { useNavigate } from "react-router-dom";
import { axios_config } from "../../Axios/setup-axions";
import { useAccessTokenStore } from "../../Zustand/access-token";
import { useRefreshTokenStore } from "../../Zustand/refresh-token";
import { useUserDetailsStore } from "../../Zustand/user-details";
import { useEffect, useRef, useState } from "react";
import { IFormModel, IModel, IPostModel } from "./model";
import { FormikErrors, useFormik } from "formik";
import { toast } from "react-toastify";
import *as yup from 'yup';

export const useContainer = (): IModel => {

  const navigator = useNavigate();
  const user_details_store = useUserDetailsStore();
  const refresh_token_store = useRefreshTokenStore();
  const access_token_store = useAccessTokenStore();
  const [categories, set_categories] = useState<Array<{ id: number; name: string; slug: string; }>>();
  const [select_category, set_select_category] = useState<number>();
  const [posts, set_posts] = useState<Array<IPostModel>>();
  const [posts_count, set_posts_count] = useState<number>()

  useEffect(() => {

    if (access_token_store.token) {
      axios_config.get('/api/category/').then((result) => {
        set_categories(result.data)
        set_posts(undefined)
      }).catch((error) => {
        // handle error
        console.log(error)
      })
    }

  }, [access_token_store.token])

  const action_logout = () => {
    axios_config.post('/api/user/logout/', {
      refresh: refresh_token_store.refresh_token
    }).then(() => {
      access_token_store.set_token('')
      refresh_token_store.set_refresh_token('')
      user_details_store.set_user_details('', 0, '', '', '')
      navigator('/signin')
    }).catch((error) => {
      // handle error
      console.log(error)
    })
  }

  const handler_select_category = (id: number) => {
    set_select_category(id)
    if (id) {
      axios_config.get('/api/post/crud/').then((result) => {
        set_posts_count(result.data.count)
        const filter_results = result.data.results.filter((value: any) => value.category.id === id)

        set_posts(filter_results)
      }).catch((error) => {
        // handle error
        console.log(error)
      })
    }
  }

  const onChangePagination = (page: number) => {
    if (page - 1 === 0) {
      handler_select_category(select_category!)
    } else {
      axios_config.get(`/api/post/crud/?limit=5&offset=${(page - 1) * 5}`).then((result) => {
        const filter_results = result.data.results.filter((value: any) => value.category.id === select_category)

        set_posts(filter_results)
      }).catch((error) => {
        // handle error
        console.log(error)
      })
    }

  }


  const inputRef = useRef<HTMLInputElement>(null)

  const [uploaded_file, set_uploaded_file] = useState<any>();

  const [open_add_post, set_open_add_post] = useState<boolean>(false);

  const [image, set_image] = useState<string>();

  const [image_required, set_image_required] = useState<string>();

  const handler_open_close_modal = () => {
    set_open_add_post(!open_add_post)
  }

  useEffect(() => {
    if (open_add_post === false) {
      formik.resetForm()
      set_uploaded_file(undefined)
      set_image(undefined)
    }
  }, [open_add_post])

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
      toast.info('Creating...', {
        position: toast.POSITION.TOP_RIGHT
      })
      const formData = new FormData()
      const imageFile = new File([uploaded_file], '01.png');
      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('category', values.category)
      formData.append('image', imageFile);

      axios_config.post('/api/post/crud/', formData).then((result) => {
        handler_select_category(Number(values.category))
        toast.success('Post is created successfully', {
          position: toast.POSITION.TOP_RIGHT
        })
      }).catch((error) => {
        toast.error('Please try again', {
          position: toast.POSITION.TOP_RIGHT
        })
      }).finally(() => {
        set_open_add_post(false)
      })
    } else {
      set_image_required("This field is required")
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

  const go_to_signin = () => {
    navigator('/signin')
  }

  const handleonChnageUploadFile = (e: any) => {
    set_uploaded_file(e.target.files[0])
    set_image(URL.createObjectURL(e.target.files[0]))
  }

  const go_to_edit_post = (id: number) => {
    navigator(`/post/${id}`)
  }

  const action_delete_post = (id: number) => {
    axios_config.delete(`/api/post/crud/${id}/`).then((result) => {
      toast.success('Post is deleted successfully', {
        position: toast.POSITION.TOP_RIGHT
      })
      handler_select_category(select_category!)
    }).catch(()=>{
      toast.error('Please try again', {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }

  return {
    user_full_name: {
      first_name: user_details_store.first_name,
      last_name: user_details_store.last_name
    },
    action_logout,
    categories,
    select_category,
    handler_select_category,
    posts,
    onChangePagination,
    posts_count,
    open_add_post,
    handler_open_close_modal,
    set_open_add_post,
    action_submit: formik.handleSubmit,
    form_data: formik.values,
    form_errors: form_errors,
    handleChange: formik.handleChange,
    go_to_signin,
    inputRef,
    handleonChnageUploadFile,
    image,
    image_required,
    go_to_edit_post,
    action_delete_post
  }
}