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
import { useOnFocus } from '../../hooks/useOnFocus'
import { useAppSelector } from '../../hooks/redux/useAppSelector'

type SearchCategories = {}

export const SearchCategories = (params: SearchCategories) => {
    const dispatch = useAppDispatch()
    const { category } = useAppSelector((state) => state.searchContent);

    const onPress = (value: number) => {
        dispatch(setTextSearched(''));
        dispatch(setResults([]));
        dispatch(setCategory(value));
    }

    return (
        <ButtonGroup
            buttons={CATEGORIES}
            selectedIndex={category}
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
