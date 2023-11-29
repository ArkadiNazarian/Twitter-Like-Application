import { useContainer } from "./container"
import { View } from "./view"

export const NavBar = () => {
    const props = useContainer();
    return <View {...props}/>
}