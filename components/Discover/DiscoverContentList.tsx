import React from "react";
import { SearchList } from "../Search/SearchList";
import { ContentEntry } from "../../entities/ContentEntry";
import { ContentList } from "../Content/ContentList";

type DiscoverContentListParams = {
  contentList:  ContentEntry[]
}

export const DiscoverContentList = (params: DiscoverContentListParams) => {

  return(
    <SearchList length={params.contentList.length}>
      <ContentList contentEntry={params.contentList} />
    </SearchList>
  )
}
