import React, { useEffect } from "react"
import { colors } from "../../../assets"
import { MOVIES_NAME, SERIES_NAME } from "../../../constants"
import { ButtonGroup } from "react-native-elements"

type SubgroupRecommendationsCategoriesType = {
  selectedIndex: number,
  onPress: (value: number) => void
}

export const SubgroupRecommendationsCategories = (params: SubgroupRecommendationsCategoriesType) => {
  
  return(
    <ButtonGroup
      buttons={[MOVIES_NAME, SERIES_NAME]}
      selectedIndex={params.selectedIndex}
      onPress={params.onPress}
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