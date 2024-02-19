import { Image } from 'react-native'
import React from 'react'
import { colors } from '../../assets'
import { SearchBar } from '@rneui/themed'
import { Icon } from 'react-native-elements'

type SearchBarProps = {
    showLoading: boolean
    textSearched: string
    onChangeTextSearched: (text: string) => void
    onSubmit: () => void
}

export const SearchContentBar = (params: SearchBarProps) => {
    const { showLoading, textSearched, onChangeTextSearched, onSubmit } = params
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
