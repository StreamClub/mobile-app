import { SerieEntry } from '../SeriesList'

export type SeriesListCallbacks = {
    onSeriePress: (serie: SerieEntry) => void
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
