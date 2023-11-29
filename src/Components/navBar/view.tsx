import { IModel } from "./model";

export const View = (props: IModel) => (
    <div className="tw-flex tw-justify-end tw-p-[1vw] tw-items-center">
        <img className="tw-w-[3.678vw] tw-h-[3.678vw]" src={props.user_full_name.image}/>
        <p className="tw-mr-[1vw]">{props.user_full_name.first_name} {props.user_full_name.last_name}</p>
        <p className="tw-cursor-pointer tw-text-custom_blue" onClick={() => props.action_logout()}>Log out</p>
    </div>
)