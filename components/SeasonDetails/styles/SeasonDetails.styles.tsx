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
    }
})