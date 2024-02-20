import { useState } from 'react'
import { SeriesEntry } from '../entities/SeriesListEntry'

export const useSeriesEntryList = () => {
    const [seriesList, setSeriesList] = useState<SeriesEntry[]>([])

    const setSeriesListEntries = (data: any) => {
        const seriesList: SeriesEntry[] = []
        const seriesResponse = data.results
        seriesResponse.forEach((serie: any) => {
            const serieEntry: SeriesEntry = SeriesEntry.fromJson(serie)
            seriesList.push(serieEntry)
        })
        setSeriesList(seriesList)
    }

    return { seriesList, setSeriesListEntries }
}
