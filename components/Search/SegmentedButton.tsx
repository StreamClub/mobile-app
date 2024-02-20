import React, { useState } from 'react'
import { colors } from '../../assets'
import { CATEGORIES, INITIAL_CATEGORY } from '../../constants'
import { ButtonGroup } from '@rneui/themed'

type SegmentedButtonProps = {
    setSelectedCategory: (category: string) => void
    onChangeTextSearched: (text: string) => void
}

export const SegmentedButton = (params: SegmentedButtonProps) => {
    const { onChangeTextSearched, setSelectedCategory } = params
    const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY)

    const onPress = (value: number) => {
        // setShowLoading(true); //TODO: REVISAR, NUNCA TERMINA DE CARGAR
        onChangeTextSearched('')
        setSelectedIndex(value)
        setSelectedCategory(CATEGORIES[value])
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
