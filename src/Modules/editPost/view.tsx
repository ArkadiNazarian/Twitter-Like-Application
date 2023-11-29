import { InputLabel, MenuItem, Select } from "@mui/material";
import { IModel } from "./model";
import { Dropdown } from "../../Components/dropdown/Dropdown";

export const View = (props:IModel) => (
    <div>
        <form className="tw-ml-[2.26vw] tw-flex tw-justify-center  tw-gap-[3vh] tw-flex-col tw-items-center">
            <div className=" tw-flex tw-flex-col tw-items-center">
                <p className="tw-mt-[2vh] tw-text-custom_light_blue tw-text-4xl tw-mb-[4vh]">Edit post</p>
                {
                    props.image ? <div ><img src={props.image} alt='image' className="tw-w-[10.51vw] tw-h-[10.51vw]" /></div> : <div ><img src={props.post_details?.image} className={`tw-w-[10.51vw] tw-h-[10.51vw] ${props.image_required && "tw-border-custom_dark_red tw-border-2 tw-rounded-2xl"}`} onClick={() => props.inputRef.current.click()} />
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
                <Dropdown>
                    <InputLabel id="select-label">Age</InputLabel>
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

            <button type="button" className="tw-bg-custom_light_blue tw-text-white tw-py-[1vh] tw-px-[3.678vw] tw-rounded-lg" onClick={props.action_submit}>Save</button>

        </form>
        <input
            className="tw-hidden"
            type="file"
            ref={props.inputRef}
            onChange={(e: any) => props.handleonChnageUploadFile(e)}
        />
    </div>
)