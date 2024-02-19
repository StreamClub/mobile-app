import React from 'react'
import { View, Image, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { colors } from '../../assets'
import { ContentEntry } from '../../entities/ContentListEntry'
import { styles } from '../SeriesList/styles/SeriesList.style'

type ContentCoverProps = {
    contentEntry: ContentEntry
    onContentPress: (content: ContentEntry) => void
}

export const ContentCover = (params: ContentCoverProps) => {
    const coverOutlineStyle = {
        backgroundColor: params.contentEntry.available
            ? colors.secondaryBlue
            : 'transparent',
    }

    return (
        <>
            <Pressable
                onPress={() => params.onContentPress(params.contentEntry)}
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                {params.contentEntry.poster ? (
                    <Image
                        source={{
                            uri:
                                'https://image.tmdb.org/t/p/original' +
                                params.contentEntry.poster,
                        }}
                        style={styles.coverImage}
                        resizeMode="contain"
                    />
                ) : (
                    <View
                        style={[
                            styles.coverImage,
                            {
                                backgroundColor: colors.primarySkyBlue,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <Icon source="image-off-outline" size={70} />
                    </View>
                )}
            </Pressable>
        </>
    )
}
