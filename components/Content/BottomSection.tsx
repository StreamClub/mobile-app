import React from 'react'
import { View } from 'react-native'
import { ContentScore } from '../Content/ContentScore'
import { SeenSection } from '../Content/SeenSection'
import { ContentEntry } from '../../entities/ContentListEntry'
import { WatchlistSection } from '../Content/WatchlistSection'

type BottomSectionProps = {
    contentEntry: ContentEntry
    scoreFormatted: string
    onSeenPress: (
        content: ContentEntry,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
    onWatchlistPress: (
        content: ContentEntry,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setWatchlistIcon: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => void
}

export const BottomSection = (params: BottomSectionProps) => {
    const { contentEntry, scoreFormatted, onSeenPress, onWatchlistPress } =
        params

    const seenPress = (
        contentEntry: ContentEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        if (loading) return
        onSeenPress(contentEntry, setLoading)
    }

    const watchlistPress = (
        contentEntry: ContentEntry,
        loading: boolean,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setInWatchlist: React.Dispatch<React.SetStateAction<boolean>>,
        inWatchlist: boolean
    ) => {
        if (loading) return
        onWatchlistPress(contentEntry, setLoading, setInWatchlist, inWatchlist)
    }

    return (
        <>
            <View style={{ flex: 0.25, flexDirection: 'row', width: '100%' }}>
                <ContentScore score={scoreFormatted} />

                <SeenSection
                    contentEntry={contentEntry}
                    onSeenPress={seenPress}
                />

                <WatchlistSection
                    contentEntry={contentEntry}
                    onWatchlistPress={watchlistPress}
                />
            </View>
        </>
    )
}
