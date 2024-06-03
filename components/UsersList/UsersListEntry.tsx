import React from "react";
import { UserEntry } from "../../entities/UsersListEntry";
import { BodyText } from "../BasicComponents/BodyText";
import { Pressable, View } from "react-native";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { TitleText } from "../BasicComponents/TitleText";
import { router } from "expo-router";
import { UserProfileParams } from "../../app/(app)/userProfile";

type UsersListEntryParams = {
  user: UserEntry
}

export const UsersListEntry = (params: UsersListEntryParams) => {

  const onUserPress = () => {
    const routeParams: UserProfileParams = {userId: params.user.id} 
    router.push({ pathname: '/userProfile', params: routeParams })
  }

  return(
    <Pressable onPress={onUserPress}>
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'flex-start'}}>
        <ProfilePicture style={{borderRadius: 80, width: 70, height: 70}}/>
        <View style={{flexDirection: 'column', marginLeft: 20, flex: 0.9}}>
          <TitleText body={params.user.displayName} numberOfLines={1} />
          <BodyText body={params.user.email} numberOfLines={1} />
        </View>
      </View>
    </Pressable>
  )
}