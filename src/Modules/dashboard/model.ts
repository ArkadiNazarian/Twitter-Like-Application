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