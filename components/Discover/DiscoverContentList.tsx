import React, { Dispatch, SetStateAction } from "react";
import { SearchList } from "../Search/SearchList";
import { ContentEntry } from "../../entities/ContentEntry";
import { ContentList } from "../Content/ContentList";
import { View } from "react-native";
import { CustomButton } from "../BasicComponents/CustomButton";
import { useDiscoverContent } from "../../hooks/search/useDiscoverContent";
import { useAppSelector } from "../../hooks/redux/useAppSelector";

type DiscoverContentListParams = {
  contentList:  ContentEntry[],
  setSearched: Dispatch<SetStateAction<boolean>>,
  setResults: Dispatch<SetStateAction<ContentEntry[]>>,
  setFilters: Dispatch<SetStateAction<any>>,
  filters: any
}

export const DiscoverContentList = (params: DiscoverContentListParams) => {
  const { category } = useAppSelector((state) => state.searchContent);
  
  const setResults = (serializedData: ContentEntry[]) => {
    const allResults = params.contentList.concat(serializedData);
    params.setResults(allResults);
  }

  const {discover, loading} = useDiscoverContent(setResults, params.setSearched);
  
  const onPress = () => {
    params.setSearched(false);
  }
  
  const searchNextPage = () => {
    console.log("[DISCOVER] Searching next page");
    params.filters.page += 1;
    params.setFilters(params.filters);
    discover(category, params.filters);
  }

  return(
    <SearchList length={params.contentList.length}>
      <View style={{margin: 10}}>
      <CustomButton 
        buttonText='Descubrir'
        fontSize='medium'
        type='primary'
        onPress={onPress}
        loading={loading} />
      </View>
      <ContentList 
        searchNextPage={searchNextPage}
        contentEntry={params.contentList} />
    </SearchList>
  )
}
