import React from 'react'
import { View } from 'react-native'
import { MoviesSeenSection } from './MoviesSeenSection'
import { ContentEntry } from '../../entities/ContentEntry'
import { WatchlistSection } from '../Content/WatchlistSection'
import { ContentType } from '../../entities/ContentType'
import { styles } from './styles/Content.styles'
import { SeriesSeenSection } from './SeriesSeenSection'

type BottomSectionProps = {
    contentEntry: ContentEntry
    contentType: ContentType
}

export const BottomSection = (params: BottomSectionProps) => {
    const { contentEntry, contentType } = params

    

    return (
        <>
            <View style={{ flex: 0.25, flexDirection: 'row', width: '100%' }}>
                <View style={styles.iconContainer}>
                    {
                        contentType.isSeries() ?
                            <SeriesSeenSection
                                seenState={contentEntry.seen}
                                seriesId={contentEntry.id}
                            />

                            : contentType.isMovie() ?
                                <MoviesSeenSection
                                    seenState={contentEntry.seen}
                                    movieId={contentEntry.id}
                                />
                                : null
                    }
                </View>

                <WatchlistSection
                    contentEntry={contentEntry}
                    contentType={contentType}
                />
            </View>
        </>
    )
}
