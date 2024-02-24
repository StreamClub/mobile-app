import React from 'react'
import { View } from 'react-native'
import { ContentScore } from '../Content/ContentScore'
import { SeenSection } from '../Content/SeenSection'
import { ContentEntry } from '../../entities/ContentListEntry'
import { WatchlistSection } from '../Content/WatchlistSection'
import { ContentType } from '../../entities/ContentType'

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

                <SeenSection contentEntry={contentEntry} contentType={contentType} />

                <WatchlistSection
                    contentEntry={contentEntry}
                    contentType={contentType}
                />
            </View>
        </>
    )
}
