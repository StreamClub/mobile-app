import React from 'react'
import { View } from 'react-native'
import { ContentScore } from '../Content/ContentScore'
import { SeenSection } from '../Content/SeenSection'
import { ContentEntry } from '../../entities/ContentListEntry'
import { WatchlistSection } from '../Content/WatchlistSection'
import { ContentType } from '../../entities/ContentType'
import { styles } from './styles/Content.styles'

type BottomSectionProps = {
    contentEntry: ContentEntry
    scoreFormatted: string
    contentType: ContentType
}

export const BottomSection = (params: BottomSectionProps) => {
    const { contentEntry, scoreFormatted, contentType } = params
    return (
        <>
            <View style={{ flex: 0.25, flexDirection: 'row', width: '100%' }}>
                <ContentScore score={scoreFormatted} />
                <View style={styles.iconContainer}>
                    <SeenSection seenState={contentEntry.seen} contentId={contentEntry.id} contentType={contentType} />
                </View>

                <WatchlistSection
                    contentEntry={contentEntry}
                    contentType={contentType}
                />
            </View>
        </>
    )
}
