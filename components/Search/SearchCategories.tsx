import React, { useState } from 'react'
import { colors } from '../../assets'
import { CATEGORIES, INITIAL_CATEGORY } from '../../constants'
import { ButtonGroup } from '@rneui/themed'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import {
    setCategory,
    setResults,
    setTextSearched,
} from '../../store/slices/searchContentSlice'

type SearchCategories = {}

export const SearchCategories = (params: SearchCategories) => {
    const dispatch = useAppDispatch()
    const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY)

    const onPress = (value: number) => {
        dispatch(setTextSearched(''))
        dispatch(setResults([]))
        setSelectedIndex(value)
        dispatch(setCategory(CATEGORIES[value]))
    }

    return (
        <ButtonGroup
            buttons={CATEGORIES}
            selectedIndex={selectedIndex}
            onPress={onPress}
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
