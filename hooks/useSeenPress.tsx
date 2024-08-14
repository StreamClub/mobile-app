import { useState } from 'react'
import { ContentType } from '../entities/ContentType'
import { useMovieSeen } from '../apiCalls/movies'
import { useSeriesSeen } from '../apiCalls/series'
import { MOVIES_NAME, SERIES_NAME } from '../constants'
import { updateEpisodeSeenState, updateSeasonSeenState, updateSeenState } from '../store/slices/searchContentSlice'
import { useAppDispatch } from './redux/useAppDispatch'
import { useAppSelector } from './redux/useAppSelector'

export const useSeenPress = () => {
    const { focusedEntry } = useAppSelector((state) => state.searchContent)
    const {markMovieAsSeen, unmarkMovieAsSeen, loading: loadingMovie} = useMovieSeen();
    const {markSeriesAsSeen, unmarkSeriesAsSeen, markSeasonAsSeen, unmarkSeasonAsSeen,
            markEpisodeAsSeen, unmarkEpisodeAsSeen, loading: loadingSeries} = useSeriesSeen();

    
    const dispatch = useAppDispatch();

    //TODO: eliminar esta funcion
    function getRandomInt() {
        return Math.floor(Math.random() * (80 - 10 + 1)) + 10;
    }

    const loading = loadingMovie || loadingSeries;
    const onSuccessAdd = (response: any, contentId: string, category: string) => {
        const params = { 
            category: category, 
            contentId: contentId,
            seen: 100
        }
        dispatch(updateSeenState(params));
    }

    const onSuccessRemove = (response: any, contentId: string, category: string) => {
        const params = { 
            category: category, 
            contentId: contentId,
            seen: 0
        }
        dispatch(updateSeenState(params));
    }

    const onSuccessPartialSeen = (response: any) => {
        
        const percentSeen = response.data.seen;
        
        const params = { 
            category: focusedEntry.type, 
            contentId: focusedEntry.id,
            seen: percentSeen
        }
        dispatch(updateSeenState(params));
    }

    const markContentAsSeen = (params: OnPressParams) => {
        const { contentType, contentId, seasonId, episodeId } = params

        const _contentType = (contentType?.isMovie()? MOVIES_NAME : SERIES_NAME) || focusedEntry.type
        const _contentId = contentId || focusedEntry.id

        if(_contentType == MOVIES_NAME) {
            markMovieAsSeen(_contentId, (response: any) => onSuccessAdd(response, _contentId, _contentType))
        }
        if (_contentType == SERIES_NAME) {
            if (episodeId && seasonId) {
                markEpisodeAsSeen(episodeId, focusedEntry.id, seasonId, onSuccessPartialSeen)
                dispatch(updateEpisodeSeenState({ episodeId: Number(episodeId), seen: true }));
            } else if (seasonId) {
                markSeasonAsSeen(seasonId, focusedEntry.id, onSuccessPartialSeen)
                dispatch(updateSeasonSeenState({ seen: true }));
            } else {
                markSeriesAsSeen(_contentId, (response: any) => onSuccessAdd(response, _contentId, _contentType))
            }
        }
    }

    const unmarkContentAsSeen = (params: OnPressParams) => {
        const { contentType, contentId, seasonId, episodeId } = params
        
        const _contentType = (contentType?.isMovie()? MOVIES_NAME : SERIES_NAME) || focusedEntry.type
        const _contentId = contentId || focusedEntry.id
        
        if(_contentType == MOVIES_NAME) {
            unmarkMovieAsSeen(_contentId, (response: any) => onSuccessRemove(response, _contentId, _contentType))
        }
        if (_contentType == SERIES_NAME) {
            if (episodeId && seasonId) {
                unmarkEpisodeAsSeen(episodeId, focusedEntry.id, seasonId, onSuccessPartialSeen)
                dispatch(updateEpisodeSeenState({ episodeId: Number(episodeId), seen: false }));
            } else if (seasonId) {
                unmarkSeasonAsSeen(seasonId, focusedEntry.id, onSuccessPartialSeen)
                dispatch(updateSeasonSeenState({ seen: false }));
            } else {
                unmarkSeriesAsSeen(_contentId, (response: any) => onSuccessRemove(response, _contentId, _contentType))
            }
        }
    }

    type OnPressParams = {
        seenState?: number,
        contentId?: string,
        contentType?: ContentType,
        seasonId?: string,
        episodeId?: string
    }

    const onPress = (params: OnPressParams) => {
        const _seenState = params.seenState != undefined? params.seenState : focusedEntry.seen

        if (loading) return
        if (_seenState) {
            console.log('Desmarcar como visto');
            unmarkContentAsSeen(params)
        } else {
            console.log('Marcar como visto');
            markContentAsSeen(params)
        }
    }

    return { loading, onPress }
}
