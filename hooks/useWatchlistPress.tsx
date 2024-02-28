import {
    addMovieToWatchlist,
    removeMovieFromWatchlist,
} from '../apiCalls/movies'
import { useSession } from '../context/ctx'
import { useState } from 'react'
import { ContentType } from '../entities/ContentType'
import {
    addSeriesToWatchlist,
    removeSeriesFromWatchlist,
} from '../apiCalls/series'
import { Content } from '../entities/Content'

export const useWatchlistPress = (
    contentEntry: Content,
    contentType: ContentType
) => {
    const [inWatchlist, setInWatchlist] = useState(contentEntry.inWatchlist)
    const [loading, setLoading] = useState(false)

    const onSuccessAdd = (response: any) => {
        console.log('Agrego a watchlist')
        setInWatchlist(true)
        setLoading(false)
    }

    const onSuccessRemove = (response: any) => {
        console.log('Borro de watchlist')
        setInWatchlist(false)
        setLoading(false)
    }

    const onFailure = (error: any) => {
        console.log(error)
        console.log(error.message)
        setLoading(false)
    }

    const session = useSession()

    const addContentToWatchlist = () => {
        contentType.isMovie()
            ? addMovieToWatchlist(
                  session,
                  contentEntry.id,
                  onSuccessAdd,
                  onFailure
              )
            : addSeriesToWatchlist(
                  session,
                  contentEntry.id,
                  onSuccessAdd,
                  onFailure
              )
    }

    const removeContentFromWatchlist = () => {
        contentType.isMovie()
            ? removeMovieFromWatchlist(
                  session,
                  contentEntry.id,
                  onSuccessRemove,
                  onFailure
              )
            : removeSeriesFromWatchlist(
                  session,
                  contentEntry.id,
                  onSuccessRemove,
                  onFailure
              )
    }

    const onPress = () => {
        if (loading) return
        if (!inWatchlist) {
            addContentToWatchlist()
        } else {
            removeContentFromWatchlist()
        }
        setLoading(true)
    }

    return { onPress, inWatchlist, loading }
}
