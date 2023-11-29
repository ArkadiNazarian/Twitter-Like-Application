import { Pagination } from "@mui/material";
import { DeleteIcon } from "../../Icons/delete-icon";
import { EditIcon } from "../../Icons/edit-icon";
import { IModel } from "./model";

export const View = (props: IModel) => (
    <div className="tw-p-[1vw]">
        <div className="tw-flex tw-justify-between">
            <p>Welcome {props.user_full_name.first_name} {props.user_full_name.last_name}</p>
            <p className="tw-cursor-pointer" onClick={() => props.action_logout()}>Log out</p>
        </div>
        <div className="tw-flex tw-mt-[4vh] tw-gap-[4vw]">
            <div>
                <p className="tw-text-custom_blue tw-text-2xl">Categories</p>
                {
                    props.categories?.map((value) => (
                        <p key={value.id} onClick={() => props.handler_select_category(value.id)} className={`tw-cursor-pointer tw-min-w-max tw-m-[1vw] ${props.select_category === value.id && "tw-text-custom_blue tw-font-bold"}`}>{value.name}</p>
                    ))
                }
            </div>
            <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-[2vw]">
                {
                    props.posts?.map((value) => (
                        <div key={value.id} className="tw-flex tw-justify-between tw-shadow-md tw-w-[29.375vw]">
                            <div className="tw-flex">
                                <div>
                                    <img src={value.image} alt={`${value.title}`} className="tw-w-[10.51vw] tw-h-[200px] tw-rounded-md tw-mr-[1vw]" />
                                </div>
                                <div>
                                    <p className="tw-font-bold">Name</p>
                                    <p>{value.title}</p>
                                    <p className="tw-font-bold tw-mt-[2vh]">Description</p>
                                    <p>{value.description.length < 15 ? value.description : value.description.slice(0, 15) + '...'}</p>
                                    <p className="tw-font-bold tw-mt-[2vh]">Category</p>
                                    <p>{value.category.name}</p>
                                </div>
                            </div>
                            <div className="tw-flex tw-gap-[1.051vw] tw-pt-[1.5vh] tw-pr-[1vw]">
                                <EditIcon className="tw-cursor-pointer" />
                                <DeleteIcon className="tw-cursor-pointer" />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
        <div className="tw-flex tw-justify-center tw-mt-[4vh]">
            {
                props.posts && props.posts.length > 0 && <Pagination variant="outlined" shape="rounded" color="primary" count={Math.ceil(props.posts_count! / 5)} onChange={(e, value) => props.onChangePagination(value)} />
            }
        </div>
    </div>
)