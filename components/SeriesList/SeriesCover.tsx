import React from 'react'
import { SerieEntry } from '../SeriesList'
import { styles } from './styles/SeriesList.style'
import { View, Image, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { colors } from '../../assets'

type SeriesCoverProps = {
    seriesEntry: SerieEntry
    onSeriesPress: (serie: SerieEntry) => void
}

export const SeriesCover = (params: SeriesCoverProps) => {
    const coverOutlineStyle = {
        backgroundColor: params.seriesEntry.available
            ? colors.secondaryBlue
            : 'transparent',
    }

    return (
        <>
            <Pressable
                onPress={() => params.onSeriesPress(params.seriesEntry)}
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                {params.seriesEntry.poster ? (
                    <Image
                        source={{
                            uri:
                                'https://image.tmdb.org/t/p/original' +
                                params.seriesEntry.poster,
                        }}
                        style={styles.coverImage}
                        resizeMode="contain"
                    />
                ) : (
                    <View
                        style={[
                            styles.coverImage,
                            {
                                backgroundColor: colors.primarySkyBlue,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <Icon source="image-off-outline" size={70} />
                    </View>
                )}
            </Pressable>
        </>
    )
}
