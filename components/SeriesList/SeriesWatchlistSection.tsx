import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { WatchlistButton } from '../BasicComponents/WatchlistButton'
import { SerieEntry } from '../SeriesList'
import { styles } from './styles/SeriesList.style'

type SeriesWatchlistSectionProps = {
    serieEntry: SerieEntry
    onWatchlistPress: (
        serieEntry: SerieEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => void
}

export const SeriesWatchlistSection = (params: SeriesWatchlistSectionProps) => {
    const { serieEntry, onWatchlistPress } = params

    const [inWatchlist, setInWatchlist] = useState(serieEntry.inWatchlist)
    const [watchlistLoading, setWatchlistLoading] = useState(false)

    return (
        <>
            <Pressable
                onPress={() =>
                    onWatchlistPress(
                        serieEntry,
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
