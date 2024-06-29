import React, { Dispatch, SetStateAction } from "react";
import { SearchList } from "../Search/SearchList";
import { ContentEntry } from "../../entities/ContentEntry";
import { ContentList } from "../Content/ContentList";
import { View } from "react-native";
import { CustomButton } from "../BasicComponents/CustomButton";

type DiscoverContentListParams = {
  contentList:  ContentEntry[],
  setSearched: Dispatch<SetStateAction<boolean>>
}

export const DiscoverContentList = (params: DiscoverContentListParams) => {
  
  const onPress = () => {
    params.setSearched(false);
  }

  return(
    <SearchList length={params.contentList.length}>
      <View style={{margin: 10}}>
      <CustomButton 
        buttonText='Descubrir'
        fontSize='medium'
        type='primary'
        onPress={onPress} />
      </View>
      <ContentList contentEntry={params.contentList} />
    </SearchList>
  )
}
