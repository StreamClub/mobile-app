import React from 'react'
import { View, StyleSheet } from 'react-native';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { ProfilePicture } from './ProfilePicture';
import { IconWithText, IconWithTextParams } from '../BasicComponents/IconWithText';
import { LocalIcon } from '../Types/LocalIcon';
export type ProfileHeaderParams = {
    id: number,
    email: string,
    userName: string,
    displayName: string,
    friendsCount: number,
    reviewsCount: number
}

export const ProfileHeader = (params: ProfileHeaderParams) => {
    const emailParams: IconWithTextParams = {
        leftIcon: LocalIcon.email,
        text: params.email,
    }

    const displayNameParams: IconWithTextParams = {
        rightIcon: LocalIcon.edit,
        text: params.displayName,
        textType: "title",
        textSize: "big",
        textStyle: styles.displayName,
        iconStyle: styles.iconStyle,
        onPressIcon: () => console.log("Edit pressed"),
        iconContainerStyle: styles.iconContainerStyle,
    }
    return(
        <View style={containerStyles.container}>
            <View style={containerStyles.pictureAndDetailsSection}>
                <View style={containerStyles.picture}>
                    <ProfilePicture style={styles.picture}/>
                </View>
                <View style={containerStyles.details}>
                    <View style={containerStyles.friendsAndReviews}>
                        <View style={containerStyles.metric}>
                            <BodyText size={"big"} body={params.friendsCount.toString()} style={styles.metricNumber}/>
                            <BodyText size={"big"} body={"Amigos"} style={styles.metricText}/>                            
                        </View>
                        <View style={containerStyles.metric}>
                            <BodyText size={"big"} body={params.reviewsCount.toString()} style={styles.metricNumber}/>
                            <BodyText size={"big"} body={"Opiniones"} style={styles.metricText}/>                            
                        </View>
                    </View>
                    <View style={containerStyles.email}>
                        <IconWithText {...emailParams} />
                    </View>
                </View>
            </View>
            <IconWithText {...displayNameParams} />
            <View style={styles.horizontalLine}/>
        </View>
    )
}

const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 5,
    },
    pictureAndDetailsSection: {
        flex: 1,
        flexDirection: "row",
    },
    picture: {
        flex: 0.4,
        alignItems: "center",
        justifyContent: "center",
    },
    details: {
        flex: 0.6,
    },
    friendsAndReviews: {
        flex: 0.6,
        flexDirection: "row",
    },
    metric: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    email: {
        flex: 0.4,
        alignItems: "flex-start",
        justifyContent: "center",
        margin: 10,
    },
})

const styles = StyleSheet.create({
    picture: {
        borderRadius: 80,
        width: 150,
        height: 150,
    },
    displayName: {
        fontWeight: "bold",
        marginLeft: 20,
        flexGrow: 1,
    },
    metricNumber: {
        textAlign: "center",
    },
    metricText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    mailText: {
        textAlign: "center",
    },
    horizontalLine: {
        width: "95%", 
        alignSelf: 'center', 
        height: 1, 
        backgroundColor: "black", 
        borderRadius: 100,
        marginTop: 4,
    },
    iconStyle: {
        height: 25,
        aspectRatio: 1,
        marginRight: 15,
    },
    iconContainerStyle: {
        alignSelf: "flex-end",
    },
})