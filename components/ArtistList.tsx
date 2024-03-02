import React from 'react'
import { ScrollView, View, Image, StyleSheet, Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { BodyText } from './BasicComponents/BodyText'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets/styles/colors'
import { formatDate, calculateAge } from '../utils/dateManager'
import {
    IconWithText,
    IconWithTextParams,
} from './BasicComponents/IconWithText'
import { LocalIcon } from './Types/LocalIcon'
import { ArtistEntry } from '../entities/ArtistListEntry'
import { MAX_NAME_LENGTH } from '../constants'
import { ArtistDetailsParams } from '../apiCalls/params/content/ArtistDetailParams'
import { router } from 'expo-router'

type ArtistListProps = {
    artistList: ArtistEntry[]
}

export const ArtistList = (params: ArtistListProps) => {
    const artistList = params.artistList

    // Callbacks calls
    // ------------------------------------------------------------
    const onArtistPress = (artist: any) => {
        console.log(artist.name + ' pressed')

        const params: ArtistDetailsParams = {
            id: artist.id,
        }

        router.push({ pathname: '/artist', params })
    }

    // ------------------------------------------------------------

    // Render functions
    // ------------------------------------------------------------
    const renderArtistEntry = (artistEntry: ArtistEntry, index: number) => {
        return (
            <View key={index}>
                <View style={styles.artistEntryContainer}>
                    {renderCoverSection(artistEntry)}

                    {renderDetailsSection(artistEntry)}
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

    const renderCoverSection = (artistEntry: ArtistEntry) => {
        return (
            <Pressable
                onPress={() => onArtistPress(artistEntry)}
                style={styles.imageContainer}
            >
                {artistEntry.poster ? (
                    <Image
                        source={{
                            uri:
                                'https://image.tmdb.org/t/p/original' +
                                artistEntry.poster,
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
                        <Icon source="account" size={70} />
                    </View>
                )}
            </Pressable>
        )
    }

    const renderDetailsSection = (artistEntry: ArtistEntry) => {
        let artistName = artistEntry.name
        if (artistEntry.name.length > MAX_NAME_LENGTH) {
            artistName =
                artistEntry.name.slice(0, MAX_NAME_LENGTH).trim() + '...'
        }

        const noInformationAvailable =
            artistEntry.birthDate === null &&
            artistEntry.deathDate === null &&
            artistEntry.birthPlace === null

        return (
            <Pressable
                onPress={() => onArtistPress(artistEntry)}
                style={styles.detailsContainer}
            >
                {renderName(artistName)}

                {noInformationAvailable ? (
                    <View style={styles.infoContainer}>
                        <BodyText
                            body="Sin información disponible"
                            size="big"
                            fontStyle="italic"
                            color={colors.secondaryBlue}
                        />
                    </View>
                ) : (
                    renderDetails(artistEntry)
                )}
            </Pressable>
        )
    }

    const renderName = (name: string) => {
        return (
            <View style={styles.nameContainer}>
                <TitleText body={name} size="small" numberOfLines={2} />
            </View>
        )
    }

    const renderDetails = (artistEntry: ArtistEntry) => {
        let birthDate = formatDate(artistEntry.birthDate)
        let deathDate = formatDate(artistEntry.deathDate)

        if (artistEntry.deathDate) {
            deathDate +=
                ' (' +
                calculateAge(artistEntry.birthDate, artistEntry.deathDate) +
                ' años)'
        } else {
            birthDate += ' (' + calculateAge(artistEntry.birthDate) + ' años)'
        }

        const birthDateParams: IconWithTextParams = {
            icon: LocalIcon.birth,
            text: birthDate,
        }
        const deathDateParams: IconWithTextParams = {
            icon: LocalIcon.death,
            text: deathDate,
        }
        const birthPlaceParams: IconWithTextParams = {
            icon: LocalIcon.location,
            text: artistEntry.birthPlace,
        }

        return (
            <View style={styles.infoContainer}>
                {artistEntry.birthDate && <IconWithText {...birthDateParams} />}
                {artistEntry.deathDate && <IconWithText {...deathDateParams} />}
                {artistEntry.birthPlace && (
                    <IconWithText {...birthPlaceParams} />
                )}
            </View>
        )
    }

    // ------------------------------------------------------------

    return (
        <ScrollView style={styles.artistListContainer}>
            {artistList.map(renderArtistEntry)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    artistListContainer: {
        width: '97%',
        marginTop: 10,
    },
    artistEntryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 200,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 10,
        padding: 6,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
    },
    detailsContainer: {
        flex: 0.65,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 3,
        marginLeft: 10,
    },
    logoContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: 60,
        aspectRatio: 1,
    },
    birthDateIconStyle: {
        width: 25,
        aspectRatio: 487 / 512,
    },
    birthPlaceIconStyle: {
        width: 25,
        aspectRatio: 512 / 512,
    },
    deathDateIconStyle: {
        width: 25,
        aspectRatio: 512 / 512,
    },
    scoreContainer: {
        flex: 0.4,
        justifyContent: 'center',
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    nameContainer: {
        flex: 0.3,
    },
    infoContainer: {
        flex: 0.7,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
})
