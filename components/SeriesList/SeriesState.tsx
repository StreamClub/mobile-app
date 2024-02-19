import React from 'react'
import { View } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'

type SeriesTitleProps = {
    status: string
    availableText: string
}

export const SeriesState = (params: SeriesTitleProps) => {
    const { status, availableText } = params
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
                <BodyText
                    body={availableText}
                    size="medium"
                    fontStyle="italic"
                    color={colors.secondaryBlue}
                />
            </View>
        </>
    )
}
