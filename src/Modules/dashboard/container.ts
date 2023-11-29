import { useNavigate } from "react-router-dom";
import { axios_config } from "../../Axios/setup-axions";
import { useAccessTokenStore } from "../../Zustand/access-token";
import { useRefreshTokenStore } from "../../Zustand/refresh-token";
import { useUserDetailsStore } from "../../Zustand/user-details";
import { useEffect, useState } from "react";
import { IPostModel } from "./model";

export const useContainer = () => {

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

  console.log(posts)

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
    posts_count
  }
}