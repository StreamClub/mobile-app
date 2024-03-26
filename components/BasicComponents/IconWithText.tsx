import React from 'react'
import { View, Image, StyleSheet, Pressable } from 'react-native'
import { BodyText } from './BodyText'
import { TitleText } from './TitleText'
import { colors } from '../../assets/styles/colors'
import { LocalIcon } from '../Types/LocalIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextParams } from './Types/TextParams'

export type IconWithTextParams = {
    text: string
    textStyle?: any
    textSize?: 'small' | 'medium' | 'big'
    textType?: 'title' | 'body'
    textInputParams?: object
    canEdit?: boolean
    ref?: any

    style?: any
    iconStyle?: any
    leftIcon?: LocalIcon
    rightIcon?: LocalIcon
    onPressIcon?: () => void
    iconContainerStyle?: any
}

export const IconWithText = (params: IconWithTextParams) => {
    const iconStyle = params.iconStyle ? params.iconStyle : styles.iconStyle
    const textStyle = params.textStyle ? params.textStyle : styles.textStyle
    const textSize = params.textSize ? params.textSize : 'medium'
    const textType = params.textType ? params.textType : 'body'

    let textComponent
    if (textType === 'title')
        textComponent = <TitleText 
            body={params.text} 
            size={textSize} 
            color={colors.primaryBlack} 
            style={textStyle} 
            textInputParams={params.textInputParams}
            canEdit={params.canEdit}
        />
    else
        textComponent = <BodyText body={params.text} size={textSize} color={colors.primaryBlack} style={textStyle} />
    return (
        <View style={[styles.container, params.style]}>
            { params.leftIcon &&
                <Pressable onPress={params.onPressIcon} style={params.iconContainerStyle}>
                    <Image source={params.leftIcon} style={iconStyle} />
                </Pressable>
            }
            {textComponent}
            { params.rightIcon &&
                <Pressable onPress={params.onPressIcon} style={params.iconContainerStyle}>
                    <Image source={params.rightIcon} style={iconStyle} />
                </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    iconStyle: {
        height: 25,
        aspectRatio: 487 / 512,
    },
    textStyle: { 
        paddingTop: 5, 
        width: '85%', 
        paddingLeft: 10,
    },
})
