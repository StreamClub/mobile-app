import { View, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { colors } from "../../assets";
import { SearchBar } from '@rneui/themed';
import { Icon } from 'react-native-elements';
import { useState, useRef } from 'react'
import { ButtonGroup } from '@rneui/themed'
import { router } from 'expo-router';
import { BodyText } from '../../components/BasicComponents/BodyText';

import { MovieList, MovieEntry } from '../../components/MovieList';
import { SearchParams, searchMovies } from '../../apiCalls/movies';
import { MovieDetailsParams } from './movie';

import { SeriesList, SeriesEntry } from '../../components/SeriesList';
import { SerieDetailsParams } from './serie';
import { searchSeries } from '../../apiCalls/series';

import { searchArtists } from '../../apiCalls/artists';
import { ArtistList, ArtistEntry } from '../../components/ArtistList';
import { searchUsers } from '../../apiCalls/users';

const MAX_SEARCH_LENGTH = 50;
const DELAY_SEARCH = 500;

const MOVIES_NAME = 'Películas'
const SERIES_NAME = 'Series'
const ARTISTS_NAME = 'Artistas'
const USERS_NAME = 'Usuarios'

const CATEGORIES = [MOVIES_NAME, SERIES_NAME, ARTISTS_NAME, USERS_NAME]
const INITIAL_CATEGORY = 0

export default function Search() {
    // States
    // ------------------------------------------------------------
    const session = useSession();
    const [textSearched, setTextSearched] = useState('')
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [showLoading, setShowLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY);
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[INITIAL_CATEGORY]);
    const [ movieList, setMovieList] = useState<MovieEntry[]>([]);
    const [ seriesList, setSeriesList] = useState<SeriesEntry[]>([]);
    const [ artistList, setArtistList] = useState<ArtistEntry[]>([]);
    // ------------------------------------------------------------


    // Text Change and Timer Logic
    // ------------------------------------------------------------
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

    const onSubmit = () => {
        if (textSearched.length < 1) return
        cancelTimer()
        console.log('[Submit]');
        searchText(textSearched)
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
    };
    // ------------------------------------------------------------


    // Process Response Data
    // ------------------------------------------------------------
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

    const processSeriesResponseData = (data: any) => {
        const seriesList: SeriesEntry[] = [];
        const seriesResponse = data.results;
        seriesResponse.forEach((serie: any) => {
            const serieEntry: SeriesEntry = {
                id: serie.id,
                poster: serie.poster,
                title: serie.title,
                available: serie.available,
                releaseYear: (serie.releaseDate? serie.releaseDate.split('-')[0] : '?'),
                score: serie.score.toFixed(2),
                seen: serie.seen,
                inWatchlist: serie.inWatchlist,
                status: serie.status,
                lastYear: (serie.lastEpisodeReleaseDate? serie.lastEpisodeReleaseDate.split('-')[0] : '?')
            }
            seriesList.push(serieEntry);
        })
        setSeriesList(seriesList);
    }

    const processArtistResponseData = (data: any) => {
        const artistList: ArtistEntry[] = [];
        const artistResponse = data.results;
        artistResponse.forEach((artist: any) => {
            const artistEntry: ArtistEntry = {
                id: artist.id,
                name: artist.name,
                poster: artist.poster,
                birthDate: artist.birthDate,
                birthPlace: artist.birthPlace,
                deathDate: artist.deathDate,
                gender: artist.gender,
            }
            artistList.push(artistEntry);
        })
        setArtistList(artistList);
    }
    // ------------------------------------------------------------

    // onSuccess and onFailure callbacks
    // ------------------------------------------------------------
    const onSuccessSearch = (response: any) => {
        console.log('Busqueda exitosa: ');

        if (selectedCategory == MOVIES_NAME) {
            processMovieResponseData(response.data);
        } else if (selectedCategory == SERIES_NAME) {
            processSeriesResponseData(response.data);
        } else if (selectedCategory == ARTISTS_NAME) {
            processArtistResponseData(response.data);
        } else {
            console.log('TODO: Procesar respuesta');
        }
        setShowLoading(false);
    }

    const onFailureSearch = (error: any) => {
        console.log(error);
        console.log(error.response);
        setShowLoading(false);
    }
    // ------------------------------------------------------------


    // OnPress Handlers
    // ------------------------------------------------------------
    const onSegmentedButtonPress = (value: number) => {
        // setShowLoading(true); //TODO: REVISAR, NUNCA TERMINA DE CARGAR
        onChangeTextSearched("")

        setSelectedIndex(value);
        setSelectedCategory(CATEGORIES[value]);
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

    const onSeriesPress = (serie: SeriesEntry) => {
        console.log(serie.title + ' pressed');
        
        const params: SerieDetailsParams = {
            id: serie.id,
        }

        router.push({ pathname: '/serie', params});
    }

    const onSeriesSeenPress = (serie: SeriesEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log(serie.title + ' seen pressed');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const onSeriesWatchlistPress = (serie: SeriesEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        console.log(serie.title + ' watchlist pressed');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    // ------------------------------------------------------------


    // Render functions
    // ------------------------------------------------------------
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
            <BodyText
                style={{
                    marginTop: 20,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                }}
                size="big"
                color={colors.primaryBlack}
                body={"Búsquedas recientes" + textSearched}
            />
        )
    }

    const renderNoResulstsFoundMessage = () => {
        return (
            <BodyText
                style={{
                    marginTop: 20,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                }}
                size="big"
                color={colors.primaryBlack}
                body={"No se encontraron resultados para: " + textSearched}
            />
        )
    }

    const renderMovieList = () => {
        const callbacks = {
            onMoviePress,
            onSeenPress,
            onWatchlistPress,
        }
        return (
            showLoading? null :
                ((movieList.length === 0)?
                    renderNoResulstsFoundMessage()
                    : 
                    <MovieList movieList={movieList} callbacks={callbacks}/>
                )
        )
    }

    const renderSeriesList = () => {
        const callbacks = {
            onSeriesPress,
            onSeriesSeenPress,
            onSeriesWatchlistPress,
        }
        return (
            showLoading? null :
                ((seriesList.length === 0)?
                    renderNoResulstsFoundMessage()
                    : 
                    <SeriesList seriesList={seriesList} callbacks={callbacks}/>
                )
        )
    }

    const onArtistPress = (artist: any) => {
        console.log(artist.name + ' pressed');
    }

    const renderArtistList = () => {
        const callbacks = {
            onArtistPress
        }
        return (
            showLoading? null :
                ((artistList.length === 0)?
                    renderNoResulstsFoundMessage()
                    : 
                    <ArtistList artistList={artistList} callbacks={callbacks}/>
                )
        )
    }

    // ------------------------------------------------------------

    // Main render screen
    // ------------------------------------------------------------
    
    const renderResultsList = () => {
        if (selectedCategory == MOVIES_NAME) {
            return renderMovieList()
        } else if (selectedCategory == SERIES_NAME) {
            return renderSeriesList()
        } else if (selectedCategory == ARTISTS_NAME) {
            return renderArtistList()
        }
    } 
    
    return (
        <View style={styles.container}>
            
            {renderSearchBar()}
            
            {renderSegmentedButton()}
            
            {textSearched.length == 0 ?
                renderSearchHistoryTitle()
                :
                renderResultsList()
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