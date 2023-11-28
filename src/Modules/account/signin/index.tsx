import { useContainer } from "./container"
import { View } from "./view"

export const SignIn = () => {
    const props = useContainer();
    return <View {...props}/>
}