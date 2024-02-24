import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import * as Font from 'expo-font'
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

    return (
        <Text
            style={[
                styles.textStyle,
                titleSize,
                fontStyle,
                { color: textColor },
                params.style,
            ]}
            onLayout={params.onLayout}
            numberOfLines={params.numberOfLines}
        >
            {params.body}
        </Text>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 24,
    },
})
