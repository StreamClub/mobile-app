import React, { useState } from "react";
import { FriendRequestType } from "./FriendRequestButton";
import { View } from "react-native";
import { ProfilePicture } from "../ProfilePicture";
import { TitleText } from "../../BasicComponents/TitleText";
import { BodyText } from "../../BasicComponents/BodyText";
import { IconButton } from "react-native-paper";
import { colors } from "../../../assets";
import { useHandleFriendRequest } from "../../../hooks/friends/useHandleFriendRequest";

export const FriendRequestEntry = (params: FriendRequestType) => {
  const [showRequest, setShowRequest] = useState(true);
  const {acceptFriendRequest, rejectFriendRequest, loading} = useHandleFriendRequest(params.id.toString(), setShowRequest);

  return(
    <>
    {showRequest?
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
        <ProfilePicture style={{borderRadius: 80, width: 70, height: 70}}/>
        <View style={{flexDirection: 'column', marginLeft: 20, flex: 0.9}}>
          <TitleText body={'User' + params.senderId} numberOfLines={1} />
          <BodyText body={'mail@mail.com'} numberOfLines={1} />
        </View>
        <IconButton 
          icon='check' 
          size={25} 
          iconColor={colors.primaryBlue} 
          onPress={acceptFriendRequest} 
          style={{margin: 5}}/>
        <IconButton 
          icon='close' 
          size={25} 
          iconColor={colors.primaryRed} 
          onPress={rejectFriendRequest} 
          style={{margin: 5}}/>
      </View> : null
    }
    </>
  )
}