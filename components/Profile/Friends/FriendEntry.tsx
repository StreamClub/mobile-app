import React from "react";
import { Pressable, View } from "react-native";
import { ProfilePicture } from "../ProfilePicture";
import { TitleText } from "../../BasicComponents/TitleText";
import { BodyText } from "../../BasicComponents/BodyText";
import { router } from "expo-router";
import { UserProfileParams } from "../../../app/(app)/userProfile";

export type FriendType = {
  id: number,
  email: string,
  userName: string,
  displayName: string,
  userId: number
}

export const FriendEntry = (params: FriendType) => {
  const onFriendPress = () => {
    const routeParams: UserProfileParams = {userId: params.userId.toString()} 
    router.push({ pathname: '/userProfile', params: routeParams })
  }

  return(
    <Pressable onPress={onFriendPress} >
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
        {/* Hardcodeada la foto de perfil xq no la recibo desde el back */}
        <ProfilePicture photoId={11} style={{borderRadius: 80, width: 70, height: 70}}/>
        <View style={{flexDirection: 'column', marginLeft: 20, flex: 0.9}}>
          <TitleText body={params.displayName} numberOfLines={1} />
          <BodyText body={params.email} numberOfLines={1} />
        </View>
      </View>
      <View
        style={{
            height: 1,
            backgroundColor: 'black',
            width: '90%',
            marginBottom: 10,
            alignSelf: 'center',
        }}
      ></View> 
    </Pressable>
  )
}