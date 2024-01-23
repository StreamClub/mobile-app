import { Text, View, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { colors } from "../../assets";
import { SearchBar } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { useState, createRef, useRef } from 'react'
import { ButtonGroup } from '@rneui/themed'
import { MovieList, MovieEntry } from '../../components/MovieList';

import { SearchParams, searchMovies, searchSeries, searchArtists, searchUsers } from '../../apiCalls/movies';
import { MovieDetailsParams } from './movie';

import { router } from 'expo-router';

const MAX_SEARCH_LENGTH = 50;
const DELAY_SEARCH = 2000;

const MOVIES_NAME = 'Películas'
const SERIES_NAME = 'Series'
const ARTISTS_NAME = 'Artistas'
const USERS_NAME = 'Usuarios'

const CATEGORIES = [MOVIES_NAME, SERIES_NAME, ARTISTS_NAME, USERS_NAME]


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

    const randomInt = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min

    const processMovieResponseData = (data: any) => {
        const movieList: MovieEntry[] = []
        const moviesResponse = data.results
        moviesResponse.forEach((movie: any) => {
            const movieEntry: MovieEntry = {
                id: movie.id,
                poster: movie.poster,
                title: movie.title,
                available: randomInt(0,1) == 1,
                year: movie.releaseDate.split('-')[0],
                score: randomInt(1,10),
                seen: randomInt(0,1) == 1,
                inWatchlist: randomInt(0,1) == 1,
            }
            movieList.push(movieEntry)
        })
        setMovieList(movieList)
    }

    const onSuccessSearch = (response: any) => {
        console.log('Busqueda exitosa: ');

        if (selectedCategory == MOVIES_NAME) {
            processMovieResponseData(response.data);
        } else {
            console.log('TODO: Procesar respuesta');
        
        }
        setShowLoading(false);
    }

    const onFailureSearch = (error: any) => {
        console.log(error);
        setShowLoading(false);
    }

    const searchText = (text: string) => {
        console.log('Buscando ' + text + '...');

        const queryParams: SearchParams = { query: text, page: 1}

        if (selectedCategory == MOVIES_NAME) {
            searchMovies(session, queryParams, onSuccessSearch, onFailureSearch)
        } else if (selectedCategory == SERIES_NAME) {
            searchSeries(session, queryParams, onSuccessSearch, onFailureSearch)
        } else if (selectedCategory == ARTISTS_NAME) {
            searchArtists(session, queryParams, onSuccessSearch, onFailureSearch)
        } else if (selectedCategory == USERS_NAME) {
            searchUsers(session, queryParams, onSuccessSearch, onFailureSearch)
        }
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

    const initialCategory = 0
    const [selectedIndex, setSelectedIndex] = useState(initialCategory);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[initialCategory]);

    const onSegmentedButtonPress = (value: number) => {
        onChangeTextSearched("")

        setSelectedIndex(value);
        setSelectedCategory(CATEGORIES[value]);
    }

    const renderSegmentedButton = () => {
        return (
            <ButtonGroup
                buttons={CATEGORIES}
                selectedIndex={selectedIndex}
                onPress={onSegmentedButtonPress}
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
    
    const onMoviePress = (movie: MovieEntry) => {
        console.log(movie.title + ' pressed');
        
        const params: MovieDetailsParams = {
            id: movie.id,
        }

        router.push({ pathname: '/movie', params});
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