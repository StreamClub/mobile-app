import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { useSeenPress } from '../../hooks/useSeenPress'
import { ContentType } from '../../entities/ContentType'
import { LocalIcon } from '../Types/LocalIcon'
import { Percent } from '../BasicComponents/Percent'
import { useAppSelector } from '../../hooks/redux/useAppSelector'

type SeenButtonProps = {
    seriesId: string
    seasonId: string
}

export const SeasonSeenSection = (params: SeenButtonProps) => {
    const { seriesId, seasonId } = params
    const { onPress, loading } = useSeenPress()
    const { focusedSeason } = useAppSelector((state) => state.searchContent)

    const OnPressParams = {
        seenState: focusedSeason.seen? 100 : 0,
        seasonId: seasonId,
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
                    <Image
                        source={
                            focusedSeason.seen ? LocalIcon.markAsUnseen : LocalIcon.markAsSeen
                        }
                        style={styles.iconsStyle}
                    />
                )}
            </Pressable>
        </>
    )
}
