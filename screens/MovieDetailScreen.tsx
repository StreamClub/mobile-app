import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, LayoutChangeEvent } from 'react-native';
import { Icon, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { colors } from "../assets";
import { CastList } from '../components/CastList';
import { Content, RecommendsList } from '../components/RecomendsList';
import { MoviePlatforms } from '../components/MovieDetails/MoviePlatforms';
import { MovieDetail } from '../entities/Details/MovieDetailEntry';
import { TmdbImage, TmdbImageType } from '../components/BasicComponents/TmdbImage';

const screenWidth = Dimensions.get('window').width;

type MovieDetailScreenParams = {
    movie: MovieDetail;
    onRecommendPress: (movie: Content) => void;
}

const renderBackgroundImage = (params: MovieDetailScreenParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const backgroundSize = 170 + (titleTextHeight/30 - 2)*30

    console.log(params.movie.releaseDate);

    return(
        <ImageBackground
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.backdrop }} 
                style={[styles.backdropImage, {height: backgroundSize}]}
                resizeMode="cover"
            >
            {params.movie.backdrop?
                <View style={[styles.darkness, {height: backgroundSize}]} /> :
                <View style={[styles.darkness, {height: backgroundSize, backgroundColor: colors.primarySkyBlue + '85'}]} />
            }
            <View style={styles.textOverlay}>
                <TitleText
                    body={params.movie.title + ' (' + (params.movie.releaseDate.getFullYear()? params.movie.releaseDate.getFullYear(): ' ? ') + ')'} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} 
                    onLayout={handleTitleTextLayout}
                />
            </View>
            <View style={[styles.director, {top: backgroundSize - 80}]}>
                <Icon source="movie-open-outline" size={20} />
                <BodyText body={' ' + params.movie.directors[0]} size='big' style={{fontWeight: 'bold'}} />
            </View>
            <View style={[styles.runtime, {top: backgroundSize - 45}]}>
                <Icon source="timer-outline" size={20}/>
                <BodyText body={' ' + params.movie.runtime + ' min'} size='big' style={{fontWeight: 'bold'}} />
            </View>
            <View style={[styles.imageOverlay, {top: backgroundSize - 90}]}>
                <TmdbImage 
                    resource={params.movie.poster} 
                    type={TmdbImageType.Cover} 
                    style={styles.posterImage} />
            </View>
        </ImageBackground>
    )
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            {renderBackgroundImage(params)}
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
    backdropImage: {
        width: screenWidth,
        height: 170
    },
    recommends: {
        marginLeft: 20,
        marginBottom: 20
    },
    castStyle: {
        marginLeft: 20,
        marginBottom: 20
    },
    posterImage: {
        width: 170,
        height: 255,
        marginRight: 10,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
    },
    textOverlay: {
        position: 'absolute',
        top: 10,
        left: 5,
        alignSelf: 'center',
    },
    darkness: {
        backgroundColor: colors.secondaryWhite + '85',
        width: screenWidth
    },
    imageOverlay: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-end'
    },
    director: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-start',
        marginLeft: 10,
        flexDirection: 'row'
    },
    runtime: {
        position: 'absolute',
        top: 125,
        alignSelf: 'flex-start',
        marginLeft: 10,
        flexDirection: 'row'
    },
});
