import { PersonIcon } from "../../Icons/person-icon";
import { IFormModel } from "./model";


export const View = (props: IFormModel) => (
    <div className="tw-bg-custom_blue tw-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-bg-white tw-w-[41.04vw] tw-flex tw-flex-col tw-rounded-2xl">

            <form className="tw-ml-[2.26vw] tw-flex tw-justify-center tw-flex-col tw-items-center">
                <div className=" tw-mb-[4vh]">
                    <p className="tw-mt-[2vh] tw-text-custom_light_blue tw-text-4xl tw-mb-[4vh]">Sign Up</p>
                    <PersonIcon onClick={()=>props.inputRef.current.click()}/>
                </div>
                <div className="tw-flex tw-gap-[1.104vw] tw-mb-[2vh]">
                    <div className="tw-flex tw-flex-col">
                        <input
                            type="text"
                            name="first_name"
                            value={props.form_data.first_name}
                            onChange={props.handleChange}
                           
                            placeholder="First name"
                            className={`${props.form_errors.first_name ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-py-[0.7vh] tw-px-[0.893vw] tw-border-2 tw-rounded-2xl tw-w-[17.867vw]`}
                        />
                        {
                            props.form_errors.first_name && <p className="tw-text-custom_dark_red">{props.form_errors.first_name}</p>
                        }
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <input
                            type="text"
                            name="last_name"
                            value={props.form_data.last_name}
                            onChange={props.handleChange}
                           
                            placeholder="Last name"
                            className={`${props.form_errors.last_name ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[17.867vw]`}
                        />

                        {
                            props.form_errors.last_name && <p className="tw-text-custom_dark_red">{props.form_errors.last_name}</p>
                        }
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-mb-[2vh] ">
                    <input
                        type="email"
                        name="email"
                        value={props.form_data.email}
                        onChange={props.handleChange}
                       
                        placeholder="Email"
                        className={`${props.form_errors.email ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-mr-[19vw] tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[17.867vw]`}
                    />
                    {
                        props.form_errors.email && <p className="tw-text-custom_dark_red">{props.form_errors.email}</p>
                    }
                </div>
                <div className="tw-flex tw-gap-[1.104vw] tw-mb-[2vh]">
                    <div className="tw-flex tw-flex-col">
                        <input
                            type="password"
                            name="password"
                            value={props.form_data.password}
                            onChange={props.handleChange}
                           
                            placeholder="Password"
                            className={`${props.form_errors.password ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : " tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[17.867vw]`}
                        />
                        {
                            props.form_errors.password && <p className="tw-text-custom_dark_red">{props.form_errors.password}</p>
                        }
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <input
                            type="password"
                            name="confirm_password"
                            value={props.form_data.confirm_password}
                            onChange={props.handleChange}
                            placeholder="Custom password"
                            className={`${props.form_errors.confirm_password ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[17.867vw]`}
                        />
                        {
                            props.form_errors.confirm_password && <p>{props.form_errors.confirm_password}</p>
                        }
                    </div>
                </div>
                <button className="tw-bg-custom_light_blue tw-text-white tw-py-[1vh] tw-px-[3.678vw] tw-rounded-lg" onClick={props.action_submit}>Signup</button>
                <div className="tw-flex tw-items-center tw-mt-[2vh]">
                    <p>Already have an account ?</p>
                    <p className="tw-text-custom_light_blue tw-cursor-pointer" onClick={() => props.go_to_signin()}>Login</p>
                </div>
            </form>
            <input
                className="tw-hidden"
                type="file"
                ref={props.inputRef}
                onChange={(e: any) => props.handleonChnageUploadFile(e)}
            />
        </div>
    </div>
)