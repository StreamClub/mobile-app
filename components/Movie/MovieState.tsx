import React from 'react'
import { View } from 'react-native'
import { AvailableText } from '../Content/AvailableText'

type MovieStateProps = {
    available: boolean
}

export const MovieState = (params: MovieStateProps) => {
    const { available } = params
    const availableText = available ? 'Disponible en tus plataformas' : ''

    return (
        <>
            <View style={{ flex: 0.15 }}>
                <AvailableText availableText={availableText} />
            </View>
        </>
    )
}
