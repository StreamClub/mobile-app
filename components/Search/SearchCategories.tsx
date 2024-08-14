import React from 'react'
import { colors } from '../../assets'
import { CATEGORIES } from '../../constants'
import { ButtonGroup } from '@rneui/themed'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import {
    setCategory,
    setResults,
    setTextSearched,
} from '../../store/slices/searchContentSlice'
import { useAppSelector } from '../../hooks/redux/useAppSelector'

export const SearchCategories = () => {
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
