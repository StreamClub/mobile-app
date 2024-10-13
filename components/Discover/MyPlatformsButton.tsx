import React, { Dispatch, SetStateAction, useState } from "react";
import { View } from "react-native";
import { BodyText } from "../BasicComponents/BodyText";
import { colors } from "../../assets";
import { Switch } from "react-native-paper";

type MyPlatformsButtonParams = {
  inMyPlatforms: boolean,
  setInMyPlatforms: Dispatch<SetStateAction<boolean>>
}

export const MyPlatformsButton = (params: MyPlatformsButtonParams) => {

  return(
    <View style={{margin: 10, justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center'}}>
      <BodyText 
        body="En mis plataformas:" 
        color={colors.primaryWhite} />
      <Switch 
        value={params.inMyPlatforms} 
        onValueChange={() => params.setInMyPlatforms(!params.inMyPlatforms)}
        color={colors.primaryRed} />
    </View>
  )
}
