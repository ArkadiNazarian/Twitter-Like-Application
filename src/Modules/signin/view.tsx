import { IFormModel } from "./model";


export const View = (props: IFormModel) => (
    <div className="tw-bg-custom_blue tw-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-bg-white tw-w-[25.223vw] tw-flex tw-flex-col tw-rounded-2xl">

            <form className="tw-flex tw-justify-center tw-flex-col tw-items-center">
                <div>
                    <p className="tw-mt-[2vh] tw-text-custom_light_blue tw-text-4xl tw-mb-[4vh]">Sign In</p>
                </div>
                <div className="tw-flex tw-flex-col tw-mb-[2.845vh]">
                    <input
                        type="email"
                        name="email"
                        value={props.form_data.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Email"
                        className={`${props.form_errors.email ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : "tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[21.019vw]`}
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
                            onBlur={props.handleBlur}
                            placeholder="Password"
                            className={`${props.form_errors.password ? "tw-border-custom_dark_red tw-outline-custom_dark_red tw-bg-custom_white tw-placeholder-custom_dark_red" : " tw-border-custom_light_blue tw-outline-custom_blue"} tw-border-2 tw-py-[0.7vh] tw-px-[0.893vw] tw-rounded-2xl tw-w-[21.019vw]`}
                        />
                        {
                            props.form_errors.password && <p className="tw-text-custom_dark_red">{props.form_errors.password}</p>
                        }
                    </div>

                </div>
                <div className="tw-flex tw-items-center tw-gap-[0.5vw] tw-mb-[2vh] tw-w-full tw-ml-[5vw]">
                    <input
                        type='checkbox'
                        className="tw-bg-custom_light_blue"
                        // there isn't provided route for remember me
                    />
                    <p>Remember me</p>
                </div>
                <button type="button" className="tw-bg-custom_light_blue tw-text-white tw-py-[1vh] tw-px-[3.678vw] tw-rounded-lg" onClick={props.action_submit}>LogIn</button>
                <div className="tw-flex tw-items-center tw-mt-[2vh] tw-mb-[6vh]">
                    <p>Need an account ?</p>
                    <p className="tw-text-custom_light_blue tw-cursor-pointer" onClick={() => props.go_to_signup()}>SignUp</p>
                </div>
            </form>

        </div>
    </div>
)