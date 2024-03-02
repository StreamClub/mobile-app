import React from 'react'
import { Pressable } from 'react-native'
import { colors } from '../../assets'
import { ContentEntry } from '../../entities/ContentListEntry'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'
import { useContentEntryPressed } from '../../hooks/useContentEntryPressed'
import { ContentType } from '../../entities/ContentType'
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage'

type ContentCoverProps = {
    contentEntry: ContentEntry
    contentType: ContentType
}

export const ContentCover = (params: ContentCoverProps) => {
    const coverOutlineStyle = {
        backgroundColor: params.contentEntry.available
            ? colors.secondaryBlue
            : 'transparent',
    }

    const { onPress } = useContentEntryPressed(
        params.contentEntry,
        params.contentType
    )

    return (
        <>
            <Pressable
                onPress={() => onPress()}
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                <TmdbImage
                    resource={params.contentEntry.poster}
                    type={TmdbImageType.Cover}
                    style={styles.coverImage}
                />
            </Pressable>
        </>
    )
}
