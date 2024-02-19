import { ContentEntry } from '../../entities/ContentListEntry'

export type ContentListCallbacks = {
    onContentPress: (content: ContentEntry) => void
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
