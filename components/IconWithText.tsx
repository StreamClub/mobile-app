import React from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';
import { BodyText } from './BasicComponents/BodyText';
import { colors } from '../assets/styles/colors';

const screenWidth = Dimensions.get('window').width;

export type IconWithTextParams = {
    icon: any,
    text: string,
    style?: any,
}

export const IconWithText = (params: IconWithTextParams) => {
    return (
        <View style={[{flexDirection: 'row', alignItems: 'center'}, params.style]}>
            <Image
                source={params.icon}
                style={styles.iconStyle}
            />
            <BodyText body={params.text} size='big' color={colors.secondaryBlue} style={{paddingTop: 5, paddingLeft: 4, width: screenWidth/2.5}} />
        </View>
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        width: 25,
        aspectRatio: 487 / 512,
    }
})
