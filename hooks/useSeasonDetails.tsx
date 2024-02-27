import { useState } from 'react'
import { SeasonDetail } from '../entities/Details/Series/SeasonDetail'

export const useSeasonDetail = () => {
    const [season, setSeasonState] = useState<SeasonDetail>()

    const setSeason = (data: any, seriesId: number) => {
        const movieEntry = SeasonDetail.fromJson(data, seriesId)
        setSeasonState(movieEntry);
    }

    return { season, setSeason }
}
