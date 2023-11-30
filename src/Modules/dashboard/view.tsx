import { InputLabel, MenuItem, Modal, Pagination, Select } from "@mui/material";
import { DeleteIcon } from "../../Icons/delete-icon";
import { EditIcon } from "../../Icons/edit-icon";
import { IModel } from "./model";
import { ImagePlaceHolder } from "../../Icons/image-placeholder";
import { Dropdown } from "../../Components/dropdown/Dropdown";

export const View = (props: IModel) => (
    <div className="tw-p-[1vw]">
        <Modal
            open={props.open_add_post}
            onClose={() => props.handler_open_close_modal()}
        >
            <div className="tw-fixed tw-left-1/4 tw-top-[10vh] tw-w-[50vw] tw-outline-none tw-border-none tw-pb-[2vh] tw-bg-white tw-rounded-2xl">
                <form className="tw-ml-[2.26vw] tw-flex tw-justify-center  tw-gap-[3vh] tw-flex-col tw-items-center">
                    <div className=" tw-flex tw-flex-col tw-items-center">
                        <p className="tw-mt-[2vh] tw-text-custom_light_blue tw-text-4xl tw-mb-[4vh]">Add post</p>
                        {
                            props.image ? <div ><img src={props.image} alt='placeholder' className="tw-w-[10.51vw] tw-h-[10.51vw]" /></div> : <div ><ImagePlaceHolder className={`${props.image_required && "tw-border-custom_dark_red tw-border-2 tw-rounded-2xl"}`} onClick={() => props.inputRef.current.click()} />
                                {
                                    props.image_required && <p className="tw-text-custom_dark_red">This field is required</p>
                                }
                            </div>
                        }

                    </div>
                    <div className="tw-flex tw-flex-col">
                        <input
                            type="text"
                            name="title"
                            value={props.form_data.title}
                            onChange={props.handleChange}

                            placeholder="Title"
                            className={`${props.form_errors.title ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-py-[0.7vh] tw-px-[0.893vw] tw-border-2 tw-rounded-2xl tw-w-[17.867vw]`}
                        />
                        {
                            props.form_errors.title && <p className="tw-text-custom_dark_red">{props.form_errors.title}</p>
                        }
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <textarea
                            name="description"
                            value={props.form_data.description}
                            onChange={props.handleChange}

                            placeholder="Description"
                            className={`${props.form_errors.description ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[17.867vw]`}
                        />

                        {
                            props.form_errors.description && <p className="tw-text-custom_dark_red">{props.form_errors.description}</p>
                        }
                    </div>

                    <div className="tw-flex tw-flex-col tw-mb-[2vh] ">
                        <Dropdown>
                            <InputLabel id="select-label">Category</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={props.form_data.category}
                                name="category"
                                className="tw-w-[18vw] tw-rounded-2xl"
                                onChange={props.handleChange}
                            >
                                {
                                    props.categories?.map((values) => (
                                        <MenuItem key={values.id} value={values.id}>{values.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Dropdown>
                        {
                            props.form_errors.category && <p className="tw-text-custom_dark_red">{props.form_errors.category}</p>
                        }
                    </div>

                    <button type="button" className="tw-bg-custom_light_blue tw-text-white tw-py-[1vh] tw-px-[3.678vw] tw-rounded-lg" onClick={props.action_submit}>Add</button>

                </form>
                <input
                    className="tw-hidden"
                    type="file"
                    ref={props.inputRef}
                    onChange={(e: any) => props.handleonChnageUploadFile(e)}
                />

            </div>
        </Modal>
        <button type="button" className="tw-text-white tw-font-bold tw-bg-custom_light_blue tw-rounded-lg  tw-px-[2.627vw] tw-py-[1vh] tw-cursor-pointer" onClick={() => props.handler_open_close_modal()}>+Add</button>
        <div className="tw-flex tw-mt-[4vh] tw-gap-[4vw]">
            <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-[2vw]">
                {
                    props.posts?.map((value) => (
                        <div key={value.id} className="tw-flex tw-justify-between tw-shadow-md tw-w-[29.375vw]" >
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
                                <EditIcon className="tw-cursor-pointer" onClick={() => props.go_to_edit_post(value.id)} />
                                <DeleteIcon className="tw-cursor-pointer" onClick={() => props.action_delete_post(value.id)} />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
        <div className="tw-flex tw-justify-center tw-mt-[12vh]">
            {
                props.posts && props.posts.length > 0 && <Pagination variant="outlined" shape="rounded" color="primary" count={Math.ceil(props.posts_count! / 5)} onChange={(e, value) => props.onChangePagination(value)} />
            }
        </div>

    </div>
)