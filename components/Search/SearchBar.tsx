import { Image } from 'react-native'
import React from 'react'
import { colors } from '../../assets'
import { SearchBar } from '@rneui/themed'
import { Icon } from 'react-native-elements'
import { LocalIcon } from '../Types/LocalIcon'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import {
    ARTISTS_NAME,
    MOVIES_NAME,
    SERIES_NAME,
    USERS_NAME,
} from '../../constants'
import { setLoading, setResults } from '../../store/slices/searchContentSlice'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { useDataToSerieEntryList } from '../../hooks/search/useSeriesEntryList'
import { useSearchContent } from '../../hooks/search/useSearchContent'
import { serializeSearchResults } from '../../utils/serializeSearchResults'
import { MovieEntry } from '../../entities/MovieListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { UserEntry } from '../../entities/UsersListEntry'

export const SearchContentBar = () => {
    const { textSearched, loading, category } = useAppSelector(
        (state) => state.searchContent
    )
    const { toSeriesListEntries, toArtistListEntries, toMovieListEntries, toUsersListEntries } =
        useDataToSerieEntryList()
    const dispatch = useAppDispatch()

    // onSuccess and onFailure callbacks
    // ------------------------------------------------------------
    // const onSuccessSearch = (response: any) => {
    //     console.log('Busqueda exitosa: ')
    //     const page = response.data.page
    //     let parsedResponse = [] as MovieEntry[] | SeriesEntry[] | ArtistEntry[] | UserEntry[]
    //     switch (category) {
    //         case MOVIES_NAME:
    //             parsedResponse = toMovieListEntries(response.data)
    //             break
    //         case SERIES_NAME:
    //             parsedResponse = toSeriesListEntries(response.data)
    //             break
    //         case ARTISTS_NAME:
    //             parsedResponse = toArtistListEntries(response.data)
    //             break
    //         case USERS_NAME:
    //             parsedResponse = toUsersListEntries(response.data)
    //             break
    //         default:
    //             break
    //     }
    //     const serializedData = serializeSearchResults(parsedResponse, category)
    //     if (page === 1){
    //         dispatch(setResults(serializedData))
    //         dispatch(setLoading(false))
    //     }
    //     else {
    //         dispatch(setResultsPage(serializedData))
    //     }
    // }

    const { onSubmit, onChangeTextSearched } = useSearchContent()
        // onSuccessSearch
    // )
    // ------------------------------------------------------------

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
                    source={LocalIcon.search}
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
            showLoading={loading}
            loadingProps={{
                color: 'black',
            }}
            onSubmitEditing={onSubmit}
        />
    )
}
