import React, { useState } from 'react'
import { colors } from '../../assets'
import { CATEGORIES, INITIAL_CATEGORY } from '../../constants'
import { ButtonGroup } from '@rneui/themed'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { setCategory } from '../../store/slices/searchContentSlice'

type SegmentedButtonProps = {
    onChangeTextSearched: (text: string) => void
}

export const SegmentedButton = (params: SegmentedButtonProps) => {
    const dispatch = useAppDispatch()
    const { onChangeTextSearched } = params
    const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY)

    const onPress = (value: number) => {
        // setShowLoading(true); //TODO: REVISAR, NUNCA TERMINA DE CARGAR
        onChangeTextSearched('')
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
