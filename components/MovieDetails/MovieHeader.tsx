import React, { useState } from 'react'
import { Pressable, View, } from 'react-native'
import { handleMovieWatchlistPress } from '../../utils/handleWatchlistPress'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'
import { useSession } from '../../context/ctx'
import { styles } from './styles/MovieDetails.style'
import { SeenSection } from '../Content/SeenSection'
import { MovieDetail } from '../../entities/Details/MovieDetailEntry'
import { ContentType } from '../../entities/ContentType'

type MovieParams = {
    movie?: MovieDetail
}

export const MovieHeader = (params: MovieParams) => {
    const [loading, setLoading] = useState(false)
    const session = useSession()
    const movie = params.movie;
    const [inWatchlist, setInWatchlist] = useState(movie? movie.inWatchlist : false)
    const contentType = new ContentType('movie')
    console.log(movie?.seen);
    if (!movie){
        return null
    }
    return (
        <>
            <View style={{margin: 10}}>
                <SeenSection contentEntry={movie} contentType={contentType} />
            </View>
            <View style={{margin: 10}}>
                <Pressable
                    onPress={() => movie?
                        handleMovieWatchlistPress(
                            movie.id,
                            setLoading,
                            setInWatchlist,
                            inWatchlist,
                            session
                        ) : console.log("Movie not loaded")
                    }
                >
                    <WatchlistButton
                        iconStyle={styles.iconsStyle}
                        watchlistLoading={loading}
                        inWatchlist={inWatchlist}
                    />
                </Pressable>
            </View>
        </>
    )
}