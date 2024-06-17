import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Reco } from '../Types/Reco'
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage'
import { BodyText } from '../BasicComponents/BodyText'
import { ContentType } from '../Types/ContentType'

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
    const duration = reco.duration ? reco.duration : 0

    return (
        <View key={index}>
            <TmdbImage
                type={TmdbImageType.Cover}
                resource={logoPath}
                style={styles.serviceLogo}
            />
            <TmdbImage
                type={TmdbImageType.Cover}
                resource={reco.poster}
                style={styles.poster}
            />
            {/* <Genres genres={reco.genres}/> */}
            <BodyText body={genres.join(" \u2022 ")} size="medium" />
            <BodyText body={type} size="medium" />
            <BodyText body={duration + " min"} size="medium" />
            
        </View>
    )
}



const styles = StyleSheet.create({
    poster: {
        width: "80%",
        aspectRatio: 791/1186,
        borderRadius: 15,
        margin: 10,
    },
    serviceLogo: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
    },
})
