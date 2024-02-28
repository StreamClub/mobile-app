import { useState } from 'react'
import { SeriesDetail } from '../entities/Details/Series/SeriesDetailEntry'

export const useSeriesDetails = () => {
    const [series, setSeriesState] = useState<SeriesDetail>()

    const setSeries = (data: any) => {
        const seriesEntry = SeriesDetail.fromJson(data)
        setSeriesState(seriesEntry);
    }

    return { series, setSeries }
}
