import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import { Chip } from 'react-native-paper';
import { BodyText } from '../BasicComponents/BodyText';
import { colors } from "../../assets";
import { CastList } from '../CastList';
import { Content, RecommendsList } from '../RecommendsList';
import { MoviePlatforms } from './MoviePlatforms';
import { MovieDetail } from '../../entities/Details/MovieDetailEntry';
import { MovieInfo } from './MovieInfo';

type MovieDetailScreenParams = {
    movie: MovieDetail;
    onRecommendPress: (movie: Content) => void;
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            <MovieInfo movie={params.movie} />
            <MoviePlatforms platforms={params.movie.platforms} />
            <View style={styles.description}>
                <BodyText body={params.movie.overview} />
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
                </View>
            </View>
            <CastList cast={params.movie.cast} style={styles.castStyle}/>
            <RecommendsList 
                contents={params.movie.similar} 
                style={styles.recommends} 
                title='Peliculas similares:'
                onRecommendPress={params.onRecommendPress}/>
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
});
