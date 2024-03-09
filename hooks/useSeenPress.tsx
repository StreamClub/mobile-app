import { useState } from 'react'
import { ContentType } from '../entities/ContentType'
import { useMovieSeen } from '../apiCalls/movies'
import { useSeriesSeen } from '../apiCalls/series'

export const useSeenPress = (seenState: boolean, contentId: string, contentType: ContentType, 
                            seriesId?: string, seasonId?: string) => {
    const {markMovieAsSeen, unmarkMovieAsSeen, loading: loadingMovie} = useMovieSeen();
    const {markSeriesAsSeen, unmarkSeriesAsSeen, markSeasonAsSeen, unmarkSeasonAsSeen,
            markEpisodeAsSeen, unmarkEpisodeAsSeen, loading: loadingSeries} = useSeriesSeen();
    const [seen, setSeen] = useState(seenState);
    const loading = loadingMovie || loadingSeries;
    const onSuccessAdd = (response: any) => {
        console.log('Marco como visto');
        setSeen(true);
    }

    const onSuccessRemove = (response: any) => {
        console.log('Desmarco como visto');
        setSeen(false);
    }

    const markContentAsSeen = () => {
        if(contentType.isMovie()) {
            markMovieAsSeen(contentId,onSuccessAdd)
        }
        if (contentType.isSeries()) {
            markSeriesAsSeen(contentId,onSuccessAdd)
        }
        if (contentType.isSeason() && seriesId) {
            markSeasonAsSeen(contentId,seriesId,onSuccessAdd)
        }
        if (contentType.isEpisode() && seriesId && seasonId) {
            markEpisodeAsSeen(contentId,seriesId,seasonId,onSuccessAdd)
        }
    }

    const unmarkContentAsSeen = () => {
        if(contentType.isMovie()) {
            unmarkMovieAsSeen(contentId,onSuccessRemove)
        }
        if (contentType.isSeries()) {
            unmarkSeriesAsSeen(contentId,onSuccessRemove)
        }
        if (contentType.isSeason() && seriesId) {
            unmarkSeasonAsSeen(contentId,seriesId,onSuccessRemove)
        }
        if (contentType.isEpisode() && seriesId && seasonId) {
            unmarkEpisodeAsSeen(contentId,seriesId,seasonId,onSuccessRemove)
        }
    }

    const onPress = () => {
        if (loading) return
        if (!seen) {
            markContentAsSeen()
        } else {
            unmarkContentAsSeen()
        }
    }

    return { loading, seen, onPress }
}
