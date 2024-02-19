import React from 'react'
import { ScrollView, View, Image, StyleSheet, Pressable, ImageSourcePropType, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-paper';
import { BodyText } from './BasicComponents/BodyText'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets/styles/colors'
import { formatDate, calculateAge } from './dateFunctions'

const MAX_NAME_LENGHT = 45

export type ArtistEntry = {
    id: string,
    name: string,
    poster: string,
    birthDate: string,
    birthPlace: string,
    deathDate: string,
    gender: string,
}

export type ArtistListCallbacks = {
    onArtistPress: (artist: ArtistEntry) => void;
}

type ArtistListProps = {
    artistList: ArtistEntry[],
    callbacks: ArtistListCallbacks,
}

export const ArtistList = (params: ArtistListProps) => {
    const artistList = params.artistList

    // Callbacks calls
    // ------------------------------------------------------------
    const onArtistPress = (artistEntry: ArtistEntry) => {
        params.callbacks.onArtistPress(artistEntry)
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
                <View style={{height: 1, backgroundColor: 'black', width: '90%', marginBottom: 10, alignSelf: 'center'}}></View>
            </View>
        )
    }

    const renderCoverSection = (artistEntry: ArtistEntry) => {
        return (
            <Pressable
                onPress={() => onArtistPress(artistEntry)}
                style={styles.imageContainer}
            >
                {artistEntry.poster?
                    <Image
                        source={{ uri: "https://image.tmdb.org/t/p/original" + artistEntry.poster }}
                        style={styles.coverImage}
                        resizeMode="contain"
                    /> :
                    <View style={[styles.coverImage, {backgroundColor: colors.primarySkyBlue, alignItems: 'center', justifyContent: 'center'}]}>
                        <Icon source="account" size={70}/>
                    </View>
                }
            </Pressable>
        )
    }

    const renderDetailsSection = (artistEntry: ArtistEntry) => {
        let artistName = artistEntry.name
        if (artistEntry.name.length > MAX_NAME_LENGHT) {
            artistName = artistEntry.name.slice(0, MAX_NAME_LENGHT).trim() + '...'
        }

        const noInformationAvailable = artistEntry.birthDate === null && artistEntry.deathDate === null && artistEntry.birthPlace === null

        return (
            <Pressable onPress={() => onArtistPress(artistEntry)} style={styles.detailsContainer}>
                {renderName(artistName)}

                {noInformationAvailable?
                    <View style={styles.infoContainer}>
                        <BodyText body="Sin información disponible" size='big' fontStyle='italic' color={colors.secondaryBlue} />
                    </View>
                    :
                    renderDetails(artistEntry)}
            </Pressable>
        )
    }

    const renderName = (name: string) => {
        return (
            <View style={{ flex: 0.3 }}>
                <TitleText body={name} size='small' numberOfLines={2}/>
            </View>
        )
    }

    const renderDetails = (artistEntry: ArtistEntry) => {
        const birthDateIcon = require('../assets/icons/birth.png')
        const birthPlaceIcon = require('../assets/icons/location.png')
        const deathDateIcon = require('../assets/icons/death.png')

        let birthDate = formatDate(artistEntry.birthDate)
        let deathDate = formatDate(artistEntry.deathDate)

        if (artistEntry.deathDate) {
            deathDate += " (" + calculateAge(artistEntry.birthDate, artistEntry.deathDate) + " años)"
        } else {
            birthDate += " (" + calculateAge(artistEntry.birthDate) + " años)"
        }

        

        return (
            <View style={styles.infoContainer}>
                {artistEntry.birthDate &&
                    <View style={{flexDirection: 'row', marginBottom: 5, alignItems: 'center'}}>
                        <Image
                            source={birthDateIcon}
                            style={styles.birthDateIconStyle}
                        />
                        <BodyText body={birthDate} size='medium' fontStyle='italic' color={colors.secondaryBlue} style={{paddingTop: 5, paddingLeft: 4}} />
                    </View>
                }
                {artistEntry.deathDate &&
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                        <Image
                            source={deathDateIcon}
                            style={styles.deathDateIconStyle}
                        />
                        <BodyText body={deathDate} size='medium' fontStyle='italic' color={colors.secondaryBlue} style={{paddingTop: 3, paddingLeft: 4}}/>
                    </View>
                }
                {artistEntry.birthPlace &&
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                        <Image
                            source={birthPlaceIcon}
                            style={styles.birthPlaceIconStyle}
                        />
                        <BodyText body={artistEntry.birthPlace} size='medium' fontStyle='italic' color={colors.secondaryBlue} style={{paddingTop: 3, paddingLeft: 4, width:175}} />
                    </View>
                }
            </View>
        )
    }

    // ------------------------------------------------------------

    return (
        <ScrollView
            style={styles.artistListContainer}
        >
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
        aspectRatio: 1
    },
    birthDateIconStyle: {
        width: 25,
        aspectRatio: 487 / 512
    },
    birthPlaceIconStyle: {
        width: 25,
        aspectRatio: 512 / 512
    },
    deathDateIconStyle: {
        width: 25,
        aspectRatio: 512 / 512
    },
    scoreContainer: { 
        flex: 0.4, 
        justifyContent: 'center' 
    },
    iconContainer: { 
        flex: 0.20, 
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
    infoContainer: { 
        flex: 0.7, 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    }
})