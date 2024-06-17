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
    const playLeyend = "Ver ahora"

    return (
        <LinearGradient
            colors={['#FFFFFF', '#9FA125']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
            key={index}
        >
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
                        colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)','rgba(255, 255, 255, 0.1)']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={{width: "100%", alignItems: "center", paddingTop: 10}}
                        key={index}
                    >
                        <BodyText body={genres.join(" \u2022 ")} size="medium" style={{fontWeight: "bold"}}/>
                    </LinearGradient>
                    <View style={styles.playIconWithTextContainer}>
                        <IconWithText
                            text={playLeyend}
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
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    posterContainer: {
        position: "relative",
        marginTop: 15,
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
    container: {
        height: screenHeigth * 0.7,
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
