import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { colors } from '../../assets';
import { UserRecos } from './UserRecos';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { Carousel } from '../BasicComponents/Carousel';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { useGetMoviesSeenByFriends } from '../../apiCalls/recos';
import { TitleText } from '../BasicComponents/TitleText';
import { router } from 'expo-router';
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams';
import { Groups } from './Groups';

const screenWidth = Dimensions.get('window').width

export const RecosScreen = () => {
    const { getMoviesSeenByFriends } = useGetMoviesSeenByFriends();

    const [carrouselMovies, setCarrouselMovies] = React.useState<CarouselEntry[]>([]);

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

    useEffect(() => {
        getMoviesSeenByFriends(onGetMoviesSeenByFriendsSuccess)
    }
    , [])

    const onMoviePressed = (movie: any) => {
        const params: ContentDetailsParams = {
            id: movie.id.toString(),
        }

        router.push({ pathname: '/movie', params })
    }

    const friendsRecosParams: CarouselParams = {
        type: TmdbImageType.Cover,
        items: carrouselMovies,
        containerStyle: styles.carousel,
        itemStyle: seenContentStyles.contentPoster,
        onItemPressed: onMoviePressed,
    }
    
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
            <UserRecos />
            {carrouselMovies.length > 0 &&
                <>
                <TitleText body="Populares entre amigos" style={styles.titleText} size='medium'/>
                <Carousel {...friendsRecosParams}/>
                </>
            }

            <Groups />
        </ScrollView>
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