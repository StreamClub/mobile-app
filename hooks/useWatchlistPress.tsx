import { useState } from 'react'
import { ContentType } from '../entities/ContentType'
import { Content } from '../entities/Content'
import { useMovieWatchlist } from '../apiCalls/movies'
import { useSeriesWatchlist } from '../apiCalls/series'

export const useWatchlistPress = (
    contentEntry: Content,
    contentType: ContentType
) => {
    const {addMovieToWatchlist, removeMovieFromWatchlist, loading: movieLoading} = useMovieWatchlist();
    const {addSeriesToWatchlist, removeSeriesFromWatchlist, loading: seriesLoading} = useSeriesWatchlist();
    const [inWatchlist, setInWatchlist] = useState(contentEntry.inWatchlist);

    const onSuccessAdd = (response: any) => {
        console.log('Agrego a watchlist')
        setInWatchlist(true)
    }

    const onSuccessRemove = (response: any) => {
        console.log('Borro de watchlist')
        setInWatchlist(false)
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
        if (!inWatchlist) {
            addContentToWatchlist()
        } else {
            removeContentFromWatchlist()
        }
    }
    const loading = movieLoading || seriesLoading;
    return { onPress, inWatchlist, loading }
}
