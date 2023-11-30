export interface IModel {
    action_logout: () => void;
    onClick_post: () => void;
    post_active?: boolean;
    user_profile_detials: {
        first_name: string;
        last_name: string;
        image: string;
    };
}
