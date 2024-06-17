import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { Reco } from '../Types/Reco'
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage'
import { BodyText } from '../BasicComponents/BodyText'
import { ContentType } from '../Types/ContentType'
import { IconWithText } from '../BasicComponents/IconWithText'
import { LocalIcon } from '../Types/LocalIcon'
import { withBadge } from 'react-native-elements'

const screenHeigth = Dimensions.get("screen").height 

export type UserRecoParams = {
    reco: Reco
    index: number
}

export const UserReco = (params: UserRecoParams) => {
    const { reco, index } = params
    
    //TODO: contemplar caso services vacio
    const { logoPath } = reco.services[0]

    // revisar si el procesado se debe extraer a otro componente 
    const genres = reco.genres ? reco.genres.slice(0, 3) : []
    const type = reco.type === ContentType.Movie ? "Película" : "Serie"
    const duration = reco.duration ? reco.duration.toString() + " min" : "0 min"

    return (
        <View key={index} style={styles.container}>
            {/* <TmdbImage
                type={TmdbImageType.Cover}
                resource={logoPath}
                style={styles.serviceLogo}
            /> */}
            <TmdbImage
                type={TmdbImageType.Cover}
                resource={reco.poster}
                style={styles.poster}
            />
            
            {/* <BodyText body={genres.join(" \u2022 ")} size="medium" /> */}
            <IconWithText
                text={type}
                textSize="small"
                textType="title"
                leftIcon={LocalIcon.movie}
                style={styles.typeContainer}
                iconStyle={styles.typeIcon}
            />

            <IconWithText
                text={duration}
                textSize="small"
                textType="title"
                leftIcon={LocalIcon.clock}
                style={styles.durationContainer}
                iconStyle={styles.typeIcon}
                textStyle={{width: undefined, marginLeft: 10}}
            />
            {/* <View style={styles.durationContainer}/> */}

            {/* <BodyText body={duration + " min"} size="medium" /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    poster: {
        width: "90%",
        aspectRatio: 791/1186,
        borderRadius: 15,
        margin: 20,
    },
    serviceLogo: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
    },
    container: {
        height: screenHeigth * 0.65,
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "red",
        margin: 10,
        borderRadius: 15,
        position: "relative",
    },
    typeContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    typeIcon: {
        height: 20,
        aspectRatio: 1,
    },
    durationContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: undefined,
    },
})
