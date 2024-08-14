import { useSearchArtist } from '../../apiCalls/artists'
import { SearchParams, useSearchMovies } from '../../apiCalls/movies'
import { useSearchSeries } from '../../apiCalls/series'
import { useSearchUsers } from '../../apiCalls/users'
import {
    ARTISTS_NAME,
    CATEGORIES,
    MAX_SEARCH_LENGTH,
    MOVIES_NAME,
    SERIES_NAME,
    USERS_NAME,
} from '../../constants'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { UserEntry } from '../../entities/UsersListEntry'
import {
    setLoading,
    setResults,
    setTextSearched,
    setNextPage,
    addResults,
} from '../../store/slices/searchContentSlice'
import { serializeSearchResults } from '../../utils/serializeSearchResults'
import { useAppDispatch } from '../redux/useAppDispatch'
import { useAppSelector } from '../redux/useAppSelector'
import { useDataToSerieEntryList } from './useSeriesEntryList'
import { useTimer } from './useTimer'

const INITIAL_PAGE = 1

export const useSearchContent = () => {
    const { textSearched, category, nextPage } = useAppSelector(
        (state) => state.searchContent
    )
    const dispatch = useAppDispatch()
    const { searchMovies } = useSearchMovies()
    const { searchSeries } = useSearchSeries();
    const { searchArtists } = useSearchArtist();
    const { searchUsers } = useSearchUsers();

    const searchTextPage = () => {
        searchText(textSearched, nextPage)
    }

    const searchText = (text: string, page: number = INITIAL_PAGE) => {
        console.log('Buscando ' + text + '...' + 'pagina ' + page + ' ' + category)
        const queryParams: SearchParams = { query: text, page: page }
        if (CATEGORIES[category] == MOVIES_NAME) {
            searchMovies(queryParams, onSuccessSearch)
        } else if (CATEGORIES[category] == SERIES_NAME) {
            searchSeries(queryParams, onSuccessSearch)
        } else if (CATEGORIES[category] == ARTISTS_NAME) {
            searchArtists(queryParams, onSuccessSearch)
        } else if (CATEGORIES[category] == USERS_NAME) {
            searchUsers(text, onSuccessSearch)
        }
    }

    const { cancelTimer, startNewTimer } = useTimer((loading: boolean) => {
        dispatch(setLoading(loading))
    }, searchText)

    const onSubmit = () => {
        if (textSearched.length < 1) return
        cancelTimer()
        searchText(textSearched)
    }

    const onChangeTextSearched = (newText: string) => {
        if (newText.length > MAX_SEARCH_LENGTH) return
        
        dispatch(setTextSearched(newText))
        dispatch(setResults([]))
        cancelTimer()

        // If the text is empty, no new timer is needed
        if (newText.length < 1) {
            dispatch(setLoading(false))
            return
        }

        startNewTimer(newText)
    }

    const { toSeriesListEntries, toArtistListEntries, toMovieListEntries, toUsersListEntries } =
        useDataToSerieEntryList()

    // onSuccess and onFailure callbacks
    // ------------------------------------------------------------
    const onSuccessSearch = (response: any) => {
        console.log('Busqueda exitosa: ')
        const _page = response.data.page
        let parsedResponse = [] as MovieEntry[] | SeriesEntry[] | ArtistEntry[] | UserEntry[]
        switch (CATEGORIES[category]) {
            case MOVIES_NAME:
                parsedResponse = toMovieListEntries(response.data)
                break
            case SERIES_NAME:
                parsedResponse = toSeriesListEntries(response.data)
                break
            case ARTISTS_NAME:
                parsedResponse = toArtistListEntries(response.data)
                break
            case USERS_NAME:
                parsedResponse = toUsersListEntries(response.data)
                break
            default:
                break
        }
        const serializedData = serializeSearchResults(parsedResponse, CATEGORIES[category])
        if (_page === INITIAL_PAGE) {
            dispatch(setNextPage(INITIAL_PAGE + 1))
            dispatch(setResults(serializedData))
            dispatch(setLoading(false))
        }
        else {
            if (parsedResponse.length > 0) {
                dispatch(addResults(serializedData))
                const np = _page + 1
                dispatch(setNextPage(np))
            }
            dispatch(setLoading(false))
        }
    }

    return { onSubmit, onChangeTextSearched, searchTextPage }
}
