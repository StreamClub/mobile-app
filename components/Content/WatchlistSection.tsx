import React from 'react'
import { Pressable } from 'react-native'
import { WatchlistButton } from '../BasicComponents/WatchlistButton'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { ContentEntry } from '../../entities/ContentListEntry'
import { ContentType } from '../../entities/ContentType'
import { useWatchlistPress } from '../../hooks/useWatchlistPress'

type WatchlistButtonProps = {
    contentEntry: ContentEntry
    contentType: ContentType
}

export const WatchlistSection = (params: WatchlistButtonProps) => {
    const { contentEntry, contentType } = params

    const { onPress, inWatchlist, loading } = useWatchlistPress(
        contentEntry,
        contentType
    )

    return (
        <>
            <Pressable onPress={() => onPress()} style={styles.iconContainer}>
                <WatchlistButton
                    inWatchlist={inWatchlist}
                    watchlistLoading={loading}
                    iconStyle={styles.iconsStyle}
                />
            </Pressable>
        </>
    )
}
