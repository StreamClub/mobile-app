import React from 'react'
import { View, StyleSheet, Dimensions, Text, Pressable, Image } from 'react-native'
import { Reco } from '../Types/Reco'
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage'
import { BodyText } from '../BasicComponents/BodyText'
import { ContentType } from '../Types/ContentType'
import { IconWithText } from '../BasicComponents/IconWithText'
import { LocalIcon } from '../Types/LocalIcon'
import { colors } from '../../assets'
import { LinearGradient } from 'expo-linear-gradient';
import { UserRecoFooter } from './UserRecoFooter'

export type UserRecoPosterParams = {
    reco: Reco,
    index: number
}

export const UserRecoPoster = (params: UserRecoPosterParams) => {
    const { reco, index } = params

    const detailsLeyend = "Ver detalle"
    const { logoPath } = reco.services[0]
    const genres = reco.genres ? reco.genres.slice(0, 3) : []

    return (
        <View style={styles.posterContainer}>
            <TmdbImage
                type={TmdbImageType.Cover}
                resource={logoPath}
                style={styles.serviceLogo}
            />
            <Pressable style={styles.watchlistButtonContainer}>
                <Image
                    source={LocalIcon.addToWatchlist}
                    style={styles.watchlistButton}
                />
            </Pressable>
            <TmdbImage
                type={TmdbImageType.Cover}
                resource={reco.poster}
                style={styles.poster}
            />
            <View style={styles.posterFooterContainer}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.1)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ width: "100%", alignItems: "center", paddingTop: 10 }}
                    key={index}
                >
                    <BodyText body={genres.join(" \u2022 ")} size="medium" style={{ fontWeight: "bold" }} />
                </LinearGradient>
                <View style={styles.playIconWithTextContainer}>
                    <IconWithText
                        text={detailsLeyend}
                        textSize="small"
                        textType="title"
                        leftIcon={LocalIcon.play}
                        style={styles.playIconWithText}
                        iconStyle={styles.playIcon}
                        textStyle={{ width: undefined }}
                    />
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    posterContainer: {
        position: "relative",
        marginTop: 5,
    },
    posterFooterContainer: {
        position: "absolute",
        bottom: -40,
        left: 0,
        width: "90%",
        alignItems: "center",
        
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    watchlistButtonContainer: {
        height: 80, 
        width: 80, 
        position: "absolute", 
        left: 0, 
        top: 0, 
        backgroundColor: colors.primaryRed, 
        zIndex: 2, 
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    watchlistButton: {
        height: 50,
        aspectRatio: 1,
    },
    playIconWithTextContainer: {
        width: "100%",
        backgroundColor: colors.primaryRed,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: "center",
    },
    playIconWithText: {
        borderRadius: 15,
        padding: 10,
        width: undefined
    },
    playIcon: {
        height: 20,
        aspectRatio: 1,
    },
    poster: {
        width: "90%",
        aspectRatio: 791/1186,
        borderRadius: 15,
        zIndex: 0,
    },
    serviceLogo: {
        height: 70,
        aspectRatio: 1,
        borderRadius: 15,
        
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
})
