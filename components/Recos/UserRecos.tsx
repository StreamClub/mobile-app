import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { UserReco } from './UserReco'

export const UserRecos = () => {
    const { userRecos } = useAppSelector((state) => state.recos)
    
    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            {userRecos.map((reco, index) => (
                <UserReco reco={reco} index={index} key={index} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'flex-start',
    },
    poster: {
        width: "80%",
        aspectRatio: 791/1186,
        borderRadius: 15,
        margin: 10,
    },
    title: {
        alignSelf: 'center',
        flex: 0.5,
    },
})
