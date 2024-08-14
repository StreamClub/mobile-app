import React from 'react'
import {
    View,
    Image,
    StyleSheet,
    Linking,
    TouchableOpacity,
} from 'react-native'
import { IconCollectionEntry } from '../Types/IconCollection'

export type IconCollectionParams = {
    collection: IconCollectionEntry[]
}

const renderIcon = (entry: IconCollectionEntry, index: number) => {
    const link = entry.link
    return (
        <TouchableOpacity
            key={index}
            onPress={() => {
                Linking.openURL(link)
            }}
            style={styles.imageContainer}
        >
            <Image source={entry.icon} style={styles.iconStyle} />
        </TouchableOpacity>
    )
}

export const IconCollection = (params: IconCollectionParams) => {
    return (
        <View style={[styles.container]}>
            {params.collection.map((entry, index) => renderIcon(entry, index))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    imageContainer: {
        width: 40,
        height: 40,
    },
    iconStyle: {
        width: '100%',
        height: '100%',
    },
})
