import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import { WatchlistButton } from '../BasicComponents/WatchlistButton'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { ContentType } from '../../entities/ContentType'
import { useWatchlistPress } from '../../hooks/useWatchlistPress'
import { ContentEntry } from '../../entities/ContentEntry'
import { ContentDetail } from '../../entities/Details/ContentDetailEntry'

type WatchlistButtonProps = {
    contentEntry: ContentEntry | ContentDetail
    contentType: ContentType
    inWatchlist?: boolean
}

export const WatchlistSection = (params: WatchlistButtonProps) => {
    const { contentEntry, contentType } = params

    const { onPress, loading } = useWatchlistPress(
        contentEntry,
        contentType
    )

    return (
        <>
            <Pressable onPress={() => onPress()} style={styles.iconContainer}>
                <WatchlistButton
                    inWatchlist={params.inWatchlist != undefined? params.inWatchlist : contentEntry.inWatchlist}
                    watchlistLoading={loading}
                    iconStyle={styles.iconsStyle}
                />
            </Pressable>
        </>
    )
}
