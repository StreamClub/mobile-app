import { useState } from 'react'
import { ContentEntry } from '../entities/ContentListEntry'
import { ContentType } from '../entities/ContentType'
import { markMovieAsSeen, unmarkMovieAsSeen } from '../apiCalls/movies'
import { useSession } from '../context/ctx'

export const useSeenPress = (contentEntry: ContentEntry, contentType: ContentType) => {
    const [loading, setLoading] = useState(false)
    const [seen, setSeen] = useState(contentEntry.inWatchlist)
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
        contentType.isMovie()
            ? markMovieAsSeen(
                  session,
                  contentEntry.id,
                  onSuccessAdd,
                  onFailure
              )
            : console.log("Es serie")
    }

    const unmarkContentAsSeen = () => {
        contentType.isMovie()
            ? unmarkMovieAsSeen(
                  session,
                  contentEntry.id,
                  onSuccessRemove,
                  onFailure
              )
            : console.log("Es serie")
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
