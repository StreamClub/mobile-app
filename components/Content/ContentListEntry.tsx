import React from 'react'
import { View } from 'react-native'
import { ContentCover } from '../Content/ContentCover'
import { ContentEntry } from '../../entities/ContentListEntry'
import { ContentDetail } from '../Content/ContentDetail'
import { ContentListCallbacks } from '../Content/ContentListCallbacks'
import { ContentType } from '../../entities/ContentType'
import { styles } from '../SeriesList/styles/SeriesList.style'

type ContentListEntryProps = {
    contentEntry: ContentEntry
    onSeriePress: (serieEntry: ContentEntry) => void
    callbacks: ContentListCallbacks
    contentType: ContentType
}

export const ContentListEntry = (params: ContentListEntryProps) => {
    const { contentEntry, onSeriePress, contentType } = params

    return (
        <View>
            <View style={styles.serieEntryContainer}>
                <ContentCover
                    contentEntry={contentEntry}
                    onContentPress={onSeriePress}
                />
                <ContentDetail
                    contentEntry={contentEntry}
                    callbacks={params.callbacks}
                    contentType={contentType}
                />
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: '90%',
                    marginBottom: 10,
                    alignSelf: 'center',
                }}
            ></View>
        </View>
    )
}
