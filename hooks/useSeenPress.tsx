import { useState } from 'react'
import { ContentType } from '../entities/ContentType'
import { markMovieAsSeen, unmarkMovieAsSeen } from '../apiCalls/movies'
import { useSession } from '../context/ctx'
import { markEpisodeAsSeen, markSeasonAsSeen, markSeriesAsSeen, unmarkEpisodeAsSeen, unmarkSeasonAsSeen, unmarkSeriesAsSeen } from '../apiCalls/series'

export const useSeenPress = (seenState: boolean, contentId: string, contentType: ContentType, 
                            seriesId?: string, seasonId?: string) => {
    const [loading, setLoading] = useState(false)
    const [seen, setSeen] = useState(seenState)
    const session = useSession()
    const onSuccessAdd = (response: any) => {
        console.log('Marco como visto');
        setSeen(true);
        setLoading(false);
    }

    const onSuccessRemove = (response: any) => {
        console.log('Desmarco como visto');
        setSeen(false);
        setLoading(false);
    }

    const onFailure = (error: any) => {
        console.log(error)
        console.log(error.message)
        setLoading(false)
    }

    const markContentAsSeen = () => {
        if(contentType.isMovie()) {
            markMovieAsSeen(session,contentId,onSuccessAdd,onFailure)
        }
        if (contentType.isSeries()) {
            markSeriesAsSeen(session,contentId,onSuccessAdd,onFailure)
        }
        if (contentType.isSeason() && seriesId) {
            markSeasonAsSeen(session,contentId,seriesId,onSuccessAdd,onSuccessRemove)
        }
        if (contentType.isEpisode() && seriesId && seasonId) {
            markEpisodeAsSeen(session,contentId,seriesId,seasonId,onSuccessAdd,onSuccessRemove)
        }
    }

    const unmarkContentAsSeen = () => {
        if(contentType.isMovie()) {
            unmarkMovieAsSeen(session,contentId,onSuccessAdd,onFailure)
        }
        if (contentType.isSeries()) {
            unmarkSeriesAsSeen(session,contentId,onSuccessAdd,onFailure)
        }
        if (contentType.isSeason() && seriesId) {
            unmarkSeasonAsSeen(session,contentId,seriesId,onSuccessAdd,onSuccessRemove)
        }
        if (contentType.isEpisode() && seriesId && seasonId) {
            unmarkEpisodeAsSeen(session,contentId,seriesId,seasonId,onSuccessAdd,onSuccessRemove)
        }
    }

    const onPress = () => {
        if (loading) return
        if (!seen) {
            markContentAsSeen()
        } else {
            unmarkContentAsSeen()
        }
        setLoading(true)
    }

    return { loading, seen, onPress }
}
