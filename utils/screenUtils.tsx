import { Dimensions } from "react-native"

export const getScreenSize = () => {
    return Dimensions.get('window')
}