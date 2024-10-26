import React from 'react'
import { StyleSheet } from 'react-native'
import { Reco } from '../Types/Reco'
import { BodyText } from '../BasicComponents/BodyText'
import { LinearGradient } from 'expo-linear-gradient';
import { UserRecoFooter } from './UserRecoFooter'
import { UserRecoPoster } from './UserRecoPoster'

export type UserRecoParams = {
    reco: Reco
    index: number
}

export const UserReco = (params: UserRecoParams) => {
    const { reco, index } = params

    return (
        <LinearGradient
            colors={['#FFFFFF', '#6F757E']}
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
