import { StyleSheet } from 'react-native'
import { getScreenSize } from '../../../utils/screenUtils'
import { colors } from '../../../assets'

const screenWidth = getScreenSize().width

export const styles = StyleSheet.create({
    recommends: {
        marginLeft: 20,
        marginBottom: 20,
    },
    castStyle: {
        marginLeft: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
    },
    backdropImage: {
        width: screenWidth,
        height: 170,
    },
    textOverlay: {
        position: 'absolute',
        top: 10,
        left: 5,
        alignSelf: 'center',
    },
    imageOverlay: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-end',
    },
    posterImage: {
        width: 170,
        height: 255,
        marginRight: 10,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
    },
    darkness: {
        backgroundColor: colors.secondaryWhite + '85',
        width: screenWidth,
    },
    platforms: {
        marginLeft: 20,
        marginTop: 5,
        height: 160,
        justifyContent: 'center',
    },
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
        borderRadius: 10,
    },
    divider: {
        backgroundColor: colors.primaryBlack,
        width: 150,
        height: 1,
        margin: 10,
    },
    bottom: {
        marginTop: 20,
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center',
    },
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512,
    },
})
