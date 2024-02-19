import React, { useState } from 'react'
import {
    Image,
    Pressable,
    ActivityIndicator,
    ImageSourcePropType,
} from 'react-native'
import { SerieEntry } from '../SeriesList'
import { styles } from './styles/SeriesList.style'
import { colors } from '../../assets'

type SeriesSeenSectionProps = {
    serieEntry: SerieEntry
    onSeenPress: (
        serieEntry: SerieEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
}

export const SeriesSeenSection = (params: SeriesSeenSectionProps) => {
    const { serieEntry, onSeenPress } = params
    const [seenLoading, setSeenLoading] = useState(false)
    const seenIcon = serieEntry.seen
        ? require('../../assets/icons/unmarkAsSeen.png')
        : require('../../assets/icons/markAsSeen.png')

    return (
        <>
            <Pressable
                onPress={() =>
                    onSeenPress(serieEntry, seenLoading, setSeenLoading)
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
