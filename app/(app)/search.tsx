import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { colors } from '../../assets'
import { SearchBar } from '@rneui/themed'
import { Icon } from 'react-native-elements'
import { useState, useRef } from 'react'
import { ButtonGroup } from '@rneui/themed'
import { BodyText } from '../../components/BasicComponents/BodyText'

import { MovieList } from '../../components/MovieList'
import {
    SearchParams,
    searchMovies,
    searchArtists,
    searchUsers,
} from '../../apiCalls/movies'
import { SeriesList } from '../../components/SeriesList'
import { searchSeries } from '../../apiCalls/series'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SearchList } from '../../components/Search/SearchList'

const MAX_SEARCH_LENGTH = 50
const DELAY_SEARCH = 500

const MOVIES_NAME = 'Películas'
const SERIES_NAME = 'Series'
const ARTISTS_NAME = 'Artistas'
const USERS_NAME = 'Usuarios'

const CATEGORIES = [MOVIES_NAME, SERIES_NAME, ARTISTS_NAME, USERS_NAME]
const INITIAL_CATEGORY = 0

export default function Search() {
    // States
    // ------------------------------------------------------------
    const session = useSession()
    const [textSearched, setTextSearched] = useState('')
    const searchTimerRef = useRef<NodeJS.Timeout | null>(null)
    const [showLoading, setShowLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY)
    const [selectedCategory, setSelectedCategory] = useState(
        CATEGORIES[INITIAL_CATEGORY]
    )
    const [movieList, setMovieList] = useState<MovieEntry[]>([])
    const [seriesList, setSeriesList] = useState<SeriesEntry[]>([])
    // ------------------------------------------------------------

    // Text Change and Timer Logic
    // ------------------------------------------------------------
    const cancelTimer = () => {
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current)
        }
    }

    const startNewTimer = (newText: string) => {
        setShowLoading(true)
        searchTimerRef.current = setTimeout(() => {
            console.log('[Timer]')
            searchText(newText)
        }, DELAY_SEARCH)
    }

    const onSubmit = () => {
        if (textSearched.length < 1) return
        cancelTimer()
        console.log('[Submit]')
        searchText(textSearched)
    }

    const onChangeTextSearched = (newText: string) => {
        setMovieList([])
        if (newText.length > MAX_SEARCH_LENGTH) return
        setTextSearched(newText)

        cancelTimer()

        // If the text is empty, no new timer is needed
        if (newText.length < 1) {
            setShowLoading(false)
            return
        }

        startNewTimer(newText)
    }

    const searchText = (text: string) => {
        console.log('Buscando ' + text + '...')

        const queryParams: SearchParams = { query: text, page: 1 }

        if (selectedCategory == MOVIES_NAME) {
            searchMovies(session, queryParams, onSuccessSearch, onFailureSearch)
        } else if (selectedCategory == SERIES_NAME) {
            searchSeries(session, queryParams, onSuccessSearch, onFailureSearch)
        } else if (selectedCategory == ARTISTS_NAME) {
            searchArtists(
                session,
                queryParams,
                onSuccessSearch,
                onFailureSearch
            )
        } else if (selectedCategory == USERS_NAME) {
            searchUsers(session, queryParams, onSuccessSearch, onFailureSearch)
        }
    }
    // ------------------------------------------------------------

    // Process Response Data
    // ------------------------------------------------------------
    const processMovieResponseData = (data: any) => {
        const movieList: MovieEntry[] = []
        const moviesResponse = data.results
        moviesResponse.forEach((movie: any) => {
            const movieEntry: MovieEntry = MovieEntry.fromJson(movie)
            movieList.push(movieEntry)
        })
        setMovieList(movieList)
    }

    const processSeriesResponseData = (data: any) => {
        const seriesList: SeriesEntry[] = []
        const seriesResponse = data.results
        seriesResponse.forEach((serie: any) => {
            const serieEntry: SeriesEntry = SeriesEntry.fromJson(serie)
            seriesList.push(serieEntry)
        })
        setSeriesList(seriesList)
    }
    // ------------------------------------------------------------

    // onSuccess and onFailure callbacks
    // ------------------------------------------------------------
    const onSuccessSearch = (response: any) => {
        console.log('Busqueda exitosa: ')

        if (selectedCategory == MOVIES_NAME) {
            processMovieResponseData(response.data)
        } else if (selectedCategory == SERIES_NAME) {
            processSeriesResponseData(response.data)
        } else {
            console.log('TODO: Procesar respuesta')
        }
        setShowLoading(false)
    }

    const onFailureSearch = (error: any) => {
        console.log(error)
        console.log(error.response)
        setShowLoading(false)
    }
    // ------------------------------------------------------------

    // OnPress Handlers
    // ------------------------------------------------------------
    const onSegmentedButtonPress = (value: number) => {
        setShowLoading(true) //TODO: REVISAR, NUNCA TERMINA DE CARGAR
        setSelectedIndex(value)
        setSelectedCategory(CATEGORIES[value])
    }

    // ------------------------------------------------------------

    // Render functions
    // ------------------------------------------------------------
    const renderSearchBar = () => {
        return (
            <SearchBar
                placeholder="Buscar..."
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
                cancelIcon={<Icon name="close" type="ionicon" color="black" />}
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
                buttonContainerStyle={{
                    borderColor: 'black',
                }}
                selectedButtonStyle={{
                    backgroundColor: colors.primaryRed,
                }}
                textStyle={{
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
                body={'Búsquedas recientes' + textSearched}
            />
        )
    }

    const renderMovieList = () => {
        return (
            <SearchList
                showLoading={showLoading}
                seriesList={seriesList}
                textSearched={textSearched}
            >
                <MovieList movieList={movieList} />
            </SearchList>
        )
    }

    const renderSerieList = () => {
        return (
            <SearchList
                showLoading={showLoading}
                seriesList={seriesList}
                textSearched={textSearched}
            >
                <SeriesList seriesList={seriesList} />
            </SearchList>
        )
    }
    // ------------------------------------------------------------

    // Main render screen
    // ------------------------------------------------------------
    return (
        <View style={styles.container}>
            {renderSearchBar()}

            {renderSegmentedButton()}

            {textSearched.length == 0
                ? renderSearchHistoryTitle()
                : selectedCategory == MOVIES_NAME
                ? renderMovieList()
                : renderSerieList()}
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
})
