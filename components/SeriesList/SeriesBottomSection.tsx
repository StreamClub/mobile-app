import React from 'react'
import { ImageSourcePropType, View } from 'react-native'
import { SeriesQualification } from './SeriesQualification'
import { SeriesSeenSection } from './SeriesSeenSection'
import { SeriesWatchlistSection } from './SeriesWatchlistSection'
import { SerieEntry } from '../SeriesList'

type SeriesBottomSectionProps = {
    serieEntry: SerieEntry
    scoreFormatted: string
    seenIcon: ImageSourcePropType
    inWatchlist: boolean
    setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>
    onSerieSeenPress: (
        serie: SerieEntry,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
    onWatchlistPress: (
        series: SerieEntry,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setWatchlistIcon: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => void
}

export const SeriesBottomSection = (params: SeriesBottomSectionProps) => {
    const [seenLoading, setSeenLoading] = React.useState(false)
    const [watchlistLoading, setWatchlistLoading] = React.useState(false)
    const {
        serieEntry,
        scoreFormatted,
        seenIcon,
        inWatchlist,
        setInWatchlist,
        onSerieSeenPress,
        onWatchlistPress,
    } = params

    const onSeenPress = (
        serieEntry: SerieEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        if (loading) return
        onSerieSeenPress(serieEntry, setLoading)
    }

    const watchlistPress = (
        serieEntry: SerieEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => {
        if (loading) return
        onWatchlistPress(serieEntry, setLoading, setInWatchlist, inWatchlist)
    }

    return (
        <>
            <View style={{ flex: 0.25, flexDirection: 'row', width: '100%' }}>
                <SeriesQualification score={scoreFormatted} />
                <SeriesSeenSection
                    serieEntry={serieEntry}
                    seenLoading={seenLoading}
                    seenIcon={seenIcon}
                    setSeenLoading={setSeenLoading}
                    onSeenPress={onSeenPress}
                />
                <SeriesWatchlistSection
                    serieEntry={serieEntry}
                    watchlistLoading={watchlistLoading}
                    inWatchlist={inWatchlist}
                    setWatchlistLoading={setWatchlistLoading}
                    setInWatchlist={setInWatchlist}
                    onWatchlistPress={watchlistPress}
                />
            </View>
        </>
    )
}
