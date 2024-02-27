import React, { useState } from 'react'
import { Pressable, View, } from 'react-native'
import { handleSeriesWatchlistPress } from '../../utils/handleWatchlistPress'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'
import { useSession } from '../../context/ctx'
import { styles } from './styles/SeriesDetails.styles'
import { SeenSection } from '../Content/SeenSection'
import { ContentType } from '../../entities/ContentType'
import { SeriesDetail } from '../../entities/Details/Series/SeriesDetailEntry'

type SeriesHeaderParams = {
    series?: SeriesDetail
}

export const SeriesHeader = (params: SeriesHeaderParams) => {
    const [loading, setLoading] = useState(false)
    const session = useSession()
    const series = params.series;
    const [inWatchlist, setInWatchlist] = useState(series? series.inWatchlist : false)
    const contentType = new ContentType('series')
    if (!series){
        return null
    }
    return (
        <>
            <View style={{margin: 10}}>
                <SeenSection seenState={series.seen} contentId={series.id} contentType={contentType} />
            </View>
            <View style={{margin: 10}}>
                <Pressable
                    onPress={() => 
                        handleSeriesWatchlistPress(
                            series.id,
                            setLoading,
                            setInWatchlist,
                            inWatchlist,
                            session
                        )
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