import React from 'react'
import { View, Image, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { colors } from '../../assets'
import { ContentEntry } from '../../entities/ContentListEntry'
import { styles } from '../SeriesList/styles/SeriesList.style'
import { useContentEntryPressed } from '../../hooks/useContentEntryPressed'
import { ContentType } from '../../entities/ContentType'

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
