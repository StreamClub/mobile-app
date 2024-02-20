import React from 'react'
import { colors } from '../../assets'
import { CATEGORIES } from '../../constants'
import { ButtonGroup } from '@rneui/themed'

type SegmentedButtonProps = {
    selectedIndex: number
    onSegmentedButtonPress: (index: number) => void
}

export const SegmentedButton = (params: SegmentedButtonProps) => {
    const { selectedIndex, onSegmentedButtonPress } = params

    return (
        <ButtonGroup
            buttons={CATEGORIES}
            selectedIndex={selectedIndex}
            onPress={onSegmentedButtonPress}
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
