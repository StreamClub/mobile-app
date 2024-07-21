import React, { Dispatch, SetStateAction } from "react";
import { SearchList } from "../Search/SearchList";
import { ContentEntry } from "../../entities/ContentEntry";
import { ContentList } from "../Content/ContentList";
import { View } from "react-native";
import { CustomButton } from "../BasicComponents/CustomButton";
import { useDiscoverContent } from "../../hooks/search/useDiscoverContent";

type DiscoverContentListParams = {
  contentList:  ContentEntry[],
  setSearched: Dispatch<SetStateAction<boolean>>,
  setResults: Dispatch<SetStateAction<ContentEntry[]>>,
  setFilters: Dispatch<SetStateAction<any>>,
  filters: any
}

export const DiscoverContentList = (params: DiscoverContentListParams) => {
  const {discover, loading} = useDiscoverContent(params.setResults, params.setSearched);
  
  const onPress = () => {
    params.setSearched(false);
  }

  const searchNextPage = () => {
    params.filters.page += 1;
    console.log(params.filters);
    params.setFilters(params.filters);
    discover(0, params.filters);
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
      <ContentList 
        searchNextPage={searchNextPage}
        contentEntry={params.contentList} />
    </SearchList>
  )
}
