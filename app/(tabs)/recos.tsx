import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../assets'
import { RecosScreen } from '../../components/Recos/RecosScreen'

export default function Recos() {
    return (
        <View style={styles.container}>
            <RecosScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512,
    },
})
