import { useState } from 'react'
import { ContentType } from '../entities/ContentType'
import { ContentEntry } from '../entities/ContentEntry'
import { ContentDetail } from '../entities/Details/ContentDetailEntry'
import { useMovieWatchlist } from '../apiCalls/movies'
import { useSeriesWatchlist } from '../apiCalls/series'
// import { useAppSelector } from './redux/useAppSelector'
import { useAppDispatch } from './redux/useAppDispatch';
import { updateInWatchlistState } from '../store/slices/searchContentSlice';
import { MOVIES_NAME, SERIES_NAME } from '../constants'

export const useWatchlistPress = (
    contentEntry: ContentEntry | ContentDetail,
    contentType: ContentType
) => {
    const {addMovieToWatchlist, removeMovieFromWatchlist, loading: movieLoading} = useMovieWatchlist();
    const {addSeriesToWatchlist, removeSeriesFromWatchlist, loading: seriesLoading} = useSeriesWatchlist();
    const dispatch = useAppDispatch();

    const onSuccessAdd = (response: any) => {
        console.log('Agrego a watchlist')
        
        const params = { 
            category: contentType.isMovie() ? MOVIES_NAME : SERIES_NAME, 
            contentId: contentEntry.id, 
            inWatchlist: true 
        }
        dispatch(updateInWatchlistState(params));
    }

    const onSuccessRemove = (response: any) => {
        console.log('Borro de watchlist')
        
        const params = { 
            category: contentType.isMovie() ? MOVIES_NAME : SERIES_NAME,
            contentId: contentEntry.id,
            inWatchlist: false 
        }
        dispatch(updateInWatchlistState(params));
    }

    const addContentToWatchlist = () => {
        contentType.isMovie()
            ? addMovieToWatchlist(
                  contentEntry.id,
                  onSuccessAdd
              )
            : addSeriesToWatchlist(
                  contentEntry.id,
                  onSuccessAdd
              )
    }

    const removeContentFromWatchlist = () => {
        contentType.isMovie()
            ? removeMovieFromWatchlist(
                  contentEntry.id,
                  onSuccessRemove
              )
            : removeSeriesFromWatchlist(
                  contentEntry.id,
                  onSuccessRemove
              )
    }

    const onPress = () => {
        if (loading) return
        if (!contentEntry.inWatchlist) {
            addContentToWatchlist()
        } else {
            removeContentFromWatchlist()
        }
    }
    const loading = movieLoading || seriesLoading;
    return { onPress, loading }
}
