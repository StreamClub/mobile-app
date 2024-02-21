import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, LayoutChangeEvent } from 'react-native';
import { Icon, Divider, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { colors } from "../assets";
import { Actor, CastList } from '../components/CastList';
import { Content, RecommendsList } from '../components/RecomendsList';
import { SeeContentButtom } from '../components/Content/SeeContentButtom';
import { MoviePlatforms, Platform } from '../components/MovieDetails/MoviePlatforms';

const screenWidth = Dimensions.get('window').width;

type MovieDetails = {
    id: string,
    title: string,
    genres: Array<string>,
    poster: string,
    releaseDate: Date,
    platforms: Array<Platform>,
    directors: Array<string>,
    backdrop: string,
    runtime: string,
    overview: string,
    cast: Array<Actor>,
    similar: Array<Content>,
    inWatchlist: boolean
}

type MovieDetailScreenParams = {
    movie: MovieDetails;
    onRecommendPress: (movie: Content) => void;
}

const renderBackgroundImage = (params: MovieDetailScreenParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const backgroundSize = 170 + (titleTextHeight/30 - 2)*30

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
                {params.movie.poster?
                    <Image 
                        source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.poster }}
                        style={styles.posterImage}   
                    /> :
                    <View style={[styles.posterImage, {backgroundColor: colors.primarySkyBlue, alignItems: 'center', justifyContent: 'center'}]}>
                        <Icon source="image-off-outline" size={90}/>
                    </View>
                }
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
    recommends: {
        marginLeft: 20,
        marginBottom: 20
    },
    castStyle: {
        marginLeft: 20,
        marginBottom: 20
    },
    container: {
        flex: 1,
    },
    backdropImage: {
        width: screenWidth,
        height: 170
    },
    textOverlay: {
        position: 'absolute',
        top: 10,
        left: 5,
        alignSelf: 'center',
    },
    imageOverlay: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-end'
    },
    posterImage: {
        width: 170,
        height: 255,
        marginRight: 10,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
    },
    darkness: {
        backgroundColor: colors.secondaryWhite + '85',
        width: screenWidth
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
    platforms: {
        marginLeft: 20,
        marginTop: 5,
        height: 160,
        justifyContent: 'center'
    },
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
        borderRadius: 10,
    },
    divider: {
        backgroundColor: colors.primaryBlack,
        width: 150,
        height: 1,
        margin: 10,
    },
    buttom: {
        marginTop: 20
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center'
    }
});
