import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { DiscoverForm } from '../../components/Discover/DiscoverForm'

export default function Discover() {
    return (
        <View style={styles.container}>
            <DiscoverForm />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite
    },
})
