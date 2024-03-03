import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { colors } from '../../assets'
import { BodyText } from '../BasicComponents/BodyText'
import { TitleText } from '../BasicComponents/TitleText'
import {
    IconWithText,
    IconWithTextParams,
} from '../BasicComponents/IconWithText'
import { IconCollection } from '../BasicComponents/IconCollection'
import { formatDate } from '../../utils/dateManager'
import { getMediaFromExternalId } from '../../utils/socialMediaManager'
import { ExternalIds } from '../Types/ExternalId'
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage'
import { LocalIcon } from '../Types/LocalIcon'

const screenWidth = Dimensions.get('window').width

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
        icon: LocalIcon.birth,
        text: formatDate(params.birthDate),
        style: { marginBottom: 15 },
    }
    const deathDateParams: IconWithTextParams = {
        icon: LocalIcon.death,
        text: formatDate(params.deathDate),
        style: { marginBottom: 15 },
    }
    const birthPlaceParams: IconWithTextParams = {
        icon: LocalIcon.location,
        text: params.birthPlace,
    }

    const seeBioLeyend = 'Ver biografía'

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
                        fontWeight: 'bold',
                    }}
                />
                <View style={{ paddingTop: 20, flex: 1, width: '100%' }}>
                    {params.birthDate && <IconWithText {...birthDateParams} />}
                    {params.deathDate && <IconWithText {...deathDateParams} />}
                    {params.birthPlace && (
                        <IconWithText {...birthPlaceParams} />
                    )}
                    <BodyText
                        body={seeBioLeyend}
                        size="medium"
                        style={{
                            color: colors.primaryBlue,
                            fontWeight: 'bold',
                            marginLeft: 30,
                            marginTop: 10,
                            textDecorationLine: 'underline',
                        }}
                    />
                </View>
            </View>
            <View style={{ flex: 0.5 }}>
                <View style={styles.imageContainer}>
                    <TmdbImage
                        resource={params.poster}
                        type={TmdbImageType.Person}
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
