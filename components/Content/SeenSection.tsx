import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { useSeenPress } from '../../hooks/useSeenPress'
import { ContentType } from '../../entities/ContentType'
import { LocalIcon } from '../Types/LocalIcon'

type SeenButtonProps = {
    seenState: boolean
    contentId: string
    seriesId?: string
    seasonId?: string
    contentType: ContentType
}

export const SeenSection = (params: SeenButtonProps) => {
    const { seenState, contentId, contentType, seriesId, seasonId } = params
    const { onPress, seen, loading } = useSeenPress(
        seenState,
        contentId,
        contentType,
        seriesId,
        seasonId
    )

    return (
        <>
            <Pressable onPress={() => onPress()}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        animating={true}
                        color={colors.primaryBlue}
                        style={{ marginRight: 7 }}
                    />
                ) : (
                    <Image
                        source={
                            seen ? LocalIcon.markAsUnseen : LocalIcon.markAsSeen
                        }
                        style={styles.iconsStyle}
                    />
                )}
            </Pressable>
        </>
    )
}
