import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { colors } from '../../assets'
import { useState, useRef } from 'react'
import { ButtonGroup } from '@rneui/themed'
import { BodyText } from '../../components/BasicComponents/BodyText'
import { MovieList } from '../../components/MovieList'
import { SearchParams, searchMovies } from '../../apiCalls/movies'
import { SeriesList } from '../../components/SeriesList'
import { searchSeries } from '../../apiCalls/series'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SearchList } from '../../components/Search/SearchList'
import {
    ARTISTS_NAME,
    CATEGORIES,
    DELAY_SEARCH,
    INITIAL_CATEGORY,
    MAX_SEARCH_LENGTH,
    MOVIES_NAME,
    SERIES_NAME,
    USERS_NAME,
} from '../../constants'
import { SearchContentBar } from '../../components/Search/SearchBar'
import { searchUsers } from '../../apiCalls/users'
import { searchArtists } from '../../apiCalls/artists'
import { ArtistList, ArtistEntry } from '../../components/ArtistList'
import { router } from 'expo-router'
import { ArtistDetailsParams } from '../../apiCalls/params/content/ArtistDetailParams'
import { ContentList } from '../../components/Content/ContentList'
import { ContentEntry } from '../../entities/ContentListEntry'

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
    const [artistList, setArtistList] = useState<ArtistEntry[]>([])
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

    const processArtistResponseData = (data: any) => {
        const artistList: ArtistEntry[] = []
        const artistResponse = data.results
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
            artistList.push(artistEntry)
        })
        setArtistList(artistList)
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
        } else if (selectedCategory == ARTISTS_NAME) {
            processArtistResponseData(response.data)
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
        // setShowLoading(true); //TODO: REVISAR, NUNCA TERMINA DE CARGAR
        onChangeTextSearched('')
        setSelectedIndex(value)
        setSelectedCategory(CATEGORIES[value])
    }

    // ------------------------------------------------------------

    // Render functions
    // ------------------------------------------------------------

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

    const renderNoResultsFoundMessage = () => {
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
                body={'No se encontraron resultados para: ' + textSearched}
            />
        )
    }

    const renderContentList = (contentList: ContentEntry[]) => {
        return (
            <SearchList
                showLoading={showLoading}
                contentList={contentList}
                textSearched={textSearched}
            >
                <ContentList
                    contentType={selectedCategory}
                    contentEntry={contentList}
                />
            </SearchList>
        )
    }

    const onArtistPress = (artist: any) => {
        console.log(artist.name + ' pressed')

        const params: ArtistDetailsParams = {
            id: artist.id,
        }

        router.push({ pathname: '/artist', params })
    }

    const renderArtistList = () => {
        const callbacks = {
            onArtistPress,
        }
        return showLoading ? null : artistList.length === 0 ? (
            renderNoResultsFoundMessage()
        ) : (
            <ArtistList artistList={artistList} callbacks={callbacks} />
        )
    }

    // ------------------------------------------------------------

    // Main render screen
    // ------------------------------------------------------------

    const renderResultsList = () => {
        if (selectedCategory == MOVIES_NAME) {
            return renderContentList(movieList)
        } else if (selectedCategory == SERIES_NAME) {
            return renderContentList(seriesList)
        } else if (selectedCategory == ARTISTS_NAME) {
            return renderArtistList()
        }
    }

    return (
        <View style={styles.container}>
            <SearchContentBar
                showLoading={showLoading}
                textSearched={textSearched}
                onChangeTextSearched={onChangeTextSearched}
                onSubmit={onSubmit}
            />

            {renderSegmentedButton()}

            {textSearched.length == 0
                ? renderSearchHistoryTitle()
                : renderResultsList()}
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
