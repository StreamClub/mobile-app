import React from "react"
import { ContentType } from "../Types/ContentType"
import { LocalIcon } from "../Types/LocalIcon"
import { Reco } from "../Types/Reco"
import { IconWithText } from "../BasicComponents/IconWithText"
import { View, StyleSheet } from "react-native"

export type UserRecoFooterParams = {
    reco: Reco
}

export const UserRecoFooter = (params: UserRecoFooterParams) => {
    const reco = params.reco

    const type = reco.type === ContentType.Movie ? "Película" : "Serie"
    const durationUnit = reco.type === ContentType.Movie ? " min" : " temporada" + (reco.duration && reco.duration > 1 ? "s" : "")
    const durationIcon = reco.type === ContentType.Movie ? LocalIcon.clock : undefined
    const duration = reco.duration ? reco.duration.toString() + durationUnit : ""
    
    return (
        <View style={{ position: 'relative', width: '100%', height: 120}}>
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
                leftIcon={durationIcon}
                style={styles.durationContainer}
                iconStyle={styles.typeIcon}
                textStyle={{width: undefined, marginLeft: 10}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    typeContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    durationContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: undefined,
    },
    typeIcon: {
        height: 20,
        aspectRatio: 1,
    },
})