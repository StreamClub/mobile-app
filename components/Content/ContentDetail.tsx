import React from 'react'
import { Pressable } from 'react-native'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { BottomSection } from '../Content/BottomSection'
import { ContentType } from '../../entities/ContentType'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { ContentEntry } from '../../entities/ContentEntry'
import { SeriesBody } from '../Series/SeriesList/SeriesBody'
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
                />
            </Pressable>
        </>
    )
}
