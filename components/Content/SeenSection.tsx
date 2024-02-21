import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { ContentEntry } from '../../entities/ContentListEntry'
import { useSeenPress } from '../../hooks/useSeenPress'

type SeenButtonProps = {
    contentEntry: ContentEntry
}

export const SeenSection = (params: SeenButtonProps) => {
    const { contentEntry } = params
    const seenIcon = contentEntry.seen
        ? require('../../assets/icons/unmarkAsSeen.png')
        : require('../../assets/icons/markAsSeen.png')
    const { onPress, loading } = useSeenPress(contentEntry)

    return (
        <>
            <Pressable onPress={() => onPress()} style={styles.iconContainer}>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        animating={true}
                        color={colors.primaryRed}
                        style={{ marginRight: 7 }}
                    />
                ) : (
                    <Image source={seenIcon} style={styles.iconsStyle} />
                )}
            </Pressable>
        </>
    )
}
