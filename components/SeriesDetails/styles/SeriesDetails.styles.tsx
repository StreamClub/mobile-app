import { StyleSheet} from 'react-native'
import { getScreenSize } from '../../../utils/screenUtils';
import { colors } from '../../../assets';

const screenWidth = getScreenSize().width;

export const styles = StyleSheet.create({
    platforms: {
        marginLeft: 20,
        marginTop: 5,
        height: 160,
        width: 180,
        justifyContent: 'center'
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
    nextEpisode: {
        width: 350,
        height: 150,
        backgroundColor: colors.primarySkyBlue,
        margin: 20,
        borderRadius: 20,
        flexDirection: 'row',
        flex: 1
    },
    episodePhoto: {
        flex: 1,
        margin: 10,
        borderRadius: 20
    }
});
