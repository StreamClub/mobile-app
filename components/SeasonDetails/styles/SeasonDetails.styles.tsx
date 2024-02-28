import { StyleSheet} from 'react-native'
import { colors } from '../../../assets';

export const styles = StyleSheet.create({
    episode: {
        width: 350,
        height: 170,
        backgroundColor: colors.primarySkyBlue,
        margin: 5,
        borderRadius: 20,
        flexDirection: 'row',
        flex: 1
    },
    episodePoster: {
        flex: 1,
        margin: 5,
        borderRadius: 20
    },
    posterView: {
        alignSelf: 'flex-start',
        flexShrink: 0,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    poster: {
        height: 255,
        width: 170,
        borderColor: colors.primaryBlack,
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 20,
        marginTop: 20
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    }
})