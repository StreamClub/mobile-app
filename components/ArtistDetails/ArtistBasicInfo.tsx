import React from 'react'
import {
    View,
    Image,
    Pressable,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native'
import { colors } from '../../assets'
import { BodyText } from '../BasicComponents/BodyText'
import { TitleText } from '../BasicComponents/TitleText'
import { IconWithText, IconWithTextParams } from '../BasicComponents/IconWithText'
import { IconCollectionEntry } from '../Types/IconCollection'
import { IconCollection } from '../BasicComponents/IconCollection'
import { Icon } from 'react-native-paper'
import { formatDate, calculateAge } from '../../utils/dateManager'
import { ExternalIds } from '../Types/ExternalId'
import { TmdbImage } from '../BasicComponents/TmdbImage'
import { TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage'

const screenWidth = Dimensions.get('window').width

const getMediaFromExternalId = (externalIds: ExternalIds): IconCollectionEntry[] => {
    const medias: IconCollectionEntry[] = []
    if (externalIds.instagramId) {
        const link = 'https://www.instagram.com/' + externalIds.instagramId
        medias.push({ 
            icon: require('../../assets/icons/instagram.png'), 
            link: link 
        })
    }
    if (externalIds.twitterId) {
        const link = 'https://twitter.com/' + externalIds.twitterId
        medias.push({ 
            icon: require('../../assets/icons/twitter.png'), 
            link: link
        })
    }
    return medias
}

export type ArtistBasicInfoParams = {
    name: string
    poster: string
    birthDate: string
    birthPlace: string
    deathDate: string
    externalIds: ExternalIds
    style?: any
}

export const ArtistBasicInfo = (params: ArtistBasicInfoParams) => {
    const birthDateParams: IconWithTextParams = {
        icon: require('../../assets/icons/birth.png'),
        text: formatDate(params.birthDate),
        style: { marginBottom: 15 },
    }
    const deathDateParams: IconWithTextParams = {
        icon: require('../../assets/icons/death.png'),
        text: formatDate(params.deathDate),
        style: { marginBottom: 15 },
    }
    const birthPlaceParams: IconWithTextParams = {
        icon: require('../../assets/icons/location.png'),
        text: params.birthPlace,
    }

    const seeBioLeyend = "Ver biografía"

    const medias = getMediaFromExternalId(params.externalIds)

    return (
        <View style={[{ flexDirection: 'row' }, params.style]}>
            <View style={{ flex: 0.5, alignItems: 'center' }}>
                <TitleText
                    body={params.name}
                    size="big"
                    style={{
                        width: screenWidth / 2,
                        paddingLeft: 20,
                        marginBottom: 20,
                        fontWeight: "bold"
                    }}
                />
                <View style={{ paddingTop: 20, flex: 1 }}>
                    {params.birthDate && <IconWithText {...birthDateParams} />}
                    {params.deathDate && <IconWithText {...deathDateParams} />}
                    {params.birthPlace && (
                        <IconWithText {...birthPlaceParams} />
                    )}
                    <BodyText 
                        body={seeBioLeyend}
                        size="medium"
                        style={{color: colors.primaryBlue, fontWeight: "bold", marginLeft: 30, marginTop:10, textDecorationLine: 'underline',}}
                        
                    />
                </View>
            </View>
            <View style={{flex: 0.5}}>
            <View style={styles.imageContainer}>
                <TmdbImage
                    resource={params.poster}
                    type={TmdbImageType.Profile}
                    style={styles.image}
                />
            </View>
                {true && <IconCollection collection={medias} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.primaryGrey,
        borderWidth: 1,
    },
    imageContainer: {
        
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        borderRadius: 10,
        padding: 6,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
    },
})
