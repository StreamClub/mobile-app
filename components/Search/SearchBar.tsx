import { Image } from 'react-native'
import React from 'react'
import { colors } from '../../assets'
import { SearchBar } from '@rneui/themed'
import { Icon } from 'react-native-elements'
import { LocalIcon } from '../Types/LocalIcon'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { useSearchContent } from '../../hooks/search/useSearchContent'

export const SearchContentBar = () => {
    const { textSearched, loading } = useAppSelector(
        (state) => state.searchContent
    )
    const { onSubmit, onChangeTextSearched } = useSearchContent()
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
