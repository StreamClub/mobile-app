import React from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
import { Reco } from '../Types/Reco'
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage'
import { BodyText } from '../BasicComponents/BodyText'
import { IconWithText } from '../BasicComponents/IconWithText'
import { LocalIcon } from '../Types/LocalIcon'
import { colors } from '../../assets'
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router'
import { ContentType } from '../Types/ContentType'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { useWatchlistPress } from '../../hooks/useWatchlistPress'
import { ContentType as ContentTypeClass } from '../../entities/ContentType'

export type UserRecoPosterParams = {
    reco: Reco,
    index: number
}

export const UserRecoPoster = (params: UserRecoPosterParams) => {
    const { onPress } = useWatchlistPress( 
        { id: params.reco.id.toString(), inWatchlist: params.reco.inWatchlist},
        new ContentTypeClass(params.reco.type)
    )

    const { reco, index } = params
    const detailsLeyend = "Ver detalle"
    const genres = reco.genres ? reco.genres.slice(0, 3) : []
    const inWatchlistLogo = reco.inWatchlist ? LocalIcon.removeFromWatchlist : LocalIcon.addToWatchlist

    const onPressDetails = () => {

        const params: ContentDetailsParams = {
            id: reco.id.toString(),
        }

        if (reco.type === ContentType.Movie)
            router.push({ pathname: '/movie', params })  
        if (reco.type === ContentType.Series)
            router.push({ pathname: '/serie', params })
    }

    const onPressWatchlist = () => {
        onPress()
    }

    return (
        <View style={styles.posterContainer}>
            {/* Funcionalidad cancelada. No borrar. */}
            {/* <TmdbImage
                type={TmdbImageType.Cover}
                resource={logoPath}
                style={styles.serviceLogo}
            /> */}
            <Pressable style={styles.watchlistButtonContainer} onPress={onPressWatchlist}>
                <Image
                    source={inWatchlistLogo}
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
                <Pressable style={styles.playIconWithTextContainer} onPress={onPressDetails}>
                    <IconWithText
                        text={detailsLeyend}
                        textSize="small"
                        textType="title"
                        leftIcon={LocalIcon.play}
                        style={styles.playIconWithText}
                        iconStyle={styles.playIcon}
                        textStyle={{ width: undefined }}
                    />
                </Pressable>
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
    // Funcionalidad cancelada. No borrar.
    // serviceLogo: {
    //     height: 70,
    //     aspectRatio: 1,
    //     borderRadius: 15,
        
    //     position: "absolute",
    //     top: 10,
    //     right: 10,
    //     zIndex: 1,
    // },
})
