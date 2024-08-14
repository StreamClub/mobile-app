import { ButtonGroup } from "@rneui/themed";
import React, { Dispatch, SetStateAction, useState } from "react";
import { colors } from "../../assets";
import { INITIAL_CATEGORY, MOVIES_NAME, SERIES_NAME } from "../../constants";

type DiscoverCategoriesParams = {
  setSelectedCategory: Dispatch<SetStateAction<number>>
}

export const DiscoverCategories = (params: DiscoverCategoriesParams) => {
  const [selectedIndex, setSelectedIndex] = useState(INITIAL_CATEGORY);

  const onPress = (value: number) => {
    setSelectedIndex(value);
    params.setSelectedCategory(value);
  }
  
  return(
    <ButtonGroup
      buttons={[MOVIES_NAME, SERIES_NAME]}
      selectedIndex={selectedIndex}
      onPress={onPress}
      containerStyle={{
          marginTop: 20,
          backgroundColor: 'transparent',
          borderColor: 'black',
          borderRadius: 20,
      }}
      buttonContainerStyle={{
          borderColor: 'black',
      }}
      selectedButtonStyle={{
          backgroundColor: colors.primaryRed,
      }}
      textStyle={{
          color: 'black',
          fontSize: 14,
      }} />
  )
}
