import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { useSeenPress } from '../../hooks/useSeenPress'
import { ContentType } from '../../entities/ContentType'
import { LocalIcon } from '../Types/LocalIcon'
import { Percent } from '../BasicComponents/Percent'

type SeenButtonProps = {
    seenState: number
    seriesId: string
}

export const SeriesSeenSection = (params: SeenButtonProps) => {
    const { seenState, seriesId } = params
    const { onPress, loading } = useSeenPress()

    const OnPressParams = {
        seenState: seenState,
        contentId: seriesId,
        contentType: new ContentType('series'),
    }

    return (
        <>
            <Pressable onPress={() => onPress(OnPressParams)}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        animating={true}
                        color={colors.primaryBlue}
                        style={{ marginRight: 7 }}
                    />
                ) : (
                    <Percent
                        style={{}}
                        size= {35}
                        showText= {false}
                        percent= {seenState}
                    />
                )}
            </Pressable>
        </>
    )
}
