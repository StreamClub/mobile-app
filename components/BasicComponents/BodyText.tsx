import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { TextParams } from './Types/TextParams'
import { colors } from '../../assets'

export const BodyText = (params: TextParams) => {
    const textColor = params.color || colors.primaryBlack

    const titleSize = {
        big: { fontSize: 16 },
        medium: { fontSize: 14 },
        small: { fontSize: 12 },
    }[params.size || 'small']

    const fontStyle = {
        italic: { fontStyle: 'italic' },
        normal: { fontStyle: 'normal' },
    }[params.fontStyle || 'normal']

    const text = params.max_length
        ? params.body.slice(0, params.max_length).trim() + '...'
        : params.body

    const visible = params.visible === undefined ? true : params.visible

    return (<>{ visible && 
            <Text style={[
                    styles.textStyle,
                    titleSize,
                    fontStyle,
                    { color: textColor },
                    params.style,
                ]}
                onLayout={params.onLayout}
                numberOfLines={params.numberOfLines}
                onPress={params.onPress}
            >
                {text}
            </Text>
        }</>)
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 24,
    },
})
