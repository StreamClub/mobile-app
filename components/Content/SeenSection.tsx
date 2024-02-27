import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { useSeenPress } from '../../hooks/useSeenPress'
import { ContentType } from '../../entities/ContentType'
import { Content } from '../../entities/Content'

type SeenButtonProps = {
    seenState: boolean,
    contentId: string,
    seriesId?: string,
    seasonId?: string,
    contentType: ContentType
}

export const SeenSection = (params: SeenButtonProps) => {
    const { seenState, contentId, contentType, seriesId, seasonId } = params
    const { onPress, seen, loading } = useSeenPress(seenState, contentId, contentType, seriesId, seasonId)

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
                        source={seen ? 
                        require('../../assets/icons/unmarkAsSeen.png')
                        : require('../../assets/icons/markAsSeen.png')}
                        style={styles.iconsStyle} />
                )}
            </Pressable>
        </>
    )
}
