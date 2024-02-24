import React from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';
import { BodyText } from './BodyText';
import { colors } from '../../assets/styles/colors';
import { LocalIcon } from '../Types/LocalIcon';


export type IconWithTextParams = {
    icon: LocalIcon,
    text: string,
    style?: any,
}

export const IconWithText = (params: IconWithTextParams) => {
    return (
        <View style={[styles.container, params.style]}>
            <Image
                source={params.icon}
                style={styles.iconStyle}
            />
            <BodyText body={params.text} size='medium' color={colors.primaryBlack} style={{paddingTop: 5, width: "85%", paddingLeft: 10}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%"
    },
    iconStyle: {
        width: 25,
        aspectRatio: 487 / 512,
    }
})
