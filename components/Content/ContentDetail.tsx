import React from 'react'
import { Pressable } from 'react-native'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { formatScore } from '../../utils'
import { BottomSection } from '../Content/BottomSection'
import { ContentType } from '../../entities/ContentType'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { ContentEntry } from '../../entities/ContentListEntry'
import { SeriesBody } from '../SeriesList/SeriesBody'
import { MovieBody } from '../Movie/MovieBody'
import { MovieEntry } from '../MovieList'
import { ContentListCallbacks } from './ContentListCallbacks'

type ContentDetailProps = {
    contentEntry: ContentEntry
    callbacks: ContentListCallbacks
    contentType: ContentType
}

export const ContentDetail = (params: ContentDetailProps) => {
    const { contentEntry, callbacks, contentType } = params

    const onPress = (serieEntry: ContentEntry) => {
        params.callbacks.onContentPress(serieEntry)
    }

    return (
        <>
            <Pressable
                onPress={() => onPress(contentEntry)}
                style={styles.detailsContainer}
            >
                {contentType.isSeries() ? (
                    <>
                        <SeriesBody
                            serieEntry={contentEntry as SeriesEntry}
                            callbacks={callbacks}
                        />
                    </>
                ) : (
                    <>
                        <MovieBody movieEntry={contentEntry as MovieEntry} />
                    </>
                )}

                <BottomSection
                    contentEntry={contentEntry}
                    scoreFormatted={formatScore(contentEntry.score)}
                    onSeenPress={callbacks.onSeenPress}
                    onWatchlistPress={callbacks.onWatchlistPress}
                />
            </Pressable>
        </>
    )
}
