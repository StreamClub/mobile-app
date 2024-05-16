import React from 'react'
import { View } from 'react-native'
import { AvailableText } from '../Content/AvailableText'
import { colors } from '../../assets'
import { BodyText } from '../BasicComponents/BodyText'

type MovieStateProps = {
    available: boolean
    status: string
}

export const MovieState = (params: MovieStateProps) => {
    const { available, status } = params
    const availableText = available ? 'Disponible en tus plataformas' : ''

    return (
        <>
            <View style={{ flex: 0.35 }}>
                <BodyText
                    body={status}
                    size="medium"
                    fontStyle="italic"
                    color={colors.primaryBlue}
                    style={{ fontWeight: 'bold' }}
                />
                <AvailableText availableText={availableText} />
            </View>
        </>
    )
}
