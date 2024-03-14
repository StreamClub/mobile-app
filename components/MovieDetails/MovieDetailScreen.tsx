import React from 'react';
import { View, StyleSheet, ScrollView, } from 'react-native';
import { Chip } from 'react-native-paper';
import { MovieDetail } from '../../entities/Details/MovieDetailEntry';
import { Content, RecommendsList } from '../RecommendsList';
import { MovieInfo } from './MovieInfo';
import { MoviePlatforms } from './MoviePlatforms';
import { BodyText } from '../BasicComponents/BodyText';
import { colors } from '../../assets';
import { CastList } from '../CastList';

type MovieDetailScreenParams = {
    movie: MovieDetail;
    onRecommendPress: (movie: Content) => void;
    onPressFullCredits: () => void;
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            <MovieInfo movie={params.movie} />
            <MoviePlatforms platforms={params.movie.platforms} />
            <View style={styles.description}>
                {params.movie.overview?
                    <BodyText body={params.movie.overview} /> :
                    <BodyText body="Sin descripción" color={colors.primaryRed} size='medium' /> 
                }
                {params.movie.genres.length > 0?
                    <View style={{height: 60}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                            {params.movie.genres.map((genre, index) => 
                                <Chip 
                                    key={index} 
                                    style={{margin: 10, backgroundColor: 'transparent', borderColor: colors.primaryBlack, height: 40}}
                                    mode="outlined"
                                    textStyle={{ color: colors.primaryBlack }}>
                                        {genre}
                                </Chip>
                            )}
                        </ScrollView>
                    </View> : null
                }
            </View>
            {params.movie.cast.length > 0 && <>
                <CastList cast={params.movie.cast} style={styles.castStyle}/>
                <BodyText body={"Ver reparto completo"} size="medium" style={styles.linkedText} onPress={params.onPressFullCredits}/>
            </>}
            {params.movie.similar.length > 0?
                <RecommendsList 
                    contents={params.movie.similar} 
                    style={styles.recommends} 
                    title='Peliculas similares:'
                    onRecommendPress={params.onRecommendPress}/> : null
            }
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
        alignItems: 'center'
    },
    recommends: {
        marginLeft: 20,
        marginBottom: 20
    },
    castStyle: {
        marginLeft: 20,
        marginBottom: 20
    },
    linkedText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 8,
        textDecorationLine: 'underline',
    },
});
