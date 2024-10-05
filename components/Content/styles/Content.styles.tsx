import { StyleSheet} from 'react-native'
import { colors } from '../../../assets';

export const styles = StyleSheet.create({
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
        borderRadius: 10,
    },
    platformRedirectContainer: {
        flexDirection: 'row', 
        borderColor: colors.primaryBlue,
        borderWidth: 5,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: { 
        flex: 0.20, 
        marginRight: 10,
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
});