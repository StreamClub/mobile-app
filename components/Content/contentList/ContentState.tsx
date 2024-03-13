import React from 'react'
import { View } from 'react-native'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'
import { AvailableText } from '../../Content/AvailableText'
import { toAvailableText } from '../../../utils'

type ContentStateProps = {
    status: string
    available: boolean
}

export const ContentState = (params: ContentStateProps) => {
    const { status, available } = params
    const availableText = toAvailableText(available)
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
