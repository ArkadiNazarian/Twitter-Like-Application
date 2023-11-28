import { useContainer } from "./container"
import { View } from "./view"

export const Signup = () => {
    const props = useContainer();
    return <View {...props}/>
}