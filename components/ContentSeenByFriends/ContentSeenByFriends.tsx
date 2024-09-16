import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, FlatList } from 'react-native';
import { colors } from '../../assets';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { Carousel } from '../BasicComponents/Carousel';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { useGetMoviesSeenByFriends, useGetSeriesSeenByFriends } from '../../apiCalls/recos';
import { TitleText } from '../BasicComponents/TitleText';
import { router } from 'expo-router';
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams';

const screenWidth = Dimensions.get('window').width

export const ContentSeenByFriends = () => {
    const { getMoviesSeenByFriends } = useGetMoviesSeenByFriends();
    const { getSeriesSeenByFriends } = useGetSeriesSeenByFriends();

    const [carrouselMovies, setCarrouselMovies] = React.useState<CarouselEntry[]>([]);
    const [carrouselSeries, setCarrouselSeries] = React.useState<CarouselEntry[]>([]);

    const onGetMoviesSeenByFriendsSuccess = (response: any) => {
        const rawMovieRecos = response.data.recommendations;
        console.log("/movies/recommendations ammount", rawMovieRecos.length)
        const carrouselMovies: CarouselEntry[] = []; 
        rawMovieRecos.forEach((rawMovie: any) => {
            const movie: CarouselEntry = {
                tmdbResource: rawMovie.poster,
                itemData: rawMovie,
            }
            carrouselMovies.push(movie)
        });
        setCarrouselMovies(carrouselMovies);
    }

    const onGetSeriesSeenByFriendsSuccess = (response: any) => {
        const rawSeriesRecos = response.data.recommendations;
        console.log("/series/recommendations ammount", rawSeriesRecos.length)
        const carrouselSeries: CarouselEntry[] = []; 
        rawSeriesRecos.forEach((rawSerie: any) => {
            const serie: CarouselEntry = {
                tmdbResource: rawSerie.poster,
                itemData: rawSerie,
            }
            carrouselSeries.push(serie)
        });
        setCarrouselSeries(carrouselSeries);
    }


    useEffect(() => {
        getMoviesSeenByFriends(onGetMoviesSeenByFriendsSuccess)
        getSeriesSeenByFriends(onGetSeriesSeenByFriendsSuccess)
    }
    , [])

    const onMoviePressed = (movie: any) => {
        const params: ContentDetailsParams = {
            id: movie.id.toString(),
        }

        router.push({ pathname: '/movie', params })
    }

    const onSeriesPressed = (serie: any) => {
        const params: ContentDetailsParams = {
            id: serie.id.toString(),
        }
        
        router.push({ pathname: '/serie', params })
    }

    const friendsRecosParams: CarouselParams = {
        type: TmdbImageType.Cover,
        items: carrouselMovies,
        containerStyle: styles.carousel,
        itemStyle: seenContentStyles.contentPoster,
        onItemPressed: onMoviePressed,
    }

    const friendsRecosSeriesParams: CarouselParams = {
        type: TmdbImageType.Cover,
        items: carrouselSeries,
        containerStyle: styles.carousel,
        itemStyle: seenContentStyles.contentPoster,
        onItemPressed: onSeriesPressed,
    }
    
    return (
        <>
            {carrouselMovies.length > 0 && <>
            <TitleText body="Peliculas vistas por tus amigos" style={styles.titleText} size='medium'/>
            <Carousel {...friendsRecosParams}/>
            </>}
            {carrouselSeries.length > 0 && <>
            <TitleText body="Series vistas por amigos" style={styles.titleText} size='medium'/>
            <Carousel {...friendsRecosSeriesParams}/>
            </>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    carousel: {
        width: screenWidth,
        marginVertical: 20,
    },
    serviceLogo: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
        borderWidth: 1,
    },
    linkedText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 8,
        textDecorationLine: 'underline',
    },
    titleText: {
        fontWeight:'bold', 
        marginLeft: 10
    },
});

const seenContentStyles = StyleSheet.create({
    contentPoster: {
        height: (screenWidth/1.7),
        aspectRatio: 2/3,
        borderRadius: 5,
        margin: 0,
        marginHorizontal: 10,
        borderWidth: 1,
    },
});