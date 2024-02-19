import React, { useState } from 'react'
import { Image, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '../../assets'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { ContentEntry } from '../../entities/ContentListEntry'

type SeenButtonProps = {
    contentEntry: ContentEntry
    onSeenPress: (
        serieEntry: ContentEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
}

export const SeenSection = (params: SeenButtonProps) => {
    const { contentEntry, onSeenPress } = params
    const [seenLoading, setSeenLoading] = useState(false)
    const seenIcon = contentEntry.seen
        ? require('../../assets/icons/unmarkAsSeen.png')
        : require('../../assets/icons/markAsSeen.png')

    return (
        <>
            <Pressable
                onPress={() =>
                    onSeenPress(contentEntry, seenLoading, setSeenLoading)
                }
                style={styles.iconContainer}
            >
                {seenLoading ? (
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
