import React, { useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import {
    TmdbImage,
    TmdbImageParams,
    TmdbImageType,
} from '../BasicComponents/TmdbImage'
import { useAppSelector } from '../../hooks/redux/useAppSelector'

export const UserRecos = () => {
    const { userRecos } = useAppSelector((state) => state.recos)
    
    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            {userRecos.map((reco, index) => (
                <TmdbImage
                    type={TmdbImageType.Cover}
                    resource={reco.poster}
                    style={styles.poster}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'flex-start',
    },
    poster: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 0.5,
    },
})
