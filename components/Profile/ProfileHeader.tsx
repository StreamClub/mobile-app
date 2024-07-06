import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';
import { ProfilePicture } from './ProfilePicture';
import { IconWithText, IconWithTextParams } from '../BasicComponents/IconWithText';
import { LocalIcon } from '../Types/LocalIcon';
import { ProfileLevel, ProfileLevelParams } from './ProfileLevel';
import { ProfileDisplayName } from './ProfileDisplayName';
import { FriendRequestButton, FriendRequestType, FriendshipType } from './Friends/FriendRequestButton';
import { router } from 'expo-router';

export type ProfileHeaderParams = {
    id: number,
    email: string,
    userName: string,
    displayName: string,
    friendsCount: number,
    reviewsCount: number,
    editable: boolean,
    level: ProfileLevelParams,
    friendRequest: FriendRequestType | null,
    friendship: FriendshipType | null,
    photoId: number
}

export const ProfileHeader = (params: ProfileHeaderParams) => {
    const emailParams: IconWithTextParams = {
        leftIcon: LocalIcon.email,
        text: params.email,
    }

    return(
        <View style={containerStyles.container}>
            <View style={containerStyles.pictureAndDetailsSection}>
                <View style={containerStyles.picture}>
                    <ProfilePicture photoId={params.photoId} style={styles.picture} editable={params.editable} />
                </View>
                <View style={containerStyles.details}>
                    <View style={containerStyles.metric}>
                        <Pressable onPress={() => router.push({ pathname: '/friends' })} >
                            <BodyText size={"big"} body={params.friendsCount.toString()} style={styles.metricNumber}/>
                            <BodyText size={"big"} body={"Amigos"} style={styles.metricText}/>                            
                        </Pressable>
                    </View>
                    {params.editable?
                        null : 
                        <FriendRequestButton 
                            userId={params.id.toString()}
                            friendRequest={params.friendRequest}
                            friendship={params.friendship} />
                    }
                    <ProfileLevel {...params.level} />
                </View>
            </View>
            <View style={containerStyles.email}>
                <IconWithText {...emailParams} />
            </View>
            <ProfileDisplayName displayName={params.displayName} editable={params.editable} />
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
        flex: 0.7,
        alignItems: "center",
        justifyContent: "center"
    },
    details: {
        flex: 0.6,
        alignItems: "center",
        justifyContent: "center",
    },
    metric: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    email: {
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
    metricNumber: {
        textAlign: "center"
    },
    metricText: {
        textAlign: "center",
        fontWeight: "bold",
    },
    mailText: {
        textAlign: "center",
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 3,
    }
})