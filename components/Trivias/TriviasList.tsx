import React, { useEffect } from "react";
import { BodyText } from "../BasicComponents/BodyText";
import { useGetAllTrivias } from "../../apiCalls/trivias";
import { LoadingComponent } from "../BasicComponents/LoadingComponent";

export const TriviasList = () => {
  const {getAllTrivias, loading} = useGetAllTrivias();

  useEffect(() => {
    getAllTrivias(onSuccess);
  }, [])

  const onSuccess = (response: any) => {
    console.log(response.data);
  }

  return(
    loading?
    <LoadingComponent /> :
    <BodyText body="Trvias" />
  )
}
