import React from 'react'
import { Season } from '../../../entities/Details/Series/Season'
import { styles } from './styles/SeriesDetails.styles'
import { Pressable, ScrollView, View, Image } from 'react-native'
import { TitleText } from '../../BasicComponents/TitleText'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'
import { Platform } from '../../../entities/Details/Platform'
import { SeasonDetailsParams } from '../../../app/(app)/season'
import { router } from 'expo-router'
import { TmdbImage, TmdbImageType } from '../../BasicComponents/TmdbImage'

type SeasonsListParams = {
    seasons: Season[]
    platforms: Platform[]
}

export const SeasonsList = (params: SeasonsListParams) => {
    const onSeasonPress = (season: Season, platforms: Platform[]) => {
        const params: SeasonDetailsParams = {
            seasonId: season.id.toString(),
            seriesId: season.seriesId.toString(),
            platforms: JSON.stringify(platforms),
        }
        router.push({ pathname: '/season', params })
    }

    return (
        <View style={styles.seasons}>
            {params.seasons ? (
                <>
                    <TitleText
                        body="Temporadas:"
                        style={{ fontWeight: 'bold' }}
                    />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                    >
                        {params.seasons.map((season, index) => (
                            <View
                                style={{ flexDirection: 'column', margin: 5 }}
                                key={index}
                            >
                                <Pressable
                                    onPress={() =>
                                        onSeasonPress(season, params.platforms)
                                    }
                                >
                                    <TmdbImage
                                        resource={season.poster}
                                        type={TmdbImageType.Cover}
                                        style={styles.seasonImage}
                                    />
                                </Pressable>
                                <BodyText
                                    body={season.name}
                                    size="big"
                                    style={{ width: 150 }}
                                    numberOfLines={2}
                                />
                                <BodyText
                                    body={season.airDate
                                        .getFullYear()
                                        .toString()}
                                    size="medium"
                                    color={colors.primaryGrey}
                                    style={{ fontWeight: 'bold' }}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </>
            ) : null}
        </View>
    )
}
