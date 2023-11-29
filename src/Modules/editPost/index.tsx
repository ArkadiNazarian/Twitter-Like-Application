import { useContainer } from "./container"
import { View } from "./view"

export const EditPost = () => {
    const props = useContainer();
    return <View {...props}/>
}