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
      <>  
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
        {/* Hardcodeada la foto de perfil xq no la recibo desde el back */}
        <ProfilePicture photoId={11} style={{borderRadius: 80, width: 70, height: 70}}/>
        <View style={{flexDirection: 'column', marginLeft: 20, flex: 0.9}}>
          <TitleText body={params.displayName} numberOfLines={1} />
          <BodyText body={params.email} numberOfLines={1} />
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
      </View> 
      <View
        style={{
            height: 1,
            backgroundColor: 'black',
            width: '90%',
            marginBottom: 10,
            alignSelf: 'center',
        }}
      />
      </>
      : null
    }
    </>
  )
}