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
import { useContentEntryPressed } from '../../hooks/useContentEntryPressed'
import { MovieEntry } from '../../entities/MovieListEntry'

type ContentDetailProps = {
    contentEntry: ContentEntry
    contentType: ContentType
}

export const ContentDetail = (params: ContentDetailProps) => {
    const { contentEntry, contentType } = params

    const { onPress } = useContentEntryPressed(contentEntry, contentType)

    return (
        <>
            <Pressable
                onPress={() => onPress()}
                style={styles.detailsContainer}
            >
                {contentType.isSeries() ? (
                    <>
                        <SeriesBody serieEntry={contentEntry as SeriesEntry} />
                    </>
                ) : (
                    <>
                        <MovieBody movieEntry={contentEntry as MovieEntry} />
                    </>
                )}

                <BottomSection
                    contentEntry={contentEntry}
                    contentType={contentType}
                    scoreFormatted={formatScore(contentEntry.score)}
                />
            </Pressable>
        </>
    )
}
