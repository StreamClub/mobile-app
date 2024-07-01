import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { colors } from '../../assets'
import { RecosScreen } from '../../components/Recos/RecosScreen'
import { useRecos } from '../../hooks/useRecos'

export default function Recos() {
    const { loadRecos } = useRecos();

    useEffect(() => {
        loadRecos()
    }, [])

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
