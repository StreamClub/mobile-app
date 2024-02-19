import React from 'react'
import { Pressable } from 'react-native'
import { WatchlistButton } from '../BasicComponents/WatchlistButton'
import { SerieEntry } from '../SeriesList'
import { styles } from './styles/SeriesList.style'

type SeriesWatchlistSectionProps = {
    serieEntry: SerieEntry
    watchlistLoading: boolean
    inWatchlist: boolean
    setWatchlistLoading: React.Dispatch<React.SetStateAction<boolean>>
    setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>
    onWatchlistPress: (
        serieEntry: SerieEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => void
}

export const SeriesWatchlistSection = (params: SeriesWatchlistSectionProps) => {
    const {
        serieEntry,
        watchlistLoading,
        setWatchlistLoading,
        setInWatchlist,
        onWatchlistPress,
        inWatchlist,
    } = params

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
