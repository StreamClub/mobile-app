import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { WatchlistButton } from '../BasicComponents/WatchlistButton'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { ContentEntry } from '../../entities/ContentListEntry'

type WatchlistButtonProps = {
    contentEntry: ContentEntry
    onWatchlistPress: (
        serieEntry: ContentEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => void
}

export const WatchlistSection = (params: WatchlistButtonProps) => {
    const { contentEntry, onWatchlistPress } = params

    const [inWatchlist, setInWatchlist] = useState(contentEntry.inWatchlist)
    const [watchlistLoading, setWatchlistLoading] = useState(false)

    return (
        <>
            <Pressable
                onPress={() =>
                    onWatchlistPress(
                        contentEntry,
                        watchlistLoading,
                        setWatchlistLoading,
                        setInWatchlist,
                        inWatchlist
                    )
                }
                style={styles.iconContainer}
            >
                <WatchlistButton
                    inWatchlist={inWatchlist}
                    watchlistLoading={watchlistLoading}
                    iconStyle={styles.iconsStyle}
                />
            </Pressable>
        </>
    )
}
