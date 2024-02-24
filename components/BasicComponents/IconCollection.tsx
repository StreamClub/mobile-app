import React from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';
import { BodyText } from './BodyText';
import { colors } from '../../assets/styles/colors';
import { IconCollectionEntry } from '../Types/IconCollection';

export type IconCollectionParams = {
    collection: IconCollectionEntry[]
}


const renderIcon = (entry: IconCollectionEntry, index: number) => {
    return (
        <Image
            key={index}
            source={entry.icon}
            style={styles.iconStyle}
        />
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
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: "100%",
    },
    iconStyle: {
        width: 40,
        aspectRatio: 512 / 512,
    }
})
