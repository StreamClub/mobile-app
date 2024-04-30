import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Chip } from 'react-native-paper'
import { MovieDetail } from '../../entities/Details/MovieDetailEntry'
import { RecommendsList } from '../RecommendsList'
import { MovieInfo } from './MovieInfo'
import { MoviePlatforms } from './MoviePlatforms'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { CastList } from '../CastList'
import { SeeMovieButton } from './SeeMovieButton'
import { router } from 'expo-router'
import { ContentType } from '../Types/ContentType'
import { ReviewsList } from '../Content/Reviews/ReviewsList'

type MovieDetailScreenParams = {
    movie: MovieDetail
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    const { movie } = params

    const onPressFullCredits = () => {
        router.push({ pathname: '/credits', params: { contentId: movie.id, contentType: ContentType.Movie} })
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
                    <SeeMovieButton platforms={movie.platforms} />
                    {movie.overview ? (
                        <BodyText body={movie.overview} style={{marginTop: 12}}/>
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
                {movie.cast.length > 0 && <>
                    <CastList cast={movie.cast} style={styles.castStyle}/>
                    <BodyText body={"Ver reparto completo"} size="medium" style={styles.linkedText} 
                        onPress={onPressFullCredits}/>
                </>}
                <ReviewsList contentId={movie.id} contentType='movie' userReview={movie.userReview}/>
                {movie.similar.length > 0 && (
                    <RecommendsList
                        contents={movie.similar}
                        style={styles.recommends}
                        title="Películas similares:"
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
    linkedText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginRight: 8,
        textDecorationLine: 'underline',
    },
})
