import React from 'react'
import { View } from 'react-native'
import { ContentCover } from '../Content/ContentCover'
import { ContentEntry } from '../../entities/ContentListEntry'
import { ContentDetail } from '../Content/ContentDetail'
import { ContentType } from '../../entities/ContentType'
import { styles } from '../Series/SeriesList/styles/SeriesList.style'

type ContentListEntryProps = {
    contentEntry: ContentEntry
    contentType: ContentType
}

export const ContentListEntry = (params: ContentListEntryProps) => {
    const { contentEntry, contentType } = params

    return (
        <View>
            <View style={styles.serieEntryContainer}>
                <ContentCover
                    contentEntry={contentEntry}
                    contentType={contentType}
                />
                <ContentDetail
                    contentEntry={contentEntry}
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
