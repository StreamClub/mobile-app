import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Chip } from 'react-native-paper'
import { MovieDetail } from '../../entities/Details/MovieDetailEntry'
import { Content, RecommendsList } from '../RecommendsList'
import { MovieInfo } from './MovieInfo'
import { MoviePlatforms } from './MoviePlatforms'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { CastList } from '../CastList'
import { MovieDetailsParams } from '../../app/(tabs)/(app)/movie'
import { router } from 'expo-router'

type MovieDetailScreenParams = {
    movie: MovieDetail
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    const { movie } = params

    const onRecommendPress = (movie: Content) => {
        const newParams: MovieDetailsParams = {
            id: movie.id.toString(),
        }
        router.replace({ pathname: '/movie', params: newParams })
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <MovieInfo movie={movie} />
                <MoviePlatforms
                    platforms={movie.platforms}
                    status={movie.status}
                />
                <View style={styles.description}>
                    {movie.overview ? (
                        <BodyText body={movie.overview} />
                    ) : (
                        <BodyText
                            body="Sin descripción"
                            color={colors.primaryRed}
                            size="medium"
                        />
                    )}
                    {movie.genres.length > 0 && (
                        <View style={{ height: 60 }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={true}
                            >
                                {movie.genres.map((genre, index) => (
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
                    )}
                </View>
                {movie.cast.length > 0 && (
                    <CastList cast={movie.cast} style={styles.castStyle} />
                )}
                {movie.similar.length > 0 && (
                    <RecommendsList
                        contents={movie.similar}
                        style={styles.recommends}
                        title="Películas similares:"
                        onRecommendPress={onRecommendPress}
                    />
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center',
    },
    recommends: {
        marginLeft: 20,
        marginBottom: 20,
    },
    castStyle: {
        marginLeft: 20,
        marginBottom: 20,
    },
})
