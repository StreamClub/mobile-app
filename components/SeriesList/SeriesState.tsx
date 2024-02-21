import React from 'react'
import { View } from 'react-native'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'
import { AvailableText } from '../Content/AvailableText'

type SeriesStateProps = {
    status: string
    availableText: string
}

export const SeriesState = (params: SeriesStateProps) => {
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
                <AvailableText availableText={availableText} />
            </View>
        </>
    )
}
