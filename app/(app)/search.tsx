import { Text, View, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { colors } from "../../assets";
import { SearchBar } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { useState, createRef, useRef } from 'react'
import { ButtonGroup } from '@rneui/themed'

import { MovieList, MovieEntry } from '../../components/MovieList';

import { QueryParamsBody, searchMovies } from '../../apiCalls/movies';

const MAX_SEARCH_LENGTH = 50;
const DELAY_SEARCH = 2000;

export default function Index() {
    const session = useSession();
    const [textSearched, setTextSearched] = useState('')
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [showLoading, setShowLoading] = useState(false);

    const cancelTimer = () => {
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }
    }

    const startNewTimer = (newText: string) => {
        setShowLoading(true);
        searchTimerRef.current = setTimeout(() => {
            console.log('[Timer]')
            searchText(newText)
        }, DELAY_SEARCH);
    }

    const onChangeTextSearched = (newText: string) => {
        setMovieList([])
        if (newText.length > MAX_SEARCH_LENGTH) 
            return;
        setTextSearched(newText);

        cancelTimer()

        // If the text is empty, no new timer is needed
        if (newText.length < 1) {
            setShowLoading(false);
            return;
        }

        startNewTimer(newText);
    };

    const onSubmit = () => {
        if (textSearched.length < 1) return
        cancelTimer()
        console.log('[Submit]');
        searchText(textSearched)

    }

    const [movieList, setMovieList] = useState<MovieEntry[]>([]);

    const processResponseData = (data: any) => {
        const movieList: MovieEntry[] = []
        const moviesResponse = data.results
        moviesResponse.forEach((movie: any) => {
            const movieEntry: MovieEntry = {
                cover: movie.poster_path,
                title: movie.title,
                available: true,
                year: movie.release_date.split('-')[0],
                score: 5,
                seen: false,
                inWatchlist: false,
            }
            movieList.push(movieEntry)
        })
        setMovieList(movieList)
    }

    const onSuccessSearch = (response: any) => {
        console.log('Busqueda exitosa: ');
        processResponseData(response.data);
        setShowLoading(false);
    }

    const onFailureSearch = (error: any) => {
        console.log(error);
        setShowLoading(false);
    }

    const searchText = (text: string) => {
        console.log('Buscando ' + text + '...');

        const queryParams: QueryParamsBody = { text: text }

        searchMovies(queryParams, onSuccessSearch, onFailureSearch)
    }

    const renderSearchBar = () => {
        return(
            <SearchBar
                placeholder='Buscar...'
                containerStyle={{
                    width: '90%',
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    marginTop: 10,
                }}
                searchIcon={
                    <Image
                        source={require('../../assets/icons/search.png')}
                        style={{
                            aspectRatio: 469 / 512,
                            height: 20,
                        }}
                    />
                }
                inputContainerStyle={{
                    backgroundColor: colors.secondaryWhite,
                }}
                inputStyle={{
                    color: 'black',
                }}
                cancelIcon={
                    <Icon
                        name='close'
                        type='ionicon'
                        color='black'
                    />
                }
                onChangeText={onChangeTextSearched}
                value={textSearched}
                showLoading={showLoading}
                loadingProps={{
                    color: 'black',
                }}
                onSubmitEditing={onSubmit}
            />
        )
    }

    const [selectedIndex, setSelectedIndex] = useState(0);

    const renderSegmentedButton = () => {
        return (
            <ButtonGroup
                buttons={['Películas', 'Series', 'Artistas', 'Usuarios']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
                containerStyle={{ 
                    marginTop: 20,
                    backgroundColor: 'transparent',
                    borderColor: 'black',
                    borderRadius: 20,
                }}
                buttonContainerStyle = {{
                    borderColor: 'black',
                }}
                selectedButtonStyle = {{
                    backgroundColor: colors.primaryRed,
                }}
                textStyle = {{
                    color: 'black',
                    fontSize: 14,
                }}
            />
        )
    }

    const renderSearchHistoryTitle = () => {
        return (
            <Text
                style={{
                    marginTop: 20,
                    fontSize: 16,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                }}
            >
                Busquedas recientes
            </Text>
        )
    }


    const movie1: MovieEntry = {
        cover: '/lfj709InbmljVqAXgUk2qjnujNN.jpg', 
        title: 'Kill Bill Volume 1', 
        available: true,
        year: '2003',
        score: 4.5,
        seen: true,
        inWatchlist: false,
    }
    const movie2: MovieEntry = {
        cover: '/oEbYyyl3w2dptDZCfXr8NHEHFkl.jpg', 
        title: 'Kill Bill Volume 2', 
        available: false,
        year: '2003',
        score: 4.5,
        seen: true,
        inWatchlist: true,
    }
    const movie3: MovieEntry = {
        cover: '/z9oNYBLNa6f4MyLIkihlDSi1hxe.jpg', 
        title: 'Los juegos del hambre: balada de pájaros cantores y serpientes', 
        available: true,
        year: '2003',
        score: 10,
        seen: false,
        inWatchlist: false,
    }
    const movie4: MovieEntry = {
        cover: '/fe80QhoNxp6FnVXdkvSMea73xyj.jpg', 
        title: 'The Hunger Games: Catching Fire', 
        available: true,
        year: '1998',
        score: 4.5,
        seen: false,
        inWatchlist: true,
    }
    const movie5: MovieEntry = {
        cover: '/5wI2KoZdTwOtZFPyesVRaEEpOOz.jpg', 
        title: 'The Hunger Games', 
        available: false,
        year: '2003',
        score: 4.5,
        seen: true,
        inWatchlist: false,
    }
    
    const _movieList = [movie1, movie2, movie3, movie4, movie5];
    
    const onMoviePress = (movie: MovieEntry) => {
        console.log(movie.title + ' pressed');
    }

    const onSeenPress = (movie: MovieEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log(movie.title + ' seen pressed');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const onWatchlistPress = (movie: MovieEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log(movie.title + ' watchlist pressed');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const callbacks = {
        onMoviePress,
        onSeenPress,
        onWatchlistPress,
    }

    const renderMovieList = () => {
        return (
            <MovieList movieList={movieList} callbacks={callbacks}/>
        )
    }

    return (
        <View style={styles.container}>
            
            {renderSearchBar()}
            
            {renderSegmentedButton()}
            
            {textSearched.length == 0 ?
                renderSearchHistoryTitle()
                :
                renderMovieList()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.secondaryWhite,
    },
});