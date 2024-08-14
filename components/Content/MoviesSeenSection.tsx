import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { useSeenPress } from '../../hooks/useSeenPress'
import { ContentType } from '../../entities/ContentType'
import { LocalIcon } from '../Types/LocalIcon'

type SeenButtonProps = {
    seenState: number
    movieId: string
}

export const MoviesSeenSection = (params: SeenButtonProps) => {
    const { seenState, movieId } = params
    const { onPress, loading } = useSeenPress()

    const OnPressParams = {
        seenState: seenState ? 1 : 0,
        contentId: movieId,
        contentType: new ContentType('movie'),
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
                            seenState ? LocalIcon.markAsUnseen : LocalIcon.markAsSeen
                        }
                        style={styles.iconsStyle}
                    />
                )}
            </Pressable>
        </>
    )
}
