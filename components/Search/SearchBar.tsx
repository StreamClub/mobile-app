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

type SearchBarProps = {}

export const SearchContentBar = (params: SearchBarProps) => {
    const { textSearched, loading, category } = useAppSelector(
        (state) => state.searchContent
    )
    const { toSeriesListEntries, toArtistListEntries, toMovieListEntries } =
        useDataToSerieEntryList()
    const dispatch = useAppDispatch()

    // onSuccess and onFailure callbacks
    // ------------------------------------------------------------
    const onSuccessSearch = (response: any) => {
        console.log('Busqueda exitosa: ')

        switch (category) {
            case MOVIES_NAME:
                dispatch(setResults(toMovieListEntries(response.data)))
                break
            case SERIES_NAME:
                dispatch(setResults(toSeriesListEntries(response.data)))
                break
            case ARTISTS_NAME:
                dispatch(setResults(toArtistListEntries(response.data)))
                break
            case USERS_NAME:
                console.log('TODO: Procesar respuesta')
                break
            default:
                break
        }
        dispatch(setLoading(false))
    }

    const onFailureSearch = (error: any) => {
        console.log(error)
        console.log(error.response)
        dispatch(setLoading(false))
    }

    const { onSubmit, onChangeTextSearched } = useSearchContent(
        onSuccessSearch,
        onFailureSearch
    )
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
