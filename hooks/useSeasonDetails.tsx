import { useState } from 'react'
import { SeasonDetail } from '../entities/Details/Series/SeasonDetail'
import { useAppSelector } from './redux/useAppSelector'
import { useAppDispatch } from './redux/useAppDispatch'

export const useSeasonDetail = () => {
    // const [season, setSeasonState] = useState<SeasonDetail>()

    const { focusedSeason: season } = useAppSelector((state) => state.searchContent)

    const setSeason = (data: any, seriesId: number) => {
        const season = SeasonDetail.fromJson(data, seriesId)
        dispatch(setLoading(true));
    }

    return { season, setSeason }
}
