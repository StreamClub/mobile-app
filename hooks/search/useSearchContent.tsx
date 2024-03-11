import { useSearchArtist } from '../../apiCalls/artists'
import { SearchParams, useSearchMovies } from '../../apiCalls/movies'
import { useSearchSeries } from '../../apiCalls/series'
import { searchUsers } from '../../apiCalls/users'
import {
    ARTISTS_NAME,
    MAX_SEARCH_LENGTH,
    MOVIES_NAME,
    SERIES_NAME,
    USERS_NAME,
} from '../../constants'
import { useSession } from '../../context/ctx'
import {
    setLoading,
    setTextSearched,
} from '../../store/slices/searchContentSlice'
import { useAppDispatch } from '../redux/useAppDispatch'
import { useAppSelector } from '../redux/useAppSelector'
import { useTimer } from './useTimer'

export const useSearchContent = (
    onSuccessSearch: (response: any) => void,
    onFailureSearch: (error: any) => void
) => {
    const { textSearched, category } = useAppSelector(
        (state) => state.searchContent
    )
    const session = useSession()
    const dispatch = useAppDispatch()
    const { searchMovies } = useSearchMovies()
    const {searchSeries} = useSearchSeries();
    const {searchArtists} = useSearchArtist();

    const searchText = (text: string) => {
        console.log('Buscando ' + text + '...')

        const queryParams: SearchParams = { query: text, page: 1 }

        if (category == MOVIES_NAME) {
            searchMovies(queryParams, onSuccessSearch)
        } else if (category == SERIES_NAME) {
            searchSeries(queryParams, onSuccessSearch)
        } else if (category == ARTISTS_NAME) {
            searchArtists(queryParams, onSuccessSearch)
        } else if (category == USERS_NAME) {
            searchUsers(session, queryParams, onSuccessSearch, onFailureSearch) //TO DO: Cambiar por state, hoy no hace nada.
        }
    }

    const { cancelTimer, startNewTimer } = useTimer((loading: boolean) => {
        dispatch(setLoading(loading))
    }, searchText)

    const onSubmit = () => {
        if (textSearched.length < 1) return
        cancelTimer()
        console.log('[Submit]')
        searchText(textSearched)
    }

    const onChangeTextSearched = (newText: string) => {
        if (newText.length > MAX_SEARCH_LENGTH) return
        
        dispatch(setTextSearched(newText))
        cancelTimer()

        // If the text is empty, no new timer is needed
        if (newText.length < 1) {
            dispatch(setLoading(false))
            return
        }

        startNewTimer(newText)
    }

    return { onSubmit, onChangeTextSearched }
}
