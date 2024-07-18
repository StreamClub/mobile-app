import React from 'react'
import { BodyText } from './BasicComponents/BodyText'
import { View, Image, StyleSheet, ScrollView, Pressable } from 'react-native'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets'
import { Icon } from 'react-native-paper'
import { router } from 'expo-router'
import { MovieDetailsParams } from '../app/(app)/movie'
import { ContentDetailsParams } from '../apiCalls/params/content/ContentDetailsParams'

export type Content = {
    title: string
    posterPath: string
    releaseDate: Date
    id: number
}

type RecommendsParams = {
    contents: Array<Content>,
    style: object,
    title: string,
    contentType: 'movie' | 'series'
}

export const RecommendsList = (params: RecommendsParams) => {
    const onMovieRecommendPress = (movie: Content) => {
        const newParams: MovieDetailsParams = {
            id: movie.id.toString(),
        }
        router.replace({ pathname: '/movie', params: newParams })
    }

    const onSeriesRecommendPress = (series: Content) => {
        const newParams: ContentDetailsParams = {
            id: series.id.toString(),
        }
        router.replace({ pathname: '/serie', params: newParams })
    }

    return (
        <View style={params.style}>
            <TitleText body={params.title} style={{ fontWeight: 'bold' }} />
            <ScrollView horizontal>
                {params.contents.map((content, index) => (
                    <Pressable
                    onPress={() => params.contentType == 'movie'?
                        onMovieRecommendPress(content) :
                        onSeriesRecommendPress(content)
                    }
                        key={index}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                width: 110,
                                margin: 5,
                            }}
                        >
                            {content.posterPath ? (
                                <Image
                                    source={{
                                        uri:
                                            'https://image.tmdb.org/t/p/original' +
                                            content.posterPath,
                                    }}
                                    style={styles.photo}
                                />
                            ) : (
                                <View
                                    style={[
                                        styles.photo,
                                        {
                                            backgroundColor:
                                                colors.primarySkyBlue,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        },
                                    ]}
                                >
                                    <Icon
                                        source="image-off-outline"
                                        size={90}
                                    />
                                </View>
                            )}
                            <BodyText body={content.title} numberOfLines={2} />
                            <BodyText
                                body={content.releaseDate
                                    .getFullYear()
                                    .toString()}
                                numberOfLines={2}
                                style={{ fontWeight: 'bold' }}
                                color={colors.primaryGrey}
                            />
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    photo: {
        height: 180,
        width: 110,
        borderRadius: 10,
    },
})
