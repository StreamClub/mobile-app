import React from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { useSeenPress } from '../../hooks/useSeenPress'
import { ContentType } from '../../entities/ContentType'
import { Content } from '../../entities/Content'

type SeenButtonProps = {
    contentEntry: Content,
    contentType: ContentType
}

export const SeenSection = (params: SeenButtonProps) => {
    const { contentEntry, contentType } = params
    const { onPress, seen, loading } = useSeenPress(contentEntry, contentType)

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
