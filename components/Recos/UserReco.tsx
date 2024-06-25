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
import { UserRecoPoster } from './UserRecoPoster'

const screenHeigth = Dimensions.get("screen").height 

export type UserRecoParams = {
    reco: Reco
    index: number
}

export const UserReco = (params: UserRecoParams) => {
    const { reco, index } = params
    
    //TODO: contemplar caso services vacio
    const { logoPath } = reco.services[0]

    return (
        <LinearGradient
            colors={['#FFFFFF', '#9FA125']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <BodyText body={reco.title} size="small" style={styles.title}/>
            <UserRecoPoster reco={reco} index={index} />
            <UserRecoFooter reco={reco}/>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginTop: 5,
    },
    container: {
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "red",
        margin: 10,
        borderRadius: 15,
        position: "relative",
    },
})
