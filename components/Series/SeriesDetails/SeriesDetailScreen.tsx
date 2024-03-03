import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Chip } from 'react-native-paper'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'
import { CastList } from '../../CastList'
import { Content, RecommendsList } from '../../RecommendsList'
import { SeriesPlatforms } from './SeriesPlatforms'
import { NextEpisode } from './NextEpisode'
import { SeriesDetail } from '../../../entities/Details/Series/SeriesDetailEntry'
import { SeasonsList } from './SeasonsList'
import { SeriesInfo } from './SeriesInfo'

type SeriesDetailScreenParams = {
    series: SeriesDetail
    onRecommendPress: (series: Content) => void
}

export const SeriesDetailScreen = (params: SeriesDetailScreenParams) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <SeriesInfo series={params.series} />
                <SeriesPlatforms
                    platforms={params.series.platforms}
                    status={params.series.status}
                />
                {params.series.nextEpisode ? (
                    <NextEpisode
                        episode={params.series.nextEpisode}
                        platforms={params.series.platforms}
                    />
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                    >
                        <BodyText
                            body="Felicitaciones! Viste todos los capítulos."
                            size="big"
                            color={colors.primaryBlue}
                        />
                    </View>
                )}
                <View style={styles.description}>
                    {params.series.overview ? (
                        <BodyText body={params.series.overview} />
                    ) : (
                        <BodyText
                            body="Sin descripción"
                            color={colors.primaryRed}
                            size="medium"
                        />
                    )}
                    {params.series.genres.length > 0 ? (
                        <View style={{ height: 60 }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={true}
                            >
                                {params.series.genres.map((genre, index) => (
                                    <Chip
                                        key={index}
                                        style={{
                                            margin: 10,
                                            backgroundColor: 'transparent',
                                            borderColor: colors.primaryBlack,
                                            height: 40,
                                        }}
                                        mode="outlined"
                                        textStyle={{
                                            color: colors.primaryBlack,
                                        }}
                                    >
                                        {genre}
                                    </Chip>
                                ))}
                            </ScrollView>
                        </View>
                    ) : null}
                </View>
                {params.series.seasons.length > 0 ? (
                    <SeasonsList
                        seasons={params.series.seasons}
                        platforms={params.series.platforms}
                    />
                ) : null}
                {params.series.cast.length > 0 ? (
                    <CastList cast={params.series.cast} style={styles.cast} />
                ) : null}
                {params.series.similar.length > 0 ? (
                    <RecommendsList
                        onRecommendPress={params.onRecommendPress}
                        title="Series similares:"
                        contents={params.series.similar}
                        style={styles.recommends}
                    />
                ) : null}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    recommends: {
        marginLeft: 20,
        marginBottom: 20,
    },
    cast: {
        marginLeft: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center',
    },
})
