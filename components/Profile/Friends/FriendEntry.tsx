import React from "react";
import { Pressable, View } from "react-native";
import { ProfilePicture } from "../ProfilePicture";
import { TitleText } from "../../BasicComponents/TitleText";
import { BodyText } from "../../BasicComponents/BodyText";
import { router } from "expo-router";
import { UserProfileParams } from "../../../app/(app)/userProfile";
import { CheckBox } from "react-native-elements";
import { colors } from "../../../assets";

export type FriendType = {
  id: number,
  email: string,
  userName: string,
  displayName: string,
  userId: number,
  photoId: number,
  showCheckBox?: boolean
  onCheckBoxPress?: (friend: FriendType) => void
  selected?: boolean
  disabledCheckBox?: boolean
  disabledRedirect?: boolean
}

export const FriendEntry = (params: FriendType) => {
  const onFriendPress = () => {
    if (params.disabledRedirect) {  
      return
    }
    const routeParams: UserProfileParams = {userId: params.userId.toString()} 
    router.push({ pathname: '/userProfile', params: routeParams })
  }

  return(
    <Pressable onPress={onFriendPress} >
      <View style={{flexDirection: 'row', margin: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
        <ProfilePicture photoId={params.photoId} style={{borderRadius: 80, width: 70, height: 70}}/>
        <View style={{flexDirection: 'column', marginLeft: 20, flex: 0.9}}>
          <TitleText body={params.displayName} numberOfLines={1} />
          <BodyText body={params.email} numberOfLines={1} />
        </View>
        {params.showCheckBox &&
          <CheckBox
              checked={params.selected}
              disabled={params.disabledCheckBox}
              onPress={() => params.onCheckBoxPress && params.onCheckBoxPress(params)}
              iconType="material-community"
              size={30}
              checkedColor={colors.primaryBlack}
              uncheckedColor={colors.primaryGrey}
              checkedIcon="checkbox-outline"
              uncheckedIcon={'checkbox-blank-outline'}
              containerStyle={{ backgroundColor: 'trasparent' }}
          />
        }
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