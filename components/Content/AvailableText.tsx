import React from 'react'
import { BodyText } from '../BasicComponents/BodyText'
import { colors } from '../../assets'

type AvailableTextProps = {
    availableText: string
}

export const AvailableText = (params: AvailableTextProps) => {
    const { availableText } = params
    return (
        <>
            <BodyText
                body={availableText}
                size="medium"
                fontStyle="italic"
                color={colors.secondaryBlue}
            />
        </>
    )
}
