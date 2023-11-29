import { Modal } from "@mui/material";
import { IModel } from "./model";
import { ImagePlaceHolder } from "../../Icons/image-placeholder";

export const View = (props: IModel) => (
    <div className="tw-flex tw-justify-between tw-p-[1vw]">
        <p>Welcome {props.user_full_name.first_name} {props.user_full_name.last_name}</p>
        <p className="tw-text-custom_blue tw-text-2xl tw-cursor-pointer" onClick={() => props.handler_open_close_modal()}>+ Add post</p>
        <p className="tw-cursor-pointer" onClick={() => props.action_logout()}>Log out</p>
        <Modal
            open={props.open_add_post}
            onClose={() => props.handler_open_close_modal()}
        >
            <div className="tw-fixed tw-left-1/4 tw-top-[10vh] tw-w-[50vw] tw-outline-none tw-border-none tw-pb-[2vh] tw-bg-white tw-rounded-2xl">
                <form className="tw-ml-[2.26vw] tw-flex tw-justify-center  tw-gap-[3vh] tw-flex-col tw-items-center">
                    <div className=" tw-flex tw-flex-col tw-items-center">
                        <p className="tw-mt-[2vh] tw-text-custom_light_blue tw-text-4xl tw-mb-[4vh]">Add post</p>
                        {
                            props.image ? <div ><img src={props.image} alt='image' className="tw-w-[10.51vw] tw-h-[10.51vw]" /></div> : <div ><ImagePlaceHolder className={`${props.image_required && "tw-border-custom_dark_red tw-border-2 tw-rounded-2xl"}`} onClick={() => props.inputRef.current.click()} />
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
                        <input
                            type="text"
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
                        <input
                            type="text"
                            name="category"
                            value={props.form_data.category}
                            onChange={props.handleChange}

                            placeholder="Category"
                            className={`${props.form_errors.category ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[17.867vw]`}
                        />
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
    </div>
)