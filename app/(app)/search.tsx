import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { colors } from '../../assets'
import { useState } from 'react'
import { BodyText } from '../../components/BasicComponents/BodyText'
import { SearchParams, searchMovies } from '../../apiCalls/movies'
import { searchSeries } from '../../apiCalls/series'
import { SearchList } from '../../components/Search/SearchList'
import {
    ARTISTS_NAME,
    CATEGORIES,
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
import { useMovieEntryList } from '../../hooks/useMovieEntryList'
import { useSeriesEntryList } from '../../hooks/useSeriesEntryList'
import { SegmentedButton } from '../../components/Search/SegmentedButton'
import { useTimer } from '../../hooks/useTimer'

export default function Search() {
    // States
    // ------------------------------------------------------------
    const session = useSession()
    const [textSearched, setTextSearched] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(
        CATEGORIES[INITIAL_CATEGORY]
    )
    const { movieList, setMovieListEntries } = useMovieEntryList()
    const { seriesList, setSeriesListEntries } = useSeriesEntryList()
    const [artistList, setArtistList] = useState<ArtistEntry[]>([])
    // ------------------------------------------------------------

    // Text Change and Timer Logic
    // ------------------------------------------------------------

    const onSubmit = () => {
        if (textSearched.length < 1) return
        cancelTimer()
        console.log('[Submit]')
        searchText(textSearched)
    }

    const onChangeTextSearched = (newText: string) => {
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

    const { cancelTimer, startNewTimer } = useTimer(setShowLoading, searchText)
    // ------------------------------------------------------------

    // Process Response Data
    // ------------------------------------------------------------

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
            setMovieListEntries(response.data)
        } else if (selectedCategory == SERIES_NAME) {
            setSeriesListEntries(response.data)
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

    // Render functions
    // ------------------------------------------------------------

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

            <SegmentedButton
                setSelectedCategory={setSelectedCategory}
                onChangeTextSearched={onChangeTextSearched}
            />

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
